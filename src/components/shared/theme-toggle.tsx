"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-[56px] h-[28px]" />;
  }

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative flex items-center w-[56px] h-[28px] rounded-full bg-muted border border-border p-[3px] cursor-pointer transition-colors"
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      <motion.div
        className="w-[22px] h-[22px] rounded-full bg-foreground flex items-center justify-center"
        animate={{ x: isDark ? 26 : 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      >
        {isDark ? (
          <Moon size={12} className="text-background" strokeWidth={2} />
        ) : (
          <Sun size={12} className="text-background" strokeWidth={2} />
        )}
      </motion.div>
    </button>
  );
}
