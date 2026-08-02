import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { CUSTOMER_CONTACT_EMAIL } from "@/lib/contact";

export type Lang = "en" | "de";

type Dict = typeof en;

const en = {
  nav: { home: "Home", expertise: "Expertise", projects: "Projects", aiCheck: "AI Check", blog: "Insights", about: "About", contact: "Contact" },
  cta: { schedule: "Schedule first call", startCheck: "Start the AI Check", readMore: "Read more", send: "Send message" },
  common: { language: "Language", theme: "Theme", basedIn: "Frankfurt am Main · Remote across the EU" },
  home: {
    kicker: "Data Science · AI · Business Intelligence",
    title: "Turning data into decisions your business can bet on.",
    subtitle: "I'm Luitwin Mallmann — an independent Data Science, AI and BI consultant helping teams move from dashboards to production-grade AI and forecasting.",
    stack: "Working stack",
    projectsTitle: "Selected projects",
    projectsSub: "Real engagements. Real outcomes. Click any card to open the case study.",
    servicesTitle: "How I can help",
    servicesSub: "Three ways of working, one goal: measurable decisions.",
    services: [
      { t: "AI & Forecasting", d: "Production-ready models for demand, pricing, service planning and time-series forecasting." },
      { t: "Business Intelligence", d: "Power BI, MicroStrategy and Tableau — from data model to executive dashboard." },
      { t: "AI Governance & Enablement", d: "Workshops, data governance and infrastructure reviews to make AI adoption safe and effective." },
    ],
    ctaTitle: "Not sure where to start? Take the AI Infrastructure Check.",
    ctaSub: "A 2-minute assessment. Get a personalised readiness score and a clear next step.",
  },
  about: {
    title: "About Luitwin",
    lead: "5+ years turning messy data into products people rely on — from air-cargo pricing at Lufthansa Cargo to AI-governance workshops for German SMEs.",
    p1: "I'm a Data Scientist and Product Owner based in Frankfurt am Main. My work sits between engineering and business: I build the models and the dashboards, but I also run the workshops, the roadmap and the stakeholder conversations that make them stick.",
    p2: "I've worked with corporates (Lufthansa Cargo), research institutions (Utrecht University, Zukunftszentrum KI NRW) and Mittelstand teams. What they share: the belief that data should change decisions, not just describe them.",
    facts: [
      { k: "5+ yrs", v: "Data Science & BI experience" },
      { k: "EN / DE", v: "Native-level fluency" },
      { k: "SAFe / Agile", v: "Product Owner mindset" },
      { k: "Azure / Databricks", v: "Cloud-native delivery" },
    ],
  },
  expertise: {
    title: "Expertise",
    lead: "Data Science, Business Intelligence and Product Ownership focused on measurable decisions rather than dashboards alone.",
    skillsTitle: "Skills",
    skills: [
      { t: "Data Science", items: ["Python, R, SQL", "Machine Learning & Forecasting", "Transformer time-series models", "Statistics & experimentation"] },
      { t: "Business Intelligence", items: ["Power BI, MicroStrategy, Tableau", "Data modeling & DAX", "Executive dashboarding", "Forecast monitoring"] },
      { t: "Cloud & Data Platform", items: ["Azure, Databricks", "Data governance & lineage", "MLOps foundations", "Cost-aware architecture"] },
      { t: "Product Ownership", items: ["SAFe / Scrum", "Stakeholder management", "Roadmapping & prioritisation", "Workshop facilitation"] },
    ],
    approachTitle: "How I structure engagements",
    approach: [
      { n: "01", t: "Understand", d: "Clarify goals, data landscape, stakeholders and the decision context." },
      { n: "02", t: "Build", d: "Develop analytics, models, dashboards or data products pragmatically." },
      { n: "03", t: "Embed", d: "Communicate results clearly and integrate them into business processes." },
    ],
  },
  projects: {
    title: "Case studies",
    lead: "A selection of client work across aviation, education and the Mittelstand.",
  },
  aiCheck: {
    title: "AI Infrastructure Check",
    lead: "A short, honest assessment of how ready your organisation is for production AI. Ten questions, two minutes, one clear next step.",
    start: "Start the check",
    next: "Next",
    back: "Back",
    submit: "See my score",
    restart: "Start over",
    resultTitle: "Your AI-readiness score",
    resultSub: "Based on your answers across data, governance, culture and infrastructure.",
    contactCta: "Book a call to discuss the results",
  },
  blog: {
    title: "Insights",
    lead: "Short, opinionated notes on forecasting, AI governance and getting real value from BI.",
  },
  contact: {
    title: "Let's talk",
    lead: "Tell me about your data challenge. I read every message myself and reply within two business days.",
    name: "Name",
    email: "Email",
    company: "Company",
    message: "How can I help?",
    success: "Thanks — your message is on its way. I'll be in touch shortly.",
    error: `Something went wrong. Please email ${CUSTOMER_CONTACT_EMAIL} directly.`,
  },
  privacy: {
    title: "Privacy",
    lead: "This site collects only what it needs to answer your enquiry. No third-party tracking, no ad networks.",
  },
  footer: {
    tagline: "Data Science · AI · Business Intelligence — Frankfurt am Main",
    imprint: "Imprint",
    privacy: "Privacy",
    rights: "All rights reserved.",
  },
};

const de: Dict = {
  nav: { home: "Start", expertise: "Expertise", projects: "Projekte", aiCheck: "KI-Check", blog: "Insights", about: "Über mich", contact: "Kontakt" },
  cta: { schedule: "Erstgespräch buchen", startCheck: "KI-Check starten", readMore: "Mehr lesen", send: "Nachricht senden" },
  common: { language: "Sprache", theme: "Design", basedIn: "Frankfurt am Main · EU-weit remote" },
  home: {
    kicker: "Data Science · KI · Business Intelligence",
    title: "Aus Daten werden Entscheidungen, auf die man bauen kann.",
    subtitle: "Ich bin Luitwin Mallmann — unabhängiger Berater für Data Science, KI und BI. Ich helfe Teams, von Dashboards zu produktionsreifer KI und Forecasting zu kommen.",
    stack: "Tech-Stack",
    projectsTitle: "Ausgewählte Projekte",
    projectsSub: "Reale Projekte. Reale Ergebnisse. Klicken Sie eine Karte für die Case Study.",
    servicesTitle: "So kann ich helfen",
    servicesSub: "Drei Arbeitsweisen, ein Ziel: messbare Entscheidungen.",
    services: [
      { t: "KI & Forecasting", d: "Produktionsreife Modelle für Nachfrage, Pricing, Serviceplanung und Zeitreihen-Prognose." },
      { t: "Business Intelligence", d: "Power BI, MicroStrategy und Tableau — vom Datenmodell bis zum Vorstands-Dashboard." },
      { t: "KI-Governance & Enablement", d: "Workshops, Data Governance und Infrastruktur-Reviews für sichere KI-Einführung." },
    ],
    ctaTitle: "Nicht sicher, wo anfangen? Machen Sie den KI-Infrastruktur-Check.",
    ctaSub: "2 Minuten Assessment. Persönlicher Readiness-Score und ein klarer nächster Schritt.",
  },
  about: {
    title: "Über Luitwin",
    lead: "5+ Jahre Erfahrung darin, aus chaotischen Daten Produkte zu machen, auf die sich Menschen verlassen — von Air-Cargo Pricing bei Lufthansa Cargo bis zu KI-Governance-Workshops für deutsche KMU.",
    p1: "Ich bin Data Scientist und Product Owner in Frankfurt am Main. Meine Arbeit sitzt zwischen Engineering und Business: Ich baue Modelle und Dashboards, moderiere aber auch Workshops, Roadmaps und Stakeholder-Gespräche.",
    p2: "Ich arbeite mit Konzernen (Lufthansa Cargo), Forschungseinrichtungen (Utrecht University, Zukunftszentrum KI NRW) und dem Mittelstand. Gemeinsam ist ihnen: Daten sollen Entscheidungen verändern, nicht nur beschreiben.",
    facts: [
      { k: "5+ Jahre", v: "Data-Science- & BI-Erfahrung" },
      { k: "DE / EN", v: "Muttersprachliches Niveau" },
      { k: "SAFe / Agile", v: "Product-Owner-Mindset" },
      { k: "Azure / Databricks", v: "Cloud-native Delivery" },
    ],
  },
  expertise: {
    title: "Expertise",
    lead: "Data Science, Business Intelligence und Product Ownership — mit Fokus auf messbare Entscheidungen statt auf Dashboards allein.",
    skillsTitle: "Kompetenzen",
    skills: [
      { t: "Data Science", items: ["Python, R, SQL", "Machine Learning & Forecasting", "Transformer-Zeitreihenmodelle", "Statistik & Experimentation"] },
      { t: "Business Intelligence", items: ["Power BI, MicroStrategy, Tableau", "Datenmodellierung & DAX", "Executive Dashboarding", "Forecast-Monitoring"] },
      { t: "Cloud & Datenplattform", items: ["Azure, Databricks", "Data Governance & Lineage", "MLOps-Grundlagen", "Kosteneffiziente Architektur"] },
      { t: "Product Ownership", items: ["SAFe / Scrum", "Stakeholder-Management", "Roadmapping & Priorisierung", "Workshop-Moderation"] },
    ],
    approachTitle: "So strukturiere ich Projekte",
    approach: [
      { n: "01", t: "Verstehen", d: "Ziele, Datenlandschaft, Stakeholder und Entscheidungskontext klären." },
      { n: "02", t: "Bauen", d: "Analytics, Modelle, Dashboards oder Datenprodukte pragmatisch entwickeln." },
      { n: "03", t: "Verankern", d: "Ergebnisse klar kommunizieren und in Geschäftsprozesse integrieren." },
    ],
  },
  projects: {
    title: "Case Studies",
    lead: "Eine Auswahl aus Projekten in Aviation, Bildung und Mittelstand.",
  },
  aiCheck: {
    title: "KI-Infrastruktur-Check",
    lead: "Ein kurzes, ehrliches Assessment: Wie bereit ist Ihre Organisation für produktive KI? Zehn Fragen, zwei Minuten, ein klarer nächster Schritt.",
    start: "Check starten",
    next: "Weiter",
    back: "Zurück",
    submit: "Mein Ergebnis",
    restart: "Neu starten",
    resultTitle: "Ihr KI-Readiness-Score",
    resultSub: "Basierend auf Ihren Antworten zu Daten, Governance, Kultur und Infrastruktur.",
    contactCta: "Gespräch zur Auswertung buchen",
  },
  blog: {
    title: "Insights",
    lead: "Kurze, meinungsstarke Notizen zu Forecasting, KI-Governance und echtem Nutzen aus BI.",
  },
  contact: {
    title: "Lassen Sie uns sprechen",
    lead: "Erzählen Sie mir von Ihrer Datenherausforderung. Ich lese jede Nachricht selbst und antworte innerhalb von zwei Werktagen.",
    name: "Name",
    email: "E-Mail",
    company: "Unternehmen",
    message: "Wie kann ich helfen?",
    success: "Danke — Ihre Nachricht ist unterwegs. Ich melde mich in Kürze.",
    error: `Etwas ist schiefgelaufen. Bitte schreiben Sie mir direkt an ${CUSTOMER_CONTACT_EMAIL}`,
  },
  privacy: {
    title: "Datenschutz",
    lead: "Diese Website erhebt nur, was zur Beantwortung Ihrer Anfrage nötig ist. Kein Third-Party-Tracking, keine Ad-Netzwerke.",
  },
  footer: {
    tagline: "Data Science · KI · Business Intelligence — Frankfurt am Main",
    imprint: "Impressum",
    privacy: "Datenschutz",
    rights: "Alle Rechte vorbehalten.",
  },
};

const dicts: Record<Lang, Dict> = { en, de };

const I18nCtx = createContext<{ lang: Lang; setLang: (l: Lang) => void; t: Dict }>({
  lang: "en",
  setLang: () => {},
  t: en,
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");
  useEffect(() => {
    const stored = (typeof window !== "undefined" && localStorage.getItem("lang")) as Lang | null;
    if (stored === "en" || stored === "de") setLangState(stored);
    else if (typeof navigator !== "undefined" && navigator.language.toLowerCase().startsWith("de")) setLangState("de");
  }, []);
  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") localStorage.setItem("lang", l);
  };
  return <I18nCtx.Provider value={{ lang, setLang, t: dicts[lang] }}>{children}</I18nCtx.Provider>;
}

export const useI18n = () => useContext(I18nCtx);
