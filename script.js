// Portfolio of widget apps. Add a new entry here to publish a card on the page.
const apps = [
  {
    name: "Sample Widget",
    icon: "✨",
    description: "A placeholder widget. Replace this entry with your first real app.",
    tag: "Demo",
    url: "",
  },
];

function renderApps() {
  const grid = document.getElementById("app-grid");
  if (!grid) return;

  if (apps.length === 0) {
    grid.innerHTML = '<p class="section-sub">No apps published yet — check back soon.</p>';
    return;
  }

  grid.innerHTML = apps
    .map((app) => {
      const hasLink = Boolean(app.url);
      const link = hasLink
        ? `<a class="card-link" href="${app.url}" target="_blank" rel="noopener">Open &rarr;</a>`
        : `<span class="card-link" aria-disabled="true">Coming soon</span>`;
      return `
        <article class="card">
          <div class="card-icon">${app.icon || "■"}</div>
          <h3>${app.name}</h3>
          <p>${app.description}</p>
          <div class="card-footer">
            <span class="tag">${app.tag || "Widget"}</span>
            ${link}
          </div>
        </article>`;
    })
    .join("");
}

document.addEventListener("DOMContentLoaded", () => {
  renderApps();
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
