import Link from 'next/link';
import { health } from '@/lib/data';

export default function Dashboard() {
  return <main className="appShell"><aside className="side"><h2>7Labz Ops</h2><p className="eyebrow">Demo tenant</p><Link className="button" href="/workspace">Open workspace</Link></aside><section className="content"><h1>Production dashboard</h1><div className="grid cards"><article className="card"><h3>Projects</h3><p className="price">12</p><p>Architecture workspaces grouped by organization.</p></article><article className="card"><h3>Members</h3><p className="price">38</p><p>Owner, admin, editor, and viewer roles.</p></article><article className="card"><h3>Connectors</h3><p className="price">9</p><p>Supabase, Stripe, AI, Microsoft, n8n, Power Automate, and cloud hooks.</p></article></div><h2>Environment health</h2><div className="card">{health.map((h)=><div className="metric" key={h.name}><strong>{h.name}</strong><span>{h.status}</span></div>)}</div></section></main>;
}
