import Link from 'next/link';
import { plans, health } from '@/lib/data';

export default function Home() {
  return (
    <main>
      <nav className="nav"><strong>7Labz</strong><div><a href="#pricing">Pricing</a><Link href="/dashboard">Dashboard</Link><Link className="button" href="/workspace">Open Canvas</Link></div></nav>
      <section className="hero">
        <p className="eyebrow">System Canvas for automation teams</p>
        <h1>Design production-ready business systems before you deploy them.</h1>
        <p>Map Supabase, Stripe, AI, Power Automate, n8n, Microsoft, and cloud integrations in a responsive architecture workspace that runs safely in demo mode.</p>
        <div className="actions"><Link className="button" href="/workspace">Launch workspace</Link><Link className="secondary" href="/dashboard">View operations</Link></div>
      </section>
      <section className="grid cards">
        {['Marketing site', 'Responsive dashboard', 'React Flow canvas', 'Tenant security'].map((item) => <article className="card" key={item}><h3>{item}</h3><p>Deployable foundation with clear boundaries between demo functionality and account-backed production services.</p></article>)}
      </section>
      <section id="pricing"><p className="eyebrow">Pricing</p><h2>Plans for validation, delivery, and scale.</h2><div className="grid pricing">{plans.map((plan)=><article className="card" key={plan.name}><h3>{plan.name}</h3><p className="price">{plan.price}</p><p>{plan.description}</p><ul>{plan.features.map((f)=><li key={f}>{f}</li>)}</ul></article>)}</div></section>
      <section><p className="eyebrow">Production readiness</p><h2>Health indicators keep account-dependent systems visible.</h2><div className="grid cards">{health.map((h)=><article className="card" key={h.name}><span className="status">{h.status}</span><h3>{h.name}</h3><p>{h.detail}</p></article>)}</div></section>
    </main>
  );
}
