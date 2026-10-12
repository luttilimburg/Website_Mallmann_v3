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
      de: "KI-Infrastruktur & Data Governance",
    },
    client: { en: "Zukunftszentrum KI NRW · Bildungswerk NRW", de: "Zukunftszentrum KI NRW · Bildungswerk NRW" },
    clientLogo: zki,
    image: projectAiGov,
    summary: {
      en: "From Excel to an AI-ready data foundation: SMEs prioritize a business use case, map its data flow and governance, then build a first predictive-maintenance model in a live Google Colab session.",
      de: "Von Excel zur KI-reifen Datenbasis: KMU priorisieren einen Business-Use-Case, leiten Datenfluss und Governance ab und erstellen in einer Live-Coding-Session in Google Colab ein erstes Predictive-Maintenance-Modell.",
    },
    problem: {
      en: "SMEs often have data spread across Excel files and business systems, while the first AI idea, minimum data requirements, infrastructure choice and governance responsibilities are still unclear.",
      de: "In KMU liegen Daten oft verteilt in Excel-Dateien und Geschäftssystemen. Gleichzeitig sind der erste sinnvolle KI-Anwendungsfall, die nötige Mindestdatenbasis, die passende Infrastruktur und klare Governance-Verantwortlichkeiten noch offen.",
    },
    approach: {
      en: "Participants compare predictive-maintenance and demand-forecasting cases, estimate business value, and map sources, shared data, quality checks and governance. Exercises compare open-source, Azure, Google Cloud and AWS options, and discuss cloud, on-premises and hybrid architectures alongside the EU AI Act, NIS2, GDPR and EU Data Act. In a live-coding session, they use Google Colab and an AI coding assistant to explore a machine dataset and train and assess a first supervised prediction model.",
      de: "Anhand der Fallbeispiele Predictive Maintenance und Absatzprognose bewerten die Teilnehmenden den Geschäftsnutzen und leiten Quellen, gemeinsamen Datenkern, Qualitätschecks und Governance ab. Übungen vergleichen Open-Source-, Azure-, Google-Cloud- und AWS-Optionen sowie Cloud-, On-Premises- und Hybrid-Architekturen. Außerdem ordnen sie Anforderungen aus EU AI Act, NIS2, DSGVO und EU Data Act ein. Im Live-Coding nutzen sie Google Colab und einen KI-Coding-Assistenten, um einen Maschinendatensatz zu untersuchen und ein erstes überwachtes Prognosemodell zu trainieren und zu bewerten.",
    },
    outcome: {
      en: "The stated workshop goal is for participants to assess an initial AI use case economically, derive its minimum data flow, and make informed architecture and governance choices. They also get a practical first look at preparing data, training a model, and interpreting prediction quality and trade-offs.",
      de: "Laut Workshopziel können die Teilnehmenden danach einen ersten KI-Anwendungsfall wirtschaftlich bewerten, den minimal nötigen Datenfluss ableiten und Architektur sowie Governance begründet auswählen. Im Praxisteil erleben sie außerdem, wie Daten vorbereitet, ein Modell trainiert und Modellgüte samt Zielkonflikten eingeordnet werden.",
    },
    metrics: [
      { k: "1 Tag", v: { en: "workshop", de: "Workshop" } },
      { k: "2", v: { en: "practical use cases", de: "Praxisfälle" } },
      { k: "Live", v: { en: "Colab model session", de: "Colab-Modell-Session" } },
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
