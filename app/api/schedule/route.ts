import { NextResponse } from "next/server";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET(){
 const user=await currentUser(); if(!user) return NextResponse.json({error:"Unauthorized"},{status:401});
 const sql=db();
 const rows=user.role==="teacher"
 ? await sql`SELECT l.*,c.name classroom_name,c.subject FROM lessons l JOIN classrooms c ON c.id=l.classroom_id WHERE c.teacher_id=${user.id} ORDER BY scheduled_at NULLS LAST`
 : await sql`SELECT l.*,c.name classroom_name,c.subject FROM lessons l JOIN classrooms c ON c.id=l.classroom_id JOIN class_members cm ON cm.classroom_id=c.id WHERE cm.user_id=${user.id} ORDER BY scheduled_at NULLS LAST`;
 return NextResponse.json({lessons:rows});
}
export async function POST(req:Request){
 const user=await currentUser(); if(!user) return NextResponse.json({error:"Unauthorized"},{status:401});
 const {classroomId,title,scheduledAt}=await req.json(); const sql=db();
 const owns=await sql`SELECT 1 FROM classrooms WHERE id=${classroomId} AND teacher_id=${user.id}`;
 if(!owns.length) return NextResponse.json({error:"Forbidden"},{status:403});
 const rows=await sql`INSERT INTO lessons(classroom_id,title,scheduled_at,livekit_room) VALUES(${classroomId},${title},${scheduledAt},${"class-"+classroomId+"-"+Date.now()}) RETURNING *`;
 return NextResponse.json({lesson:rows[0]},{status:201});
}
export async function DELETE(req:Request){
 const user=await currentUser(); if(!user) return NextResponse.json({error:"Unauthorized"},{status:401});
 const {id}=await req.json(); const sql=db();
 await sql`DELETE FROM lessons l USING classrooms c WHERE l.id=${id} AND l.classroom_id=c.id AND c.teacher_id=${user.id}`;
 return NextResponse.json({ok:true});
}
