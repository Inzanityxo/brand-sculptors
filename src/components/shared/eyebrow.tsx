import { cn } from "@/lib/utils";

interface EyebrowProps {
  children: React.ReactNode;
  className?: string;
}

export function Eyebrow({ children, className }: EyebrowProps) {
  return (
    <span
      className={cn(
        "block font-sans font-bold text-brand-blue text-xs uppercase tracking-[0.1em] mb-4",
        className
      )}
    >
      {children}
    </span>
  );
}
