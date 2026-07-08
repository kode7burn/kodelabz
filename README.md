# 7Labz System Canvas

A deployable product foundation for designing, validating, and operating multi-tenant automation architectures.

## Included

- Public marketing website and pricing pages.
- Responsive application dashboard.
- Project workspace with a functional React Flow architecture canvas.
- Draggable and connectable system nodes, property inspector, zoom controls, mini-map, grid, and animated connections.
- Production environment and health indicators.
- Supabase PostgreSQL migration with organization-scoped Row Level Security.
- Environment configuration template for Supabase, Stripe, AI, and connector integration points.
- Deployment and production-hardening documentation.

## Run locally

```bash
cp .env.example .env.local
npm install
npm run dev
```

Open <http://localhost:3000>.

The application runs in demonstration mode without Supabase or Stripe credentials. The dashboard and visual canvas remain operational.

## Production boundary

Before accepting customers, configure real credentials and deployment settings for Supabase auth, email flows, Stripe subscriptions and webhooks, AI analysis, external connectors, document generation, monitoring, backups, and rate limiting. See `docs/production-hardening.md`.
