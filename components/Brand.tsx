"use client";
import Link from "next/link";
export default function Brand({compact=false}:{compact?:boolean}){
  return <Link href="/" className={compact?"cf-brand compact":"cf-brand"}><span className="cf-logo"><i/><i/><i/></span>{!compact&&<span>ClassFlow</span>}</Link>
}
