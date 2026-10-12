type Testimonial = {
  quote: string;
  author: string;
  role: string;
};

const defaults: Testimonial[] = [
  { quote: "Luitwin is an excellent instructor. I highly recommend him", author: "Omar", role: "Student Superprof" },
  { quote: "sehr gutes tool, bitte weiter entwickeln", author: "Markus", role: "Sales Agent - User of a PowerBI Dashboard created by me" },
  { quote: "Interaktiver Workshop, sehr gute Referenten", author: "Workshop-Teilnehmende", role: "KI-Workshop" },
  { quote: "Sehr guter und kompetenter Referent, kurzweilig", author: "Workshop-Teilnehmende", role: "KI-Workshop" },
  { quote: "Neue Impressionen und Praxisbeispiele", author: "Workshop-Teilnehmende", role: "KI-Workshop" },
  { quote: "Praktische Übung", author: "Workshop-Teilnehmende", role: "KI-Workshop" },
  { quote: "Praktische Beispiele", author: "Workshop-Teilnehmende", role: "KI-Workshop" },
];

export function TestimonialMarquee({ items = defaults }: { items?: Testimonial[] }) {
  const row = [...items, ...items];
  return (
    <div className="relative overflow-hidden py-4 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <div className="flex w-max gap-4 animate-marquee">
        {row.map((t, i) => (
          <figure
            key={i}
            className="w-[320px] shrink-0 rounded-2xl border border-border bg-card p-5 shadow-sm"
          >
            <blockquote className="text-sm text-foreground/90">“{t.quote}”</blockquote>
            <figcaption className="mt-3 text-xs text-muted-foreground">
              <span className="font-medium text-foreground">{t.author}</span> · {t.role}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
