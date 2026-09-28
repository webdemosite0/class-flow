import { NextResponse } from "next/server";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET(){
 const user=await currentUser(); if(!user) return NextResponse.json({error:"Unauthorized"},{status:401});
 const sql=db();
 const rows=user.role==="teacher"
 ? await sql`SELECT r.*,c.name classroom_name FROM resources r JOIN classrooms c ON c.id=r.classroom_id WHERE r.teacher_id=${user.id} ORDER BY r.created_at DESC`
 : await sql`SELECT r.*,c.name classroom_name FROM resources r JOIN classrooms c ON c.id=r.classroom_id JOIN class_members cm ON cm.classroom_id=c.id WHERE cm.user_id=${user.id} ORDER BY r.created_at DESC`;
 return NextResponse.json({resources:rows});
}
export async function POST(req:Request){
 const user=await currentUser(); if(!user) return NextResponse.json({error:"Unauthorized"},{status:401});
 const {classroomId,title,url,resourceType="link"}=await req.json(); const sql=db();
 const owns=await sql`SELECT 1 FROM classrooms WHERE id=${classroomId} AND teacher_id=${user.id}`;
 if(!owns.length) return NextResponse.json({error:"Forbidden"},{status:403});
 const rows=await sql`INSERT INTO resources(classroom_id,teacher_id,title,url,resource_type) VALUES(${classroomId},${user.id},${title},${url},${resourceType}) RETURNING *`;
 return NextResponse.json({resource:rows[0]},{status:201});
}
export async function DELETE(req:Request){
 const user=await currentUser(); if(!user) return NextResponse.json({error:"Unauthorized"},{status:401});
 const {id}=await req.json(); const sql=db();
 await sql`DELETE FROM resources WHERE id=${id} AND teacher_id=${user.id}`;
 return NextResponse.json({ok:true});
}
