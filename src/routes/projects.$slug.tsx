import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { projects } from "@/lib/projects";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const project = projects.find((p) => p.slug === params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Case study not found" }, { name: "robots", content: "noindex" }] };
    const p = loaderData.project;
    return {
      meta: [
        { title: `${p.title.en} — Luitwin Mallmann` },
        { name: "description", content: p.summary.en },
        { property: "og:title", content: p.title.en },
        { property: "og:description", content: p.summary.en },
        { property: "og:image", content: p.image },
        { name: "twitter:image", content: p.image },
      ],
    };
  },
  notFoundComponent: NotFound,
  component: ProjectDetail,
});

function NotFound() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-24 sm:px-6 text-center">
      <h1 className="font-display text-3xl font-semibold">Case study not found</h1>
      <Button asChild className="mt-6">
        <Link to="/projects">Back to case studies</Link>
      </Button>
    </section>
  );
}

function ProjectDetail() {
  const { project } = Route.useLoaderData();
  const { t, lang } = useI18n();
  return (
    <article className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <Link to="/projects" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> {t.nav.projects}
      </Link>
      <div className="mt-6 inline-flex rounded-full border border-border px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground">{project.chip[lang]}</div>
      <h1 className="mt-3 font-display text-4xl sm:text-5xl font-semibold text-balance">{project.title[lang]}</h1>
      <p className="mt-2 text-muted-foreground">{project.client[lang]}</p>
      <div className="mt-8 overflow-hidden rounded-2xl border border-border bg-card">
        <img src={project.image} alt={project.title[lang]} className="aspect-[16/9] w-full object-cover" />
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {project.metrics.map((m: { k: string; v: { en: string; de: string } }) => (
          <div key={m.k} className="rounded-xl border border-border bg-surface p-5">
            <div className="font-display text-2xl font-semibold text-foreground">{m.k}</div>
            <div className="text-xs text-muted-foreground">{m.v[lang]}</div>
          </div>
        ))}
      </div>
      <div className="mt-10 space-y-8 text-foreground/90 leading-relaxed">
        <Section title={lang === "de" ? "Ausgangslage" : "The problem"} body={project.problem[lang]} />
        <Section title={lang === "de" ? "Vorgehen" : "The approach"} body={project.approach[lang]} />
        <Section title={lang === "de" ? "Ergebnis" : "The outcome"} body={project.outcome[lang]} />
      </div>
      <div className="mt-12 rounded-2xl border border-border bg-primary text-primary-foreground p-8">
        <h2 className="font-display text-2xl font-semibold">{lang === "de" ? "Ähnliche Herausforderung?" : "Working on something similar?"}</h2>
        <p className="mt-2 text-primary-foreground/80">{lang === "de" ? "Buchen Sie 30 Minuten — kostenfrei und unverbindlich." : "Book 30 minutes — free and no strings attached."}</p>
        <Button asChild variant="secondary" className="mt-5">
          <Link to="/contact">{t.cta.schedule}</Link>
        </Button>
      </div>
    </article>
  );
}

function Section({ title, body }: { title: string; body: string }) {
  return (
    <div>
      <h2 className="font-display text-xl font-semibold">{title}</h2>
      <p className="mt-2 text-pretty">{body}</p>
    </div>
  );
}
