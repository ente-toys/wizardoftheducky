"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  size: number;
  hue: number;
  alpha: number;
  alphaDir: number;
};

const COUNT = 120;

function make(w: number, h: number): Particle {
  return {
    x: Math.random() * w,
    y: Math.random() * h,
    z: Math.random(),
    vx: (Math.random() - 0.5) * 0.4,
    vy: (Math.random() - 0.5) * 0.4,
    vz: (Math.random() - 0.5) * 0.004,
    size: Math.random() * 2.5 + 0.5,
    hue: Math.random() * 50 + 30, // gold/amber range
    alpha: Math.random(),
    alphaDir: Math.random() > 0.5 ? 1 : -1,
  };
}

export default function ParticleOverlay() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let particles: Particle[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles = Array.from({ length: COUNT }, () => make(canvas.width, canvas.height));
    };

    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of particles) {
        // 3D perspective scale
        const scale = 0.4 + p.z * 0.6;
        const r = p.size * scale;

        // flicker alpha
        p.alpha += 0.012 * p.alphaDir;
        if (p.alpha >= 1) { p.alpha = 1; p.alphaDir = -1; }
        if (p.alpha <= 0) { p.alpha = 0; p.alphaDir = 1; }

        // move
        p.x += p.vx * scale;
        p.y += p.vy * scale;
        p.z += p.vz;
        if (p.z > 1) p.z = 0;
        if (p.z < 0) p.z = 1;
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;
        if (p.y < -10) p.y = canvas.height + 10;
        if (p.y > canvas.height + 10) p.y = -10;

        // glow effect — two radial gradients
        const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r * 4);
        glow.addColorStop(0, `hsla(${p.hue}, 100%, 85%, ${p.alpha * 0.9})`);
        glow.addColorStop(0.4, `hsla(${p.hue}, 90%, 60%, ${p.alpha * 0.4})`);
        glow.addColorStop(1, `hsla(${p.hue}, 80%, 40%, 0)`);

        ctx.beginPath();
        ctx.arc(p.x, p.y, r * 4, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        // bright core
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 100%, 95%, ${p.alpha})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-20"
    />
  );
}
