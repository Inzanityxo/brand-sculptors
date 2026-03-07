"use client";

import Link from "next/link";
import { Instagram, Linkedin } from "lucide-react";
import { SOCIAL_LINKS } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-border py-12 px-[clamp(1.5rem,5vw,6rem)] relative z-10">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <Link
            href="/"
            className="font-sans font-bold text-foreground tracking-tight text-lg"
          >
            Brand Sculptors
          </Link>

          <div className="flex items-center gap-6">
            <a
              href={SOCIAL_LINKS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={20} strokeWidth={1.5} />
            </a>
            <a
              href={SOCIAL_LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} strokeWidth={1.5} />
            </a>
          </div>

          <span className="text-muted-foreground text-small">
            &copy; {new Date().getFullYear()} Brand Sculptors. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}
