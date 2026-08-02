import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowRight, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useI18n } from "@/lib/i18n";
import { aiCheckQuestions, scoreLevel } from "@/lib/ai-check-questions";

export const Route = createFileRoute("/ai-check")({
  head: () => ({
    meta: [
      { title: "AI Infrastructure Check — Luitwin Mallmann" },
      { name: "description", content: "A 2-minute assessment to score your organisation's AI readiness across data, governance, infrastructure and culture." },
      { property: "og:title", content: "AI Infrastructure Check" },
      { property: "og:description", content: "Score your organisation's AI readiness in 2 minutes." },
    ],
  }),
  component: AICheck,
});

function AICheck() {
  const { t, lang } = useI18n();
  const [started, setStarted] = useState(false);
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const total = aiCheckQuestions.length;
  const done = idx >= total;
  const current = aiCheckQuestions[idx];

  const { pct, byDim } = useMemo(() => {
    const values = Object.values(answers);
    const sum = values.reduce((a, b) => a + b, 0);
    const max = Object.keys(answers).length * 2 || 1;
    const dims: Record<string, { sum: number; max: number }> = {};
    for (const q of aiCheckQuestions) {
      dims[q.dimension] ??= { sum: 0, max: 0 };
      if (answers[q.id] !== undefined) {
        dims[q.dimension].sum += answers[q.id];
        dims[q.dimension].max += 2;
      }
    }
    return { pct: sum / max, byDim: dims };
  }, [answers]);

  const level = scoreLevel(pct, lang);

  if (!started) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-24 sm:px-6 text-center">
        <div className="text-xs font-medium uppercase tracking-widest text-brand">AI Check</div>
        <h1 className="mt-2 font-display text-4xl sm:text-5xl font-semibold text-balance">{t.aiCheck.title}</h1>
        <p className="mt-4 text-lg text-muted-foreground text-pretty">{t.aiCheck.lead}</p>
        <Button size="lg" className="mt-8" onClick={() => setStarted(true)}>
          {t.aiCheck.start} <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </section>
    );
  }

  if (done) {
    const dimLabels: Record<string, { en: string; de: string }> = {
      data: { en: "Data", de: "Daten" },
      governance: { en: "Governance", de: "Governance" },
      infra: { en: "Infrastructure", de: "Infrastruktur" },
      culture: { en: "Culture", de: "Kultur" },
    };
    return (
      <section className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
        <div className="text-xs font-medium uppercase tracking-widest text-brand">{t.aiCheck.resultTitle}</div>
        <h1 className="mt-2 font-display text-4xl sm:text-5xl font-semibold">{Math.round(pct * 100)} / 100</h1>
        <p className="mt-3 text-lg font-medium">{level.label}</p>
        <p className="mt-2 text-muted-foreground">{level.advice}</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {Object.entries(byDim).map(([k, v]) => {
            const p = Math.round((v.sum / v.max) * 100);
            return (
              <div key={k} className="rounded-2xl border border-border bg-card p-5">
                <div className="flex items-center justify-between">
                  <div className="font-display text-base font-semibold">{dimLabels[k][lang]}</div>
                  <div className="text-sm text-muted-foreground">{p}%</div>
                </div>
                <Progress value={p} className="mt-3" />
              </div>
            );
          })}
        </div>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button asChild size="lg">
            <Link to="/contact">{t.aiCheck.contactCta}</Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => {
              setAnswers({});
              setIdx(0);
              setStarted(false);
            }}
          >
            <RotateCcw className="mr-2 h-4 w-4" /> {t.aiCheck.restart}
          </Button>
        </div>
      </section>
    );
  }

  const answered = answers[current.id];
  return (
    <section className="mx-auto max-w-2xl px-4 py-20 sm:px-6">
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>{idx + 1} / {total}</span>
        <span className="uppercase tracking-widest">{current.dimension}</span>
      </div>
      <Progress value={((idx) / total) * 100} className="mt-2" />
      <h2 className="mt-8 font-display text-2xl sm:text-3xl font-semibold text-balance">{current.q[lang]}</h2>
      <div className="mt-6 space-y-3">
        {current.options.map((o, i) => {
          const selected = answered === o.score;
          return (
            <button
              key={i}
              onClick={() => setAnswers((a) => ({ ...a, [current.id]: o.score }))}
              className={`w-full text-left rounded-2xl border p-4 transition ${
                selected ? "border-brand bg-brand/10" : "border-border bg-card hover:border-brand/50"
              }`}
            >
              <span className="text-sm">{o.label[lang]}</span>
            </button>
          );
        })}
      </div>
      <div className="mt-8 flex justify-between">
        <Button variant="ghost" disabled={idx === 0} onClick={() => setIdx((i) => i - 1)}>
          {t.aiCheck.back}
        </Button>
        <Button disabled={answered === undefined} onClick={() => setIdx((i) => i + 1)}>
          {idx === total - 1 ? t.aiCheck.submit : t.aiCheck.next}
        </Button>
      </div>
    </section>
  );
}
