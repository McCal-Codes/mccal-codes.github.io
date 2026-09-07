# McCal Development

Technical product portfolio, published at
[mccal-codes.github.io](https://mccal-codes.github.io).

## Purpose

`mcc-cal.com` is an editorial photography portfolio. This is a separate publication for software
work: a numbered project index, structured project metadata, documentation-style case studies,
build notes, and visible development history.

It shares the brand's dark tone, restraint, and typographic discipline with the photography site.
It does not share its layout system, gallery structure, or component library. The two are
deliberately different mediums.

Design direction: **dark technical editorial with product-system structure.**

## Local development

```bash
npm install
npm run dev
```

Runs on http://localhost:4320.

```bash
npm run build          # tsc -b && vite build && pre-render routes
npm run verify:dist    # check dist is publishable
npm run typecheck      # tsc -b
npm run lint           # eslint
```

Use `npm run preview:static` to check a build, not `npm run preview`. `vite
preview` falls back to `index.html` for unknown paths, hiding the 404 behavior
that matters on Pages.

## Architecture

| Path | Purpose |
| --- | --- |
| `src/content/` | All site content, typed. Projects, notes, activity, site identity. No CMS, no runtime fetch. |
| `src/content/types.ts` | The case-study schema. Every project page renders through it. |
| `src/components/` | The component kit (index rows, metadata tables, section nav, diagrams, timelines). |
| `src/styles/tokens.css` | The design system. One accent token, one type scale. |
| `public/fonts/` | Self-hosted woff2. The CSP is `font-src 'self'`, so no external font host will load. |
| `scripts/emit-route-pages.js` | Post-build. Pre-renders a page per route, injects the CSP, writes the sitemap. |
| `scripts/verify-dist.js` | Independent check that the build produced a publishable `dist`. |

Adding a project means adding one entry to `src/content/projects.ts`. The index row, the route,
the metadata table, and the sticky section nav all derive from it. Adding or removing one fails
the build until the slug lists in `scripts/emit-route-pages.js` are updated to match.

## Deployment

GitHub Actions builds and publishes to GitHub Pages on every push to `main`
(`.github/workflows/deploy.yml`). Pages serves static files only, which drives
two decisions.

**Routes are pre-rendered.** Pages has no rewrite mechanism, so an SPA normally
serves every deep link under an HTTP 404. This site is indexed, so
`scripts/emit-route-pages.js` writes a real `index.html` per route and keeps
`404.html` as the catch-all. Projects without a case study redirect to the
index, so they are not pre-rendered.

**The CSP is a meta tag, injected at build time.** It is not in `index.html`
because `script-src 'self'` would break `vite dev` and its inline HMR script.

### Security headers this site does not have

The previous host set response headers. Pages cannot. These are not recoverable
without a proxy in front of the site:

| Header | Status |
| --- | --- |
| `Content-Security-Policy` | Kept, as a `<meta>` tag. `frame-ancestors` is ignored in meta and was dropped. |
| `X-Frame-Options` | Lost. With `frame-ancestors` also inert, the site has no clickjacking protection. |
| `Strict-Transport-Security` | Lost. Pages does not send HSTS. |
| `Permissions-Policy` | Lost. No meta equivalent. |
| `Cross-Origin-Opener-Policy` | Lost. No meta equivalent. |
| `X-Content-Type-Options` | Lost. Low impact: no uploads, all assets content-hashed. |
| `Referrer-Policy` | Kept, as `<meta name="referrer">`. |
| `Cache-Control: immutable` | Lost. Pages serves a uniform `max-age=600`. Vite content-hashes filenames, so this costs performance, not correctness. |

Recorded rather than fixed. Do not assume the previous posture carried over.

## Content rules

- No fabricated metrics. Repository counts are shown only when they come from real data.
- No AI terminology, branding, or features.
- No em dashes in site copy. Use commas, parentheses, or sentence breaks.
- Status is communicated by shape and text, never by color alone.
