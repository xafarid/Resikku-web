"use client";

import { useEffect, useState } from "react";

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? Math.min((scrollTop / docHeight) * 100, 100) : 0);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[70] h-[3px] pointer-events-none"
      aria-hidden
    >
      <div
        className="h-full bg-gradient-to-r from-sage via-gold to-sage-light transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
      {/* Glow effect at the tip */}
      {progress > 0 && progress < 100 && (
        <div
          className="absolute top-0 h-full w-8 bg-gradient-to-r from-transparent via-gold/60 to-transparent blur-sm"
          style={{ left: `${progress}%`, transform: "translateX(-50%)" }}
        />
      )}
    </div>
  );
}
