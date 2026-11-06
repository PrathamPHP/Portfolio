# The Art of Becoming

An editorial portfolio for Pratham Pratap Singh. The Living Form moves through four studies, from Curiosity to Possibility. Catch the Spark turns eight collected points into a constellation.

## Run locally

Use Node.js 22 or newer and npm. On Windows PowerShell, use `npm.cmd` and `npx.cmd` if script execution is restricted.

```sh
npm ci
npm run dev
```

Open [localhost:3000](http://localhost:3000).

## Build, test, and present

```sh
npm run lint
npm run typecheck
npm run build
npx playwright install chromium
npm test
npm run start
```

Playwright starts a separate production preview on port 3100. For the judges, open the production site at [localhost:3000](http://localhost:3000), move the pointer over the Living Form, scroll through Selected Work, then play Catch the Spark. Visitors can collect sparks by clicking, tapping, or pressing Enter. A supported desktop with WebGL shows the live sculpture, while mobile, reduced-motion, and constrained devices show corresponding stills.

## Deploy

Use a Next.js host or a Node server. Set `SITE_URL` to the actual public HTTPS origin before the production build. It supplies the canonical URL, sitemap, and absolute social preview URL. Deploy with `npm ci && npm run build` and serve with `npm run start`. The portfolio requires no database, secrets, or third-party credentials at runtime.

## Asset checklist

Keep original files in `pictures/` and place optimized copies under `public/images/`. Rebuild after adding files so the asset registry detects them. The portrait, three certificates, and general hackathon photograph are integrated. See the [image manifest](ASSETS.md) for the source and production paths. Add verified project descriptions, stacks, and links in `src/data/profile.ts` when available.

| Status | File | Purpose |
| --- | --- | --- |
| Present | `public/images/profile/pratham-portrait.webp` | Full hero portrait and About portrait fallback |
| Present | `public/images/profile/pratham-casual.webp` | About portrait |
| Missing | `public/images/projects/agriqueue/agriqueue.webp` | AgriQueue screenshot |
| Missing | `public/images/projects/chainshield/chainshield-ai.webp` | Chainshield AI screenshot |
| Missing | `public/images/projects/inbox-guard/inbox-guard-ai.webp` | Inbox Gaurd AI screenshot |
| Missing | `public/images/hackathons/sih.webp` | Smart India Hackathon photograph |
| Missing | `public/images/hackathons/sap-hackfest.webp` | SAP Hackfest photograph |
| Missing | `public/images/hackathons/hackathon-3.webp` | Hackathon 3.0 photograph |
| Missing | `public/images/hackathons/break-the-firewall.webp` | Break the Firewall CTF photograph |

The project plates are labeled original abstract artworks. The verified [GitHub profile](https://github.com/PrathamPHP) was checked for matching public repositories. The three project pages are ready for verified copy and project links.

## 21st.dev

The portfolio adapts Magic UI’s MIT-licensed Interactive Hover Button for the two primary links. The implementation uses semantic links, a single label, CSS motion, and this site’s typography and palette. See [Third-party notices](THIRD_PARTY_NOTICES.md).

The 21st.dev CLI prompted for authentication during component search. Run `npx @21st-dev/cli login` and complete browser sign-in to enable CLI searches. The existing CTA adaptation uses the component author’s public source. The certificate viewer uses the browser’s native dialog. [21st.dev setup](https://docs.21st.dev/mcp)

## Recreate the sculpture stills and social image

With the development server running and Playwright Chromium installed, run `node scripts/capture-art.mjs`. The script captures the four poses from the actual scene and writes the social preview to `public/og.png`. Use `PORTFOLIO_DEV_URL` if development is running on another port.

See [Verification](VERIFICATION.md) for test results and the judge review.

