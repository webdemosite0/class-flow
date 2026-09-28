import { NextResponse } from "next/server";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET(){
 const user=await currentUser(); if(!user) return NextResponse.json({error:"Unauthorized"},{status:401});
 const sql=db();
 const rows=user.role==="teacher"
 ? await sql`SELECT a.*,c.name classroom_name,(SELECT count(*)::int FROM submissions s WHERE s.assignment_id=a.id) submission_count FROM assignments a JOIN classrooms c ON c.id=a.classroom_id WHERE c.teacher_id=${user.id} ORDER BY a.created_at DESC`
 : await sql`SELECT a.*,c.name classroom_name FROM assignments a JOIN classrooms c ON c.id=a.classroom_id JOIN class_members cm ON cm.classroom_id=c.id WHERE cm.user_id=${user.id} ORDER BY a.created_at DESC`;
 return NextResponse.json({assignments:rows});
}
export async function POST(req:Request){
 const user=await currentUser(); if(!user) return NextResponse.json({error:"Unauthorized"},{status:401});
 if(user.role!=="teacher") return NextResponse.json({error:"Only teachers can create assignments"},{status:403});
 const {classroomId,title,description="",dueAt=null}=await req.json(); const sql=db();
 const owns=await sql`SELECT 1 FROM classrooms WHERE id=${classroomId} AND teacher_id=${user.id}`;
 if(!owns.length) return NextResponse.json({error:"Class not found"},{status:404});
 const rows=await sql`INSERT INTO assignments(classroom_id,title,description,due_at) VALUES(${classroomId},${title},${description},${dueAt}) RETURNING *`;
 return NextResponse.json({assignment:rows[0]},{status:201});
}
export async function DELETE(req:Request){
 const user=await currentUser(); if(!user) return NextResponse.json({error:"Unauthorized"},{status:401});
 const {id}=await req.json(); const sql=db();
 await sql`DELETE FROM assignments a USING classrooms c WHERE a.id=${id} AND a.classroom_id=c.id AND c.teacher_id=${user.id}`;
 return NextResponse.json({ok:true});
}
