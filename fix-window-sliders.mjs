import fs from 'fs';
import path from 'path';

const SITE = path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1'));

function loadCities() {
  const code = fs.readFileSync(path.join(SITE, 'build-site.mjs'), 'utf8');
  const start = code.indexOf('const CITIES = [');
  const arrStart = code.indexOf('[', start);
  const arrEnd = code.indexOf('\n];', start) + 2;
  // eslint-disable-next-line no-eval
  return eval(code.slice(arrStart, arrEnd + 1));
}

const CITIES = loadCities();
const BRAND = 'Up North Pressure Washing';

const WINDOW_IMG = {
  HERO_BEFORE: 'images/window-res-before.jpg',
  HERO_AFTER: 'images/window-res-after.jpg',
  STORE_BEFORE: 'images/window-before.jpg',
  STORE_AFTER: 'images/window-after.jpg',
};

function windowAlts(city) {
  const loc = `${city.name}, ${city.state}`;
  const a = (when, detail) => `${when} window cleaning in ${loc} — ${detail} | ${BRAND}`;
  return {
    HERO_BEFORE: a('Before', 'filmy glass on the same residential window with hard-water spotting'),
    HERO_AFTER: a('After', 'crystal-clear glass on the same window with streak-free clarity'),
    STORE_BEFORE: a('Before commercial window cleaning', 'storefront glass with salt film and traffic grime'),
    STORE_AFTER: a('After commercial window cleaning', 'spotless commercial glass facade and entry doors'),
  };
}

const TWO_SLIDERS = `
      <div class="ba-card reveal">
        <div class="cap"><h3>Crystal Clear Glass</h3><span>Same Window — Before &amp; After</span></div>
        <div class="ba" data-before="HERO_BEFORE" data-after="HERO_AFTER"></div>
      </div>
      <div class="ba-card reveal">
        <div class="cap"><h3>Storefront Presentation</h3><span>Commercial Glass</span></div>
        <div class="ba" data-before="STORE_BEFORE" data-after="STORE_AFTER"></div>
      </div>`;

function patchWindowPage(html, city) {
  const alts = windowAlts(city);
  let out = html;
  out = out.replace(/<div class="ba-grid">[\s\S]*?<\/div>\s*<p class="fit-note">/,
    `<div class="ba-grid">${TWO_SLIDERS}\n    </div>\n    <p class="fit-note">`);
  out = out.replace(
    /const IMGDATA = \{[\s\S]*?\};\s*const ALTDATA = \{[\s\S]*?\};/,
    `const IMGDATA = ${JSON.stringify(WINDOW_IMG)};\nconst ALTDATA = ${JSON.stringify(alts)};`
  );
  return out;
}

// Update build-service-pages.mjs
let build = fs.readFileSync(path.join(SITE, 'build-service-pages.mjs'), 'utf8');
build = build.replace(
  /const WINDOW_SLIDERS = \[[\s\S]*?\];/,
  `const WINDOW_SLIDERS = [
  { before: 'HERO_BEFORE', after: 'HERO_AFTER', title: 'Crystal Clear Glass', span: 'Same Window — Before & After' },
  { before: 'STORE_BEFORE', after: 'STORE_AFTER', title: 'Storefront Presentation', span: 'Commercial Glass' },
];`
);
build = build.replace(
  /const WINDOW_IMG = \{[\s\S]*?\};/,
  `const WINDOW_IMG = {
  HERO_BEFORE: 'images/window-res-before.jpg',
  HERO_AFTER: 'images/window-res-after.jpg',
  STORE_BEFORE: 'images/window-before.jpg',
  STORE_AFTER: 'images/window-after.jpg',
};`
);
fs.writeFileSync(path.join(SITE, 'build-service-pages.mjs'), build);

let n = 0;
for (const city of CITIES) {
  const f = `window-cleaning-${city.slug}.html`;
  const fp = path.join(SITE, f);
  if (!fs.existsSync(fp)) continue;
  fs.writeFileSync(fp, patchWindowPage(fs.readFileSync(fp, 'utf8'), city));
  n++;
}
console.log(`Fixed ${n} window pages — 2 sliders, same-window residential pair`);
