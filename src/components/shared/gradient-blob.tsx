"use client";

export function GradientBlobs() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 opacity-20">
      <div className="absolute -top-[10%] -left-[10%] w-[500px] h-[500px] rounded-full bg-blue-100/20 dark:bg-[#1a1850]/50 blur-[120px] animate-blob" />
      <div className="absolute top-[20%] -right-[10%] w-[600px] h-[600px] rounded-full bg-blue-50/15 dark:bg-[#161440]/30 blur-[140px] animate-blob animation-delay-2000" />
      <div className="absolute -bottom-[20%] left-[20%] w-[700px] h-[700px] rounded-full bg-blue-100/20 dark:bg-[#1a1850]/40 blur-[150px] animate-blob animation-delay-4000" />
    </div>
  );
}
