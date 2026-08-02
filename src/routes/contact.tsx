import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useI18n } from "@/lib/i18n";
import { CUSTOMER_CONTACT_EMAIL } from "@/lib/contact";
import { CalendlyEmbed, CALENDLY_URL } from "@/components/site/CalendlyEmbed";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Luitwin Mallmann" },
      {
        name: "description",
        content:
          "Book a free 30-minute call with Luitwin Mallmann to discuss your Data Science, AI or BI challenge.",
      },
      { property: "og:title", content: "Contact Luitwin Mallmann" },
      {
        property: "og:description",
        content: "Book a free 30-minute call about your data challenge.",
      },
    ],
  }),
  component: Contact,
});

function Contact() {
  const { t } = useI18n();
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "", website: "" });

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");

    try {
      const response = await fetch("/api/public/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) throw new Error("Contact request failed");

      setStatus("sent");
      setForm({ name: "", email: "", company: "", message: "", website: "" });
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="mx-auto max-w-5xl px-4 py-20 sm:px-6">
      <div className="grid gap-14 md:grid-cols-[1.2fr_1fr]">
        <div>
          <div className="text-xs font-medium uppercase tracking-widest text-brand">Contact</div>
          <h1 className="mt-2 font-display text-4xl sm:text-5xl font-semibold text-balance">
            {t.contact.title}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground text-pretty">{t.contact.lead}</p>

          <div className="mt-8 space-y-3 text-sm">
            <div className="flex items-center gap-3 text-muted-foreground">
              <MapPin className="h-4 w-4 text-brand" /> Frankfurt am Main, Germany
            </div>
            <div className="flex items-center gap-3 text-muted-foreground">
              <Mail className="h-4 w-4 text-brand" /> {CUSTOMER_CONTACT_EMAIL}
            </div>
          </div>
        </div>

        <form
          onSubmit={onSubmit}
          className="rounded-2xl border border-border bg-card p-6 space-y-4"
        >
          <div>
            <Label htmlFor="name">{t.contact.name}</Label>
            <Input
              id="name"
              required
              maxLength={100}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="email">{t.contact.email}</Label>
            <Input
              id="email"
              type="email"
              required
              maxLength={254}
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="company">{t.contact.company}</Label>
            <Input
              id="company"
              maxLength={120}
              value={form.company}
              onChange={(e) => setForm({ ...form, company: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="message">{t.contact.message}</Label>
            <Textarea
              id="message"
              required
              minLength={10}
              maxLength={5000}
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
            />
          </div>

          <div className="absolute -left-[9999px]" aria-hidden="true">
            <Label htmlFor="website">Website</Label>
            <Input
              id="website"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              value={form.website}
              onChange={(e) => setForm({ ...form, website: e.target.value })}
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={status === "sending" || status === "sent"}
          >
            <Send className="mr-2 h-4 w-4" /> {status === "sent" ? "✓" : t.cta.send}
          </Button>
          <div aria-live="polite">
            {status === "sent" && <p className="text-sm text-brand">{t.contact.success}</p>}
            {status === "error" && <p className="text-sm text-destructive">{t.contact.error}</p>}
          </div>
        </form>
      </div>

      <div className="mt-20">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="text-xs font-medium uppercase tracking-widest text-brand">
              Book a call
            </div>
            <h2 className="mt-2 font-display text-2xl sm:text-3xl font-semibold">
              {t.cta.schedule}
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              30 minutes, free and no strings attached.
            </p>
          </div>
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noreferrer"
            className="text-sm font-medium text-brand hover:underline"
          >
            Open in new tab ↗
          </a>
        </div>
        <div className="mt-6">
          <CalendlyEmbed />
        </div>
      </div>
    </section>
  );
}
