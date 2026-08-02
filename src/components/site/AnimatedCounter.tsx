import { useEffect, useRef, useState } from "react";

type Props = {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
};

export function AnimatedCounter({ end, duration = 1800, prefix = "", suffix = "", decimals = 0 }: Props) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !started.current) {
            started.current = true;
            const start = performance.now();
            const tick = (now: number) => {
              const p = Math.min(1, (now - start) / duration);
              const eased = 1 - Math.pow(1 - p, 3);
              setValue(end * eased);
              if (p < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
          }
        });
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [end, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {value.toFixed(decimals)}
      {suffix}
    </span>
  );
}

export type Stat = {
  end: number;
  prefix?: string;
  suffix?: string;
  label: string;
  decimals?: number;
};

export function StatsGrid({ stats }: { stats: Stat[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
      {stats.map((s) => (
        <div
          key={s.label}
          className="rounded-2xl border border-border bg-card p-6 text-center transition hover:border-brand/50"
        >
          <div className="font-display text-4xl font-semibold gradient-text">
            <AnimatedCounter end={s.end} prefix={s.prefix} suffix={s.suffix} decimals={s.decimals} />
          </div>
          <div className="mt-2 text-sm text-muted-foreground">{s.label}</div>
        </div>
      ))}
    </div>
  );
}
