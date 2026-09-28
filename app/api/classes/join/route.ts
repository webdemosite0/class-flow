import { NextResponse } from "next/server";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";

export async function POST(req:Request){
  const user=await currentUser();
  if(!user) return NextResponse.json({error:"Unauthorized"},{status:401});
  const {code}=await req.json();
  const sql=db();
  const rows=await sql`SELECT c.*, (SELECT count(*)::int FROM class_members cm WHERE cm.classroom_id=c.id AND cm.role='student') student_count FROM classrooms c WHERE upper(c.class_code)=upper(${code}) LIMIT 1`;
  const c=rows[0];
  if(!c) return NextResponse.json({error:"Class not found"},{status:404});
  if(!c.allow_join_by_code) return NextResponse.json({error:"This class is not accepting code joins"},{status:403});
  const existing=await sql`SELECT 1 FROM class_members WHERE classroom_id=${c.id} AND user_id=${user.id}`;
  if(existing.length) return NextResponse.json({classroom:c});
  if(Number(c.student_count)>=Number(c.capacity)) return NextResponse.json({error:"This class is full"},{status:409});
  await sql`INSERT INTO class_members(classroom_id,user_id,role) VALUES (${c.id},${user.id},'student')`;
  return NextResponse.json({classroom:{...c,student_count:Number(c.student_count)+1}});
}
