import { createFileRoute } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy — Luitwin Mallmann" },
      {
        name: "description",
        content: "How this site handles your data. No third-party tracking, no ad networks.",
      },
      { property: "og:title", content: "Privacy — Luitwin Mallmann" },
      { property: "og:description", content: "Minimal, GDPR-friendly data handling." },
    ],
  }),
  component: Privacy,
});

function Privacy() {
  const { t, lang } = useI18n();
  return (
    <section className="mx-auto max-w-3xl px-4 py-20 sm:px-6 prose prose-neutral dark:prose-invert">
      <div className="text-xs font-medium uppercase tracking-widest text-brand not-prose">
        Privacy
      </div>
      <h1 className="font-display">{t.privacy.title}</h1>
      <p className="lead">{t.privacy.lead}</p>
      {lang === "de" ? (
        <>
          <h2>Kontaktformular</h2>
          <p>
            Wenn Sie das Kontaktformular nutzen, werden Ihre Angaben per E-Mail über den
            Versanddienst Resend übermittelt. Diese Website speichert die Nachricht nicht in einer
            eigenen Datenbank. Es gibt kein Third-Party-Tracking und keine Werbe-Cookies.
          </p>
          <h2>KI-Assistent</h2>
          <p>
            Der KI-Assistent leitet Ihre Nachrichten an Google Gemini weiter, um eine Antwort zu
            erzeugen. Diese Website speichert den Chat nicht in einer eigenen Datenbank. Bitte geben
            Sie keine sensiblen personenbezogenen Daten in den Chat ein.
          </p>
          <h2>Ihre Rechte</h2>
          <p>
            Sie können jederzeit Auskunft, Löschung oder Berichtigung Ihrer Daten verlangen.
            Kontaktieren Sie hello@luitwin-mallmann.de.
          </p>
        </>
      ) : (
        <>
          <h2>Contact form</h2>
          <p>
            When you use the contact form, your details are delivered by email through Resend. This
            website does not store the message in its own database. There is no third-party tracking
            and no advertising cookies.
          </p>
          <h2>AI concierge</h2>
          <p>
            The AI concierge forwards your messages to Google Gemini to generate an answer. This
            website does not store the chat in its own database. Please don't paste sensitive
            personal data into the chat.
          </p>
          <h2>Your rights</h2>
          <p>
            You can request access, deletion or correction of your data at any time. Email
            hello@luitwin-mallmann.de.
          </p>
        </>
      )}
    </section>
  );
}
