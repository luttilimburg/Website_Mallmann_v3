import projectAiGov from "@/assets/project-ai-governance.jpg";
import lufthansa from "@/assets/LufthansaCargo.png";
import yankrukov from "@/assets/pexels-yankrukov-8867434.jpg";
import rdne from "@/assets/pexels-rdne-7947752.jpg";
import zki from "@/assets/zzki_logo.svg";
import utrecht from "@/assets/utrecht_university_logo.png";
import bwnrw from "@/assets/Bildungswerk-der-Nordrhein-Westfaelischen-Wirtschaft-bwnrw.png";
import geogap from "@/assets/GeoGapLogo.jpg";

export type Project = {
  slug: string;
  chip: { en: string; de: string };
  title: { en: string; de: string };
  client: { en: string; de: string };
  clientLogo?: string;
  image: string;
  summary: { en: string; de: string };
  problem: { en: string; de: string };
  approach: { en: string; de: string };
  outcome: { en: string; de: string };
  metrics: { k: string; v: { en: string; de: string } }[];
};

export const projects: Project[] = [
  {
    slug: "ai-infrastructure-workshop",
    chip: { en: "AI Strategy & Governance", de: "KI-Strategie & Governance" },
    title: {
      en: "AI Infrastructure & Data Governance Workshop",
      de: "AI Infrastructure & Data Governance Workshop",
    },
    client: { en: "Zukunftszentrum KI NRW · Bildungswerk NRW", de: "Zukunftszentrum KI NRW · Bildungswerk NRW" },
    clientLogo: zki,
    image: projectAiGov,
    summary: {
      en: "Hands-on workshop for SMEs on AI infrastructure, data governance and regulatory requirements.",
      de: "Praxis-Workshop für KMU zu KI-Infrastruktur, Data Governance und regulatorischen Anforderungen.",
    },
    problem: {
      en: "Small and medium-sized companies want to adopt AI, but lack a shared vocabulary for infrastructure choices, governance obligations and the practical steps from prototype to production.",
      de: "Der Mittelstand will KI einführen — es fehlt aber die gemeinsame Sprache für Infrastruktur-Entscheidungen, Governance-Pflichten und den Weg vom Prototyp zur Produktion.",
    },
    approach: {
      en: "A one-day workshop combining a strategic framing, hands-on architecture patterns (data lakehouse, feature store, model serving) and a regulatory checklist aligned with EU AI Act obligations.",
      de: "Ein eintägiger Workshop mit strategischem Framing, praktischen Architekturmustern (Data Lakehouse, Feature Store, Model Serving) und einer Checkliste zur EU-AI-Act-Konformität.",
    },
    outcome: {
      en: "Participating companies left with a personalised AI-readiness scorecard and a prioritised 90-day roadmap.",
      de: "Jedes teilnehmende Unternehmen erhielt eine persönliche AI-Readiness-Scorecard und eine priorisierte 90-Tage-Roadmap.",
    },
    metrics: [
      { k: "12", v: { en: "SME leaders trained", de: "KMU-Führungskräfte trainiert" } },
      { k: "90d", v: { en: "actionable roadmap", de: "umsetzbare Roadmap" } },
      { k: "1:1", v: { en: "readiness scorecard", de: "Readiness-Scorecard" } },
    ],
  },
  {
    slug: "lufthansa-cargo-forecasting",
    chip: { en: "AI Forecasting", de: "KI-Forecasting" },
    title: { en: "Air Cargo Forecasting with Transformers", de: "Luftfracht-Forecasting mit Transformern" },
    client: { en: "Lufthansa Cargo × Utrecht University", de: "Lufthansa Cargo × Utrecht University" },
    clientLogo: lufthansa,
    image: lufthansa,
    summary: {
      en: "Replaced Excel-based revenue models with production Transformer time-series forecasts for cargo prices and volumes.",
      de: "Ablösung Excel-basierter Umsatzmodelle durch produktive Transformer-Zeitreihen-Prognosen für Cargo-Preise und -Volumina.",
    },
    problem: {
      en: "Cargo revenue planning relied on brittle Excel workbooks that could not adapt to volatile post-COVID demand or capture cross-lane dependencies.",
      de: "Die Umsatzplanung im Cargo-Bereich basierte auf fragilen Excel-Modellen, die weder mit volatilen Post-COVID-Nachfragen noch mit Lane-übergreifenden Abhängigkeiten umgehen konnten.",
    },
    approach: {
      en: "Together with two Master's students I supervised, we benchmarked classical baselines (SARIMAX, gradient boosting) against modern Transformer-based time-series architectures (TFT, PatchTST) on multi-year cargo data.",
      de: "Mit zwei von mir betreuten Masterstudent:innen haben wir klassische Baselines (SARIMAX, Gradient Boosting) gegen moderne Transformer-Architekturen (TFT, PatchTST) auf mehrjährigen Cargo-Daten benchmarkt.",
    },
    outcome: {
      en: "The Transformer models became the new production baseline for price and volume forecasting, embedded into the revenue planning process.",
      de: "Die Transformer-Modelle sind heute die produktive Baseline für Preis- und Volumen-Prognosen und Teil des Umsatzplanungsprozesses.",
    },
    metrics: [
      { k: "Transformer", v: { en: "production model", de: "Produktivmodell" } },
      { k: "Multi-lane", v: { en: "revenue forecasting", de: "Umsatz-Forecasting" } },
      { k: "2×MSc", v: { en: "students supervised", de: "Studierende betreut" } },
    ],
  },
  {
    slug: "service-center-hahn",
    chip: { en: "Planning & Optimisation", de: "Planung & Optimierung" },
    title: { en: "Forecasting Service Tasks", de: "Forecasting von Service-Vorgängen" },
    client: { en: "Service Center Hahn", de: "Service Center Hahn" },
    image: yankrukov,
    summary: {
      en: "A SARIMAX time-series model that meaningfully reduced over-planning and cut personnel costs.",
      de: "Ein SARIMAX-Zeitreihenmodell, das Über-Planung deutlich reduziert und Personalkosten gesenkt hat.",
    },
    problem: {
      en: "Service center staffing was based on averages, causing chronic over-planning on quiet days and under-planning on peaks.",
      de: "Die Personalplanung im Service Center basierte auf Durchschnitten — chronische Über-Planung an ruhigen Tagen, Unter-Planung an Spitzen.",
    },
    approach: {
      en: "A SARIMAX model with weather, holiday and campaign exogenous features, deployed as a weekly planning artefact for team leads.",
      de: "Ein SARIMAX-Modell mit exogenen Features (Wetter, Feiertage, Kampagnen), ausgeliefert als wöchentliches Planungs-Artefakt für Teamleads.",
    },
    outcome: {
      en: "Meaningful reduction in over-planning and a clear framework for continuous improvement of the forecast.",
      de: "Deutliche Reduktion der Über-Planung und ein klarer Rahmen für kontinuierliche Forecast-Verbesserung.",
    },
    metrics: [
      { k: "SARIMAX", v: { en: "with exogenous features", de: "mit exogenen Features" } },
      { k: "Weekly", v: { en: "planning cadence", de: "Planungs-Kadenz" } },
      { k: "↓ cost", v: { en: "of over-planning", de: "der Über-Planung" } },
    ],
  },
  {
    slug: "revenue-forecast-monitoring",
    chip: { en: "Business Intelligence", de: "Business Intelligence" },
    title: { en: "Monitoring Revenue Forecasts in Power BI", de: "Umsatz-Forecast-Monitoring in Power BI" },
    client: { en: "Enterprise BI", de: "Enterprise BI" },
    image: rdne,
    summary: {
      en: "A Power BI dashboard tracking monthly forecast accuracy and enabling targeted long-term improvements.",
      de: "Ein Power-BI-Dashboard zur monatlichen Forecast-Genauigkeit — Grundlage für gezielte, langfristige Verbesserungen.",
    },
    problem: {
      en: "Revenue forecasts were made monthly, but nobody was systematically comparing them to actuals — errors compounded silently.",
      de: "Umsatz-Prognosen wurden monatlich erstellt, aber nicht systematisch mit Ist-Werten verglichen — Fehler kumulierten unbemerkt.",
    },
    approach: {
      en: "A Power BI model that stitches forecast vintages against actuals, exposes MAPE and bias per business unit, and highlights which forecast horizons need the most attention.",
      de: "Ein Power-BI-Modell, das Forecast-Vintages mit Ist-Werten zusammenführt, MAPE und Bias je Business Unit ausweist und die kritischsten Horizonte hervorhebt.",
    },
    outcome: {
      en: "Forecast quality became a KPI. Business units now see and own their accuracy every month.",
      de: "Forecast-Qualität wurde zum KPI. Business Units sehen und verantworten ihre Genauigkeit monatlich.",
    },
    metrics: [
      { k: "MAPE", v: { en: "per business unit", de: "je Business Unit" } },
      { k: "Monthly", v: { en: "accuracy review", de: "Genauigkeits-Review" } },
      { k: "Power BI", v: { en: "single source of truth", de: "Single Source of Truth" } },
    ],
  },
];

export const clientLogos = [
  { name: "Lufthansa Cargo", url: lufthansa },
  { name: "Zukunftszentrum KI NRW", url: zki },
  { name: "Utrecht University", url: utrecht },
  { name: "Bildungswerk NRW", url: bwnrw },
  { name: "GeoGap", url: geogap },
];
