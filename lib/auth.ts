import { cookies } from "next/headers";
import { createHash, randomBytes, scryptSync, timingSafeEqual } from "crypto";
import { db } from "./db";

const COOKIE = "classflow_session";

export function hashPassword(password:string){
  const salt=randomBytes(16).toString("hex");
  const hash=scryptSync(password,salt,64).toString("hex");
  return `${salt}:${hash}`;
}
export function verifyPassword(password:string,stored:string){
  const [salt,hex]=stored.split(":");
  if(!salt||!hex) return false;
  const a=scryptSync(password,salt,64);
  const b=Buffer.from(hex,"hex");
  return a.length===b.length && timingSafeEqual(a,b);
}
export function tokenHash(token:string){return createHash("sha256").update(token).digest("hex")}

export async function createSession(userId:string){
  const token=randomBytes(32).toString("hex");
  const expires=new Date(Date.now()+1000*60*60*24*30);
  const sql=db();
  await sql`INSERT INTO sessions (user_id,token_hash,expires_at) VALUES (${userId},${tokenHash(token)},${expires.toISOString()})`;
  const jar=await cookies();
  jar.set(COOKIE,token,{httpOnly:true,sameSite:"lax",secure:process.env.NODE_ENV==="production",path:"/",expires});
}
export async function clearSession(){
  const jar=await cookies();
  const token=jar.get(COOKIE)?.value;
  if(token){
    try{const sql=db();await sql`DELETE FROM sessions WHERE token_hash=${tokenHash(token)}`;}catch{}
  }
  jar.set(COOKIE,"",{httpOnly:true,path:"/",expires:new Date(0)});
}
export async function currentUser(){
  const jar=await cookies();
  const token=jar.get(COOKIE)?.value;
  if(!token) return null;
  const sql=db();
  const rows=await sql`
    SELECT u.id,u.email,u.name,u.role,u.avatar_url,u.default_class_size,u.onboarding_complete
    FROM sessions s JOIN users u ON u.id=s.user_id
    WHERE s.token_hash=${tokenHash(token)} AND s.expires_at > now()
    LIMIT 1
  `;
  return rows[0] ?? null;
}
