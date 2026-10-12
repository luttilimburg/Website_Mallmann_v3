import { createFileRoute } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { projects } from "@/lib/projects";
import { ProjectCaseStudyDialog } from "@/components/site/ProjectCaseStudyDialog";
import { ProjectArtwork } from "@/components/site/ProjectArtwork";

export const Route = createFileRoute("/projects/")({
  head: () => ({
    meta: [
      { title: "Case Studies — Luitwin Mallmann" },
      { name: "description", content: "Data Science, AI and BI case studies across aviation, education and the Mittelstand." },
      { property: "og:title", content: "Case Studies — Luitwin Mallmann" },
      { property: "og:description", content: "Selected client engagements and outcomes." },
    ],
  }),
  component: Projects,
});

function Projects() {
  const { t, lang } = useI18n();
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
      <div className="max-w-2xl">
        <div className="text-xs font-medium uppercase tracking-widest text-brand">Case studies</div>
        <h1 className="mt-2 font-display text-4xl sm:text-5xl font-semibold text-balance">{t.projects.title}</h1>
        <p className="mt-4 text-lg text-muted-foreground text-pretty">{t.projects.lead}</p>
      </div>
      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {projects.map((p) => (
          <ProjectCaseStudyDialog
            key={p.slug}
            project={p}
            trigger={
              <button
                type="button"
                className="group relative z-10 block w-full text-left rounded-2xl border border-border bg-card overflow-hidden hover:shadow-xl transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
              >
                <ProjectArtwork project={p} />
                <div className="p-6">
                  <div className="inline-flex rounded-full border border-border px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground">{p.chip[lang]}</div>
                  <h2 className="mt-3 font-display text-xl font-semibold">{p.title[lang]}</h2>
                  <p className="mt-1 text-sm text-muted-foreground">{p.client[lang]}</p>
                  <p className="mt-3 text-sm text-foreground/80">{p.summary[lang]}</p>
                </div>
              </button>
            }
          />
        ))}
      </div>
    </section>
  );
}
