"use client";
import { useEffect,useState } from "react";
import { Search,Trash2,Users } from "lucide-react";
import AppShell from "@/components/AppShell";
export default function StudentsPage(){
 const [students,setStudents]=useState<any[]>([]),[q,setQ]=useState("");
 const load=()=>fetch("/api/students").then(r=>r.json()).then(d=>setStudents(d.students||[]));
 useEffect(load,[]);
 async function remove(s:any){await fetch("/api/students",{method:"DELETE",headers:{"Content-Type":"application/json"},body:JSON.stringify({classroomId:s.classroom_id,studentId:s.id})});load()}
 const shown=students.filter(s=>(s.name+" "+s.email+" "+s.classroom_name).toLowerCase().includes(q.toLowerCase()));
 return <AppShell><div className="cf-page"><div className="cf-page-head"><div><span className="cf-overline">TEACHER PANEL</span><h1>Students</h1><p>See every learner enrolled in your classes.</p></div></div><div className="cf-toolbar"><div className="cf-search"><Search size={16}/><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search students"/></div></div>{shown.length?<div className="cf-data-list">{shown.map(s=><article key={s.classroom_id+s.id}><div className="avatar">{String(s.name).split(" ").map((x:string)=>x[0]).join("").slice(0,2)}</div><div className="grow"><b>{s.name}</b><span>{s.email}</span></div><span className="cf-chip">{s.classroom_name}</span><button className="cf-icon-danger" onClick={()=>remove(s)}><Trash2 size={16}/></button></article>)}</div>:<div className="cf-empty"><div className="cf-empty-icon"><Users/></div><h3>No students yet</h3><p>Students will appear here after they join a class with its invite code.</p></div>}</div></AppShell>
}
