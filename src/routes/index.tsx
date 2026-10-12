import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Brain, LineChart, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";
import { clientLogos, projects } from "@/lib/projects";
import { ProjectCaseStudyDialog } from "@/components/site/ProjectCaseStudyDialog";
import { StatsGrid, type Stat } from "@/components/site/AnimatedCounter";
import { ScrambleText } from "@/components/site/ScrambleText";
import { TiltCard } from "@/components/site/TiltCard";
import { TestimonialMarquee } from "@/components/site/TestimonialMarquee";
import portrait from "@/assets/WhatsApp Image 2026-08-02 at 15.04.08.jpeg";

export const Route = createFileRoute("/")({
  component: Home,
});

const stack = ["Python", "Machine Learning", "Power BI", "Qlik", "Tableau", "R", "SQL", "Forecasting", "Azure", "Databricks", "MicroStrategy"];
const serviceIcons = [Brain, LineChart, ShieldCheck];
const stats: Stat[] = [
  { end: 40, suffix: "+", label: "dashboards delivered" },
  { end: 4, suffix: "+", label: "Machine Learning projects guided" },
  { end: 60, suffix: "+", label: "training hours provided" },
  { end: 5, suffix: "+", label: "Years in data & AI" },];

function Home() {
  const { t, lang } = useI18n();
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-40 [mask-image:radial-gradient(ellipse_at_top,black_20%,transparent_75%)]" aria-hidden />
        <div className="absolute inset-0 bg-radial-brand" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-4 pt-20 pb-24 sm:px-6 sm:pt-28 sm:pb-32">
          <div className="grid gap-14 lg:grid-cols-[1.35fr_1fr] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur">
                <Sparkles className="h-3.5 w-3.5 text-brand" />
                {t.home.kicker}
              </div>
              <h1 className="mt-6 font-display text-4xl sm:text-5xl md:text-6xl font-semibold text-balance leading-[1.05] text-foreground">
                {t.home.title.split(" ").slice(0, -3).join(" ")}{" "}
                <span className="gradient-text">
                  <ScrambleText text={t.home.title.split(" ").slice(-3).join(" ")} />
                </span>
              </h1>
              <p className="mt-6 max-w-xl text-lg text-muted-foreground text-pretty">{t.home.subtitle}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild size="lg">
                  <Link to="/contact">
                    {t.cta.schedule} <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link to="/ai-check">{t.cta.startCheck}</Link>
                </Button>
              </div>
              <div className="mt-10">
                <div className="text-xs font-medium uppercase tracking-widest text-muted-foreground">{t.home.stack}</div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {stack.map((s) => (
                    <span key={s} className="rounded-full border border-border bg-background/60 px-3 py-1 text-xs font-medium text-muted-foreground">{s}</span>
                  ))}
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-6 rounded-3xl bg-gradient-to-br from-brand/25 via-primary/15 to-transparent blur-2xl" aria-hidden />
              <div className="relative overflow-hidden rounded-3xl border border-border bg-card shadow-xl">
                <img src={portrait} alt="Luitwin Mallmann" className="aspect-[4/5] w-full object-cover" />
                <div className="p-5">
                  <div className="font-display text-lg font-semibold">Luitwin Mallmann</div>
                  <div className="text-sm text-muted-foreground">Data Science · AI · BI · Product Ownership</div>
                  <div className="mt-1 text-xs text-muted-foreground">{t.common.basedIn}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Client logos */}
      <section className="border-y border-border bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-4">
            {clientLogos.map((l) => (
              <div key={l.name} className="flex h-14 items-center justify-center rounded-xl bg-white px-5 shadow-sm ring-1 ring-border">
                <img src={l.url} alt={l.name} className="h-8 w-auto object-contain" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <StatsGrid stats={stats} />
      </section>

      {/* Projects */}
      <section className="mx-auto max-w-7xl px-4 pt-8 pb-24 sm:px-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="text-xs font-medium uppercase tracking-widest text-brand">{t.home.projectsTitle}</div>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl font-semibold text-balance">{t.home.projectsSub}</h2>
          </div>
          <Link to="/projects" className="text-sm font-medium text-foreground hover:text-brand inline-flex items-center gap-1">
            {t.cta.readMore} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {projects.map((p) => (
            <TiltCard key={p.slug}>
              <ProjectCaseStudyDialog
                project={p}
                trigger={
                  <button
                    type="button"
                    className="group relative z-10 block w-full text-left overflow-hidden rounded-2xl border border-border bg-card transition-shadow hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                  >
                    <div className="aspect-[16/9] overflow-hidden bg-muted">
                      <img src={p.image} alt={p.title[lang]} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                    </div>
                    <div className="p-6">
                      <div className="inline-flex rounded-full border border-border px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground">{p.chip[lang]}</div>
                      <h3 className="mt-3 font-display text-xl font-semibold">{p.title[lang]}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{p.client[lang]}</p>
                      <p className="mt-3 text-sm text-foreground/80">{p.summary[lang]}</p>
                    </div>
                  </button>
                }
              />
            </TiltCard>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="border-t border-border bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
          <div className="max-w-2xl">
            <div className="text-xs font-medium uppercase tracking-widest text-brand">{t.home.servicesTitle}</div>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl font-semibold text-balance">{t.home.servicesSub}</h2>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {t.home.services.map((s, i) => {
              const Icon = serviceIcons[i] ?? Brain;
              return (
                <div key={s.t} className="group rounded-2xl border border-border bg-card p-6 transition hover:border-brand/50">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-semibold">{s.t}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <div className="mb-8 text-center">
            <div className="text-xs font-medium uppercase tracking-widest text-brand">What clients say</div>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl font-semibold text-balance">Trusted for pragmatic AI delivery</h2>
          </div>
          <TestimonialMarquee />
        </div>
      </section>

      {/* AI Check CTA */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-primary text-primary-foreground p-10 sm:p-14">
          <div className="absolute inset-0 bg-radial-brand opacity-70" aria-hidden />
          <div className="relative grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-center">
            <div>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold text-balance">{t.home.ctaTitle}</h2>
              <p className="mt-3 text-primary-foreground/80">{t.home.ctaSub}</p>
            </div>
            <div className="flex md:justify-end">
              <Button asChild size="lg" variant="secondary">
                <Link to="/ai-check">
                  {t.cta.startCheck} <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
