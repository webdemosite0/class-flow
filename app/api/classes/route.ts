import { NextResponse } from "next/server";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { makeClassCode } from "@/lib/codes";

export async function GET(){
  const user=await currentUser();
  if(!user) return NextResponse.json({error:"Unauthorized"},{status:401});
  const sql=db();
  const rows=user.role==="teacher"
    ? await sql`SELECT c.*, (SELECT count(*)::int FROM class_members cm WHERE cm.classroom_id=c.id AND cm.role='student') student_count FROM classrooms c WHERE c.teacher_id=${user.id} ORDER BY c.created_at DESC`
    : await sql`SELECT c.*, (SELECT count(*)::int FROM class_members cm2 WHERE cm2.classroom_id=c.id AND cm2.role='student') student_count FROM class_members cm JOIN classrooms c ON c.id=cm.classroom_id WHERE cm.user_id=${user.id} ORDER BY cm.joined_at DESC`;
  return NextResponse.json({classes:rows});
}

export async function POST(req:Request){
  const user=await currentUser();
  if(!user) return NextResponse.json({error:"Unauthorized"},{status:401});
  if(user.role!=="teacher") return NextResponse.json({error:"Only teachers can create classes"},{status:403});
  const {name,subject,description="",capacity=5,allowJoinByCode=true}=await req.json();
  if(!name||!subject) return NextResponse.json({error:"Name and subject are required"},{status:400});
  const cap=Math.max(1,Math.min(100,Number(capacity)||5));
  const sql=db();
  let code="";
  for(let i=0;i<5;i++){
    code=makeClassCode(subject);
    const found=await sql`SELECT id FROM classrooms WHERE class_code=${code} LIMIT 1`;
    if(!found.length) break;
  }
  const rows=await sql`INSERT INTO classrooms(teacher_id,name,subject,description,class_code,capacity,allow_join_by_code) VALUES (${user.id},${name},${subject},${description},${code},${cap},${!!allowJoinByCode}) RETURNING *`;
  await sql`INSERT INTO class_members(classroom_id,user_id,role) VALUES (${rows[0].id},${user.id},'teacher') ON CONFLICT DO NOTHING`;
  return NextResponse.json({classroom:rows[0]},{status:201});
}
