"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

import InfoIcon from "@mui/icons-material/Info";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20"
      style={{ fontFamily: "var(--font-geist-sans)" }}>
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start bg-black text-white">
        <div className="bg-[#caa15d] top-0 fixed left-0 w-full flex justify-center py-4">
          <Image src="/logo.jpg" alt="Sip or Spin logo" width={180} height={38} priority />
        </div>
        <h1 className="text-4xl font-bold text-center sm:text-left">
          Welcome to Sip or Spin
        </h1>
        <p className="text-lg text-center sm:text-left">
          Sip or Spin is the ultimate game to ensure a fun-filled night with your friends. Whether you&lsquo;re looking to explore new drinks or take a chance with the spin wheel, you&lsquo;re guaranteed to have a memorable time!
        </p>
        <div className="flex gap-4 items-center flex-col sm:flex-row">
            <Link className="rounded-full border border-transparent transition-colors flex items-center justify-center bg-[#383838] text-white hover:bg-[#555] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5" href="/Rules">
            Rules
            </Link>
            <Link className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center bg-[#f2f2f2] text-black hover:bg-[#e0e0e0] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44" href="/CreateGame">
            Spin the Wheel
            </Link>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center bg-black text-white">
        <a className="flex items-center gap-2 hover:underline hover:underline-offset-4" href="/about" aria-label="About Us">
          <InfoIcon aria-hidden="true" />
          About Us
        </a>
        <a className="flex items-center gap-2 hover:underline hover:underline-offset-4" href="/contact" aria-label="Contact">
          <ContactSupportIcon aria-hidden="true" />
          Contact
        </a>
      </footer>
    </div>
  );
}
