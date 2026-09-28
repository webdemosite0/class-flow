"use client";

import Link from "next/link";
import { ArrowRight, BookOpen, MonitorUp, Play, ShieldCheck, Sparkles, Users, Video } from "lucide-react";

const features = [
  { icon: Video, title: "Lag-resistant live classes", text: "Built for 10+ students with adaptive video, mic controls and teacher moderation." },
  { icon: MonitorUp, title: "Screen sharing", text: "Share a tab, app window or full screen while keeping student tiles visible." },
  { icon: BookOpen, title: "One classroom workspace", text: "Assignments, attendance, recordings, resources and chat stay together." },
];

export default function Landing() {
  return (
    <main className="landing">
      <nav className="topnav">
        <Link href="/" className="brand"><span className="brandMark">C</span>ClassFlow</Link>
        <div className="navlinks">
          <a href="#features">Features</a><a href="#product">Product</a><a href="#schools">For schools</a>
        </div>
        <div className="navActions">
          <Link href="/login" className="btn ghost">Log in</Link>
          <Link href="/signup" className="btn primary">Get started</Link>
        </div>
      </nav>

      <section className="hero">
        <div className="eyebrow"><Sparkles size={15}/> A calmer way to teach online</div>
        <h1>Teach live. Stay organized.<br/><span>Keep every student engaged.</span></h1>
        <p>ClassFlow gives teachers video classes, screen sharing, chat, whiteboards, attendance and coursework in one focused workspace.</p>
        <div className="heroActions">
          <Link href="/dashboard" className="btn primary lg">Open demo <ArrowRight size={17}/></Link>
          <Link href="/classroom" className="btn soft lg"><Play size={16} fill="currentColor"/> View classroom</Link>
        </div>

        <div className="browserFrame" id="product">
          <div className="browserTop"><span/><span/><span/><div className="address">classflow.app/classroom/physics-101</div></div>
          <div className="classPreview">
            <div className="previewSide">
              <div className="brand mini"><span className="brandMark">C</span>ClassFlow</div>
              {["Overview","Lessons","Files","Assignments","Recordings"].map((x,i)=><div className={i===0?"previewNav active":"previewNav"} key={x}>{x}</div>)}
            </div>
            <div className="previewMain">
              <div className="previewHead"><b>Physics 101</b><span className="liveDot">● Live</span></div>
              <div className="lessonStage">
                <div className="slide">
                  <span className="tinyLabel">TODAY'S TOPIC</span>
                  <h2>Newton&apos;s Laws of Motion</h2>
                  <div className="equation">F = m × a</div>
                  <p>Force equals mass multiplied by acceleration.</p>
                </div>
                <div className="teacherTile">
                  <div className="avatar xl">SJ</div>
                  <b>Sarah Johnson</b><small>Teacher</small>
                </div>
              </div>
              <div className="studentsRow">
                {["AK","SM","AB","HN","ZA"].map(x=><div className="studentMini" key={x}><div className="avatar">{x}</div><span>{x}</span></div>)}
                <div className="studentMini more">+12</div>
              </div>
            </div>
            <div className="previewRight">
              <b>Participants</b>
              {["Sarah Johnson","Ahmed Khan","Sara Malik","Ali Bashir","Fatima Noor"].map((x,i)=><div className="participantMini" key={x}><div className="avatar sm">{x.split(" ").map(y=>y[0]).join("")}</div><span>{x}</span><i>{i===0?"Teacher":"Student"}</i></div>)}
            </div>
          </div>
        </div>
      </section>

      <section className="trust"><span><ShieldCheck size={18}/> Teacher controls</span><span><Users size={18}/> 10+ students</span><span><Video size={18}/> Adaptive video</span><span><MonitorUp size={18}/> Screen share</span></section>

      <section className="features" id="features">
        <div className="sectionIntro"><span>Built for the class itself</span><h2>Everything important, without the clutter.</h2><p>ClassFlow keeps teaching tools close and school admin out of the way during a live lesson.</p></div>
        <div className="featureGrid">{features.map(({icon:Icon,title,text})=><article className="featureCard" key={title}><div className="featureIcon"><Icon/></div><h3>{title}</h3><p>{text}</p></article>)}</div>
      </section>

      <section className="cta" id="schools"><div><span>Ready to teach differently?</span><h2>Start with the classroom your students already understand.</h2></div><Link href="/dashboard" className="btn white lg">Explore the app <ArrowRight size={17}/></Link></section>
    </main>
  );
}
