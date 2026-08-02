import { useEffect } from "react";

const CALENDLY_URL = "https://calendly.com/luitwin/30min";

export function CalendlyEmbed() {
  useEffect(() => {
    const id = "calendly-widget-script";
    if (document.getElementById(id)) return;
    const s = document.createElement("script");
    s.id = id;
    s.src = "https://assets.calendly.com/assets/external/widget.js";
    s.async = true;
    document.body.appendChild(s);
  }, []);

  return (
    <>
      <link
        href="https://assets.calendly.com/assets/external/widget.css"
        rel="stylesheet"
      />
      <div
        className="calendly-inline-widget rounded-2xl overflow-hidden border border-border bg-card"
        data-url={`${CALENDLY_URL}?hide_gdpr_banner=1&primary_color=0ea5e9`}
        style={{ minWidth: "320px", height: "700px" }}
      />
    </>
  );
}

export { CALENDLY_URL };
