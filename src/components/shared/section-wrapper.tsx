"use client";

import { cn } from "@/lib/utils";

interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  variant?: "default" | "muted";
}

export function SectionWrapper({ children, className, id, variant = "default" }: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={cn(
        "py-[clamp(6rem,12vh,10rem)] px-[clamp(1.5rem,5vw,6rem)] relative z-10",
        variant === "muted" && "bg-muted/50",
        className
      )}
    >
      <div className="max-w-[1200px] mx-auto w-full">{children}</div>
    </section>
  );
}
