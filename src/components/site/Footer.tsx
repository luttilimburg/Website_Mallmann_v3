import { Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";

export function Footer() {
  const { t } = useI18n();
  return (
    <footer className="border-t border-border/70 bg-surface mt-24">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-10 sm:px-6 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="font-display text-base font-semibold">Luitwin Mallmann</div>
          <div className="text-sm text-muted-foreground">{t.footer.tagline}</div>
        </div>
        <div className="flex items-center gap-6 text-sm">
          <Link to="/privacy" className="text-muted-foreground hover:text-foreground">{t.footer.privacy}</Link>
          <Link to="/contact" className="text-muted-foreground hover:text-foreground">{t.nav.contact}</Link>
          <span className="text-muted-foreground">© {new Date().getFullYear()} · {t.footer.rights}</span>
        </div>
      </div>
    </footer>
  );
}
