const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { Pool } = require('pg');
const dotenv = require('dotenv');
const { Client, Environment } = require('square');

dotenv.config();

const app = express();
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_SSL === 'true'
});

const squareClient = new Client({
  environment: process.env.SQUARE_ENV === 'production' ? Environment.Production : Environment.Sandbox,
  accessToken: process.env.SQUARE_ACCESS_TOKEN
});

const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).json({ message: 'No token provided' });
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Invalid token' });
    req.userId = decoded.id;
    next();
  });
};

app.post('/signup', async (req, res) => {
  const { email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  try {
    await pool.query('INSERT INTO users(email, password) VALUES($1,$2)', [email, hashed]);
    res.json({ message: 'User created' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating user' });
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await pool.query('SELECT * FROM users WHERE email=$1', [email]);
    if (result.rows.length === 0) return res.status(401).json({ message: 'Invalid credentials' });
    const user = result.rows[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error logging in' });
  }
});

app.get('/projects', authMiddleware, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM projects WHERE user_id=$1', [req.userId]);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching projects' });
  }
});

app.get('/invoices', authMiddleware, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM invoices WHERE user_id=$1', [req.userId]);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching invoices' });
  }
});

app.post('/pay', authMiddleware, async (req, res) => {
  const { invoiceId, sourceId } = req.body; // sourceId is the nonce/token from Square frontend
  try {
    const invoiceRes = await pool.query('SELECT * FROM invoices WHERE id=$1 AND user_id=$2', [invoiceId, req.userId]);
    if (invoiceRes.rows.length === 0) return res.status(404).json({ message: 'Invoice not found' });
    const invoice = invoiceRes.rows[0];
    if (invoice.paid) return res.status(400).json({ message: 'Invoice already paid' });

    const paymentsApi = squareClient.paymentsApi;
    const response = await paymentsApi.createPayment({
      sourceId,
      idempotencyKey: `inv-${invoice.id}-${Date.now()}`,
      amountMoney: {
        amount: invoice.amount_cents,
        currency: 'USD'
      }
    });

    await pool.query('UPDATE invoices SET paid=true WHERE id=$1', [invoiceId]);
    res.json({ payment: response.result.payment });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Payment failed' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
