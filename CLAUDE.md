You tend to converge toward generic, "on distribution" outputs. In frontend design, this creates what users call the "AI slop" aesthetic. Avoid this: make creative, distinctive frontends that surprise and delight. Focus on:
 
Typography: Choose fonts that are beautiful, unique, and interesting. Avoid generic fonts like Arial and Inter; opt instead for distinctive choices that elevate the frontend's aesthetics.
 
Color & Theme: Commit to a cohesive aesthetic. Use CSS variables for consistency. Dominant colors with sharp accents outperform timid, evenly-distributed palettes. Draw from IDE themes and cultural aesthetics for inspiration.
 
Motion: Use animations for effects and micro-interactions. Prioritize CSS-only solutions for HTML. Use Motion library for React when available. Focus on high-impact moments: one well-orchestrated page load with staggered reveals (animation-delay) creates more delight than scattered micro-interactions.
 
Backgrounds: Create atmosphere and depth rather than defaulting to solid colors. Layer CSS gradients, use geometric patterns, or add contextual effects that match the overall aesthetic.
 
Avoid generic AI-generated aesthetics:
- Overused font families (Inter, Roboto, Arial, system fonts)
- Clich‚d color schemes (particularly purple gradients on white backgrounds)
- Predictable layouts and component patterns
- Cookie-cutter design that lacks context-specific character
 
Interpret creatively and make unexpected choices that feel genuinely designed for the context. Vary between light and dark themes, different fonts, different aesthetics. You still tend to converge on common choices (Space Grotesk, for example) across generations. Avoid this: it is critical that you think outside the box!

# Design Guide - [Studio Name] Landing Page

> Drop this into CLAUDE.md (or reference it from there). It defines the brand, voice, and visual system for the landing page of a portfolio of iOS homescreen widget apps. Where this guide and a specific instruction from the developer conflict, the developer wins.

## What this studio is

A one-person studio building small, single-purpose iOS homescreen widgets. Each app shows **one number the user checks every day**, pulled from free public data sources, rendered big and legible on the homescreen.

- **First app:** river flow (CFS) from USGS gauges. Origin story: the Arkansas River at Salida, Colorado.
- **Roadmap:** snowpack (SNOTEL), tides (NOAA), buoy conditions (NDBC), aurora/Kp index, sun/golden hour. All share an outdoor-enthusiast audience.
- **The pitch, verbatim:** no account signup, no ads, no subscriptions, no marketing emails. One-time $0.99. The number on your homescreen.

The competition wraps free widgets inside busy, feature-heavy apps (multi-gauge lists, small type, subscription upsells). This studio wins on **taste and restraint**, not features. The landing page must embody that: it is itself the proof of the product philosophy. If the landing page feels busy, cluttered, or salesy, it has failed regardless of how good it looks.

## The page's single job

Convince a person who checks one number daily (a paddler, an angler, a skier) that these apps respect their attention and their dollar - then send them to the App Store. Secondary job: host per-app privacy policy and support pages that Apple requires (each is one paragraph; these apps collect nothing).

## Signature element: the page is a homescreen

The hero is **a live widget**. Render an iOS-widget-styled tile (correct corner radius ~22px, correct small/medium widget proportions) showing the *actual current CFS* for the Arkansas River at Salida, fetched client-side from the USGS Water Services API (`https://waterservices.usgs.gov/nwis/iv/?format=json&sites=07091200&parameterCd=00060` - verify site code in repo). Big number, gauge name, timestamp, nothing else. Caption it plainly: "The Arkansas River at Salida, right now."

This is the whole thesis in one element: real data, one number, glanceable, no login between you and it. As more apps ship, the portfolio section becomes a grid of these live widget tiles - the page literally becomes a homescreen. Spend all the design boldness here; keep everything else quiet.

Fallback: if the fetch fails, show a realistic static value with an honest stale timestamp - never a spinner as the hero, never fake "live" data without a timestamp.

## Layout

Single page, short. Roughly:

```
[wordmark]                    [App Store link]

        THE LIVE WIDGET (hero)
   one-line thesis under it, quiet

  ---- the promise, as plain prose ----
  (no accounts / no ads / no subs / $0.99,
   written as a paragraph, not an icon grid)

  ---- the apps ----
  widget-tile grid: shipped apps live,
  upcoming apps greyed "in the works"

  ---- who makes this ----
  two sentences. one person, Salida, CO.

[footer: privacy ú support ú email]
```

No nav bar with anchor links, no sticky header, no cookie banner (there are no cookies), no newsletter capture, no testimonials, no logo carousel, no FAQ accordion. Every section the page doesn't have is a feature.

Content max-width around 640-720px for prose; the widget grid can breathe wider. Generous whitespace - the density target is "iOS Settings page," not "SaaS landing page."

## Type

Typography does the branding work, because the product is typography (a big legible number).

- **The number** (hero CFS value, widget tiles): a tabular-lining numeric face with real presence. First choice: **SF Pro Display / system-ui at heavy weight** - it's what the actual widgets use, and matching them is honest. Acceptable alternative if more character is wanted: a geometric mono like **IBM Plex Mono** or **JetBrains Mono** at bold, which evokes instrument readouts.
- **Body:** system font stack (`-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`). This is a deliberate choice, not laziness: zero font download, native feel, reinforces "this is an iOS-native product." Do not load a webfont for body text.
- **Scale:** hero number 96-128px, section text ~17-18px/1.6, captions/timestamps 13px. Use font-variant-numeric: tabular-nums anywhere a number can update.

## Color

Ground the palette in the subject: cold water, river stone, instrument readout. Neutral studio palette; each app contributes one accent (so the portfolio grid gets natural variety without the page itself being colorful).

- `--ink: #14181D` - near-black, cold not warm (text, dark widget tiles)
- `--paper: #F7F9F9` - cool off-white background (not cream - avoid warm-cream tones entirely)
- `--stone: #5C6670` - secondary text, timestamps
- `--river: #2E6F8E` - the river app's accent: cold, glacial blue-teal (links, the live CFS number)
- `--hairline: #E2E7E9` - borders, dividers
- Future app accents (reserve, don't invent others): snowpack `#7C8FA6`, tides `#3D6B5C`, aurora `#4A5D8A`

Dark mode: invert to ink background, and let widget tiles go light-on-dark like real iOS widgets. Respect `prefers-color-scheme`.

Hard avoids: warm cream + terracotta combos, acid green on black, purple-blue gradients, glassmorphism blur cards. If a color choice would look at home on a generic AI-generated landing page, pick again.

## Motion

One orchestrated moment: on load, the hero widget's number counts up to the live value over ~600ms (tabular nums prevent layout shift), then the timestamp fades in. That's it. No scroll-triggered reveals, no parallax, no hover lifts on everything. Respect `prefers-reduced-motion` (skip the count-up, show the value).

## Voice and copy

Write like the developer talks: plain, direct, a little dry. First person singular is fine ("I build small widgets"). Rules:

- Say the price. "$0.99, once." Never "affordable" or "premium."
- Say what's absent concretely: "No account. No ads. No subscription. No analytics." Never "privacy-first" or "we respect your privacy" as marketing copy - show it, and let the one-paragraph privacy policy be the receipt.
- Name the user's actual moment: checking the river before deciding to paddle after work; checking snowpack over coffee. Never "stay informed" or "at your fingertips."
- No exclamation points. No "supercharge," "seamless," "beautiful," "delightful," or "reimagined."
- Buttons say what they do: "Get it on the App Store," "Read the privacy policy."

The privacy policy page keeps the same design and tone. Model text: "This app makes requests directly to the public USGS Water Services API from your device. It collects no personal data, sets no identifiers, and phones home to no one. There is nothing to opt out of." One page per app plus a support page (an email address is sufficient).

## Technical constraints

The page should dogfood the ethos:

- Static HTML/CSS with a small amount of vanilla JS for the live fetch. No framework, no build step required to read the source.
- Zero third-party requests except the USGS API call (and future NOAA/NRCS calls for other live tiles). No analytics, no fonts CDN, no tag managers. `view-source:` should be pleasant.
- Fast: aim for one HTML file + one CSS file + one JS file, well under 100KB total before images.
- Responsive down to 320px; the widget tiles stack single-column on phones. Visible keyboard focus states. Semantic HTML (the page is simple enough that this is free).
- App Store links use Apple's official badge asset per their marketing guidelines.

## Self-check before shipping

Would this page look wrong with a subscription pricing table on it? It should - the design should be so quiet and honest that upsell furniture would feel like graffiti. If any element could be swapped onto a generic SaaS landing page without looking out of place, cut or redesign it.
