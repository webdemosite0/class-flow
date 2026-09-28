import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { createSession, hashPassword } from "@/lib/auth";

export async function POST(req:Request){
  try{
    const {name,email,password,role}=await req.json();
    if(!name||!email||!password||!["teacher","student"].includes(role)) return NextResponse.json({error:"Missing or invalid fields"},{status:400});
    if(password.length<8) return NextResponse.json({error:"Password must be at least 8 characters"},{status:400});
    const sql=db();
    const existing=await sql`SELECT id FROM users WHERE lower(email)=lower(${email}) LIMIT 1`;
    if(existing.length) return NextResponse.json({error:"An account with this email already exists"},{status:409});
    const rows=await sql`INSERT INTO users(email,password_hash,name,role) VALUES (lower(${email}),${hashPassword(password)},${name},${role}) RETURNING id,email,name,role,onboarding_complete`;
    await createSession(rows[0].id);
    return NextResponse.json({user:rows[0]});
  }catch(e){return NextResponse.json({error:e instanceof Error?e.message:"Registration failed"},{status:500})}
}
