"use client";

import { useEffect, useState } from "react";

export default function RotateOverlay() {
  const [isPortrait, setIsPortrait] = useState(false);

  useEffect(() => {
    const check = () => setIsPortrait(window.innerHeight > window.innerWidth);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  if (!isPortrait) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-6 bg-black"
      style={{ fontFamily: "var(--font-irish-grover)" }}
    >
      <div
        className="text-5xl"
        style={{ animation: "rotatePhone 2s ease-in-out infinite" }}
      >
        📱
      </div>
      <p className="text-center text-lg px-8" style={{ color: "#FFEBD4", textShadow: "0 0 8px #A88458" }}>
        Rotate your device to landscape to enter the world of the Wizard Ducky
      </p>
      <style>{`
        @keyframes rotatePhone {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(90deg); }
        }
      `}</style>
    </div>
  );
}
