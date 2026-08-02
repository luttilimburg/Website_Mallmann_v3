# Local and deployment setup

## 1. Install dependencies

```bash
npm ci
```

## 2. Configure environment variables

Copy `.env.example` to `.env` for local development:

```bash
cp .env.example .env
```

Set these server-side variables:

- `GEMINI_API_KEY`: Gemini API key used by the AI concierge.
- `RESEND_API_KEY`: Resend API key used by the contact form.
- `CONTACT_TO_EMAIL`: inbox that receives contact requests.
- `CONTACT_FROM_EMAIL`: verified sender address, including an optional display name.

Never prefix these variables with `VITE_`, because that would expose them to browser code.

## 3. Configure Resend

1. Create a Resend account.
2. Add and verify a sending domain. A dedicated subdomain such as `mail.luitwin-mallmann.de` is recommended.
3. Add the DNS records shown by Resend.
4. Create an API key.
5. Set `CONTACT_FROM_EMAIL` to an address on the verified domain, for example:

```env
CONTACT_FROM_EMAIL="Luitwin Website <website@mail.luitwin-mallmann.de>"
```

The address does not need its own mailbox. Replies go directly to the visitor because the API request sets their email as `reply_to`.

## 4. Run locally

```bash
npm run dev
```

## 5. Validate before deployment

```bash
npm run typecheck
npm run build
```

## Vercel deployment

Import the repository in Vercel and add the four environment variables under the project settings for both Production and Preview. Do not upload `.env`.

## Security note

The previously included Gemini key was exposed in the original project archive and Git history. Revoke it and create a new key before deployment.
