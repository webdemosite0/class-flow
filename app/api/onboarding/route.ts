import { NextResponse } from "next/server";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";

export async function POST(req:Request){
  const user=await currentUser();
  if(!user) return NextResponse.json({error:"Unauthorized"},{status:401});
  const {name,role,defaultClassSize}=await req.json();
  const size=Math.max(1,Math.min(50,Number(defaultClassSize)||5));
  const sql=db();
  const rows=await sql`UPDATE users SET name=${name||user.name}, role=${role||user.role}, default_class_size=${size}, onboarding_complete=true WHERE id=${user.id} RETURNING id,email,name,role,default_class_size,onboarding_complete`;
  return NextResponse.json({user:rows[0]});
}
