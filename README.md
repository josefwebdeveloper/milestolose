# milestolose.com

Marketing site for **Miles to Lose** — cycling journey, weight loss, YouTube Shorts.

**Live:** https://milestolose.com

## Stack

- Static HTML/CSS/JS
- SEO: Open Graph, JSON-LD, sitemap, robots.txt
- PWA: manifest + service worker

## Local dev

```bash
python3 -m http.server 8080
```

## Deploy

**Vercel** (production):

```bash
vercel deploy --prod
```

**DNS** (at your registrar):

| Type | Name | Value |
|------|------|-------|
| A | `@` | `76.76.21.21` |
| CNAME | `www` | `cname.vercel-dns.com` |

## Repo layout

- `index.html` — landing page
- `css/`, `js/` — styles and interactions
- `assets/` — images and SVG icons
- `sw.js`, `manifest.webmanifest` — PWA

Related: [my-youtube](https://github.com/josefwebdeveloper/my-youtube) — video assets and channel tooling.
