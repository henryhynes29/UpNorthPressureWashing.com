import fs from 'fs';
import path from 'path';

const SITE = path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1'));
const DOMAIN = 'https://www.upnorthpressurewashing.com';
const GOOGLE_REVIEW = 'https://g.page/r/CSCaz34lDtneEBE/review';
const PHONE = '218-576-8610';
const PHONE_TEL = 'tel:+12185768610';

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
    concrete: `concrete-washing-${slug}.html`,
    commercial: `commercial-soft-washing-${slug}.html`,
    window: `window-cleaning-${slug}.html`,
    deck: `deck-restoration-${slug}.html`,
    blog: `blog-soft-washing-home-value-${slug}.html`,
  };
  return map[type];
}

function imgDataJson(obj) {
  return `const IMGDATA = ${JSON.stringify(obj)};`;
}

function baGrid(sliders) {
  return sliders.map(s => `
      <div class="ba-card reveal">
        <div class="cap"><h3>${s.title}</h3><span>${s.span}</span></div>
        <div class="ba" data-before="${s.before}" data-after="${s.after}"></div>
      </div>`).join('');
}

function footCol(city) {
  const s = city.slug;
  const hub = city.hubFile;
  return `<div class="foot-col"><h4>${city.name} Pages</h4>
      <a href="${hub}">${city.name} Home</a>
      <a href="${sf(s, 'soft')}">Soft Washing</a>
      <a href="${sf(s, 'concrete')}">Concrete Washing</a>
      <a href="${sf(s, 'deck')}">Deck Restoration</a>
      <a href="${sf(s, 'window')}">Window Cleaning</a>
      <a href="${sf(s, 'commercial')}">Commercial</a>
      <a href="${sf(s, 'blog')}">Home Value Guide</a>
      <a href="blog-index.html">Learning Center</a>
    </div>`;
}

function citySelectOptions(city) {
  const opts = [city.name, ...city.nearby.slice(0, 3), 'Surrounding area'];
  return [...new Set(opts)].map(o => `<option>${o}</option>`).join('');
}

function replaceAllDuluth(text, city) {
  return text
    .replace(/\bDuluth's\b/g, city.possessive || `${city.name}'s`)
    .replace(/\bDuluth\b/g, city.name);
}

function windowAccordions(city) {
  const n = city.name;
  const r = city.region;
  return `<div class="reveal">
      <div class="acc">
        <div class="acc-head"><h3>Maintenance Window Cleaning</h3><div class="ic"></div></div>
        <div class="acc-body"><div class="inner">
          <div class="badge"><svg viewBox="0 0 24 24" fill="none"><path d="M3 12a9 9 0 0 1 9-9 9 9 0 0 1 9 9" stroke="#7fc6e8" stroke-width="1.6"/><path d="M12 12l4-4" stroke="#7fc6e8" stroke-width="1.6" stroke-linecap="round"/></svg></div>
          <div><p>Ideal for <b>${n} homes</b> on a regular schedule. We remove pollen, dust, and light hard-water film before it bakes onto glass — keeping views sharp through ${r}'s seasonal swings.</p>
          <div class="feat"><span>Twice yearly</span><span>Pollen &amp; dust</span><span>Streak-free</span></div></div>
        </div></div>
      </div>
      <div class="acc">
        <div class="acc-head"><h3>Full Home Window Wash</h3><div class="ic"></div></div>
        <div class="acc-body"><div class="inner">
          <div class="badge"><svg viewBox="0 0 24 24" fill="none"><path d="M3 11l9-7 9 7v9H3z" stroke="#7fc6e8" stroke-width="1.6" stroke-linejoin="round"/></svg></div>
          <div><p><b>Our most popular service</b> in ${n}. Interior and exterior panes, tracks, frames, and screens — removing <span class="ice">salt film, hard-water spots, and grime</span> that dull natural light.</p>
          <div class="feat"><span>Inside &amp; out</span><span>Tracks &amp; screens</span><span>Most popular</span></div></div>
        </div></div>
      </div>
      <div class="acc">
        <div class="acc-head"><h3>Commercial Storefront Glass</h3><div class="ic"></div></div>
        <div class="acc-body"><div class="inner">
          <div class="badge"><svg viewBox="0 0 24 24" fill="none"><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1" stroke="#7fc6e8" stroke-width="1.5" stroke-linecap="round"/></svg></div>
          <div><p>For <b>${n} storefronts and offices</b> where first impressions matter. Scheduled cleaning keeps entry glass, display windows, and door glass <span class="gold">crystal clear</span> for customers and tenants.</p>
          <div class="feat"><span>Storefronts</span><span>After-hours</span><span>Recurring plans</span></div></div>
        </div></div>
      </div>
      <div class="acc">
        <div class="acc-head"><h3>Custom Multi-Story Solution</h3><div class="ic"></div></div>
        <div class="acc-body"><div class="inner">
          <div class="badge"><svg viewBox="0 0 24 24" fill="none"><path d="M4 7h16M4 12h16M4 17h10" stroke="#7fc6e8" stroke-width="1.6" stroke-linecap="round"/></svg></div>
          <div><p>Tailored plans for <b>multi-story homes, lakefront properties, and mixed commercial buildings</b> in ${n}. Pure-water pole systems and professional squeegee work — built around ${city.possessive || `${n}'s`} access and exposure.</p>
          <div class="feat"><span>Multi-story</span><span>Pure-water</span><span>Custom schedule</span></div></div>
        </div></div>
      </div>
    </div>`;
}

function deckAccordions(city) {
  const n = city.name;
  return `<div class="reveal">
      <div class="acc">
        <div class="acc-head"><h3>Seasonal Deck Maintenance</h3><div class="ic"></div></div>
        <div class="acc-body"><div class="inner">
          <div class="badge"><svg viewBox="0 0 24 24" fill="none"><path d="M3 12a9 9 0 0 1 9-9 9 9 0 0 1 9 9" stroke="#7fc6e8" stroke-width="1.6"/><path d="M12 12l4-4" stroke="#7fc6e8" stroke-width="1.6" stroke-linecap="round"/></svg></div>
          <div><p>Light organic growth on <b>${n} decks</b> cleared before it turns boards green and slippery. Soft-wash maintenance extends stain life and keeps outdoor spaces safe through wet seasons.</p>
          <div class="feat"><span>Annual care</span><span>Algae prevention</span><span>Wood-safe</span></div></div>
        </div></div>
      </div>
      <div class="acc">
        <div class="acc-head"><h3>Full Deck Restoration</h3><div class="ic"></div></div>
        <div class="acc-body"><div class="inner">
          <div class="badge"><svg viewBox="0 0 24 24" fill="none"><path d="M3 11l9-7 9 7v9H3z" stroke="#7fc6e8" stroke-width="1.6" stroke-linejoin="round"/></svg></div>
          <div><p><b>Our most requested wood service</b> in ${n}. Deep soft-wash restoration removes <span class="ice">gray oxidation, mildew, and algae</span> — preparing cedar, pine, and composite for stain or sealant.</p>
          <div class="feat"><span>Full deck</span><span>Stain-ready</span><span>Most popular</span></div></div>
        </div></div>
      </div>
      <div class="acc">
        <div class="acc-head"><h3>Fence &amp; Rail Brightening</h3><div class="ic"></div></div>
        <div class="acc-body"><div class="inner">
          <div class="badge"><svg viewBox="0 0 24 24" fill="none"><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1" stroke="#7fc6e8" stroke-width="1.5" stroke-linecap="round"/></svg></div>
          <div><p>Privacy fences, railings, and pergolas around ${n} properties restored without splintering wood. We lift years of <span class="gold">green growth and weathering</span> gently — never with destructive pressure.</p>
          <div class="feat"><span>Fences</span><span>Rails &amp; pergolas</span><span>Low-pressure</span></div></div>
        </div></div>
      </div>
      <div class="acc">
        <div class="acc-head"><h3>Custom Wood Care Plan</h3><div class="ic"></div></div>
        <div class="acc-body"><div class="inner">
          <div class="badge"><svg viewBox="0 0 24 24" fill="none"><path d="M4 7h16M4 12h16M4 17h10" stroke="#7fc6e8" stroke-width="1.6" stroke-linecap="round"/></svg></div>
          <div><p>Bundled deck, fence, dock, and adjacent concrete cleaning for <b>large ${n} properties</b>. One visit, coordinated restoration — ideal before selling or restaining.</p>
          <div class="feat"><span>Docks</span><span>Bundled services</span><span>Property-wide</span></div></div>
        </div></div>
      </div>
    </div>`;
}

function whyListWindow(city) {
  const n = city.name;
  return `<ul>
        <li><span class="ck"><svg viewBox="0 0 24 24" fill="none"><path d="M4 12l5 5L20 6" stroke="#7fc6e8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></span><div><b>Streak-free every pane.</b> <span>Professional squeegee and pure-water methods — no haze, no drips, no missed corners.</span></div></li>
        <li><span class="ck"><svg viewBox="0 0 24 24" fill="none"><path d="M4 12l5 5L20 6" stroke="#7fc6e8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></span><div><b>Built for ${n} glass.</b> <span>We tackle salt spray, hard-water spotting, and pollen common across ${city.region}.</span></div></li>
        <li><span class="ck"><svg viewBox="0 0 24 24" fill="none"><path d="M4 12l5 5L20 6" stroke="#7fc6e8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></span><div><b>Residential &amp; commercial.</b> <span>From lakefront homes to storefront entryways — same meticulous standard.</span></div></li>
        <li><span class="ck"><svg viewBox="0 0 24 24" fill="none"><path d="M4 12l5 5L20 6" stroke="#7fc6e8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></span><div><b>More light, better views.</b> <span>Clean windows transform how ${n} properties look inside and out.</span></div></li>
      </ul>`;
}

function whyListDeck(city) {
  const n = city.name;
  return `<ul>
        <li><span class="ck"><svg viewBox="0 0 24 24" fill="none"><path d="M4 12l5 5L20 6" stroke="#7fc6e8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></span><div><b>Never harsh blasting.</b> <span>Soft-wash wood restoration protects boards, rails, and fasteners — no splintering or furring.</span></div></li>
        <li><span class="ck"><svg viewBox="0 0 24 24" fill="none"><path d="M4 12l5 5L20 6" stroke="#7fc6e8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></span><div><b>Stain-ready surfaces.</b> <span>We remove algae and gray weathering so stain or sealant bonds properly on ${n} decks.</span></div></li>
        <li><span class="ck"><svg viewBox="0 0 24 24" fill="none"><path d="M4 12l5 5L20 6" stroke="#7fc6e8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></span><div><b>Safer underfoot.</b> <span>Slippery green growth on wet wood is a hazard — restoration makes decks usable again.</span></div></li>
        <li><span class="ck"><svg viewBox="0 0 24 24" fill="none"><path d="M4 12l5 5L20 6" stroke="#7fc6e8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></span><div><b>Tuned for ${n}.</b> <span>Designed for ${city.region}'s moisture, shade, and long freeze-thaw seasons.</span></div></li>
      </ul>`;
}

function testimonialsWindow(city) {
  const loc = `${city.name}, ${city.state}`;
  return `<div class="test-grid">
      <div class="test reveal">
        <div class="stars">★★★★★</div>
        <p class="quote">"Our windows hadn't been cleaned in years — the difference is incredible. Every pane is crystal clear and the crew was careful around our landscaping. Worth every penny in ${city.name}."</p>
        <div class="who">Local Homeowner<small>${loc}</small></div>
      </div>
      <div class="test reveal">
        <div class="stars">★★★★★</div>
        <p class="quote">"We needed storefront glass done before a busy weekend. Fast, professional, and streak-free. Our ${city.name} shop looks sharper than it has in a long time."</p>
        <div class="who">Business Owner<small>${loc}</small></div>
      </div>
    </div>`;
}

function testimonialsDeck(city) {
  const loc = `${city.name}, ${city.state}`;
  return `<div class="test-grid">
      <div class="test reveal">
        <div class="stars">★★★★★</div>
        <p class="quote">"Our deck was gray and slippery — they restored it without damaging the wood. It looks ready for stain and we can actually use it again. Great work in ${city.name}."</p>
        <div class="who">Local Homeowner<small>${loc}</small></div>
      </div>
      <div class="test reveal">
        <div class="stars">★★★★★</div>
        <p class="quote">"Fence and deck both done in one visit. No blasting, no mess — just clean wood and a huge curb appeal boost. Highly recommend for ${city.region} properties."</p>
        <div class="who">Property Owner<small>${loc}</small></div>
      </div>
    </div>`;
}

function footServiceAreas(city) {
  const areas = [city.name, ...city.nearby.slice(0, 3)];
  return `<div class="foot-col"><h4>Service Areas</h4>${areas.map(a => `<p>${a}</p>`).join('')}</div>`;
}

function footServicesWindow() {
  return `<div class="foot-col"><h4>Services</h4><a href="#services">Maintenance Cleaning</a><a href="#services">Full Home Wash</a><a href="#services">Storefront Glass</a><a href="#services">Multi-Story</a></div>`;
}

function footServicesDeck() {
  return `<div class="foot-col"><h4>Services</h4><a href="#services">Deck Restoration</a><a href="#services">Fence Brightening</a><a href="#services">Seasonal Care</a><a href="#services">Custom Wood Plans</a></div>`;
}

function accentStyle(service, city) {
  const hues = {
    window: ['#1a3a52', '#0e2433'],
    deck: ['#2a3a1a', '#1a2810'],
    commercial: ['#3a2a10', '#241808'],
  };
  const [a, b] = hues[service] || hues.window;
  const shift = city.slug.length * 7;
  return `<style>
.atmosphere{background:
  radial-gradient(120% 80% at ${70 + shift % 20}% -10%, ${a} 0%, transparent 55%),
  radial-gradient(100% 70% at ${10 + shift % 15}% 0%, ${b} 0%, transparent 50%),
  linear-gradient(180deg,#0e1d2a 0%,#0c1824 40%,#0b1622 100%)}
</style>`;
}

const WINDOW_SLIDERS = [
  { before: 'HERO_BEFORE', after: 'HERO_AFTER', title: 'Crystal Clear Glass', span: 'Same Window — Before & After' },
  { before: 'STORE_BEFORE', after: 'STORE_AFTER', title: 'Storefront Presentation', span: 'Commercial Glass' },
];

const DECK_SLIDERS = [
  { before: 'HERO_BEFORE', after: 'HERO_AFTER', title: 'Weathered Wood, Restored', span: 'Deck Boards' },
  { before: 'FENCE_BEFORE', after: 'FENCE_AFTER', title: 'Fence & Rail Brightening', span: 'Wood Fencing' },
  { before: 'PATIO_BEFORE', after: 'PATIO_AFTER', title: 'Patio & Walkway Reset', span: 'Adjacent Concrete' },
];

const COMMERCIAL_SLIDERS = [
  { before: 'HERO_BEFORE', after: 'HERO_AFTER', title: 'Dumpster Pad Transformed', span: 'Commercial Pad' },
  { before: 'LOT_BEFORE', after: 'LOT_AFTER', title: 'Parking Lot Deep Clean', span: 'Hot Water Concrete' },
  { before: 'GLASS_BEFORE', after: 'GLASS_AFTER', title: 'Storefront Glass', span: 'Window Cleaning' },
];

const WINDOW_IMG = {
  HERO_BEFORE: 'images/window-res-before.jpg',
  HERO_AFTER: 'images/window-res-after.jpg',
  STORE_BEFORE: 'images/window-before.jpg',
  STORE_AFTER: 'images/window-after.jpg',
};

const DECK_IMG = {
  HERO_BEFORE: "images/deck-before.jpg",
  HERO_AFTER: "images/deck-after.jpg",
  FENCE_BEFORE: "images/deck-process-before.jpg",
  FENCE_AFTER: "images/deck-process-after.jpg",
  PATIO_BEFORE: "images/concrete-before.jpg",
  PATIO_AFTER: "images/concrete-after.jpg"
};

const COMMERCIAL_IMG = {
  HERO_BEFORE: 'images/commercial-before.jpg', HERO_AFTER: 'images/commercial-after.jpg',
  LOT_BEFORE: 'images/concrete-before.jpg', LOT_AFTER: 'images/concrete-after.jpg',
  GLASS_BEFORE: 'images/window-before.jpg', GLASS_AFTER: 'images/window-after.jpg',
};

function applyWindowPage(html, city) {
  const s = city.slug;
  const loc = `${city.name}, ${city.state}`;
  const nearby = city.nearby.slice(0, 3).join(', ');
  let out = html;

  out = out.replace(/<title>[^<]*<\/title>/, `<title>Window Cleaning ${loc} | Up North Pressure Washing</title>`);
  out = out.replace(/<meta name="description" content="[^"]*">/,
    `<meta name="description" content="Professional window cleaning in ${loc}. Streak-free residential &amp; commercial glass — hard water, salt film &amp; pollen removed. Free quotes.">`);
  if (!out.includes('rel="canonical"')) {
    out = out.replace('</head>', `<link rel="canonical" href="${DOMAIN}/${sf(s, 'window')}">\n</head>`);
  } else {
    out = out.replace(/<link rel="canonical" href="[^"]*">/, `<link rel="canonical" href="${DOMAIN}/${sf(s, 'window')}">`);
  }

  out = out.replace(/Soft Washing Duluth, MN/g, `Window Cleaning ${loc}`);
  out = out.replace(/Soft Washing<br><em>Duluth, MN<\/em>/, `Window Cleaning<br><em>${loc}</em>`);
  out = out.replace(/<span class="dot"><\/span>Duluth · Hermantown · Proctor/,
    `<span class="dot"></span>${city.name} · ${nearby}`);
  out = out.replace(/<p class="lede">[\s\S]*?<\/p>/,
    `<p class="lede">${city.windowCopy}</p>`);
  out = out.replace(/<p class="serving">[\s\S]*?<\/p>/,
    `<p class="serving">Serving ${city.name} &amp; ${city.region} — ZIP ${city.zip} &amp; surrounding ${city.stateFull} communities.</p>`);

  out = out.replace(/1-Year<\/span><span class="lbl">Regrowth Guarantee/, 'Streak-Free</span><span class="lbl">Glass Guarantee');
  out = out.replace(/100%<\/span><span class="lbl">Low-Pressure Safe/, 'Inside &amp;<br>Out</span><span class="lbl">Available');
  out = out.replace(/Real Duluth Results/, `Real ${city.name} Results`);
  out = out.replace(/<div class="ba-grid">[\s\S]*?<\/div>\s*<p class="fit-note">/,
    `<div class="ba-grid">${baGrid(WINDOW_SLIDERS)}\n    </div>\n    <p class="fit-note">`);
  out = out.replace(/genuine soft washing results on homes right here in Northern Minnesota\./,
    `genuine window cleaning results on homes and businesses across ${city.name} and ${city.region}.`);

  out = out.replace(/Soft Washing Options<br>For <span class="ice">Duluth Homes<\/span>/,
    `Window Cleaning Options<br>For <span class="ice">${city.name} Properties</span>`);
  out = out.replace(/<div class="reveal">\s*<div class="acc">[\s\S]*?<\/div>\s*<div class="svc-cta"><a href="#quote" class="btn-gold">Get a Free/,
    `${windowAccordions(city)}\n    <div class="svc-cta"><a href="#quote" class="btn-gold">Get a Free`);
  out = out.replace(/Get a Free Soft Washing Quote/, `Get a Free ${city.name} Window Cleaning Quote`);

  out = out.replace(/Our <span class="gold">soft wash<\/span> process/,
    `Our <span class="gold">window cleaning</span> process`);
  out = out.replace(/engineered for Duluth's moisture, shade, and seasonal buildup\./,
    `built for ${city.possessive || city.name + "'s"} lake humidity, pollen seasons, and hard-water spotting.`);
  out = out.replace(/<h3>Inspect<\/h3><p>We assess your siding, roof, and the growth specific to your shaded, lakeside exposure\./,
    `<h3>Assess</h3><p>We walk your ${city.name} property, note hard-water stains, salt film, and screen conditions.`);
  out = out.replace(/<h3>Treat<\/h3><p>Biodegradable solutions break down algae and mold at the root — no blasting required\./,
    `<h3>Clean</h3><p>Professional squeegee and pure-water methods lift grime without streaks or residue.`);
  out = out.replace(/<h3>Rinse<\/h3><p>A gentle, low-pressure rinse lifts every trace of buildup while protecting your finishes\./,
    `<h3>Detail</h3><p>Tracks, frames, and sills get wiped down — not just the glass panes.`);
  out = out.replace(/<h3>Guarantee<\/h3><p>Backed for a full year\. If growth returns within that window, we make it right\./,
    `<h3>Inspect</h3><p>Final walk-through ensures every pane meets our streak-free standard.`);

  out = out.replace(/<span class="eyebrow"><span class="dot"><\/span>Why Soft Wash<\/span>[\s\S]*?<\/ul>/,
    `<span class="eyebrow"><span class="dot"></span>Why Pro Windows</span>
      <h2 style="font-size:clamp(1.9rem,4.5vw,2.8rem)">Clear glass. Sharp curb appeal.<br><span class="ice">Built for ${city.name}.</span></h2>
      ${whyListWindow(city)}`);
  out = out.replace(/The <span class="gold">1-Year<\/span> Guarantee/, `The <span class="gold">Streak-Free</span> Guarantee`);
  out = out.replace(/Every soft washing job we complete in Duluth is backed by a full one-year guarantee\. Our process is built to handle Duluth's moisture, shade, and seasonal buildup — delivering long-lasting results without harsh pressure\. <b style="color:#fff">If growth comes back within a year, we make it right\.<\/b>/,
    `Every window cleaning job we complete in ${city.name} is backed by our streak-free guarantee. We use professional squeegee and pure-water methods tuned for ${city.region} — salt film, hard-water spots, and pollen handled the right way. <b style="color:#fff">If you're not satisfied with the clarity, we make it right.</b>`);
  out = out.replace(/<div class="test-grid">[\s\S]*?<\/div>\s*<div class="svc-cta reveal" style="margin-top:2rem/,
    `${testimonialsWindow(city)}\n    <div class="svc-cta reveal" style="margin-top:2rem`);
  out = out.replace(/placeholder="Type of siding, problem areas, square footage, anything helpful\.\.\."/,
    `placeholder="Number of windows, stories, interior/exterior, hard-water issues — anything helpful..."`);
  out = out.replace(/Tell us a little about your home and we'll get back to you with a no-pressure estimate\./,
    `Tell us about your ${city.name} property and we'll get back with a no-pressure window cleaning estimate.`);
  out = out.replace(/What Duluth <span class="ice">homeowners<\/span> are saying/,
    `What ${city.name} <span class="ice">customers</span> are saying`);
  out = out.replace(/Mike S\.<small>Duluth, MN<\/small>/, `Local Homeowner<small>${loc}</small>`);
  out = out.replace(/Sarah L\.<small>Duluth, MN<\/small>/, `Business Owner<small>${loc}</small>`);

  out = out.replace(/<option>Full House Soft Wash<\/option>[\s\S]*?<option>Custom Solution<\/option>/,
    `<option>Full Home Window Wash</option><option>Maintenance Cleaning</option><option>Storefront Glass</option><option>Interior &amp; Exterior</option><option>Custom Solution</option>`);
  out = out.replace(/<select id="city">[\s\S]*?<\/select>/,
    `<select id="city">${citySelectOptions(city)}</select>`);
  out = out.replace(/free soft washing quote/, 'free window cleaning quote');

  out = out.replace(/href="index\.html"/g, `href="${city.hubFile}"`);
  out = out.replace(/Premium soft washing for Duluth &amp; the North Shore\. Gentle on your home, tough on buildup\./,
    `Streak-free window cleaning for ${city.name} &amp; ${city.region}. Residential and commercial glass.`);
  out = out.replace(/<div class="foot-col"><h4>Duluth Pages<\/h4>[\s\S]*?<a href="blog-index\.html">Learning Center<\/a>\s*<\/div>/,
    footCol(city));
  out = out.replace(/<div class="foot-col"><h4>Service Areas<\/h4>[\s\S]*?<div class="foot-col"><h4>Get Started<\/h4>/,
    `${footServiceAreas(city)}\n      ${footServicesWindow()}\n      <div class="foot-col"><h4>Get Started</h4>`);
  out = out.replace(/© 2026 Up North Pressure Washing · Duluth, MN · 1-Year Soft Wash Guarantee/,
    `© 2026 Up North Pressure Washing · ${loc} · Streak-Free Window Guarantee`);
  out = replaceAllDuluth(out, city);

  out = out.replace(/const IMGDATA = \{[\s\S]*?\};/, imgDataJson(WINDOW_IMG));
  if (!out.includes('accentStyle')) {
    out = out.replace('</head>', `${accentStyle('window', city)}\n</head>`);
  }
  return out;
}

function applyDeckPage(html, city) {
  const s = city.slug;
  const loc = `${city.name}, ${city.state}`;
  const nearby = city.nearby.slice(0, 3).join(', ');
  let out = html;

  out = out.replace(/<title>[^<]*<\/title>/, `<title>Deck &amp; Fence Restoration ${loc} | Up North Pressure Washing</title>`);
  out = out.replace(/<meta name="description" content="[^"]*">/,
    `<meta name="description" content="Deck &amp; fence restoration in ${loc}. Soft-wash wood cleaning removes algae &amp; gray weathering — safe prep for stain. Free quotes.">`);
  out = out.replace(/<link rel="canonical" href="[^"]*">/, `<link rel="canonical" href="${DOMAIN}/${sf(s, 'deck')}">`);

  out = out.replace(/Soft Washing<br><em>Duluth, MN<\/em>/, `Deck Restoration<br><em>${loc}</em>`);
  out = out.replace(/<span class="dot"><\/span>Duluth · Hermantown · Proctor/,
    `<span class="dot"></span>${city.name} · ${nearby}`);
  out = out.replace(/<p class="lede">[\s\S]*?<\/p>/,
    `<p class="lede">${city.deckCopy}</p>`);
  out = out.replace(/<p class="serving">[\s\S]*?<\/p>/,
    `<p class="serving">Wood restoration across ${city.name} &amp; ${city.region} — decks, fences, docks &amp; pergolas.</p>`);

  out = out.replace(/1-Year<\/span><span class="lbl">Regrowth Guarantee/, 'Wood-Safe</span><span class="lbl">Soft Wash Method');
  out = out.replace(/100%<\/span><span class="lbl">Low-Pressure Safe/, 'Stain-Ready</span><span class="lbl">Surfaces');
  out = out.replace(/Real Duluth Results/, `Real ${city.name} Deck Results`);
  out = out.replace(/<div class="ba-grid">[\s\S]*?<\/div>\s*<p class="fit-note">/,
    `<div class="ba-grid">${baGrid(DECK_SLIDERS)}\n    </div>\n    <p class="fit-note">`);
  out = out.replace(/genuine soft washing results on homes right here in Northern Minnesota\./,
    `real deck and fence restoration results from properties across ${city.name}.`);

  out = out.replace(/Soft Washing Options<br>For <span class="ice">Duluth Homes<\/span>/,
    `Deck &amp; Fence Options<br>For <span class="ice">${city.name} Outdoor Spaces</span>`);
  out = out.replace(/<div class="reveal">\s*<div class="acc">[\s\S]*?<\/div>\s*<div class="svc-cta"><a href="#quote" class="btn-gold">Get a Free/,
    `${deckAccordions(city)}\n    <div class="svc-cta"><a href="#quote" class="btn-gold">Get a Free`);
  out = out.replace(/Get a Free Soft Washing Quote/, `Get a Free ${city.name} Deck Quote`);

  out = out.replace(/Our <span class="gold">soft wash<\/span> process/,
    `Our <span class="gold">wood restoration</span> process`);
  out = out.replace(/engineered for Duluth's moisture, shade, and seasonal buildup\./,
    `designed for ${city.possessive || city.name + "'s"} moisture, shade, and wood weathering.`);
  out = out.replace(/<h3>Inspect<\/h3><p>We assess your siding, roof, and the growth specific to your shaded, lakeside exposure\./,
    `<h3>Inspect</h3><p>We assess your ${city.name} deck, fence, or dock — wood type, staining level, and problem areas.`);
  out = out.replace(/<h3>Treat<\/h3><p>Biodegradable solutions break down algae and mold at the root — no blasting required\./,
    `<h3>Treat</h3><p>Wood-safe soft-wash solutions break down algae and mildew at the root — no destructive pressure.`);
  out = out.replace(/<h3>Rinse<\/h3><p>A gentle, low-pressure rinse lifts every trace of buildup while protecting your finishes\./,
    `<h3>Restore</h3><p>A gentle low-pressure rinse lifts gray oxidation and green growth while protecting boards and rails.`);
  out = out.replace(/<h3>Guarantee<\/h3><p>Backed for a full year\. If growth returns within that window, we make it right\./,
    `<h3>Prep</h3><p>Surfaces are left stain-ready — bright, clean wood prepared for sealant or your next project.`);

  out = out.replace(/<span class="eyebrow"><span class="dot"><\/span>Why Soft Wash<\/span>[\s\S]*?<\/ul>/,
    `<span class="eyebrow"><span class="dot"></span>Why Soft-Wash Wood</span>
      <h2 style="font-size:clamp(1.9rem,4.5vw,2.8rem)">Safe on wood.<br><span class="ice">Tough on gray weathering.</span></h2>
      ${whyListDeck(city)}`);
  out = out.replace(/The <span class="gold">1-Year<\/span> Guarantee/, `The <span class="gold">Wood-Safe</span> Guarantee`);
  out = out.replace(/Every soft washing job we complete in Duluth is backed by a full one-year guarantee\. Our process is built to handle Duluth's moisture, shade, and seasonal buildup — delivering long-lasting results without harsh pressure\. <b style="color:#fff">If growth comes back within a year, we make it right\.<\/b>/,
    `Every deck restoration we complete in ${city.name} uses wood-safe soft washing — never harsh blasting. Our process is built for ${city.region}'s moisture and long winters. <b style="color:#fff">Surfaces are left clean, bright, and ready for stain.</b>`);
  out = out.replace(/<div class="test-grid">[\s\S]*?<\/div>\s*<div class="svc-cta reveal" style="margin-top:2rem/,
    `${testimonialsDeck(city)}\n    <div class="svc-cta reveal" style="margin-top:2rem`);
  out = out.replace(/placeholder="Type of siding, problem areas, square footage, anything helpful\.\.\."/,
    `placeholder="Deck size, wood type, fence sections, staining plans — anything helpful..."`);
  out = out.replace(/Tell us a little about your home and we'll get back to you with a no-pressure estimate\./,
    `Tell us about your ${city.name} deck or fence and we'll get back with a no-pressure restoration estimate.`);
  out = out.replace(/What Duluth <span class="ice">homeowners<\/span> are saying/,
    `What ${city.name} <span class="ice">homeowners</span> are saying`);

  out = out.replace(/<option>Full House Soft Wash<\/option>[\s\S]*?<option>Custom Solution<\/option>/,
    `<option>Full Deck Restoration</option><option>Seasonal Maintenance</option><option>Fence Brightening</option><option>Dock &amp; Pergola</option><option>Custom Wood Plan</option>`);
  out = out.replace(/<select id="city">[\s\S]*?<\/select>/,
    `<select id="city">${citySelectOptions(city)}</select>`);
  out = out.replace(/free soft washing quote/, 'free deck restoration quote');

  out = out.replace(/href="index\.html"/g, `href="${city.hubFile}"`);
  out = out.replace(/Premium soft washing for Duluth &amp; the North Shore\. Gentle on your home, tough on buildup\./,
    `Deck &amp; fence restoration for ${city.name} &amp; ${city.region}. Soft-wash wood care — never harsh blasting.`);
  out = out.replace(/<div class="foot-col"><h4>Duluth Pages<\/h4>[\s\S]*?<a href="blog-index\.html">Learning Center<\/a>\s*<\/div>/,
    footCol(city));
  out = out.replace(/<div class="foot-col"><h4>Service Areas<\/h4>[\s\S]*?<div class="foot-col"><h4>Get Started<\/h4>/,
    `${footServiceAreas(city)}\n      ${footServicesDeck()}\n      <div class="foot-col"><h4>Get Started</h4>`);
  out = out.replace(/© 2026 Up North Pressure Washing · Duluth, MN · 1-Year Soft Wash Guarantee/,
    `© 2026 Up North Pressure Washing · ${loc} · Wood-Safe Restoration`);
  out = replaceAllDuluth(out, city);

  out = out.replace(/const IMGDATA = \{[\s\S]*?\};/, imgDataJson(DECK_IMG));
  out = out.replace('</head>', `${accentStyle('deck', city)}\n</head>`);
  return out;
}

function applyCommercialImages(html, city) {
  const loc = `${city.name}, ${city.state}`;
  let out = html;

  out = out.replace(/<div class="ba-grid">[\s\S]*?<\/div>\s*<p class="fit-note">/,
    `<div class="ba-grid">${baGrid(COMMERCIAL_SLIDERS)}\n    </div>\n    <p class="fit-note">`);
  out = out.replace(/Real jobs, no filters or editing — genuine soft washing results — the same gentle, low-pressure process we bring to commercial properties across Duluth and the surrounding Northern Minnesota communities\./,
    `Real commercial results across ${city.name} — dumpster pads, parking lots, and storefront glass cleaned with professional-grade equipment.`);
  out = out.replace(/const IMGDATA = \{[\s\S]*?\};/, imgDataJson(COMMERCIAL_IMG));

  out = out.replace(/href="index\.html"/g, `href="${city.hubFile}"`);
  if (!out.includes('window-cleaning-')) {
    out = out.replace(/<div class="foot-col"><h4>[^<]*Pages<\/h4>[\s\S]*?<a href="blog-index\.html">Learning Center<\/a>\s*<\/div>/,
      footCol(city));
  }
  out = out.replace(new RegExp(`Commercial Soft Washing<br><em>Duluth, MN</em>`),
    `Commercial Cleaning<br><em>${loc}</em>`);
  out = out.replace(/Duluth · St Louis County, MN|Duluth · St\. Louis County, MN/,
    `${city.name} · ${city.region}`);
  return out;
}

function wireHub(html, city) {
  const s = city.slug;
  let out = html;

  out = out.replace(
    /(id="deck-restoration"[\s\S]*?<a class="btn btn--secondary" href=")[^"]+(">See Our Work)/,
    `$1${sf(s, 'deck')}$2`
  );
  out = out.replace(
    /(id="window-cleaning"[\s\S]*?<a class="btn btn--secondary" href=")[^"]+(">See Our Work)/,
    `$1${sf(s, 'window')}$2`
  );

  out = out.replace(
    /<li><a href="[^"]*#window-cleaning">Window Washing<\/a><\/li>/,
    `<li><a href="${sf(s, 'window')}">Window Washing</a></li>`
  );

  if (!out.includes(sf(s, 'deck'))) {
    const deckLink = `<li><a href="${sf(s, 'deck')}">Deck Restoration</a></li>`;
    if (!out.includes('Deck Restoration</a></li>')) {
      out = out.replace(
        /<li><a href="[^"]*">Commercial<\/a><\/li>/,
        `<li><a href="${sf(s, 'commercial')}">Commercial</a></li>${deckLink}`
      );
    }
  }

  out = out.replace(
    /<li><a href="[^"]*#window-cleaning">Window Cleaning<\/a><\/li>/,
    `<li><a href="${sf(s, 'window')}">Window Cleaning</a></li>`
  );

  return out;
}

function wireExistingServiceFooter(html, city) {
  if (html.includes('window-cleaning-')) return html;
  return html.replace(
    /<div class="foot-col"><h4>[^<]*Pages<\/h4>[\s\S]*?<a href="blog-index\.html">Learning Center<\/a>\s*<\/div>/,
    footCol(city)
  );
}

function main() {
  const softTpl = fs.readFileSync(path.join(SITE, 'soft-washing-duluth.html'), 'utf8');
  const commTpl = fs.readFileSync(path.join(SITE, 'commercial-soft-washing-duluth.html'), 'utf8');
  const created = [];

  for (const city of CITIES) {
    const windowPath = path.join(SITE, sf(city.slug, 'window'));
    fs.writeFileSync(windowPath, applyWindowPage(softTpl, city));
    created.push(sf(city.slug, 'window'));

    const deckPath = path.join(SITE, sf(city.slug, 'deck'));
    fs.writeFileSync(deckPath, applyDeckPage(softTpl, city));
    created.push(sf(city.slug, 'deck'));

    const commPath = path.join(SITE, sf(city.slug, 'commercial'));
    if (fs.existsSync(commPath)) {
      let comm = fs.readFileSync(commPath, 'utf8');
      comm = applyCommercialImages(comm, city);
      fs.writeFileSync(commPath, comm);
    } else {
      fs.writeFileSync(commPath, applyCommercialImages(commTpl, city));
    }
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

  for (const f of fs.readdirSync(SITE).filter(x => x.endsWith('.html'))) {
    if (!/^(soft-washing|concrete-washing|commercial-soft-washing)-/.test(f)) continue;
    const slug = f.replace(/^(soft-washing|concrete-washing|commercial-soft-washing)-/, '').replace('.html', '');
    const city = CITIES.find(c => c.slug === slug);
    if (!city) continue;
    const fp = path.join(SITE, f);
    let html = fs.readFileSync(fp, 'utf8');
    html = wireExistingServiceFooter(html, city);
    fs.writeFileSync(fp, html);
  }

  const broken = [];
  for (const f of created) {
    const html = fs.readFileSync(path.join(SITE, f), 'utf8');
    for (const m of html.matchAll(/src="(images\/[^"]+)"/g)) {
      if (!fs.existsSync(path.join(SITE, m[1]))) broken.push(`${f} → ${m[1]}`);
    }
    const idm = html.match(/const IMGDATA = (\{[\s\S]*?\});/);
    if (idm) {
      const data = JSON.parse(idm[1]);
      for (const v of Object.values(data)) {
        if (!fs.existsSync(path.join(SITE, v))) broken.push(`${f} → ${v}`);
      }
    }
  }

  console.log(`Created/updated ${created.length} window + deck pages`);
  console.log(`Updated ${CITIES.length} commercial pages with commercial/deck/window images`);
  console.log(`Wired ${hubFiles.length} hub pages`);
  console.log('Broken images:', broken.length ? broken.join('\n') : 'none');
}

main();
