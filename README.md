# Glance Works

Landing page for a studio building small, single-purpose **iOS homescreen widgets** — each shows one number you check every day, pulled from a free public data source.

Plain HTML, one CSS file, one small JS file. No framework, no build step, **no network requests at all**. Deployed to GitHub Pages via GitHub Actions.

## Live site

**https://conspiculus.github.io/glance-works/**

## The hero widget

The hero is a pixel-faithful replica of the **Flow Now** iOS widget, showing the Grand Canyon example from the app (Colorado River · 7,970 CFS · falling · 6.41 ft). It is **static** — there is no API call.

It was built by measuring the real thing off the simulator screenshots in this repo:

- Colors sampled directly from the app (card, number, sparkline green, trend amber, contours), for light and dark.
- The card is a **176.7pt square**; every interior size is the measured percentage of card width, expressed in container units (`cqw`) so it scales without drifting.
- The sparkline is the app's actual curve, traced out of the screenshot (2.0pt stroke, 18px end dot).

> Gotcha: container units (`cqw`) on the container element *itself* resolve against an ancestor/viewport, not the element — so `.widget` and `.tile` use `%` for their own `border-radius`/`padding`.

To change the displayed values, edit the markup in `index.html` and `VALUE` in `script.js` (the count-up target).

## Files

- `index.html` — landing page
- `privacy.html` — Flow Now privacy policy (source of truth: `PrivacyPolicy.md`)
- `styles.css` — design system, light/dark, the widget replica
- `script.js` — the number count-up (the only JS)
- `favicon.svg` — the drop + pulse mark
- `.github/workflows/deploy.yml` — GitHub Pages deployment

## Local preview

Open `index.html` directly, or serve the folder:

```bash
python -m http.server 8000   # then visit http://localhost:8000
```

Note: to check a real 320px layout, use an iframe — desktop Chrome/Edge clamp `--window-size` to a ~492px minimum viewport.

## Design

See [`CLAUDE.md`](CLAUDE.md) for the brand, voice, and visual system.
