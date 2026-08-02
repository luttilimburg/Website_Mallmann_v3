import { createFileRoute } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { ProcessFlow } from "@/components/site/ProcessFlow";

export const Route = createFileRoute("/expertise")({
  head: () => ({
    meta: [
      { title: "Expertise — Luitwin Mallmann Data Science" },
      { name: "description", content: "Data Science, Business Intelligence, Cloud and Product Ownership expertise for production AI and forecasting." },
      { property: "og:title", content: "Expertise — Luitwin Mallmann" },
      { property: "og:description", content: "Skills, tools and how I structure engagements." },
    ],
  }),
  component: Expertise,
});

function Expertise() {
  const { t } = useI18n();
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <div className="max-w-3xl">
        <div className="text-xs font-medium uppercase tracking-widest text-brand">Expertise</div>
        <h1 className="mt-2 font-display text-4xl sm:text-5xl font-semibold text-balance">{t.expertise.title}</h1>
        <p className="mt-4 text-lg text-muted-foreground text-pretty">{t.expertise.lead}</p>
      </div>

      <div className="mt-14">
        <h2 className="font-display text-2xl font-semibold">{t.expertise.skillsTitle}</h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          {t.expertise.skills.map((s) => (
            <div key={s.t} className="rounded-2xl border border-border bg-card p-6">
              <h3 className="font-display text-lg font-semibold">{s.t}</h3>
              <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
                {s.items.map((it) => (
                  <li key={it} className="flex gap-2">
                    <span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-brand" /> {it}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-16">
        <h2 className="font-display text-2xl font-semibold">{t.expertise.approachTitle}</h2>
        <div className="mt-6">
          <ProcessFlow steps={t.expertise.approach} />
        </div>
      </div>
    </section>
  );
}
