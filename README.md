# Glance Works

Landing page for a one-person studio building small, single-purpose **iOS homescreen widgets** — each shows one number you check every day, pulled from a free public data source.

Built with plain HTML, one CSS file, and one vanilla JS file. No framework, no build step, no third-party requests except the live USGS gauge call. Deployed to GitHub Pages via GitHub Actions.

## Live site

**https://conspiculus.github.io/glance-works/**

## The live hero

The hero is a real iOS-widget-styled tile showing the **current discharge (CFS)** for the Arkansas River near Nathrop, CO, fetched client-side from the USGS Water Services API:

```
https://waterservices.usgs.gov/nwis/iv/?format=json&sites=07091200&parameterCd=00060
```

- `07091200` — Arkansas River near Nathrop (the Salida gauge `07091500` has no real-time discharge feed).
- On load the number counts up to the live value, then the timestamp fades in.
- If the fetch fails, it shows the last-known value with an honest, stale timestamp — never fake "live" data. Tune `FALLBACK_CFS` in [`script.js`](script.js).

## Files

- `index.html` — page markup (hero, promise, apps grid, about, footer)
- `styles.css` — design system + light/dark themes
- `script.js` — live USGS fetch + count-up
- `.github/workflows/deploy.yml` — GitHub Pages deployment

## Local preview

Open `index.html` directly, or serve the folder:

```bash
python -m http.server 8000   # then visit http://localhost:8000
```

## Design

See [`CLAUDE.md`](CLAUDE.md) for the brand, voice, and visual system.
