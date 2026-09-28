import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { createSession, verifyPassword } from "@/lib/auth";

export async function POST(req:Request){
  try{
    const {email,password}=await req.json();
    const sql=db();
    const rows=await sql`SELECT id,email,name,role,password_hash,onboarding_complete FROM users WHERE lower(email)=lower(${email}) LIMIT 1`;
    const user=rows[0];
    if(!user||!verifyPassword(password,user.password_hash)) return NextResponse.json({error:"Invalid email or password"},{status:401});
    await createSession(user.id);
    delete user.password_hash;
    return NextResponse.json({user});
  }catch(e){return NextResponse.json({error:e instanceof Error?e.message:"Login failed"},{status:500})}
}
