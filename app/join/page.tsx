"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight,KeyRound,Users } from "lucide-react";
import AppShell from "@/components/AppShell";
export default function Join(){
 const router=useRouter();const [code,setCode]=useState("");const [error,setError]=useState("");const [busy,setBusy]=useState(false);const [joined,setJoined]=useState<any>(null);
 async function join(){setBusy(true);setError("");const r=await fetch("/api/classes/join",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({code})});const d=await r.json();setBusy(false);if(!r.ok)return setError(d.error||"Could not join class");setJoined(d.classroom)}
 return <AppShell><div className="cf-page narrow"><div className="cf-page-head"><div><span className="cf-overline">JOIN A CLASS</span><h1>One code. Straight into class.</h1><p>Enter the invite code your teacher shared with you.</p></div></div><section className="cf-join-box"><div className="cf-join-icon"><KeyRound/></div>{!joined?<><label>Class code<input value={code} onChange={e=>setCode(e.target.value.toUpperCase())} placeholder="PHY-X82KL" maxLength={12}/></label>{error&&<div className="cf-error">{error}</div>}<button className="cf-primary" disabled={busy||code.length<4} onClick={join}>{busy?"Checking...":<>Find class <ArrowRight size={17}/></>}</button></>:<div className="cf-joined"><span className="cf-overline">YOU&apos;RE IN</span><h2>{joined.name}</h2><p>{joined.subject}</p><div><Users size={16}/>{joined.student_count}/{joined.capacity} students</div><button className="cf-primary" onClick={()=>router.push("/classroom?id="+joined.id)}>Enter classroom <ArrowRight size={17}/></button></div>}</section></div></AppShell>
}
