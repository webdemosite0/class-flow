import { NextResponse } from "next/server";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET(){
 const user=await currentUser(); if(!user) return NextResponse.json({error:"Unauthorized"},{status:401});
 const sql=db();
 const rows=user.role==="teacher"
 ? await sql`SELECT r.*,c.name classroom_name FROM recordings r LEFT JOIN classrooms c ON c.id=r.classroom_id WHERE c.teacher_id=${user.id} ORDER BY r.created_at DESC`
 : await sql`SELECT r.*,c.name classroom_name FROM recordings r JOIN classrooms c ON c.id=r.classroom_id JOIN class_members cm ON cm.classroom_id=c.id WHERE cm.user_id=${user.id} AND r.status='ready' ORDER BY r.created_at DESC`;
 return NextResponse.json({recordings:rows});
}
