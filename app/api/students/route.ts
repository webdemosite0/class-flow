import { NextResponse } from "next/server";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET(){
 const user=await currentUser();
 if(!user) return NextResponse.json({error:"Unauthorized"},{status:401});
 const sql=db();
 const rows=await sql`
   SELECT u.id,u.name,u.email,cm.joined_at,c.id classroom_id,c.name classroom_name
   FROM classrooms c
   JOIN class_members cm ON cm.classroom_id=c.id AND cm.role='student'
   JOIN users u ON u.id=cm.user_id
   WHERE c.teacher_id=${user.id}
   ORDER BY cm.joined_at DESC
 `;
 return NextResponse.json({students:rows});
}
export async function DELETE(req:Request){
 const user=await currentUser(); if(!user) return NextResponse.json({error:"Unauthorized"},{status:401});
 const {classroomId,studentId}=await req.json(); const sql=db();
 const owns=await sql`SELECT 1 FROM classrooms WHERE id=${classroomId} AND teacher_id=${user.id}`;
 if(!owns.length) return NextResponse.json({error:"Forbidden"},{status:403});
 await sql`DELETE FROM class_members WHERE classroom_id=${classroomId} AND user_id=${studentId} AND role='student'`;
 return NextResponse.json({ok:true});
}
