import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const ContactMessageSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(254),
  company: z.string().trim().max(120).optional().default(""),
  message: z.string().trim().min(10).max(5_000),
  website: z.string().max(200).optional().default(""),
});

function normaliseSingleLine(value: string): string {
  return value
    .replace(/[\r\n]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export const Route = createFileRoute("/api/public/contact")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const origin = request.headers.get("origin");
        if (origin) {
          try {
            if (new URL(origin).host !== new URL(request.url).host) {
              return new Response("Forbidden", { status: 403 });
            }
          } catch {
            return new Response("Invalid origin", { status: 400 });
          }
        }

        let input: z.infer<typeof ContactMessageSchema>;
        try {
          input = ContactMessageSchema.parse(await request.json());
        } catch {
          return new Response("Invalid contact form data", { status: 400 });
        }

        // Honeypot: bots often fill hidden fields. Return success without sending.
        if (input.website) {
          return Response.json({ ok: true });
        }

        const apiKey = process.env.RESEND_API_KEY;
        const from = process.env.CONTACT_FROM_EMAIL;
        const to = process.env.CONTACT_TO_EMAIL ?? "luitwin.mallmann@outlook.com";

        if (!apiKey || !from) {
          console.error("Missing RESEND_API_KEY or CONTACT_FROM_EMAIL");
          return new Response("Contact service is not configured", { status: 500 });
        }

        const name = normaliseSingleLine(input.name);
        const company = normaliseSingleLine(input.company);
        const subject = company
          ? `Website enquiry from ${name} — ${company}`
          : `Website enquiry from ${name}`;

        const text = [
          "New website contact request",
          "",
          `Name: ${name}`,
          `Email: ${input.email}`,
          `Company: ${company || "Not provided"}`,
          "",
          "Message:",
          input.message,
        ].join("\n");

        const resendResponse = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from,
            to: [to],
            reply_to: input.email,
            subject,
            text,
          }),
        });

        if (!resendResponse.ok) {
          const errorBody = await resendResponse.text();
          console.error("Resend contact email failed", resendResponse.status, errorBody);
          return new Response("Unable to send contact message", { status: 502 });
        }

        return Response.json({ ok: true });
      },
    },
  },
});
