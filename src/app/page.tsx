"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

import InfoIcon from "@mui/icons-material/Info";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";

export default function Home() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-center bg-black justify-items-center min-h-screen p-8 pb-20 "
      style={{ fontFamily: "var(--font-geist-sans)" }}>
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start bg-black text-white pt-16 sm:pt-20">
      <div className="mt-5 flex flex-col items-center sm:items-start">
        <img src="../../logo.png" alt="Sip or Spin logo" width={350} height={38} className="mb-4" />
        <h1 className="text-4xl font-bold text-center sm:text-left">
        Welcome to Sip or Spin
        </h1>
        <p className="text-lg text-center sm:text-left">
        Spin the wheel and take on wild challenges that test your skills, luck, and endurance. From trivia and trick shots to hilarious dares, every round keeps the party going—will you conquer the challenge or take a drink?
        </p>
        <div className="flex gap-4 items-center flex-col sm:flex-row mt-4">
        <Link className="rounded-full border border-transparent transition-colors flex items-center justify-center bg-[#383838] text-white hover:bg-[#555] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5" href="/Rules">
          Rules
        </Link>
        <Link className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center bg-[#f2f2f2] text-black hover:bg-[#e0e0e0] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44" href="/CreateGame">
          Spin the Wheel
        </Link>
        </div>
      </div>
      </main>
      
      <footer className="mt-5 row-start-3 flex gap-6 flex-wrap items-center justify-center bg-black text-white">
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
