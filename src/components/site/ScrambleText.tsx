import { useEffect, useState } from "react";

const CHARS = "!<>-_\\/[]{}—=+*^?#________";

type Props = {
  text: string;
  duration?: number;
  className?: string;
};

export function ScrambleText({ text, duration = 1200, className }: Props) {
  const [out, setOut] = useState(text);

  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const finalChars = text.split("");
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const revealed = Math.floor(p * finalChars.length);
      const next = finalChars
        .map((c, i) => {
          if (i < revealed || c === " ") return c;
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join("");
      setOut(next);
      if (p < 1) raf = requestAnimationFrame(tick);
      else setOut(text);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [text, duration]);

  return <span className={className}>{out}</span>;
}
