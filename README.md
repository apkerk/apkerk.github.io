# katieapker.com

Static, dependency-free academic site. No build step. Fully readable with JavaScript off (agent- and crawler-findable); JavaScript only adds motion, the gap-decomposition explorer, and the talk slide viewer.

## Preview locally

From this folder:

```
python3 -m http.server 8080
```

Then open http://localhost:8080/ . (Any static server works; absolute `/assets/...` paths require serving from this directory as the web root.)

## Deploy (LIVE since 2026-07-06)

Live at **https://katieapker.com** via GitHub Pages, repo `apkerk/apkerk.github.io` (public), branch `main`, root. This folder is canonical; the repo is a deploy copy.

To ship updates:

```
STAGE=$(mktemp -d) && git clone --depth 1 https://github.com/apkerk/apkerk.github.io "$STAGE" \
  && rsync -a --delete --exclude .git --exclude CNAME ./ "$STAGE/" \
  && cd "$STAGE" && touch .nojekyll && git add -A \
  && git commit -m "Deploy from canonical site/" && git push
```

(Keep `CNAME` (contains `katieapker.com`) and `.nojekyll` in the repo — deleting CNAME drops the custom domain.)

DNS: Cloudflare account manages katieapker.com (Bluehost = registrar only). Apex A records → GitHub Pages IPs (185.199.108–111.153, DNS only/gray cloud), `www` CNAME → apkerk.github.io. MX/TXT rows are email; `pat*` Tunnel rows are the Pat dashboard. Never touch either.

## Structure

- `index.html` — homepage (hero, 15-second version, theme entry, JMP spotlight, status-grouped portfolio, connection map, about, contact)
- `research/youtube-gender-gap/` — JMP deep-dive: plain-language band, gap-decomposition explorer, what-does-not-explain-it rule-outs, mechanism, web-native talk, manuscript access
- `research/founder-identity/` — per-paper page
- `themes/` — three theme pages (ai-and-work, gender-as-lens, creator-economy)
- `assets/css/site.css` — the whole design system
- `assets/js/` — `site.js` (global enhancement), `data.js` (content reference), `jmp-data.js` + `explorer.js` (JMP interactivity)
- `assets/fig/`, `assets/img/`, `assets/cv.pdf`, `manuscripts/`
- `teaching/` — teaching page (courses, SET ratings, teaching document links); in sitemap + nav
- `docs/` — evergreen job-market document URLs (unlisted: robots-disallowed, noindex, not in sitemap; Katie hands these links out directly). Stable names: `apker-cv.pdf`, `apker-research-statement.pdf`, `apker-teaching-statement.pdf`, `apker-teaching-evidence.pdf`, `apker-jmp.pdf`, `apker-writing-sample-founder-identity.pdf`, plus `docs/index.html` landing page listing all six. **Sync rule:** `assets/cv.pdf` and `docs/apker-cv.pdf` must always be the same file — update both when swapping the CV.
- `preview/` — unlisted scratch pages for Katie to compare design variants before shipping (noindex, not in sitemap); safe to delete once a variant is chosen
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
