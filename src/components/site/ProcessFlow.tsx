import { useState } from "react";
import { Compass, Microscope, Cpu, Rocket, Activity } from "lucide-react";

export type Step = {
  n: string;
  t: string;
  d: string;
};

const icons = [Compass, Microscope, Cpu, Rocket, Activity];

export function ProcessFlow({ steps }: { steps: Step[] }) {
  const [active, setActive] = useState(0);
  const current = steps[active];
  const Icon = icons[active % icons.length];

  return (
    <div className="rounded-3xl border border-border bg-card p-6 sm:p-8">
      <div className="relative">
        <div className="absolute left-4 right-4 top-5 hidden h-px bg-border md:block" aria-hidden />
        <div className="relative grid gap-3 md:grid-cols-5">
          {steps.map((s, i) => {
            const SIcon = icons[i % icons.length];
            const isActive = i === active;
            return (
              <button
                key={s.n}
                type="button"
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                className="group flex flex-col items-center gap-2 focus-visible:outline-none"
              >
                <span
                  className={`flex h-10 w-10 items-center justify-center rounded-full border transition ${
                    isActive
                      ? "border-brand bg-brand text-primary-foreground shadow-lg shadow-brand/30"
                      : "border-border bg-background text-muted-foreground group-hover:border-brand/50"
                  }`}
                >
                  <SIcon className="h-4 w-4" />
                </span>
                <span
                  className={`text-center text-xs font-medium transition ${
                    isActive ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {s.n}. {s.t}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-8 grid gap-6 rounded-2xl border border-border bg-surface p-6 md:grid-cols-[auto_1fr] md:items-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <Icon className="h-6 w-6" />
        </div>
        <div>
          <div className="font-mono text-xs font-medium text-brand">Step {current.n}</div>
          <div className="mt-1 font-display text-xl font-semibold">{current.t}</div>
          <p className="mt-2 text-sm text-muted-foreground">{current.d}</p>
        </div>
      </div>
    </div>
  );
}
