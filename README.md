# Glance Works

Landing page for a portfolio of small, focused **widget apps**.

Built with plain HTML, CSS, and JavaScript — no build step. Deployed to GitHub Pages via GitHub Actions.

## Live site

Once Pages finishes deploying: **https://conspiculus.github.io/glance-works/**

## Adding an app

Edit the `apps` array in [`script.js`](script.js) and add an entry:

```js
{
  name: "My Widget",
  icon: "🧩",
  description: "What it does, in one line.",
  tag: "Utility",
  url: "https://link-to-the-app",   // leave "" to show "Coming soon"
}
```

The card is rendered automatically on the page.

## Local preview

Just open `index.html` in a browser, or serve the folder:

```bash
python -m http.server 8000
# then visit http://localhost:8000
```

## Structure

- `index.html` — page markup
- `styles.css` — styling
- `script.js` — app data + card rendering
- `.github/workflows/deploy.yml` — GitHub Pages deployment
