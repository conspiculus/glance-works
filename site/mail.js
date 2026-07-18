/* ============================================================
   Glance Works — email assembly.
   The address is never written into the HTML source; address
   harvesters scrape `mailto:` hrefs and anything matching
   name@domain, so both are absent until this runs. Markup ships
   a spelled-out fallback ("info at glance-works dot com") which
   stays readable with JS off and matches neither pattern.

   Usage: <a data-mail>info at glance-works dot com</a>
          add data-mail-label="Support" to set the link text.
   ============================================================ */

const USER = "info";
const DOMAIN = "glance-works.com";

function assembleMail() {
  const address = USER + String.fromCharCode(64) + DOMAIN;
  for (const el of document.querySelectorAll("[data-mail]")) {
    el.setAttribute("href", "ma" + "ilto:" + address);
    el.textContent = el.dataset.mailLabel || address;
  }
}

document.addEventListener("DOMContentLoaded", assembleMail);
