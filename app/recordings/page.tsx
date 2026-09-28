"use client";
import { useEffect,useState } from "react";
import { Play,Video } from "lucide-react";
import AppShell from "@/components/AppShell";
export default function RecordingsPage(){
 const [items,setItems]=useState<any[]>([]);useEffect(()=>{fetch("/api/recordings").then(r=>r.json()).then(d=>setItems(d.recordings||[]))},[]);
 return <AppShell><div className="cf-page"><div className="cf-page-head"><div><span className="cf-overline">CLASS LIBRARY</span><h1>Recordings</h1><p>Completed LiveKit recordings will appear here after egress storage is configured.</p></div></div>{items.length?<div className="cf-record-grid">{items.map(r=><article key={r.id}><div className="cf-record-thumb"><Video size={28}/><span>{r.status}</span></div><div><b>{r.title||r.classroom_name||"Class recording"}</b><span>{new Date(r.created_at).toLocaleString()}</span>{r.url&&<a href={r.url} target="_blank" rel="noreferrer" className="cf-primary small"><Play size={14}/> Watch</a>}</div></article>)}</div>:<div className="cf-empty"><div className="cf-empty-icon"><Video/></div><h3>No recordings yet</h3><p>Once recording storage is connected and a class is recorded, it will appear here automatically.</p></div>}</div></AppShell>
}
