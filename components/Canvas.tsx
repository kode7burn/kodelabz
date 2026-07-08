'use client';

import { useCallback, useMemo, useState } from 'react';
import ReactFlow, { Background, Controls, MiniMap, addEdge, applyEdgeChanges, applyNodeChanges, type Connection, type Edge, type EdgeChange, type Node, type NodeChange } from 'reactflow';
import 'reactflow/dist/style.css';

const initialNodes: Node[] = [
  { id: 'site', position: { x: 40, y: 60 }, data: { label: 'Marketing + Pricing' }, type: 'input' },
  { id: 'app', position: { x: 320, y: 40 }, data: { label: 'Next.js App Router' } },
  { id: 'db', position: { x: 620, y: 120 }, data: { label: 'Supabase PostgreSQL + RLS' } },
  { id: 'billing', position: { x: 320, y: 250 }, data: { label: 'Stripe Billing Webhooks' } },
  { id: 'ai', position: { x: 620, y: 310 }, data: { label: 'AI Architecture Analysis' }, type: 'output' }
];

const initialEdges: Edge[] = [
  { id: 'site-app', source: 'site', target: 'app', animated: true },
  { id: 'app-db', source: 'app', target: 'db', animated: true },
  { id: 'app-billing', source: 'app', target: 'billing', animated: true },
  { id: 'db-ai', source: 'db', target: 'ai', animated: true }
];

export default function Canvas() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [selected, setSelected] = useState<Node | null>(initialNodes[0]);
  const nodeColor = useCallback((node: Node) => node.id === selected?.id ? '#62e6b6' : '#8aa4ff', [selected]);
  const onNodesChange = useCallback((changes: NodeChange[]) => setNodes((nds) => applyNodeChanges(changes, nds)), []);
  const onEdgesChange = useCallback((changes: EdgeChange[]) => setEdges((eds) => applyEdgeChanges(changes, eds)), []);
  const onConnect = useCallback((connection: Connection) => setEdges((eds) => addEdge({ ...connection, animated: true }, eds)), []);
  const summary = useMemo(() => ({ nodes: nodes.length, edges: edges.length, tenant: 'demo-org' }), [nodes.length, edges.length]);

  return <main className="appShell"><aside className="side"><h2>System Canvas</h2><p className="eyebrow">Production demo</p><div className="card"><h3>Inspector</h3><p><strong>Selected:</strong> {selected?.data?.label ?? 'None'}</p><p><strong>Node ID:</strong> {selected?.id ?? '—'}</p><p><strong>Tenant:</strong> {summary.tenant}</p><p>Drag nodes, connect handles, zoom, and inspect architecture properties.</p></div><div className="card"><h3>Metrics</h3><p>{summary.nodes} nodes · {summary.edges} connections</p></div></aside><section className="content" style={{height:'100vh'}}><ReactFlow nodes={nodes} edges={edges} onNodesChange={onNodesChange} onEdgesChange={onEdgesChange} onConnect={onConnect} onNodeClick={(_, node)=>setSelected(node)} fitView><Background gap={18} /><MiniMap nodeColor={nodeColor} /><Controls /></ReactFlow></section></main>;
}
