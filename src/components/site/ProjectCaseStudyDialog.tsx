import { useState, type ReactNode } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import type { Project } from "@/lib/projects";
import { ProjectArtwork } from "@/components/site/ProjectArtwork";

export function ProjectCaseStudyDialog({ project, trigger }: { project: Project; trigger: ReactNode }) {
  const { t, lang } = useI18n();
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto p-0">
        <ProjectArtwork project={project} />
        <div className="p-6 sm:p-8">
          <DialogHeader className="space-y-3 text-left">
            <div className="inline-flex w-fit rounded-full border border-border px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground">
              {project.chip[lang]}
            </div>
            <DialogTitle className="font-display text-2xl sm:text-3xl font-semibold text-balance">
              {project.title[lang]}
            </DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">
              {project.client[lang]}
            </DialogDescription>
          </DialogHeader>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {project.metrics.map((m) => (
              <div key={m.k} className="rounded-xl border border-border bg-surface p-4">
                <div className="font-display text-xl font-semibold text-foreground">{m.k}</div>
                <div className="text-xs text-muted-foreground">{m.v[lang]}</div>
              </div>
            ))}
          </div>

          <div className="mt-8 space-y-6 text-foreground/90 leading-relaxed">
            <Section title={lang === "de" ? "Ausgangslage" : "The problem"} body={project.problem[lang]} />
            <Section title={lang === "de" ? "Vorgehen" : "The approach"} body={project.approach[lang]} />
            <Section title={lang === "de" ? "Ergebnis" : "The outcome"} body={project.outcome[lang]} />
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild>
              <Link to="/contact" onClick={() => setOpen(false)}>{t.cta.schedule}</Link>
            </Button>
            <Button variant="outline" onClick={() => setOpen(false)}>
              {lang === "de" ? "Schließen" : "Close"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function Section({ title, body }: { title: string; body: string }) {
  return (
    <div>
      <h3 className="font-display text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-pretty">{body}</p>
    </div>
  );
}
