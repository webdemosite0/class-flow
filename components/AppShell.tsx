"use client";
import { usePathname,useRouter } from "next/navigation";
import { BookOpen,CalendarDays,LayoutDashboard,LogOut,Settings,Users,Video } from "lucide-react";
import Brand from "./Brand";
const items=[["/dashboard","Home",LayoutDashboard],["/classes","Classes",BookOpen],["/join","Join class",Users],["/classroom","Live room",Video],["/schedule","Schedule",CalendarDays],["/settings","Settings",Settings]] as const;
export default function AppShell({children}:{children:React.ReactNode}){
 const path=usePathname(),router=useRouter();
 async function logout(){await fetch("/api/auth/logout",{method:"POST"});router.push("/login");router.refresh()}
 return <div className="cf-shell"><aside className="cf-side"><Brand/><nav>{items.map(([href,label,Icon])=><button key={href} onClick={()=>router.push(href)} className={path===href?"active":""}><Icon size={18}/><span>{label}</span></button>)}</nav><div className="cf-side-bottom"><button onClick={logout}><LogOut size={18}/><span>Log out</span></button></div></aside><main className="cf-main">{children}</main></div>
}
