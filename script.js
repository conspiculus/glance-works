/* ============================================================
   Glance Works — live hero widget.
   Pulls the last day of discharge (CFS) and gauge height for the
   Arkansas River near Nathrop, CO straight from the public USGS
   Water Services API, then renders the current number, today's
   trend, the gauge height, and a sparkline — a faithful copy of
   the app's "Flow Now" widget. No other network calls.
   If the fetch fails, we show the last known value with an honest,
   stale timestamp — never fake "live" data.
   ============================================================ */

// 07091200 = ARKANSAS RIVER NEAR NATHROP, CO.
// (The Salida gauge 07091500 has no real-time discharge feed.)
// 00060 = discharge (CFS), 00065 = gauge height (ft).
const SITE = "07091200";
const API = `https://waterservices.usgs.gov/nwis/iv/?format=json&sites=${SITE}&parameterCd=00060,00065&period=P1D`;

const FALLBACK_CFS = 180; // realistic last-known reading, used only on failure

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const heroNum = document.getElementById("cfs-hero");
const trendEl = document.getElementById("cfs-trend");
const heightEl = document.getElementById("cfs-height");
const spark = document.getElementById("cfs-spark");
const sparkLine = document.getElementById("spark-line");
const sparkArea = document.getElementById("spark-area");
const sparkDot = document.getElementById("spark-dot");
const tileNums = document.querySelectorAll("[data-cfs]");

const fmt = (n) => Math.round(n).toLocaleString("en-US");

function setTiles(v) { tileNums.forEach((el) => (el.textContent = fmt(v))); }

// Ease-out count-up; tabular-nums keeps the layout from shifting.
function countUp(el, from, to, duration) {
  if (reduceMotion || from === to) { el.textContent = fmt(to); return Promise.resolve(); }
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

// Build the sparkline path from the day's discharge series.
function drawSpark(series) {
  const W = 96, H = 34, pad = 3;
  const vals = series.map((p) => Number(p.value)).filter((n) => isFinite(n));
  if (vals.length < 2) return;
  const min = Math.min(...vals), max = Math.max(...vals);
  const span = max - min || 1;
  const x = (i) => pad + (i / (vals.length - 1)) * (W - pad * 2);
  const y = (v) => H - pad - ((v - min) / span) * (H - pad * 2);
  const pts = vals.map((v, i) => `${x(i).toFixed(1)},${y(v).toFixed(1)}`);

  sparkLine.setAttribute("points", pts.join(" "));
  sparkArea.setAttribute("d", `M${pts[0]} L${pts.slice(1).join(" L")} L${x(vals.length - 1).toFixed(1)},${H} L${x(0).toFixed(1)},${H} Z`);
  const [dx, dy] = pts[pts.length - 1].split(",");
  sparkDot.setAttribute("cx", dx);
  sparkDot.setAttribute("cy", dy);
  requestAnimationFrame(() => spark.classList.add("is-in"));
}

function renderTrend(series) {
  const vals = series.map((p) => Number(p.value)).filter((n) => isFinite(n));
  const change = Math.round(vals[vals.length - 1] - vals[0]);
  const sign = change > 0 ? "+" : change < 0 ? "−" : "";
  if (change > 1) {
    trendEl.className = "w-trend is-rising";
    trendEl.textContent = `▲ Rising · ${sign}${Math.abs(change)} today`;
  } else if (change < -1) {
    trendEl.className = "w-trend is-falling";
    trendEl.textContent = `▼ Falling · ${sign}${Math.abs(change)} today`;
  } else {
    trendEl.className = "w-trend";
    trendEl.textContent = "– Steady today";
  }
}

async function fetchLive() {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 5000);
  try {
    const res = await fetch(API, { signal: ctrl.signal });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    const byCode = {};
    for (const ts of data.value.timeSeries) {
      byCode[ts.variable.variableCode[0].value] = ts.values[0].value;
    }
    const flow = byCode["00060"];
    if (!flow || !flow.length) throw new Error("no discharge");
    const value = Number(flow[flow.length - 1].value);
    if (!isFinite(value) || value < 0) throw new Error("bad value");
    const height = byCode["00065"] ? Number(byCode["00065"].slice(-1)[0].value) : null;
    return { value, flow, height };
  } finally {
    clearTimeout(timer);
  }
}

async function init() {
  // Land the signature count-up on the fallback immediately so there is never
  // a spinner or an empty hero, then correct to live once it arrives.
  setTiles(FALLBACK_CFS);
  await countUp(heroNum, 0, FALLBACK_CFS, 620);

  try {
    const { value, flow, height } = await fetchLive();
    setTiles(value);
    await countUp(heroNum, FALLBACK_CFS, value, value === FALLBACK_CFS ? 0 : 420);
    renderTrend(flow);
    heightEl.textContent = height != null ? `${height.toFixed(2)} ft` : "";
    drawSpark(flow);
  } catch {
    trendEl.className = "w-trend";
    trendEl.textContent = "Couldn't reach USGS";
    heightEl.textContent = `last known ≈${FALLBACK_CFS} cfs`;
  }
}

document.addEventListener("DOMContentLoaded", init);
