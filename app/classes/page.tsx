"use client";
import { useEffect,useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight,Copy,Plus,Users } from "lucide-react";
import AppShell from "@/components/AppShell";
export default function Classes(){
 const router=useRouter();const [classes,setClasses]=useState<any[]>([]);
 useEffect(()=>{fetch("/api/classes").then(async r=>{if(r.status===401)return router.push("/login");const d=await r.json();setClasses(d.classes||[])})},[router]);
 return <AppShell><div className="cf-page"><div className="cf-page-head"><div><span className="cf-overline">CLASS LIBRARY</span><h1>Your classes</h1><p>Create small, focused classrooms and go live when you’re ready.</p></div><button className="cf-primary small" onClick={()=>router.push("/create-class")}><Plus size={16}/> New class</button></div><div className="cf-live-grid">{classes.map(c=><article className="cf-live-card" key={c.id}><div className="cf-live-cover alt"><span>{String(c.subject||"C").slice(0,1)}</span><i>{c.subject}</i></div><div className="cf-live-body"><h3>{c.name}</h3><p>{c.description||"No description yet."}</p><div className="cf-class-stats"><span><Users size={14}/>{c.student_count}/{c.capacity}</span><button onClick={()=>navigator.clipboard?.writeText(c.class_code)}><Copy size={13}/>{c.class_code}</button></div><button className="cf-primary small full" onClick={()=>router.push("/classroom?id="+c.id)}>Open live classroom <ArrowRight size={15}/></button></div></article>)}</div>{classes.length===0&&<div className="cf-empty"><h3>No classes yet</h3><p>Create your first class to generate a real invite code.</p></div>}</div></AppShell>
}
