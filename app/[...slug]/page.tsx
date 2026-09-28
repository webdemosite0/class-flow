"use client";

import { usePathname, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import {
  Bell, BookOpen, CalendarDays, Camera, CheckCircle2, ChevronRight, CircleUserRound, ClipboardList, Clock3,
  FileText, Hand, LayoutDashboard, Link2, LogOut, Menu, MessageSquare, Mic, MicOff, MonitorUp, MoreHorizontal,
  Paperclip, PenLine, Play, Plus, Radio, Search, Settings, Share2, Sparkles, Square, Users, Video, VideoOff, Wand2,
  X, UserPlus, GraduationCap, FolderOpen, CalendarCheck, Send, Upload, Copy, ChevronDown
} from "lucide-react";

type ClassItem = {name:string; subject:string; students:number; time:string; color:string};

const classItems: ClassItem[] = [
  {name:"Physics 101",subject:"Physics",students:18,time:"3:30 PM",color:"#6759e8"},
  {name:"Mathematics",subject:"Algebra II",students:24,time:"10:00 AM",color:"#ec6099"},
  {name:"Chemistry",subject:"Chemistry",students:21,time:"1:00 PM",color:"#27ae80"},
];

const nav = [
  ["/dashboard","Dashboard",LayoutDashboard],
  ["/classes","My classes",BookOpen],
  ["/schedule","Schedule",CalendarDays],
  ["/assignments","Assignments",ClipboardList],
  ["/students","Students",Users],
  ["/recordings","Recordings",Video],
  ["/resources","Resources",FolderOpen],
  ["/settings","Settings",Settings],
] as const;

function Logo(){return <div className="brand appbrand" onClick={()=>location.href="/"}><span className="brandMark">C</span>ClassFlow</div>}

function Sidebar(){
  const path=usePathname();
  const router=useRouter();
  return <aside className="sidebar"><Logo/><div className="sideNav">{nav.map(([href,label,Icon])=><button key={href} onClick={()=>router.push(href)} className={path===href?"sideItem active":"sideItem"}><Icon size={18}/><span>{label}</span></button>)}</div><div className="sideBottom"><button className="sideItem"><CircleUserRound size={18}/><span>Sarah Johnson</span></button><button className="sideItem danger"><LogOut size={18}/><span>Log out</span></button></div></aside>
}

function Topbar({title}:{title:string}){
  return <header className="appTopbar"><div><span className="mobileMenu"><Menu size={20}/></span><b>{title}</b></div><div className="topIcons"><button className="iconBtn"><Search size={18}/></button><button className="iconBtn"><Bell size={18}/><i className="notify"/></button><div className="avatar">SJ</div></div></header>
}

function Dashboard(){
  const router=useRouter();
  return <div className="pageWrap">
    <div className="welcomeRow"><div><span className="muted">Monday, September 28</span><h1>Good afternoon, Sarah 👋</h1><p>You have 3 classes today. Your next class starts at 3:30 PM.</p></div><button className="btn primary" onClick={()=>router.push("/create-class")}><Plus size={17}/> Create class</button></div>
    <div className="statGrid">
      {[["5","Total classes",BookOpen],["128","Total students",Users],["3","Scheduled today",CalendarCheck],["12","Pending submissions",ClipboardList]].map(([num,label,Icon]:any)=><div className="statCard" key={label}><div className="statIcon"><Icon size={20}/></div><div><strong>{num}</strong><span>{label}</span></div></div>)}
    </div>
    <div className="dashboardGrid">
      <section className="panel nextClass"><div className="panelHead"><div><span className="kicker">NEXT CLASS</span><h3>Physics 101</h3></div><span className="pill">Today · 3:30 PM</span></div><div className="nextBody"><div className="classGlyph">P</div><div><b>Newton&apos;s Laws of Motion</b><span><Users size={14}/> 18 students</span></div><button className="btn primary" onClick={()=>router.push("/classroom")}><Play size={16}/> Start class</button></div></section>
      <section className="panel activity"><div className="panelHead"><h3>Recent activity</h3><button className="textBtn">View all</button></div>{[
        ["AK","Ahmed submitted Assignment #4","10 minutes ago"],
        ["SM","Sara joined Physics 101","32 minutes ago"],
        ["RF","Recording is ready","1 hour ago"],
        ["AB","Ali sent a message","2 hours ago"]
      ].map(x=><div className="activityRow" key={x[1]}><div className="avatar sm">{x[0]}</div><div><b>{x[1]}</b><span>{x[2]}</span></div></div>)}</section>
    </div>
    <section className="sectionBlock"><div className="panelHead"><div><span className="kicker">YOUR CLASSES</span><h2>Keep teaching</h2></div><button className="textBtn" onClick={()=>router.push("/classes")}>See all <ChevronRight size={16}/></button></div><div className="classCards">{classItems.map((c,i)=><article className="classCard" key={c.name} onClick={()=>router.push(i===0?"/classroom":"/classes")}><div className="classTop" style={{background:c.color}}><div className="classGlyph light">{c.name[0]}</div><button className="dots"><MoreHorizontal/></button></div><div className="classContent"><h3>{c.name}</h3><span>{c.subject}</span><div className="classMeta"><span><Users size={14}/>{c.students}</span><span><Clock3 size={14}/>{c.time}</span></div></div></article>)}</div></section>
  </div>
}

function Classes(){
 const router=useRouter();
 return <div className="pageWrap"><div className="titleRow"><div><h1>My classes</h1><p>Manage your active classes and upcoming lessons.</p></div><button className="btn primary" onClick={()=>router.push("/create-class")}><Plus size={17}/> New class</button></div><div className="filterBar"><div className="searchBox"><Search size={16}/><input placeholder="Search classes"/></div><button className="btn soft">All subjects <ChevronDown size={16}/></button></div><div className="classCards big">{classItems.concat([{name:"Biology",subject:"Biology",students:17,time:"11:30 AM",color:"#e59b43"},{name:"English Literature",subject:"English",students:20,time:"9:15 AM",color:"#3988e8"}]).map((c,i)=><article className="classCard" key={c.name}><div className="classTop tall" style={{background:c.color}}><div className="classGlyph light">{c.name[0]}</div><button className="dots"><MoreHorizontal/></button></div><div className="classContent"><span className="subjectTag">{c.subject}</span><h3>{c.name}</h3><div className="classMeta"><span><Users size={14}/>{c.students} students</span><span><Clock3 size={14}/>{c.time}</span></div><button className="btn soft full" onClick={()=>router.push(i===0?"/classroom":"/classes")}>Open class</button></div></article>)}</div></div>
}

function Assignments(){
 return <div className="pageWrap"><div className="titleRow"><div><h1>Assignments</h1><p>Create, track and grade student work.</p></div><button className="btn primary"><Plus size={17}/> Create assignment</button></div><div className="tabbar"><button className="active">All</button><button>Active</button><button>Drafts</button><button>Graded</button></div><div className="table panel"><div className="tableHead"><span>Assignment</span><span>Class</span><span>Submissions</span><span>Due</span><span>Status</span></div>{[
 ["Chapter 4 · Practice Problems","Physics 101","10 / 24","Oct 5","Active"],
 ["Lab Report","Chemistry","5 / 24","Oct 10","Active"],
 ["Research Project","Physics 101","0 / 24","Oct 20","Draft"],
 ["Quiz 2","Mathematics","18 / 24","Oct 12","Active"],
 ].map((r,i)=><div className="tableRow" key={r[0]}><span><span className="fileIcon"><FileText size={16}/></span><b>{r[0]}</b></span><span>{r[1]}</span><span>{r[2]}</span><span>{r[3]}</span><span><i className={r[4]==="Active"?"status active":"status draft"}>{r[4]}</i></span></div>)}</div></div>
}

function Students(){
 return <div className="pageWrap"><div className="titleRow"><div><h1>Students <span className="count">24</span></h1><p>Everyone enrolled across your classes.</p></div><button className="btn primary"><UserPlus size={17}/> Invite students</button></div><div className="filterBar"><div className="searchBox"><Search size={16}/><input placeholder="Search students..."/></div><button className="btn soft">Physics 101 <ChevronDown size={16}/></button></div><div className="table panel studentsTable"><div className="tableHead"><span>Student</span><span>Email</span><span>Status</span><span>Joined</span><span></span></div>{[
 ["Ahmed Khan","ahmed@example.com","Active","Sep 1, 2026"],
 ["Sara Malik","sara@example.com","Active","Sep 1, 2026"],
 ["Ali Bashir","ali@example.com","Active","Sep 2, 2026"],
 ["Fatima Noor","fatima@example.com","Active","Sep 2, 2026"],
 ["Hasan Rehman","hasan@example.com","Inactive","Sep 5, 2026"],
 ["Zara Iqbal","zara@example.com","Active","Sep 5, 2026"],
 ].map((r)=><div className="tableRow" key={r[0]}><span><div className="avatar sm">{r[0].split(" ").map(x=>x[0]).join("")}</div><b>{r[0]}</b></span><span>{r[1]}</span><span><i className={r[2]==="Active"?"status active":"status inactive"}>{r[2]}</i></span><span>{r[3]}</span><span><button className="dots dark"><MoreHorizontal size={18}/></button></span></div>)}</div></div>
}

function Recordings(){
 return <div className="pageWrap"><div className="titleRow"><div><h1>Class recordings</h1><p>Replay past lessons and share them with students.</p></div></div><div className="recordingGrid">{[
 ["Newton's Laws of Motion","Physics 101","58:23","Sep 26, 2026"],
 ["Thermodynamics","Physics 101","1:02:14","Sep 21, 2026"],
 ["Electric Fields","Physics 101","54:10","Sep 14, 2026"],
 ["Exam Review","Physics 101","46:33","Sep 7, 2026"],
 ].map((r,i)=><article className="recordCard" key={r[0]}><div className="recordThumb"><div className="recordVisual"><span>{i+1}</span><Play size={22} fill="white"/></div></div><div className="recordInfo"><span className="kicker">{r[1]}</span><h3>{r[0]}</h3><p>{r[3]} · {r[2]}</p><div><button className="btn soft"><Play size={15}/> Watch</button><button className="iconBtn"><MoreHorizontal size={17}/></button></div></div></article>)}</div></div>
}

function SettingsPage(){
 const [saved,setSaved]=useState(false);
 return <div className="pageWrap"><div className="titleRow"><div><h1>Settings</h1><p>Manage your profile and classroom preferences.</p></div></div><div className="settingsLayout"><div className="settingsNav"><button className="active">Profile</button><button>Notifications</button><button>Privacy</button><button>Preferences</button></div><div className="settingsCard panel"><div className="profileHead"><div className="avatar xxl">SJ</div><div><button className="btn soft">Change photo</button><p>JPG or PNG. Max 2MB.</p></div></div><div className="formGrid"><label>Full name<input defaultValue="Sarah Johnson"/></label><label>Email<input defaultValue="sarah@example.com"/></label><label className="span2">Bio<textarea defaultValue="High school physics teacher with 8 years of experience."/></label></div><button className="btn primary" onClick={()=>{setSaved(true);setTimeout(()=>setSaved(false),1800)}}>{saved?<><CheckCircle2 size={16}/> Saved</>:<>Save changes</>}</button></div></div></div>
}

function CreateClass(){
 const router=useRouter();
 const [code]=useState("PHY-X82KL");
 return <div className="pageWrap"><div className="backline"><button onClick={()=>router.back()} className="iconBtn"><X size={18}/></button><div><h1>Create a new class</h1><p>Set up your class details and invite students.</p></div></div><div className="createGrid"><section className="panel formCard"><label>Class name<input defaultValue="Physics 101"/></label><label>Subject<select defaultValue="Physics"><option>Physics</option><option>Mathematics</option><option>Chemistry</option></select></label><label>Description<textarea placeholder="Write a short class description..."/></label><label>Class code<div className="inputAction"><input value={code} readOnly/><button className="iconBtn" onClick={()=>navigator.clipboard?.writeText(code)}><Copy size={16}/></button></div></label><label className="toggleLine"><div><b>Allow students to join with code</b><span>Anyone with the class code can request access.</span></div><input type="checkbox" defaultChecked/></label><div className="formActions"><button className="btn soft" onClick={()=>router.back()}>Cancel</button><button className="btn primary" onClick={()=>router.push("/classes")}>Create class</button></div></section><aside className="previewCard panel"><span className="kicker">CLASS PREVIEW</span><div className="previewClassTile"><div className="classGlyph">P</div><div><h3>Physics 101</h3><span>Class code</span><b>{code}</b></div></div><div className="emptyStudents"><Users size={28}/><b>No students yet</b><span>Share the class code after creating your class.</span></div></aside></div></div>
}

function Login({signup=false}:{signup?:boolean}){
 const router=useRouter();
 return <div className="authPage"><div className="authLeft"><Logo/><div className="authCard"><span className="kicker">{signup?"GET STARTED":"WELCOME BACK"}</span><h1>{signup?"Create your ClassFlow account":"Log in to ClassFlow"}</h1><p>{signup?"Teach, learn and collaborate from one focused workspace.":"Continue where your classroom left off."}</p>{signup&&<div className="rolePick"><button className="active"><GraduationCap size={18}/> Teacher</button><button><Users size={18}/> Student</button></div>}<label>Email<input placeholder="you@example.com"/></label><label>Password<input type="password" placeholder="••••••••"/></label><button className="btn primary full" onClick={()=>router.push("/dashboard")}>{signup?"Create account":"Log in"}</button><div className="or"><span/>or continue with<span/></div><button className="btn soft full">G&nbsp;&nbsp; Continue with Google</button><p className="authSwitch">{signup?"Already have an account?":"New to ClassFlow?"} <button onClick={()=>router.push(signup?"/login":"/signup")}>{signup?"Log in":"Create account"}</button></p></div></div><div className="authArt"><div className="artGlow"/><div className="authQuote"><div className="quoteIcon"><Sparkles/></div><h2>Better teaching starts with less friction.</h2><p>One place for live classes, resources, attendance and student work.</p><div className="quotePeople">{["SJ","AK","SM"].map(x=><div className="avatar" key={x}>{x}</div>)}<span>+128 learners</span></div></div></div></div>
}

function JoinClass(){
 const router=useRouter();
 const [joined,setJoined]=useState(false);
 return <div className="authPage joinPage"><div className="joinCard panel"><Logo/><div className="joinIcon"><Link2/></div><h1>Join a class</h1><p>Enter the class code provided by your teacher.</p><label>Class code<input defaultValue="PHY-X82KL"/></label><div className="joinedPreview"><div className="classGlyph">P</div><div><b>Physics 101</b><span>Teacher: Sarah Johnson</span><span>18 students</span></div></div><button className="btn primary full" onClick={()=>{setJoined(true);setTimeout(()=>router.push("/classroom"),700)}}>{joined?<><CheckCircle2 size={17}/> Joining...</>:"Join class"}</button></div></div>
}

function Classroom(){
 const [mic,setMic]=useState(true), [cam,setCam]=useState(true), [hand,setHand]=useState(false), [chatOpen,setChatOpen]=useState(true), [share,setShare]=useState(false);
 const [messages,setMessages]=useState([["Sarah","Can everyone hear me?"],["Ahmed","Yes 👍"],["Sara","Loud and clear!"]]);
 const [draft,setDraft]=useState("");
 const send=()=>{if(draft.trim()){setMessages([...messages,["You",draft.trim()]]);setDraft("");}};
 return <div className="classroomPage">
   <header className="classroomTop"><div><Logo/><span className="divider"/><b>Physics 101</b></div><div className="classroomMeta"><span><Clock3 size={14}/> 00:28:15</span><span className="recording"><i/> Recording</span><button className="iconBtn"><MoreHorizontal size={18}/></button></div></header>
   <div className="classroomBody">
     <aside className="roomRail">{[[BookOpen,"Lesson"],[FolderOpen,"Files"],[MessageSquare,"Chat"]].map(([I,t]:any)=><button key={t} className={t==="Lesson"?"active":""}><I size={18}/><span>{t}</span></button>)}</aside>
     <main className="stage">
       <div className="screenArea">
         <div className="slideDeck"><span className="kicker">PHYSICS 101 · LESSON 8</span><h2>Newton&apos;s Laws of Motion</h2><ul><li><b>First law:</b> Objects resist changes in motion.</li><li><b>Second law:</b> Force = mass × acceleration.</li><li><b>Third law:</b> Every action has an equal opposite reaction.</li></ul><div className="formula">F = m × a</div><div className="diagram"><div className="cart"><span/><span/></div><i>→ F</i></div></div>
         <div className="teacherVideo"><div className="videoAvatar">SJ</div><div className="videoBadge">Sarah · Teacher</div><div className="audioBars"><i/><i/><i/></div></div>
       </div>
       <div className="studentTiles">{[["AK","Ahmed"],["SM","Sara"],["AB","Ali"],["FN","Fatima"],["+8","More"]].map((x,i)=><div className="studentVideo" key={x[1]}><div className="avatar lg">{x[0]}</div><span>{x[1]}</span>{i<4&&<Mic size={12}/>}</div>)}</div>
     </main>
     <aside className={chatOpen?"roomPanel":"roomPanel collapsed"}><div className="roomTabs"><button className="active">Participants <span>12</span></button><button>Chat</button><button onClick={()=>setChatOpen(false)} className="closePanel"><X size={16}/></button></div><div className="participants">{["Sarah Johnson","Ahmed Khan","Sara Malik","Ali Bashir","Fatima Noor","Hasan Rehman"].map((n,i)=><div className="person" key={n}><div className="avatar sm">{n.split(" ").map(x=>x[0]).join("")}</div><div><b>{n}</b><span>{i===0?"Teacher":"Student"}</span></div><div className="personIcons">{i===0?<><Mic size={14}/><Video size={14}/></>:<Mic size={14}/>}</div></div>)}</div><div className="chatBox"><div className="chatTitle">Class chat</div><div className="messages">{messages.map((m,i)=><div className="msg" key={i}><b>{m[0]}</b><span>{m[1]}</span></div>)}</div><div className="chatInput"><button><Paperclip size={15}/></button><input value={draft} onChange={e=>setDraft(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()} placeholder="Type a message..."/><button onClick={send}><Send size={15}/></button></div></div></aside>
   </div>
   <footer className="controlBar"><div className="controlGroup"><button className={mic?"control":"control off"} onClick={()=>setMic(!mic)}>{mic?<Mic/>:<MicOff/>}<span>{mic?"Mute":"Unmute"}</span></button><button className={cam?"control":"control off"} onClick={()=>setCam(!cam)}>{cam?<Video/>:<VideoOff/>}<span>{cam?"Stop video":"Start video"}</span></button><button className="control" onClick={()=>setShare(true)}><MonitorUp/><span>Share</span></button><button className={hand?"control active":"control"} onClick={()=>setHand(!hand)}><Hand/><span>Raise hand</span></button><button className="control"><Sparkles/><span>Reactions</span></button><button className="control" onClick={()=>setChatOpen(!chatOpen)}><MessageSquare/><span>Chat</span></button></div><button className="leaveBtn">Leave</button></footer>
   {share&&<div className="modalBackdrop"><div className="shareModal"><div className="modalHead"><div><h3>Choose what to share</h3><p>Select a window, tab, or screen to present.</p></div><button className="iconBtn" onClick={()=>setShare(false)}><X size={18}/></button></div><div className="shareTabs"><button className="active">Entire Screen</button><button>Window</button><button>Browser Tab</button></div><div className="screenChoices">{["Screen 1","Slides","Lesson notes"].map((x,i)=><button className={i===0?"screenChoice active":"screenChoice"} key={x}><div className="screenMock"><MonitorUp size={27}/></div><b>{x}</b><span>{i===0?"Entire screen":"ClassFlow"}</span></button>)}</div><div className="modalActions"><button className="btn soft" onClick={()=>setShare(false)}>Cancel</button><button className="btn primary" onClick={()=>setShare(false)}>Share</button></div></div></div>}
 </div>
}

function Whiteboard(){
 return <div className="whiteboardPage"><header className="whiteTop"><div><Logo/><span className="divider"/><b>Physics 101 · Whiteboard</b></div><button className="btn primary"><Share2 size={16}/> Share</button></header><div className="whiteBody"><aside className="toolRail">{[Menu,PenLine,Square,Wand2,FileText].map((I,i)=><button className={i===1?"active":""} key={i}><I size={19}/></button>)}</aside><div className="canvas"><div className="canvasTitle">Projectile Motion</div><div className="handwriting">y = v₀ sin θ · t − ½gt²</div><div className="graph"><div className="axisX"/><div className="axisY"/><div className="arc"/><span className="dot"/></div></div><aside className="whiteProps"><b>Style</b><span>Stroke</span><div className="swatches">{["#111827","#2563eb","#ef4444","#16a34a","#9333ea"].map(c=><i key={c} style={{background:c}}/>)}</div><span>Width</span><input type="range" min="1" max="10"/></aside></div></div>
}

function Generic({title}:{title:string}){return <div className="pageWrap"><div className="titleRow"><div><h1>{title}</h1><p>This workspace is ready for the next ClassFlow module.</p></div><button className="btn primary"><Plus size={17}/> Add new</button></div><div className="emptyPanel panel"><div className="emptyIcon"><Sparkles/></div><h2>{title} workspace</h2><p>The navigation, layout and interaction system is already connected. Backend data can plug into this page next.</p></div></div>}

function AppPage(){
 const path=usePathname();
 const route=path.split("/")[1] || "dashboard";
 if(route==="login") return <Login/>;
 if(route==="signup") return <Login signup/>;
 if(route==="join") return <JoinClass/>;
 if(route==="classroom") return <Classroom/>;
 if(route==="whiteboard") return <Whiteboard/>;
 const map:any={dashboard:["Dashboard",<Dashboard key="d"/>],classes:["My classes",<Classes key="c"/>],assignments:["Assignments",<Assignments key="a"/>],students:["Students",<Students key="s"/>],recordings:["Recordings",<Recordings key="r"/>],settings:["Settings",<SettingsPage key="st"/>],"create-class":["Create class",<CreateClass key="cc"/>],schedule:["Schedule",<Generic key="sc" title="Schedule"/>],resources:["Resources",<Generic key="re" title="Resources"/>]};
 const [title,component]=map[route] || ["Dashboard",<Dashboard key="d"/>];
 return <div className="appShell"><Sidebar/><div className="appMain"><Topbar title={title}/>{component}</div></div>
}

export default AppPage;
