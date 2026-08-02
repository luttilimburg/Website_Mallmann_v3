import { createFileRoute } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import portrait from "@/assets/Bild_Luitwin_Mallmann.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Luitwin Mallmann" },
      { name: "description", content: "Independent Data Science, AI and BI consultant. 5+ years turning messy data into products people rely on." },
      { property: "og:title", content: "About Luitwin Mallmann" },
      { property: "og:description", content: "Data Scientist, Product Owner and workshop facilitator based in Frankfurt am Main." },
    ],
  }),
  component: About,
});

function About() {
  const { t } = useI18n();
  return (
    <section className="mx-auto max-w-4xl px-4 py-20 sm:px-6">
      <div className="grid gap-10 md:grid-cols-[1fr_1.4fr] md:items-start">
        <div>
          <img src={portrait} alt="Luitwin Mallmann" className="rounded-2xl border border-border object-cover w-full aspect-[4/5]" />
        </div>
        <div>
          <div className="text-xs font-medium uppercase tracking-widest text-brand">About</div>
          <h1 className="mt-2 font-display text-4xl font-semibold text-balance">{t.about.title}</h1>
          <p className="mt-4 text-lg text-muted-foreground text-pretty">{t.about.lead}</p>
          <p className="mt-4 text-foreground/90">{t.about.p1}</p>
          <p className="mt-3 text-foreground/90">{t.about.p2}</p>
          <div className="mt-8 grid grid-cols-2 gap-4">
            {t.about.facts.map((f) => (
              <div key={f.k} className="rounded-xl border border-border bg-card p-4">
                <div className="font-display text-xl font-semibold text-foreground">{f.k}</div>
                <div className="text-xs text-muted-foreground">{f.v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
