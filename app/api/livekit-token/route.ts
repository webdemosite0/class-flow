import { NextResponse } from "next/server";
import { AccessToken } from "livekit-server-sdk";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";

export const runtime="nodejs";

export async function POST(req:Request){
  const user=await currentUser();
  if(!user) return NextResponse.json({error:"Unauthorized"},{status:401});
  const {classroomId}=await req.json();
  const sql=db();
  const rows=await sql`SELECT c.id,c.name,c.teacher_id FROM classrooms c JOIN class_members cm ON cm.classroom_id=c.id WHERE c.id=${classroomId} AND cm.user_id=${user.id} LIMIT 1`;
  const classroom=rows[0];
  if(!classroom) return NextResponse.json({error:"You are not enrolled in this class"},{status:403});
  const key=process.env.LIVEKIT_API_KEY, secret=process.env.LIVEKIT_API_SECRET, url=process.env.NEXT_PUBLIC_LIVEKIT_URL||process.env.LIVEKIT_URL;
  if(!key||!secret||!url) return NextResponse.json({error:"LiveKit environment variables are not configured"},{status:500});
  const room=`class-${classroom.id}`;
  const token=new AccessToken(key,secret,{identity:user.id,name:user.name});
  token.addGrant({roomJoin:true,room,canPublish:true,canSubscribe:true,canPublishData:true});
  return NextResponse.json({token:await token.toJwt(),url,room,isTeacher:classroom.teacher_id===user.id});
}
