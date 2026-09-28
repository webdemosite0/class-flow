"use client";
import { useEffect,useState } from "react";
import { useRouter } from "next/navigation";
import { LiveKitRoom,VideoConference,RoomAudioRenderer } from "@livekit/components-react";
import { ArrowLeft,Copy,Loader2,ShieldCheck } from "lucide-react";
import Brand from "@/components/Brand";
export default function Classroom(){
 const router=useRouter();const [state,setState]=useState<any>({loading:true});
 useEffect(()=>{const id=new URLSearchParams(window.location.search).get("id");if(!id){setState({loading:false,error:"Choose a class from your dashboard first."});return;}fetch("/api/livekit-token",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({classroomId:id})}).then(async r=>{const d=await r.json();if(!r.ok)throw new Error(d.error||"Could not enter room");setState({loading:false,...d})}).catch(e=>setState({loading:false,error:e.message}))},[]);
 if(state.loading)return <div className="cf-room-state"><Loader2 className="spin"/><b>Preparing your classroom…</b><span>Connecting securely to LiveKit.</span></div>;
 if(state.error)return <div className="cf-room-state"><Brand/><h2>Classroom unavailable</h2><p>{state.error}</p><button className="cf-primary" onClick={()=>router.push("/dashboard")}><ArrowLeft size={16}/> Back to dashboard</button></div>;
 return <div className="cf-livekit-page"><header><div><Brand/><span className="cf-room-badge"><ShieldCheck size={14}/> Secure live class</span></div><div><button onClick={()=>navigator.clipboard?.writeText(state.room)}><Copy size={14}/> Copy room ID</button><button className="leave" onClick={()=>router.push("/dashboard")}>Leave class</button></div></header><LiveKitRoom token={state.token} serverUrl={state.url} connect={true} audio={true} video={true} className="cf-livekit-room"><VideoConference/><RoomAudioRenderer/></LiveKitRoom></div>
}
