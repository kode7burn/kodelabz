# kodelabz

This repository contains a basic backend service for a client portal. Clients can
sign up, log in and view their projects and invoices. Invoice payments are
processed via Square and all data is stored in a PostgreSQL database (for
example a [Neon](https://neon.tech/) instance).

## Setup

1. Copy `.env.example` to `.env` and fill in your database credentials, JWT
   secret and Square API token.
2. Install dependencies (requires Node.js):

   ```bash
   npm install
   ```

3. Create the database tables:

   ```bash
   psql "$DATABASE_URL" -f schema.sql
   ```

4. Start the server:

   ```bash
   npm start
   ```

The server exposes endpoints for signing up, logging in, retrieving projects and
invoices and paying outstanding invoices. See `server.js` for details.

