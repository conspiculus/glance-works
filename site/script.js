/* ============================================================
   Glance Works — hero widget count-up.
   The hero is a static replica of the Flow Now widget (the Grand
   Canyon example from the app), so there is no network call here:
   no fetch, no third-party requests, nothing to fail. The only
   moving part is the number counting up on load.
   ============================================================ */

const VALUE = 7970;
const DURATION = 700;

const el = document.getElementById("cfs");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const fmt = (n) => Math.round(n).toLocaleString("en-US");

function countUp() {
  if (!el || reduceMotion) return; // markup already holds the final value
  const start = performance.now();
  const step = (now) => {
    const t = Math.min((now - start) / DURATION, 1);
    const eased = 1 - Math.pow(1 - t, 3);
    el.textContent = fmt(VALUE * eased);
    if (t < 1) requestAnimationFrame(step);
    else el.textContent = fmt(VALUE);
  };
  requestAnimationFrame(step);
}

document.addEventListener("DOMContentLoaded", countUp);
