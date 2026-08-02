import type { Lang } from "./i18n";

export type AICheckQuestion = {
  id: string;
  dimension: "data" | "governance" | "infra" | "culture";
  q: { en: string; de: string };
  options: { label: { en: string; de: string }; score: number }[];
};

export const aiCheckQuestions: AICheckQuestion[] = [
  { id: "q1", dimension: "data", q: { en: "How centralised is your business-critical data today?", de: "Wie zentralisiert liegen Ihre geschäftskritischen Daten heute vor?" }, options: [
    { label: { en: "Everything lives in spreadsheets and personal files", de: "Alles liegt in Excel und persönlichen Ablagen" }, score: 0 },
    { label: { en: "Mostly in a shared database, but with silos", de: "Meist in einer geteilten DB, aber mit Silos" }, score: 1 },
    { label: { en: "A warehouse / lakehouse covers the majority of use cases", de: "Ein Warehouse / Lakehouse deckt den Großteil ab" }, score: 2 },
  ]},
  { id: "q2", dimension: "data", q: { en: "How confident are you in the quality of your key metrics?", de: "Wie sicher sind Sie in der Qualität Ihrer Kernkennzahlen?" }, options: [
    { label: { en: "Different teams report different numbers", de: "Teams berichten unterschiedliche Zahlen" }, score: 0 },
    { label: { en: "We agree on the numbers, but definitions live in people's heads", de: "Zahlen sind konsistent, Definitionen aber im Kopf" }, score: 1 },
    { label: { en: "Definitions are documented and tested", de: "Definitionen sind dokumentiert und getestet" }, score: 2 },
  ]},
  { id: "q3", dimension: "governance", q: { en: "Do you have a written policy for AI and personal data?", de: "Gibt es eine schriftliche Richtlinie zu KI und personenbezogenen Daten?" }, options: [
    { label: { en: "No", de: "Nein" }, score: 0 },
    { label: { en: "In progress", de: "In Arbeit" }, score: 1 },
    { label: { en: "Yes, and staff have been trained on it", de: "Ja, Mitarbeitende sind geschult" }, score: 2 },
  ]},
  { id: "q4", dimension: "governance", q: { en: "How do you currently evaluate the EU AI Act's impact on your products?", de: "Wie bewerten Sie aktuell den Einfluss des EU AI Acts auf Ihre Produkte?" }, options: [
    { label: { en: "We haven't looked at it yet", de: "Wir haben es noch nicht geprüft" }, score: 0 },
    { label: { en: "We know the risk categories that apply to us", de: "Wir kennen die für uns relevanten Risikokategorien" }, score: 1 },
    { label: { en: "We have a documented compliance approach", de: "Wir haben ein dokumentiertes Compliance-Vorgehen" }, score: 2 },
  ]},
  { id: "q5", dimension: "infra", q: { en: "Where do your production workloads run?", de: "Wo laufen Ihre produktiven Workloads?" }, options: [
    { label: { en: "On-premise or laptops only", de: "Nur on-premise oder auf Laptops" }, score: 0 },
    { label: { en: "Cloud, but no MLOps foundation", de: "Cloud, aber ohne MLOps-Basis" }, score: 1 },
    { label: { en: "Cloud with CI/CD and model monitoring", de: "Cloud mit CI/CD und Modell-Monitoring" }, score: 2 },
  ]},
  { id: "q6", dimension: "infra", q: { en: "How do you deploy a new model or dashboard today?", de: "Wie deployen Sie heute ein neues Modell oder Dashboard?" }, options: [
    { label: { en: "Manual copy-paste by a single expert", de: "Manuelles Copy-Paste durch eine einzelne Person" }, score: 0 },
    { label: { en: "Semi-automated with checklists", de: "Teilautomatisiert mit Checklisten" }, score: 1 },
    { label: { en: "Fully automated pipeline with tests", de: "Vollautomatisierte Pipeline mit Tests" }, score: 2 },
  ]},
  { id: "q7", dimension: "culture", q: { en: "How often do leaders make decisions based on quantitative evidence?", de: "Wie oft treffen Führungskräfte Entscheidungen auf Basis quantitativer Evidenz?" }, options: [
    { label: { en: "Rarely — mostly gut feeling", de: "Selten — meist aus dem Bauch" }, score: 0 },
    { label: { en: "For big decisions", de: "Bei großen Entscheidungen" }, score: 1 },
    { label: { en: "It's the default across teams", de: "Es ist der Standard in allen Teams" }, score: 2 },
  ]},
  { id: "q8", dimension: "culture", q: { en: "Do product teams have direct access to data specialists?", de: "Haben Produktteams direkten Zugriff auf Data-Spezialisten?" }, options: [
    { label: { en: "No — everything goes through a queue", de: "Nein — alles läuft über eine zentrale Queue" }, score: 0 },
    { label: { en: "Sometimes, for big projects", de: "Manchmal, für große Projekte" }, score: 1 },
    { label: { en: "Yes, embedded in the team", de: "Ja, direkt im Team eingebettet" }, score: 2 },
  ]},
  { id: "q9", dimension: "data", q: { en: "How is customer / operational data classified today?", de: "Wie sind Kunden-/Betriebsdaten heute klassifiziert?" }, options: [
    { label: { en: "It isn't", de: "Gar nicht" }, score: 0 },
    { label: { en: "Basic tagging, no enforcement", de: "Basis-Tagging, keine Durchsetzung" }, score: 1 },
    { label: { en: "Classified with enforced access controls", de: "Klassifiziert mit durchgesetzter Zugriffs­steuerung" }, score: 2 },
  ]},
  { id: "q10", dimension: "governance", q: { en: "Who is accountable when an AI system makes a wrong decision?", de: "Wer ist verantwortlich, wenn ein KI-System eine falsche Entscheidung trifft?" }, options: [
    { label: { en: "It's never come up", de: "Kam noch nie auf" }, score: 0 },
    { label: { en: "Informally, the team that built it", de: "Informell das erstellende Team" }, score: 1 },
    { label: { en: "A named accountable owner and process", de: "Namentlich verantwortliche Person und Prozess" }, score: 2 },
  ]},
];

export function scoreLevel(pct: number, lang: Lang) {
  if (pct >= 0.75) return { label: lang === "de" ? "Produktionsreif" : "Production-ready", advice: lang === "de" ? "Sie haben eine solide Basis. Der nächste Hebel liegt in messbarer Skalierung und Cost/Value-Steuerung." : "You have a solid foundation. The next lever is measurable scale and value/cost governance." };
  if (pct >= 0.5) return { label: lang === "de" ? "Auf dem Weg" : "On track", advice: lang === "de" ? "Die Grundlagen stehen. Priorisieren Sie Governance und automatisiertes Deployment, um Risiken zu senken." : "The foundations are there. Prioritise governance and automated deployment to reduce risk." };
  if (pct >= 0.25) return { label: lang === "de" ? "Frühe Phase" : "Early stage", advice: lang === "de" ? "Beginnen Sie mit einem Data-Governance-Fundament und einem kleinen, produktiven Use Case." : "Start with a data-governance foundation and one small production use case." };
  return { label: lang === "de" ? "Startpunkt" : "Starting out", advice: lang === "de" ? "Ein zweistündiger Discovery-Workshop schafft Klarheit über Ihren nächsten Schritt." : "A two-hour discovery workshop can clarify your very next step." };
}
