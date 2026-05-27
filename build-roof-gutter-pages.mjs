import fs from 'fs';
import path from 'path';

const SITE = path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1'));
const DOMAIN = 'https://www.upnorthpressurewashing.com';
const GOOGLE_REVIEW = 'https://g.page/r/CSCaz34lDtneEBE/review';

function loadCities() {
  const code = fs.readFileSync(path.join(SITE, 'build-site.mjs'), 'utf8');
  const start = code.indexOf('const CITIES = [');
  const arrStart = code.indexOf('[', start);
  const arrEnd = code.indexOf('\n];', start) + 2;
  // eslint-disable-next-line no-eval
  return eval(code.slice(arrStart, arrEnd + 1));
}

const CITIES = loadCities();

function sf(slug, type) {
  const map = {
    soft: `soft-washing-${slug}.html`,
    roof: `roof-soft-washing-${slug}.html`,
    gutter: `gutter-fascia-cleaning-${slug}.html`,
    concrete: `concrete-washing-${slug}.html`,
    commercial: `commercial-soft-washing-${slug}.html`,
    window: `window-cleaning-${slug}.html`,
    deck: `deck-restoration-${slug}.html`,
    blog: `blog-soft-washing-home-value-${slug}.html`,
  };
  return map[type];
}

function imgDataJson(obj) {
  return `const IMGDATA = ${JSON.stringify(obj)};\nconst ALTDATA = ${JSON.stringify(obj.alt || {})};`.replace('"alt":', '').replace(/,\s*}/, '}');
}

function altData(city, service) {
  const n = city.name;
  if (service === 'roof') {
    return {
      HERO_BEFORE: `Before roof soft washing in ${n}, ${city.state} — asphalt shingles with black streak algae and moss | Up North Pressure Washing`,
      HERO_AFTER: `After roof soft washing in ${n}, ${city.state} — clean roof shingles after gentle soft-wash treatment | Up North Pressure Washing`,
      BUNDLE_BEFORE: `Before full exterior soft washing in ${n}, ${city.state} — home with dirty roof and algae-streaked siding | Up North Pressure Washing`,
      BUNDLE_AFTER: `After full exterior soft washing in ${n}, ${city.state} — restored roof and bright siding | Up North Pressure Washing`,
    };
  }
  return {
    HERO_BEFORE: `Before gutter and fascia cleaning in ${n}, ${city.state} — black streaks on white aluminum gutters and soffits | Up North Pressure Washing`,
    HERO_AFTER: `After gutter and fascia cleaning in ${n}, ${city.state} — bright clean gutters and fascia boards | Up North Pressure Washing`,
    SOFFIT_BEFORE: `Before exterior soft washing in ${n}, ${city.state} — dirty siding and fascia with organic growth | Up North Pressure Washing`,
    SOFFIT_AFTER: `After exterior soft washing in ${n}, ${city.state} — clean siding, soffits, and roofline | Up North Pressure Washing`,
  };
}

function baGrid(sliders) {
  return sliders.map(s => `
      <div class="ba-card reveal">
        <div class="cap"><h3>${s.title}</h3><span>${s.span}</span></div>
        <div class="ba" data-before="${s.before}" data-after="${s.after}"></div>
      </div>`).join('');
}

function citySelectOptions(city) {
  return [...new Set([city.name, ...city.nearby.slice(0, 3), 'Surrounding area'])]
    .map(o => `<option>${o}</option>`).join('');
}

function replaceAllCity(text, city) {
  return text.replace(/\bDuluth's\b/g, city.possessive || `${city.name}'s`).replace(/\bDuluth\b/g, city.name);
}

function footCol(city) {
  const s = city.slug;
  return `<div class="foot-col"><h4>${city.name} Pages</h4>
      <a href="${city.hubFile}">${city.name} Home</a>
      <a href="${sf(s, 'soft')}">Soft Washing</a>
      <a href="${sf(s, 'roof')}">Roof Soft Washing</a>
      <a href="${sf(s, 'gutter')}">Gutter Cleaning</a>
      <a href="${sf(s, 'concrete')}">Concrete Washing</a>
      <a href="${sf(s, 'deck')}">Deck Restoration</a>
      <a href="${sf(s, 'window')}">Window Cleaning</a>
      <a href="${sf(s, 'commercial')}">Commercial</a>
      <a href="${sf(s, 'blog')}">Home Value Guide</a>
      <a href="blog-index.html">Learning Center</a>
      <a href="gallery.html">Photo Gallery</a>
      <a href="reviews.html">Reviews</a>
    </div>`;
}

function footAreas(city) {
  return `<div class="foot-col"><h4>Service Areas</h4>${[city.name, ...city.nearby.slice(0, 3)].map(a => `<p>${a}</p>`).join('')}</div>`;
}

function accentStyle(hueA, hueB, shift) {
  return `<style>
.atmosphere{background:
  radial-gradient(120% 80% at ${70 + shift % 20}% -10%, ${hueA} 0%, transparent 55%),
  radial-gradient(100% 70% at ${10 + shift % 15}% 0%, ${hueB} 0%, transparent 50%),
  linear-gradient(180deg,#0e1d2a 0%,#0c1824 40%,#0b1622 100%)}
</style>`;
}

function serviceSchema(city, serviceName, url, desc) {
  return `<script type="application/ld+json">
{"@context":"https://schema.org","@type":"Service","name":"${serviceName}","description":"${desc}","provider":{"@type":"LocalBusiness","name":"Up North Pressure Washing","telephone":"+12185768610","url":"${DOMAIN}/"},"areaServed":{"@type":"City","name":"${city.name}, ${city.state}"},"url":"${url}"}
</script>`;
}

const ROOF_IMG = {
  HERO_BEFORE: 'images/ba/roof-before.jpg',
  HERO_AFTER: 'images/ba/roof-after.jpg',
  BUNDLE_BEFORE: 'images/ba/hero-before.jpg',
  BUNDLE_AFTER: 'images/ba/hero-after.jpg',
};

const GUTTER_IMG = {
  HERO_BEFORE: 'images/ba/stucco-before.jpg',
  HERO_AFTER: 'images/ba/stucco-after.jpg',
  SOFFIT_BEFORE: 'images/ba/hero-before.jpg',
  SOFFIT_AFTER: 'images/ba/hero-after.jpg',
};

const ROOF_SLIDERS = [
  { before: 'HERO_BEFORE', after: 'HERO_AFTER', title: 'Black Streaks Removed', span: 'Roof Soft Washing' },
  { before: 'BUNDLE_BEFORE', after: 'BUNDLE_AFTER', title: 'Roof + Siding Bundle', span: 'Full Exterior' },
];

const GUTTER_SLIDERS = [
  { before: 'HERO_BEFORE', after: 'HERO_AFTER', title: 'Gutter Tiger Stripes Gone', span: 'Gutters & Fascia' },
  { before: 'SOFFIT_BEFORE', after: 'SOFFIT_AFTER', title: 'Soffit & Roofline Bright', span: 'Full Exterior' },
];

function roofAccordions(city) {
  const n = city.name;
  const r = city.region;
  return `<div class="reveal">
      <div class="acc">
        <div class="acc-head"><h3>Black Streak Roof Treatment</h3><div class="ic"></div></div>
        <div class="acc-body"><div class="inner">
          <div class="badge"><svg viewBox="0 0 24 24" fill="none"><path d="M3 12a9 9 0 0 1 9-9 9 9 0 0 1 9 9" stroke="#7fc6e8" stroke-width="1.6"/></svg></div>
          <div><p>Remove <b>Gloeocapsa algae streaks</b> from ${n} roofs without voiding shingle warranties. Low-pressure soft washing kills growth at the root — never harsh blasting.</p>
          <div class="feat"><span>Algae streaks</span><span>Warranty-safe</span><span>Low pressure</span></div></div>
        </div></div>
      </div>
      <div class="acc">
        <div class="acc-head"><h3>Moss &amp; Lichen Removal</h3><div class="ic"></div></div>
        <div class="acc-body"><div class="inner">
          <div class="badge"><svg viewBox="0 0 24 24" fill="none"><path d="M3 11l9-7 9 7v9H3z" stroke="#7fc6e8" stroke-width="1.6" stroke-linejoin="round"/></svg></div>
          <div><p>North-facing slopes and tree cover keep ${n} roofs damp — perfect for moss. Professional treatment removes growth that traps moisture through ${r}'s freeze-thaw cycles.</p>
          <div class="feat"><span>Moss &amp; lichen</span><span>North slopes</span><span>Moisture control</span></div></div>
        </div></div>
      </div>
      <div class="acc">
        <div class="acc-head"><h3>Full Roof Soft Wash</h3><div class="ic"></div></div>
        <div class="acc-body"><div class="inner">
          <div class="badge"><svg viewBox="0 0 24 24" fill="none"><path d="M12 3v3M12 18v3M3 12h3M18 12h3" stroke="#7fc6e8" stroke-width="1.5" stroke-linecap="round"/></svg></div>
          <div><p><b>Our most requested roof service</b> in ${n}. Complete soft-wash treatment of asphalt shingles — cleaner curb appeal and extended roof life before premature replacement.</p>
          <div class="feat"><span>Full roof</span><span>Curb appeal</span><span>Most popular</span></div></div>
        </div></div>
      </div>
      <div class="acc">
        <div class="acc-head"><h3>Roof + Siding + Gutter Bundle</h3><div class="ic"></div></div>
        <div class="acc-body"><div class="inner">
          <div class="badge"><svg viewBox="0 0 24 24" fill="none"><path d="M4 7h16M4 12h16M4 17h10" stroke="#7fc6e8" stroke-width="1.6" stroke-linecap="round"/></svg></div>
          <div><p>Coordinate roof, siding, and <span class="gold">gutter brightening</span> in one visit for ${n} homes — one setup, cohesive results, and runoff that will not re-stain cleaned surfaces.</p>
          <div class="feat"><span>Roof + siding</span><span>Gutters</span><span>One visit</span></div></div>
        </div></div>
      </div>
    </div>`;
}

function gutterAccordions(city) {
  const n = city.name;
  return `<div class="reveal">
      <div class="acc">
        <div class="acc-head"><h3>Gutter Brightening</h3><div class="ic"></div></div>
        <div class="acc-body"><div class="inner">
          <div class="badge"><svg viewBox="0 0 24 24" fill="none"><path d="M3 12a9 9 0 0 1 9-9 9 9 0 0 1 9 9" stroke="#7fc6e8" stroke-width="1.6"/></svg></div>
          <div><p>Remove <b>black tiger stripes</b> from white and colored aluminum gutters on ${n} homes. Soft washing treats the algae causing streaks — without denting gutters or peeling paint.</p>
          <div class="feat"><span>Tiger stripes</span><span>Aluminum-safe</span><span>Soft wash</span></div></div>
        </div></div>
      </div>
      <div class="acc">
        <div class="acc-head"><h3>Fascia &amp; Soffit Cleaning</h3><div class="ic"></div></div>
        <div class="acc-body"><div class="inner">
          <div class="badge"><svg viewBox="0 0 24 24" fill="none"><path d="M3 11l9-7 9 7v9H3z" stroke="#7fc6e8" stroke-width="1.6" stroke-linejoin="round"/></svg></div>
          <div><p>Brighten the entire roofline — fascia boards, soffits, and trim around ${n} properties. Organic growth and pollen film dull the roofline fast in ${city.region}.</p>
          <div class="feat"><span>Fascia</span><span>Soffits</span><span>Roofline</span></div></div>
        </div></div>
      </div>
      <div class="acc">
        <div class="acc-head"><h3>Full Exterior Roofline Package</h3><div class="ic"></div></div>
        <div class="acc-body"><div class="inner">
          <div class="badge"><svg viewBox="0 0 24 24" fill="none"><path d="M12 3v3M12 18v3M3 12h3M18 12h3" stroke="#7fc6e8" stroke-width="1.5" stroke-linecap="round"/></svg></div>
          <div><p><b>Most popular bundle</b> — gutters, fascia, soffits, and lower siding cleaned together so ${n} homes look uniformly sharp from the curb.</p>
          <div class="feat"><span>Full roofline</span><span>Siding splash</span><span>Most popular</span></div></div>
        </div></div>
      </div>
      <div class="acc">
        <div class="acc-head"><h3>Commercial Box Gutters &amp; Canopies</h3><div class="ic"></div></div>
        <div class="acc-body"><div class="inner">
          <div class="badge"><svg viewBox="0 0 24 24" fill="none"><path d="M4 7h16M4 12h16M4 17h10" stroke="#7fc6e8" stroke-width="1.6" stroke-linecap="round"/></svg></div>
          <div><p>Retail and office buildings across ${n} with visible box gutters, entry canopies, and facades — scheduled soft washing keeps portfolios looking professional.</p>
          <div class="feat"><span>Commercial</span><span>Canopies</span><span>Recurring plans</span></div></div>
        </div></div>
      </div>
    </div>`;
}

function testimonialsRoof(city) {
  const loc = `${city.name}, ${city.state}`;
  return `<div class="test-grid">
      <div class="test reveal">
        <div class="stars">★★★★★</div>
        <p class="quote">"Great experience from start to finish. The siding and roof were covered in buildup and now it looks fresh and clean again. Communication was solid and the results speak for themselves."</p>
        <div class="who">Sarah L.<small>${loc}</small></div>
      </div>
      <div class="test reveal">
        <div class="stars">★★★★★</div>
        <p class="quote">"Black streaks gone from the roof without any damage to the shingles. They explained the soft-wash process and the house looks years newer from the street."</p>
        <div class="who">Local Homeowner<small>${loc}</small></div>
      </div>
    </div>
    <p class="reveal" style="text-align:center;margin-top:1.2rem"><a href="reviews.html" style="color:var(--ice);font-weight:600;text-decoration:none">Read all customer reviews →</a> · <a href="gallery.html" style="color:var(--ice);font-weight:600;text-decoration:none">See roof photos</a></p>`;
}

function testimonialsGutter(city) {
  const loc = `${city.name}, ${city.state}`;
  return `<div class="test-grid">
      <div class="test reveal">
        <div class="stars">★★★★★</div>
        <p class="quote">"We recently had the steel siding and trim on our home and garage power washed by Up North Pressure Washing. Henry did a thorough and complete job. He was punctual, easy to work with, and paid attention to details. The siding looks like new!"</p>
        <div class="who">Sandy &amp; Mike Bailey<small>${loc}</small></div>
      </div>
      <div class="test reveal">
        <div class="stars">★★★★★</div>
        <p class="quote">"Our gutters had terrible black streaks — they cleaned the whole roofline including fascia and soffits. Huge difference in curb appeal. Highly recommend in ${city.name}."</p>
        <div class="who">Local Homeowner<small>${loc}</small></div>
      </div>
    </div>
    <p class="reveal" style="text-align:center;margin-top:1.2rem"><a href="reviews.html" style="color:var(--ice);font-weight:600;text-decoration:none">Read all customer reviews →</a> · <a href="gallery.html" style="color:var(--ice);font-weight:600;text-decoration:none">See exterior photos</a></p>`;
}

function stripEducation(html) {
  return html.replace(/<!-- EDUCATION-LINKS -->[\s\S]*?(?=<!-- FOOTER -->|<footer)/, '');
}

function applyPage(html, city, kind) {
  const s = city.slug;
  const loc = `${city.name}, ${city.state}`;
  const nearby = city.nearby.slice(0, 3).join(', ');
  const isRoof = kind === 'roof';
  const file = sf(s, kind);
  const url = `${DOMAIN}/${file}`;
  let out = stripEducation(html);

  const title = isRoof
    ? `Roof Cleaning ${loc} | Moss & Black Streak Removal`
    : `Gutter Cleaning ${loc} | Fascia & Soffit Brightening`;
  const desc = isRoof
    ? `Professional roof cleaning in ${loc}. Soft-wash removes moss, algae & black streaks without damaging shingles — warranty-safe. Free quotes: 218-576-8610.`
    : `Gutter cleaning in ${loc}. Remove tiger stripes, algae & grime from gutters, fascia & soffits — soft-wash safe. Free quotes: 218-576-8610.`;
  const h1 = isRoof ? `Roof Cleaning<br><em>${loc}</em>` : `Gutter Cleaning<br><em>${loc}</em>`;
  const lede = isRoof
    ? `Black streaks and moss on <strong>${city.name} roofs</strong> are more than cosmetic — they hold moisture and shorten shingle life in ${city.region}'s damp climate. Our <strong>roof soft washing in ${loc}</strong> removes algae and moss with <strong>low pressure and proper chemistry</strong> — the manufacturer-approved approach that protects your warranty.`
    : `Black streaks on gutters and dull fascia boards make ${city.name} homes look older than they are. Our <strong>gutter and fascia cleaning in ${loc}</strong> uses <strong>soft washing</strong> to remove algae, pollen film, and organic buildup from your entire roofline — without denting aluminum or damaging paint.`;
  const serving = isRoof
    ? `Roof soft washing across ${city.name} &amp; ${city.region} — asphalt shingles, moss treatment &amp; full exterior bundles.`
    : `Gutter, fascia &amp; soffit cleaning across ${city.name} &amp; ${city.region} — residential &amp; commercial rooflines.`;

  out = out.replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`);
  out = out.replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${desc}">`);
  out = out.replace(/<link rel="canonical" href="[^"]*">/, `<link rel="canonical" href="${url}">`);
  out = out.replace(/<meta property="og:title" content="[^"]*">/, `<meta property="og:title" content="${title}">`);
  out = out.replace(/<meta property="og:description" content="[^"]*">/, `<meta property="og:description" content="${desc}">`);
  out = out.replace(/<meta property="og:url" content="[^"]*">/, `<meta property="og:url" content="${url}">`);
  out = out.replace(/<meta name="twitter:title" content="[^"]*">/, `<meta name="twitter:title" content="${title}">`);
  out = out.replace(/<meta name="twitter:description" content="[^"]*">/, `<meta name="twitter:description" content="${desc}">`);

  const schemaName = isRoof ? 'Roof Soft Washing' : 'Gutter & Fascia Cleaning';
  out = out.replace(/<script type="application\/ld\+json">[\s\S]*?"@type":"Service"[\s\S]*?<\/script>/,
    serviceSchema(city, schemaName, url, desc.replace(/"/g, '\\"')));

  out = out.replace(/<h1>[\s\S]*?<\/h1>/, `<h1>${h1}</h1>`);
  out = out.replace(/<span class="dot"><\/span>Duluth · Hermantown · Proctor/, `<span class="dot"></span>${city.name} · ${nearby}`);
  out = out.replace(/<p class="lede">[\s\S]*?<\/p>/, `<p class="lede">${lede}</p>`);
  out = out.replace(/<p class="serving">[\s\S]*?<\/p>/, `<p class="serving">${serving}</p>`);

  out = out.replace(/1-Year<\/span><span class="lbl">Regrowth Guarantee/, isRoof ? 'Warranty-<br>Safe</span><span class="lbl">Soft Wash Method' : 'Finish-<br>Safe</span><span class="lbl">On Gutters');
  out = out.replace(/100%<\/span><span class="lbl">Low-Pressure Safe/, isRoof ? 'Moss &amp;<br>Algae</span><span class="lbl">Removed' : 'Full<br>Roofline</span><span class="lbl">Brightening');
  out = out.replace(/Real Duluth Results/, `Real ${city.name} Results`);

  const sliders = isRoof ? ROOF_SLIDERS : GUTTER_SLIDERS;
  out = out.replace(/<div class="ba-grid">[\s\S]*?<\/div>\s*<p class="fit-note">/,
    `<div class="ba-grid">${baGrid(sliders)}\n    </div>\n    <p class="fit-note">`);
  out = out.replace(/genuine soft washing results on homes right here in Northern Minnesota\./,
    isRoof
      ? `genuine roof soft washing results from homes across ${city.name} and ${city.region}.`
      : `real gutter and fascia cleaning results from ${city.name} properties.`);

  const svcHead = isRoof
    ? `Roof Soft Washing Options<br>For <span class="ice">${city.name} Homes</span>`
    : `Gutter &amp; Fascia Options<br>For <span class="ice">${city.name} Properties</span>`;
  out = out.replace(/Soft Washing Options<br>For <span class="ice">Duluth Homes<\/span>/, svcHead);
  out = out.replace(/<div class="reveal">\s*<div class="acc">[\s\S]*?<\/div>\s*<div class="svc-cta"><a href="#quote" class="btn-gold">Get a Free/,
    `${isRoof ? roofAccordions(city) : gutterAccordions(city)}\n    <div class="svc-cta"><a href="#quote" class="btn-gold">Get a Free`);

  const cta = isRoof ? `Get a Free ${city.name} Roof Soft Wash Quote` : `Get a Free ${city.name} Gutter Cleaning Quote`;
  out = out.replace(/Get a Free Soft Washing Quote/, cta);
  out = out.replace(/Get a Free Duluth Soft Washing Quote/, cta);

  const procTitle = isRoof ? 'roof soft wash' : 'gutter &amp; fascia clean';
  out = out.replace(/Our <span class="gold">soft wash<\/span> process/, `Our <span class="gold">${procTitle}</span> process`);
  out = out.replace(/engineered for Duluth's moisture, shade, and seasonal buildup\./,
    isRoof
      ? `designed for ${city.possessive || city.name + "'s"} damp climate, tree shade, and algae-friendly north slopes.`
      : `built for ${city.possessive || city.name + "'s"} pollen seasons, lake humidity, and organic growth on rooflines.`);

  if (isRoof) {
    out = out.replace(/<h3>Inspect<\/h3><p>We assess your siding, roof, and the growth specific to your shaded, lakeside exposure\./,
      `<h3>Inspect</h3><p>We assess your ${city.name} roof — slope exposure, shingle type, moss vs. algae, and problem areas.`);
    out = out.replace(/<h3>Treat<\/h3><p>Biodegradable solutions break down algae and mold at the root — no blasting required\./,
      `<h3>Treat</h3><p>Low-pressure application with roof-safe chemistry kills algae and moss at the root — never high PSI on shingles.`);
    out = out.replace(/<h3>Rinse<\/h3><p>A gentle, low-pressure rinse lifts every trace of buildup while protecting your finishes\./,
      `<h3>Rinse</h3><p>A gentle rinse removes dead growth while protecting granules and manufacturer warranties.`);
    out = out.replace(/<h3>Guarantee<\/h3><p>Backed for a full year\. If growth returns within that window, we make it right\./,
      `<h3>Protect</h3><p>Results last longer because spores are eliminated — not just rinsed. Bundle with gutters to prevent immediate re-streaking.`);
  } else {
    out = out.replace(/<h3>Inspect<\/h3><p>We assess your siding, roof, and the growth specific to your shaded, lakeside exposure\./,
      `<h3>Inspect</h3><p>We walk your ${city.name} roofline — gutter material, streak severity, fascia condition, and soffit access.`);
    out = out.replace(/<h3>Treat<\/h3><p>Biodegradable solutions break down algae and mold at the root — no blasting required\./,
      `<h3>Treat</h3><p>Soft-wash solutions dwell on gutters and fascia to kill the algae causing tiger stripes — no ladder scrubbing.`);
    out = out.replace(/<h3>Rinse<\/h3><p>A gentle, low-pressure rinse lifts every trace of buildup while protecting your finishes\./,
      `<h3>Rinse</h3><p>Low-pressure rinse from top to bottom leaves gutters, soffits, and trim uniformly bright.`);
    out = out.replace(/<h3>Guarantee<\/h3><p>Backed for a full year\. If growth returns within that window, we make it right\./,
      `<h3>Bundle</h3><p>Pair with roof or siding soft washing so runoff does not re-stain cleaned surfaces immediately.`);
  }

  const whyHead = isRoof ? 'Why roof soft wash' : 'Why soft-wash gutters';
  const whyH2 = isRoof
    ? `Safe on shingles.<br><span class="ice">Tough on black streaks.</span>`
    : `Bright rooflines.<br><span class="ice">No dented gutters.</span>`;
  const whyList = isRoof ? `<ul>
        <li><span class="ck"><svg viewBox="0 0 24 24" fill="none"><path d="M4 12l5 5L20 6" stroke="#7fc6e8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></span><div><b>Never pressure-wash shingles.</b> <span>High PSI strips granules and voids warranties. Soft washing is the industry standard for ${city.name} roofs.</span></div></li>
        <li><span class="ck"><svg viewBox="0 0 24 24" fill="none"><path d="M4 12l5 5L20 6" stroke="#7fc6e8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></span><div><b>Kills moss and algae.</b> <span>Treatment eliminates spores — not just the visible streaks — for longer-lasting results.</span></div></li>
        <li><span class="ck"><svg viewBox="0 0 24 24" fill="none"><path d="M4 12l5 5L20 6" stroke="#7fc6e8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></span><div><b>Built for ${city.name}.</b> <span>Designed for ${city.region}'s moisture, shade, and freeze-thaw roof conditions.</span></div></li>
        <li><span class="ck"><svg viewBox="0 0 24 24" fill="none"><path d="M4 12l5 5L20 6" stroke="#7fc6e8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></span><div><b>Costs less than early replacement.</b> <span>Clean roofs protect your biggest asset and boost curb appeal before selling.</span></div></li>
      </ul>` : `<ul>
        <li><span class="ck"><svg viewBox="0 0 24 24" fill="none"><path d="M4 12l5 5L20 6" stroke="#7fc6e8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></span><div><b>No dented aluminum.</b> <span>Soft washing clears tiger stripes without the damage pressure washing causes on ${city.name} gutters.</span></div></li>
        <li><span class="ck"><svg viewBox="0 0 24 24" fill="none"><path d="M4 12l5 5L20 6" stroke="#7fc6e8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></span><div><b>Whole roofline reset.</b> <span>Gutters, fascia, and soffits cleaned together for a cohesive look.</span></div></li>
        <li><span class="ck"><svg viewBox="0 0 24 24" fill="none"><path d="M4 12l5 5L20 6" stroke="#7fc6e8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></span><div><b>Prevents fascia rot.</b> <span>Removing organic buildup helps moisture drain properly through ${city.region} wet seasons.</span></div></li>
        <li><span class="ck"><svg viewBox="0 0 24 24" fill="none"><path d="M4 12l5 5L20 6" stroke="#7fc6e8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></span><div><b>Bundle and save.</b> <span>Pair with roof or siding soft washing in one coordinated visit.</span></div></li>
      </ul>`;

  out = out.replace(/<span class="eyebrow"><span class="dot"><\/span>Why Soft Wash<\/span>[\s\S]*?<\/ul>/,
    `<span class="eyebrow"><span class="dot"></span>${whyHead}</span>
      <h2 style="font-size:clamp(1.9rem,4.5vw,2.8rem)">${whyH2}</h2>
      ${whyList}`);

  const guarHead = isRoof ? 'Warranty-Safe' : 'Finish-Safe';
  const guarText = isRoof
    ? `Every roof soft wash we complete in ${city.name} uses low pressure and manufacturer-aligned methods — never harsh blasting on asphalt shingles. <b style="color:#fff">Protect your roof, your warranty, and your curb appeal.</b>`
    : `Every gutter and fascia cleaning job in ${city.name} uses soft washing calibrated for aluminum, painted trim, and soffits. <b style="color:#fff">Bright rooflines without dents, peels, or ladder streaks.</b>`;
  out = out.replace(/The <span class="gold">1-Year<\/span> Guarantee/, `The <span class="gold">${guarHead}</span> Guarantee`);
  out = out.replace(/Every soft washing job we complete in Duluth is backed by a full one-year guarantee\. Our process is built to handle Duluth's moisture, shade, and seasonal buildup — delivering long-lasting results without harsh pressure\. <b style="color:#fff">If growth comes back within a year, we make it right\.<\/b>/, guarText);

  out = out.replace(/<div class="test-grid">[\s\S]*?<div class="svc-cta reveal" style="margin-top:2rem/,
    `${isRoof ? testimonialsRoof(city) : testimonialsGutter(city)}\n    <div class="svc-cta reveal" style="margin-top:2rem`);

  out = out.replace(/What Duluth <span class="ice">homeowners<\/span> are saying/,
    `What ${city.name} <span class="ice">homeowners</span> are saying`);

  const opts = isRoof
    ? `<option>Full Roof Soft Wash</option><option>Black Streak Treatment</option><option>Moss Removal</option><option>Roof + Siding Bundle</option><option>Custom Solution</option>`
    : `<option>Gutter Brightening</option><option>Fascia &amp; Soffit Cleaning</option><option>Full Roofline Package</option><option>Commercial Gutters</option><option>Custom Solution</option>`;
  out = out.replace(/<option>Full House Soft Wash<\/option>[\s\S]*?<option>Custom Solution<\/option>/, opts);
  out = out.replace(/<select id="city">[\s\S]*?<\/select>/, `<select id="city">${citySelectOptions(city)}</select>`);
  out = out.replace(/placeholder="Type of siding, problem areas, square footage, anything helpful\.\.\."/,
    isRoof
      ? `placeholder="Roof type, stories, black streaks or moss, bundle with siding — anything helpful..."`
      : `placeholder="Gutter type, streak severity, fascia/soffit, commercial or residential — anything helpful..."`);
  out = out.replace(/Tell us a little about your home and we'll get back to you with a no-pressure estimate\./,
    isRoof
      ? `Tell us about your ${city.name} roof and we'll get back with a no-pressure soft wash estimate.`
      : `Tell us about your ${city.name} gutters or roofline and we'll get back with a free estimate.`);
  out = out.replace(/free soft washing quote/, isRoof ? 'free roof soft wash quote' : 'free gutter cleaning quote');

  out = out.replace(/href="index\.html"/g, `href="${city.hubFile}"`);
  out = out.replace(/Premium soft washing for Duluth &amp; the North Shore\. Gentle on your home, tough on buildup\./,
    isRoof
      ? `Roof soft washing for ${city.name} &amp; ${city.region}. Gentle on shingles — tough on moss and black streaks.`
      : `Gutter &amp; fascia cleaning for ${city.name} &amp; ${city.region}. Soft wash safe — bright rooflines.`);

  out = out.replace(/<div class="foot-col"><h4>Duluth Pages<\/h4>[\s\S]*?<a href="reviews\.html">Reviews<\/a>\s*<\/div>/, footCol(city));
  const footSvc = isRoof
    ? `<div class="foot-col"><h4>Services</h4><a href="#services">Black Streaks</a><a href="#services">Moss Removal</a><a href="#services">Full Roof Wash</a><a href="${sf(s, 'gutter')}">Gutter Cleaning</a></div>`
    : `<div class="foot-col"><h4>Services</h4><a href="#services">Gutter Brightening</a><a href="#services">Fascia &amp; Soffit</a><a href="#services">Roofline Package</a><a href="${sf(s, 'roof')}">Roof Soft Wash</a></div>`;
  out = out.replace(/<div class="foot-col"><h4>Service Areas<\/h4>[\s\S]*?<div class="foot-col"><h4>Get Started<\/h4>/,
    `${footAreas(city)}\n      ${footSvc}\n      <div class="foot-col"><h4>Get Started</h4>`);

  const guarantee = isRoof ? 'Warranty-Safe Roof Soft Wash' : 'Finish-Safe Gutter Cleaning';
  out = out.replace(/© 2026 Up North Pressure Washing · Duluth, MN · 1-Year Soft Wash Guarantee/,
    `© 2026 Up North Pressure Washing · ${loc} · ${guarantee}`);
  out = replaceAllCity(out, city);

  const imgs = isRoof ? ROOF_IMG : GUTTER_IMG;
  const alts = altData(city, kind);
  out = out.replace(/const IMGDATA = \{[\s\S]*?\};\s*const ALTDATA = \{[\s\S]*?\};/,
    `const IMGDATA = ${JSON.stringify(imgs)};\nconst ALTDATA = ${JSON.stringify(alts)};`);
  if (!out.includes('const ALTDATA')) {
    out = out.replace(/const IMGDATA = \{[\s\S]*?\};/,
      `const IMGDATA = ${JSON.stringify(imgs)};\nconst ALTDATA = ${JSON.stringify(alts)};`);
  }

  const hues = isRoof ? ['#1a2838', '#0e1820'] : ['#1a2a1a', '#101810'];
  out = out.replace(/<style>\s*\.atmosphere\{background:[\s\S]*?<\/style>/, '');
  out = out.replace('</head>', `${accentStyle(hues[0], hues[1], city.slug.length * 7)}\n</head>`);

  return out;
}

function patchFootColOnPage(html, city) {
  return html.replace(/<div class="foot-col"><h4>[^<]*Pages<\/h4>[\s\S]*?<a href="reviews\.html">Reviews<\/a>\s*<\/div>/, footCol(city));
}

function wireHub(html, city) {
  const s = city.slug;
  let out = html;
  const roofLi = `<li><a href="${sf(s, 'roof')}">Roof Cleaning</a></li>`;
  const gutterLi = `<li><a href="${sf(s, 'gutter')}">Gutter Cleaning</a></li>`;

  if (!out.includes(`href="${sf(s, 'roof')}"`)) {
    out = out.replace(
      /(<li><a href="[^"]*soft-washing-[^"]*">Soft Washing<\/a><\/li>)/,
      `$1\n      ${roofLi}\n      ${gutterLi}`
    );
  }
  out = out.replace(
    /<li><a href="blog-index\.html">Learning Center<\/a>\s*<a href="gallery\.html">Photo Gallery<\/a>\s*<a href="reviews\.html">Reviews<\/a><\/li>/,
    `<li><a href="blog-index.html">Learning Center</a></li>\n      <li><a href="gallery.html">Photo Gallery</a></li>\n      <li><a href="reviews.html">Reviews</a></li>`
  );
  if (!out.includes('gallery.html')) {
    out = out.replace(
      /<li><a href="blog-index\.html">Learning Center<\/a><\/li>/,
      `<li><a href="blog-index.html">Learning Center</a></li>\n      <li><a href="gallery.html">Photo Gallery</a></li>\n      <li><a href="reviews.html">Reviews</a></li>`
    );
  }
  return out;
}

function main() {
  const tpl = fs.readFileSync(path.join(SITE, 'soft-washing-duluth.html'), 'utf8');
  const created = [];

  for (const city of CITIES) {
    const roofFile = sf(city.slug, 'roof');
    fs.writeFileSync(path.join(SITE, roofFile), applyPage(tpl, city, 'roof'));
    created.push(roofFile);

    const gutterFile = sf(city.slug, 'gutter');
    fs.writeFileSync(path.join(SITE, gutterFile), applyPage(tpl, city, 'gutter'));
    created.push(gutterFile);
  }

  const serviceRe = /^(soft-washing|concrete-washing|commercial-soft-washing|window-cleaning|deck-restoration|roof-soft-washing|gutter-fascia-cleaning)-(.+)\.html$/;
  let footers = 0;
  for (const f of fs.readdirSync(SITE).filter(x => x.endsWith('.html'))) {
    const m = f.match(serviceRe);
    if (!m) continue;
    const city = CITIES.find(c => c.slug === m[2]);
    if (!city) continue;
    const fp = path.join(SITE, f);
    let html = fs.readFileSync(fp, 'utf8');
    const orig = html;
    html = patchFootColOnPage(html, city);
    if (html !== orig) { fs.writeFileSync(fp, html); footers++; }
  }

  const hubFiles = ['index.html', ...CITIES.map(c => c.hubFile).filter((f, i, a) => a.indexOf(f) === i && f !== 'index.html')];
  for (const f of hubFiles) {
    const fp = path.join(SITE, f);
    if (!fs.existsSync(fp)) continue;
    const city = CITIES.find(c => c.hubFile === f) || CITIES[0];
    let html = fs.readFileSync(fp, 'utf8');
    html = wireHub(html, city);
    fs.writeFileSync(fp, html);
  }

  console.log(`Created ${created.length} roof + gutter service pages (${CITIES.length} cities × 2)`);
  console.log(`Updated footers on ${footers} service pages`);
  console.log(`Wired ${hubFiles.length} hub pages with roof/gutter links`);
}

main();
