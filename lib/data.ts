export const plans = [
  { name: 'Launch', price: '$49', description: 'Validate one workspace and publish a client-ready architecture.', features: ['3 projects', 'Demo AI analysis', 'PDF/DOCX export queue', 'Email support'] },
  { name: 'Scale', price: '$149', description: 'Operate multi-team delivery with production integrations.', features: ['25 projects', 'Supabase org roles', 'Stripe billing hooks', 'Connector registry'] },
  { name: 'Enterprise', price: 'Custom', description: 'Dedicated controls for regulated and high-volume teams.', features: ['Unlimited tenants', 'Custom SSO roadmap', 'Audit exports', 'Deployment advisory'] }
];

export const health = [
  { name: 'Next.js Build', status: 'Healthy', detail: 'Optimized App Router build pipeline' },
  { name: 'Supabase', status: 'Demo Mode', detail: 'Configure project URL and anon key for production auth' },
  { name: 'Stripe Billing', status: 'Pending Credentials', detail: 'Webhook endpoint and price IDs are environment-driven' },
  { name: 'AI Analysis', status: 'Ready Hook', detail: 'Server action boundary prepared for model provider keys' }
];
