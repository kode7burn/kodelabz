# Production hardening checklist

The app runs in demonstration mode without account credentials. Before accepting customers, configure and verify these production systems:

- Supabase authentication, email verification, password recovery, and SSR session handling.
- Supabase PostgreSQL backups, point-in-time recovery, and organization-scoped Row Level Security policies.
- Stripe products, prices, customer portal, checkout sessions, and signed webhook processing.
- AI architecture analysis provider keys, request limits, prompt logging policy, and abuse monitoring.
- External Power Automate, n8n, Microsoft, and cloud connector OAuth or webhook credentials.
- PDF and DOCX generation workers, storage buckets, malware scanning, and retention rules.
- Production monitoring, alerting, rate limiting, audit trails, and incident response ownership.
