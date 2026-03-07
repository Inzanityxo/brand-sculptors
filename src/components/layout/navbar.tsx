"use client";

import Link from "next/link";
import { CALENDLY_URL } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { ThemeToggle } from "@/components/shared/theme-toggle";

export function Navbar() {
  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-[850px]">
      <div className="flex items-center justify-between glass rounded-full px-6 py-3 relative overflow-hidden">
        <div className="absolute inset-0 rounded-full border border-white/5 dark:border-white/5 pointer-events-none" />

        <Link
          href="/"
          className="font-sans font-bold text-foreground tracking-tight text-lg relative z-10"
        >
          Brand Sculptors
        </Link>

        <div className="flex items-center gap-4 relative z-10">
          <ThemeToggle />
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonVariants({ size: "sm" }),
              "bg-brand-blue hover:bg-brand-blue/90 text-white rounded-full"
            )}
          >
            Book a Discovery Call
          </a>
        </div>
      </div>
    </nav>
  );
}
