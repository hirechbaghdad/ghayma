"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { GithubIcon } from "../icons/data-tools-icons";
import { Logo } from "../shared/logo";
import { Button } from "../ui/button";

// --- Sub-component: Live Clock (GMT+1) ---
const LiveClock = () => {
  const [timeStr, setTimeStr] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Calculate GMT+1 (UTC + 1 hour)
      const utc = now.getTime() + now.getTimezoneOffset() * 60000;
      const gmtPlusOne = new Date(utc + 3600000);

      const formatted = gmtPlusOne.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
      setTimeStr(formatted);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000); // Update every second
    return () => clearInterval(interval);
  }, []);

  if (!timeStr) return <span className="opacity-0">00:00</span>;

  return <span>{timeStr} GMT+1</span>;
};

// --- Main Layout Component ---

interface Props {
  children: React.ReactNode;
  image?: string;
  imageAlt?: string;
}

export const OnboardingLayout = ({
  children,
  image = "/login-side.jpg",
  imageAlt = "Atlanexis Cloud Background",
}: Props) => {
  return (
    <div className="relative flex min-h-svh w-full flex-col items-center justify-center overflow-hidden bg-zinc-900 text-white">
      
      {/* 1. Full Width Wallpaper Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src={image}
          alt={imageAlt}
          fill
          className="object-cover object-center"
          priority
        />
        {/* Overlay: Black with 40% opacity to ensure white text is readable */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
      </div>

      {/* 2. Top Left: Logo (Original Size) */}
      <div className="absolute left-6 top-6 z-20 hidden md:block">
        <Link
          href="https://atlanexis.com"
          className="flex items-center gap-4 text-lg font-medium text-white hover:opacity-90 transition-opacity"
        >
          {/* Added text-white to Logo wrapper to ensure SVG inherits white if using currentColor */}
          <div className="text-white">
            <Logo className="size-10" />
          </div>
          Atlanexis Cloud Appliance
        </Link>
      </div>

      {/* 3. Top Right: Social Icons */}
      <div className="absolute right-6 top-6 z-20 flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-white/20 hover:text-white"
          asChild
        >
          <Link href="https://github.com/hirechbaghdad" aria-label="GitHub">
            <GithubIcon className="size-5" />
          </Link>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-white/20 hover:text-white"
          asChild
        >
          <Link href="https://x.com/hirechbaghdad" aria-label="X / Twitter">
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              className="size-5"
            >
              <path d="M10.4883 14.651L15.25 21H22.25L14.3917 10.5223L20.9308 3H18.2808L13.1643 8.88578L8.75 3H1.75L9.26086 13.0145L2.31915 21H4.96917L10.4883 14.651ZM16.25 19L5.75 5H7.75L18.25 19H16.25Z" />
            </svg>
          </Link>
        </Button>
      </div>

      {/* 4. Center: Login Form in Glass Box */}
      <div className="relative z-10 w-full max-w-lg px-4">
        {/* Glassmorphism Card: border, transparency, blur */}
        <div className="flex w-full flex-col justify-center space-y-6 rounded-xl border border-white/20 bg-black/30 p-8 shadow-2xl backdrop-blur-md">
           
           {/* Visible text/headers inside this card (if any) will need to be white. 
               We force input text styles here to ensure contrast against dark glass. */}
           <div className="[&_label]:text-white/90 [&_input]:bg-white/10 [&_input]:border-white/20 [&_input]:text-white [&_input::placeholder]:text-white/50">
             {children}
           </div>
           
        </div>
      </div>

      {/* 5. Bottom Left: Quote (Original Size) */}
      <div className="absolute bottom-6 left-6 z-20 hidden md:block">
        <blockquote className="space-y-2">
          <p className="text-lg text-white">
            &ldquo;The dynamic cloud for your business.&rdquo;
          </p>
        </blockquote>
      </div>

      {/* 6. Bottom Right: Time (GMT+1) */}
      <div className="absolute bottom-6 right-6 z-20 font-mono text-sm font-medium text-white/80">
        <LiveClock />
      </div>

    </div>
  );
};

export default OnboardingLayout;