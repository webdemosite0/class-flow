"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight,ShieldCheck } from "lucide-react";
import Brand from "@/components/Brand";
export default function Login(){
 const router=useRouter();const [error,setError]=useState("");const [busy,setBusy]=useState(false);
 async function submit(e:React.FormEvent<HTMLFormElement>){e.preventDefault();setBusy(true);setError("");const f=new FormData(e.currentTarget);const res=await fetch("/api/auth/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:f.get("email"),password:f.get("password")})});const data=await res.json();setBusy(false);if(!res.ok)return setError(data.error||"Login failed");router.push(data.user?.onboarding_complete?"/dashboard":"/onboarding")}
 return <div className="cf-auth single"><div className="cf-auth-panel"><Brand/><div className="cf-auth-card"><span className="cf-overline">WELCOME BACK</span><h1>Continue your classroom</h1><p>Sign in to your teacher or student workspace.</p><form onSubmit={submit}><label>Email<input name="email" type="email" required placeholder="you@example.com"/></label><label>Password<input name="password" type="password" required placeholder="Your password"/></label>{error&&<div className="cf-error">{error}</div>}<button className="cf-primary" disabled={busy}>{busy?"Signing in...":<>Log in <ArrowRight size={17}/></>}</button></form><div className="cf-safe"><ShieldCheck size={16}/> Secure, HTTP-only session</div><div className="cf-auth-foot">New to ClassFlow? <button onClick={()=>router.push("/signup")}>Create account</button></div></div></div></div>
}
