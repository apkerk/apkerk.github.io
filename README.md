# katieapker.com

Static, dependency-free academic site. No build step. Fully readable with JavaScript off (agent- and crawler-findable); JavaScript only adds motion, the gap-decomposition explorer, and the talk slide viewer.

## Preview locally

From this folder:

```
python3 -m http.server 8080
```

Then open http://localhost:8080/ . (Any static server works; absolute `/assets/...` paths require serving from this directory as the web root.)

## Deploy

Drop this folder on any static host. Vercel: import the repo, framework preset "Other", output directory = repo root, no build command. Point katieapker.com DNS at the host (keep Wix live until cutover, then switch).

## Structure

- `index.html` — homepage (hero, 15-second version, theme entry, JMP spotlight, status-grouped portfolio, connection map, about, contact)
- `research/youtube-gender-gap/` — JMP deep-dive: plain-language band, gap-decomposition explorer, what-does-not-explain-it rule-outs, mechanism, web-native talk, manuscript access
- `research/founder-identity/` — per-paper page
- `themes/` — three theme pages (ai-and-work, gender-as-lens, creator-economy)
- `assets/css/site.css` — the whole design system
- `assets/js/` — `site.js` (global enhancement), `data.js` (content reference), `jmp-data.js` + `explorer.js` (JMP interactivity)
- `assets/fig/`, `assets/img/`, `assets/cv.pdf`, `manuscripts/`
- `robots.txt`, `sitemap.xml`, `llms.txt`

## Open items before going live

1. Refresh JMP numbers in `assets/js/jmp-data.js` against the as-of-today analysis output (current values are the 2026-06-10 canonical set).
2. Drop the full JMP manuscript at `manuscripts/jmp.pdf` and set `jmpManuscript.ready = true` in `data.js` (and swap the "email for draft" button for a read/download link).
3. Confirm the Cornell email and the Mapping the Creator Economy author list.
4. Decide on the headshot.

## Embargo (hard)

"Gender Ideology, Separate Spheres" (Polhill, Raines, Apker) is under review at Organization Science. Title, authors, and status may show; NO abstract, figures, detail page, or draft until it is published.

## Note on stack

Built as plain static HTML/CSS/JS rather than Astro for a zero-toolchain, ships-today build that avoids node_modules in Google Drive. It ports to Astro later if maintainability via a build step becomes worth it; the content model in `data.js` is already structured for that.
