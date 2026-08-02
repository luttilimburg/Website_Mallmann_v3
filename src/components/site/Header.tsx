import { Link } from "@tanstack/react-router";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";
import { useTheme } from "@/lib/theme";
import logo from "@/assets/Luitwin_Mallmann_data_science_logo.png";

const navPaths = [
  { key: "expertise", to: "/expertise" as const },
  { key: "projects", to: "/projects" as const },
  { key: "aiCheck", to: "/ai-check" as const },
  { key: "about", to: "/about" as const },
  { key: "contact", to: "/contact" as const },
] as const;

export function Header() {
  const { t, lang, setLang } = useI18n();
  const { theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2 group">
          <img src={logo} alt="Luitwin Mallmann Data Science" className="h-9 w-auto" />
          <span className="hidden sm:inline font-display text-[15px] font-semibold tracking-tight text-foreground">
            Luitwin Mallmann
          </span>
        </Link>
        <nav className="hidden lg:flex items-center gap-1">
          {navPaths.map((n) => (
            <Link
              key={n.key}
              to={n.to}
              className="px-3 py-2 text-sm font-medium text-muted-foreground rounded-md hover:text-foreground hover:bg-accent/60 transition"
              activeProps={{ className: "text-foreground" }}
            >
              {t.nav[n.key]}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-1.5">
          <div className="hidden sm:flex items-center rounded-full border border-border p-0.5 text-xs font-medium">
            <button
              onClick={() => setLang("en")}
              className={`px-2.5 py-1 rounded-full transition ${lang === "en" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
              aria-pressed={lang === "en"}
            >EN</button>
            <button
              onClick={() => setLang("de")}
              className={`px-2.5 py-1 rounded-full transition ${lang === "de" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
              aria-pressed={lang === "de"}
            >DE</button>
          </div>
          <Button variant="ghost" size="icon" onClick={toggle} aria-label="Toggle theme">
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
          <Button asChild className="hidden md:inline-flex">
            <Link to="/contact">{t.cta.schedule}</Link>
          </Button>
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setOpen((v) => !v)} aria-label="Menu">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>
      {open && (
        <div className="lg:hidden border-t border-border bg-background">
          <nav className="mx-auto flex max-w-7xl flex-col px-4 py-3 sm:px-6">
            {navPaths.map((n) => (
              <Link
                key={n.key}
                to={n.to}
                onClick={() => setOpen(false)}
                className="py-2 text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                {t.nav[n.key]}
              </Link>
            ))}
            <div className="mt-2 flex items-center gap-2 sm:hidden">
              <button
                onClick={() => setLang("en")}
                className={`px-2.5 py-1 rounded-full text-xs border ${lang === "en" ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground"}`}
              >EN</button>
              <button
                onClick={() => setLang("de")}
                className={`px-2.5 py-1 rounded-full text-xs border ${lang === "de" ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground"}`}
              >DE</button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
