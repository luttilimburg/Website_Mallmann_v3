import type { Project } from "@/lib/projects";

export function ProjectArtwork({ project }: { project: Project }) {
  const hasSeparateLogo = project.slug === "ai-infrastructure-workshop" && project.clientLogo;

  return (
    <div className="overflow-hidden bg-muted">
      <div className="aspect-[16/9] overflow-hidden">
        <img
          src={project.image}
          alt={project.title.en}
          className={`h-full w-full object-cover ${hasSeparateLogo ? "origin-top scale-105 object-top" : ""}`}
        />
      </div>
      {hasSeparateLogo && (
        <div className="flex h-16 items-center justify-center border-t border-border bg-white px-6">
          <img src={project.clientLogo} alt="Zukunftszentrum KI NRW" className="h-10 max-w-full object-contain" />
        </div>
      )}
    </div>
  );
}