import { useEffect, useRef } from "react";

/**
 * Animated neural-network style background: a fixed canvas of drifting nodes
 * connected by lines whose opacity fades with distance. Purely decorative.
 */
export function AIBackground() {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let raf = 0;

    type Node = { x: number; y: number; vx: number; vy: number; r: number };
    let nodes: Node[] = [];

    const brandColor = () => {
      const styles = getComputedStyle(document.documentElement);
      const v = styles.getPropertyValue("--brand").trim();
      return v || "oklch(0.55 0.13 245)";
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const target = Math.min(90, Math.floor((width * height) / 16000));
      nodes = Array.from({ length: target }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.6 + 0.6,
      }));
    };

    const step = () => {
      const color = brandColor();
      ctx.clearRect(0, 0, width, height);
      const maxDist = 140;
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;
      }
      // links
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.hypot(dx, dy);
          if (d < maxDist) {
            const alpha = (1 - d / maxDist) * 0.35;
            ctx.strokeStyle = `color-mix(in oklab, ${color} ${Math.round(alpha * 100)}%, transparent)`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      // nodes
      for (const n of nodes) {
        ctx.fillStyle = `color-mix(in oklab, ${color} 70%, transparent)`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(step);
    };

    resize();
    step();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* animated color blobs */}
      <div className="absolute -top-32 -left-32 h-[520px] w-[520px] rounded-full bg-brand/25 blur-3xl animate-blob" />
      <div className="absolute top-1/3 -right-40 h-[600px] w-[600px] rounded-full bg-primary/20 blur-3xl animate-blob animation-delay-2s" />
      <div className="absolute bottom-0 left-1/3 h-[480px] w-[480px] rounded-full bg-brand/15 blur-3xl animate-blob animation-delay-4s" />
      {/* neural network canvas */}
      <canvas ref={ref} className="absolute inset-0 h-full w-full opacity-70" />
      {/* subtle grid overlay */}
      <div className="absolute inset-0 bg-grid opacity-[0.15] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
    </div>
  );
}
