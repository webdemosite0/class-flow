import { NextResponse } from "next/server";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET(){
  const user=await currentUser();
  if(!user) return NextResponse.json({error:"Unauthorized"},{status:401});
  const sql=db();
  const rows=await sql`SELECT id,email,name,role,default_class_size,email_notifications,class_reminders,preferred_theme FROM users WHERE id=${user.id}`;
  return NextResponse.json({settings:rows[0]});
}
export async function PATCH(req:Request){
  const user=await currentUser();
  if(!user) return NextResponse.json({error:"Unauthorized"},{status:401});
  const body=await req.json();
  const size=Math.max(1,Math.min(50,Number(body.defaultClassSize)||5));
  const sql=db();
  const rows=await sql`UPDATE users SET
    name=${String(body.name||user.name).slice(0,120)},
    default_class_size=${size},
    email_notifications=${body.emailNotifications!==false},
    class_reminders=${body.classReminders!==false},
    preferred_theme=${body.preferredTheme==="dark"?"dark":"light"}
    WHERE id=${user.id}
    RETURNING id,email,name,role,default_class_size,email_notifications,class_reminders,preferred_theme`;
  return NextResponse.json({settings:rows[0]});
}
