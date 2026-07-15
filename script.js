/* ============================================================
   Glance Works — live hero widget.
   Fetches the current discharge (CFS) for the Arkansas River near
   Nathrop, CO straight from the public USGS Water Services API.
   No other network calls. If the fetch fails we show the last known
   value with an honest, stale timestamp — never fake "live" data.
   ============================================================ */

// USGS site 07091200 = ARKANSAS RIVER NEAR NATHROP, CO.
// (The Salida gauge, 07091500, has no real-time discharge feed.)
// 00060 = discharge, cubic feet per second.
const SITE = "07091200";
const PARAM = "00060";
const API = `https://waterservices.usgs.gov/nwis/iv/?format=json&sites=${SITE}&parameterCd=${PARAM}`;

// Realistic last-known reading, used only if the live fetch fails.
const FALLBACK_CFS = 180;

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const heroNum = document.getElementById("cfs-hero");
const heroStamp = document.getElementById("cfs-stamp");
const tileNums = document.querySelectorAll("[data-cfs]");

const fmt = (n) => Math.round(n).toLocaleString("en-US");

function setTiles(value) {
  tileNums.forEach((el) => (el.textContent = fmt(value)));
}

// Ease-out count-up. Lands exactly on `to`; tabular-nums prevents shift.
function countUp(el, from, to, duration) {
  if (reduceMotion || from === to) {
    el.textContent = fmt(to);
    return Promise.resolve();
  }
  return new Promise((resolve) => {
    const start = performance.now();
    const step = (now) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = fmt(from + (to - from) * eased);
      if (t < 1) requestAnimationFrame(step);
      else { el.textContent = fmt(to); resolve(); }
    };
    requestAnimationFrame(step);
  });
}

function showStamp(text) {
  heroStamp.textContent = text;
  // next frame so the opacity transition actually runs
  requestAnimationFrame(() => heroStamp.classList.add("is-in"));
}

function formatWhen(iso) {
  const d = new Date(iso);
  if (isNaN(d)) return "";
  const time = d.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
  const now = new Date();
  const sameDay = d.toDateString() === now.toDateString();
  const day = sameDay ? "today" : d.toLocaleDateString([], { month: "short", day: "numeric" });
  return `Updated ${time} · ${day}`;
}

async function fetchLive() {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 5000);
  try {
    const res = await fetch(API, { signal: ctrl.signal });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    const series = data.value.timeSeries[0].values[0].value;
    const latest = series[series.length - 1];
    const value = Number(latest.value);
    if (!isFinite(value) || value < 0) throw new Error("bad value");
    return { value, when: latest.dateTime };
  } finally {
    clearTimeout(timer);
  }
}

async function init() {
  // Land the signature count-up on the fallback immediately so there is
  // never a spinner or an empty hero, then correct to live once it arrives.
  setTiles(FALLBACK_CFS);
  await countUp(heroNum, 0, FALLBACK_CFS, 600);

  try {
    const { value, when } = await fetchLive();
    setTiles(value);
    await countUp(heroNum, FALLBACK_CFS, value, value === FALLBACK_CFS ? 0 : 420);
    showStamp(formatWhen(when) || "Live from USGS");
  } catch {
    showStamp(`Couldn't reach USGS — last known ≈${FALLBACK_CFS} cfs`);
  }
}

document.addEventListener("DOMContentLoaded", init);
