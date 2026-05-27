import fs from 'fs';
import path from 'path';
import { spawnSync } from 'child_process';
import { DOMAIN, loadCities } from './city-links.mjs';

const SITE = path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1'));
const CITIES = loadCities();
const BRAND = 'Up North Pressure Washing';
const PHONE = '218-576-8610';
const GOOGLE_REVIEW = 'https://g.page/r/CSCaz34lDtneEBE/review';

const stats = {
  roofGutter: 0,
  hubs: 0,
  faq: 0,
  hubsMeta: 0,
  index: 0,
  blogs: 0,
};

function sf(slug, type) {
  const m = {
    soft: `soft-washing-${slug}.html`,
    roof: `roof-soft-washing-${slug}.html`,
    gutter: `gutter-fascia-cleaning-${slug}.html`,
    concrete: `concrete-washing-${slug}.html`,
    window: `window-cleaning-${slug}.html`,
    blogRoof: `blog-roof-soft-washing-${slug}.html`,
    blogGutter: `blog-gutter-fascia-cleaning-${slug}.html`,
  };
  return m[type];
}

function stateByName() {
  return new Map(CITIES.map(c => [c.name, c.state]));
}

function areaServed(city) {
  const map = stateByName();
  return [city.name, ...city.nearby.slice(0, 5)].map(n => ({
    '@type': 'City',
    name: n.includes(',') ? n : `${n}, ${map.get(n) || city.state}`,
  }));
}

function insertBeforeHeadClose(html, snippet) {
  return html.replace(/<\/head>/i, () => `${snippet}\n</head>`);
}

const FAQ_CSS = `<style id="rank-faq-css">.faq-sec{padding:70px 0}.faq-list{max-width:820px;margin:0 auto;display:flex;flex-direction:column;gap:12px}
.faq-item{background:var(--glass);border:1px solid var(--glass-line);border-radius:14px;padding:0 22px}
.faq-item summary{cursor:pointer;font-weight:600;color:#fff;padding:18px 0;list-style:none;font-family:'Fraunces',serif;font-size:1.05rem}
.faq-item summary::-webkit-details-marker{display:none}
.faq-item p{color:var(--text-dim);padding:0 0 18px;font-size:.98rem;line-height:1.65}
.related-svc{display:none!important}
.local-mn{padding:56px 0;background:rgba(127,198,232,.04);border-top:1px solid var(--line);border-bottom:1px solid var(--line)}
.local-mn .mn-grid{display:grid;grid-template-columns:1fr 1fr;gap:24px;max-width:900px;margin:24px auto 0}
.local-mn li{display:flex;gap:10px;color:var(--text-dim);font-size:.95rem;margin-bottom:10px}
@media(max-width:720px){.local-mn .mn-grid{grid-template-columns:1fr}}</style>`;

function roofMeta(city) {
  const loc = `${city.name}, ${city.state}`;
  return {
    title: `Roof Cleaning ${loc} | Moss & Black Streak Removal`,
    desc: `Professional roof cleaning in ${loc}. Soft-wash removes moss, algae & black streaks without damaging shingles — warranty-safe. Veteran-owned. Free quote: ${PHONE}.`,
    h1: `Roof Cleaning<br><em>${loc}</em>`,
    service: 'Roof Cleaning',
    og: `${DOMAIN}/images/ba/roof-after.jpg`,
  };
}

function gutterMeta(city) {
  const loc = `${city.name}, ${city.state}`;
  return {
    title: `Gutter Cleaning ${loc} | Fascia & Soffit Brightening`,
    desc: `Gutter cleaning in ${loc}. Remove tiger stripes, algae & grime from gutters, fascia & soffits — soft-wash safe for aluminum. Insured crews. Call ${PHONE}.`,
    h1: `Gutter Cleaning<br><em>${loc}</em>`,
    service: 'Gutter Cleaning',
    og: `${DOMAIN}/images/house-wash-after.jpg`,
  };
}

function roofFaqs(city) {
  const n = city.name;
  const loc = `${n}, ${city.state}`;
  return [
    [`How much does roof cleaning cost in ${n}?`, `Most ${n} roof cleaning quotes depend on roof size, pitch, moss severity, and whether you bundle gutters or siding. We provide free, itemized estimates — no surprise upsells.`],
    [`Is soft washing safe for asphalt shingles in ${loc}?`, `Yes. Manufacturer guidelines recommend low-pressure soft washing — not pressure washing — for algae and moss on asphalt shingles. We never blast granules off ${n} roofs.`],
    [`What causes black streaks on roofs in ${n}?`, `Black streaks are usually Gloeocapsa magma algae feeding on limestone filler in shingles. ${city.region}'s shade, humidity, and lake moisture accelerate growth on north-facing slopes.`],
    [`Can you remove moss from my ${n} roof?`, `We treat and remove moss with roof-safe chemistry and gentle rinsing — critical before ${city.state}'s freeze-thaw cycles trap moisture under growth.`],
    [`Should I clean my roof before selling my ${n} home?`, `Clean roofs photograph better for listings and signal maintenance to buyers across the ${city.region} market. It is one of the highest-ROI curb appeal upgrades.`],
    [`Do you serve ${city.nearby.slice(0, 2).join(' and ')} for roof cleaning?`, `Yes — we serve ${loc} and nearby communities from our Twin Ports base. Same-city pages keep quotes accurate for your exact service area.`],
    [`How often should ${n} homeowners clean their roof?`, `Most ${city.region} homes benefit every 2–4 years depending on tree cover and north exposure. We can recommend a schedule after inspecting your roofline.`],
    [`Can roof cleaning be bundled with gutters in ${n}?`, `Absolutely — bundling roof and gutter cleaning prevents runoff from re-streaking freshly cleaned gutters. One visit, coordinated results.`],
  ];
}

function gutterFaqs(city) {
  const n = city.name;
  const loc = `${n}, ${city.state}`;
  return [
    [`How much does gutter cleaning cost in ${n}?`, `Gutter cleaning in ${loc} is priced by linear feet, story height, streak severity, and whether fascia and soffits are included. Request a free quote for your exact roofline.`],
    [`What are tiger stripes on gutters in ${n}?`, `Tiger stripes are black algae lines on aluminum gutters caused by runoff and pollen. Soft washing treats the root cause — scrubbing alone returns quickly in ${city.region} humidity.`],
    [`Will pressure washing dent my gutters?`, `We do not pressure-wash gutters on ${n} homes. Soft washing removes buildup without denting aluminum or peeling painted fascia — the finish-safe method.`],
    [`Do you clean fascia and soffits in ${loc}?`, `Yes — our roofline package brightens gutters, fascia boards, and soffits together so your ${n} home looks uniformly sharp from the curb.`],
    [`Is gutter cleaning necessary before winter in ${city.state}?`, `Clear, bright gutters and fascia help moisture drain properly before ice and snow. Organic buildup holds water against trim through ${city.region} wet seasons.`],
    [`Do you offer commercial gutter cleaning in ${n}?`, `We clean box gutters, entry canopies, and multi-story facades for ${n} businesses — with after-hours scheduling and COI documentation available.`],
    [`Can gutters be cleaned the same day as roof washing?`, `Yes — coordinating both services prevents clean gutters from being re-streaked by roof runoff. Popular bundle for ${n} homeowners.`],
    [`How do I get a gutter cleaning quote in ${n}?`, `Call ${PHONE} or use the form on this page. We respond quickly with a no-pressure estimate for ${loc} properties.`],
  ];
}

function faqHtml(faqs, city, kind) {
  const items = faqs.map(([q, a]) =>
    `<details class="faq-item"><summary>${q}</summary><p>${a}</p></details>`
  ).join('\n      ');
  const head = kind === 'roof'
    ? `Roof Cleaning FAQ — <span class="ice">${city.name}, ${city.state}</span>`
    : `Gutter Cleaning FAQ — <span class="ice">${city.name}, ${city.state}</span>`;
  return `<!-- RANK-FAQ -->
<section id="faq" class="faq-sec">
  <div class="wrap">
    <div class="sec-head reveal">
      <span class="eyebrow"><span class="dot"></span>Common Questions</span>
      <h2>${head}</h2>
      <p>Answers for ${city.name} homeowners searching roof and exterior cleaning in Minnesota & Wisconsin.</p>
    </div>
    <div class="faq-list reveal">${items}</div>
  </div>
</section>`;
}

function faqSchema(faqs) {
  return {
    '@type': 'FAQPage',
    mainEntity: faqs.map(([q, a]) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };
}

function richSchema(city, kind, file, meta, faqs) {
  const url = `${DOMAIN}/${file}`;
  const loc = `${city.name}, ${city.state}`;
  const svcId = `${url}#service`;
  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'LocalBusiness',
        '@id': `${DOMAIN}/#business`,
        name: BRAND,
        url: `${DOMAIN}/`,
        telephone: '+12185768610',
        priceRange: '$$',
        image: meta.og,
        geo: { '@type': 'GeoCoordinates', latitude: city.lat, longitude: city.lng },
        address: {
          '@type': 'PostalAddress',
          addressLocality: city.name,
          addressRegion: city.state,
          postalCode: city.zip,
          addressCountry: 'US',
        },
        areaServed: areaServed(city),
        aggregateRating: { '@type': 'AggregateRating', ratingValue: '5', reviewCount: '20', bestRating: '5' },
        sameAs: [GOOGLE_REVIEW],
      },
      {
        '@type': 'Service',
        '@id': svcId,
        name: `${meta.service} in ${loc}`,
        description: meta.desc,
        provider: { '@id': `${DOMAIN}/#business` },
        areaServed: { '@type': 'City', name: loc },
        serviceType: meta.service,
        url,
      },
      {
        '@type': 'WebPage',
        '@id': `${url}#webpage`,
        url,
        name: `${meta.title} | ${BRAND}`,
        description: meta.desc,
        isPartOf: { '@id': `${DOMAIN}/#website` },
        about: { '@id': svcId },
        inLanguage: 'en-US',
        primaryImageOfPage: { '@type': 'ImageObject', url: meta.og },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${DOMAIN}/` },
          { '@type': 'ListItem', position: 2, name: `${city.name} Services`, item: `${DOMAIN}/${city.hubFile}` },
          { '@type': 'ListItem', position: 3, name: meta.service, item: url },
        ],
      },
      faqSchema(faqs),
    ],
  };
  return `<!-- RANK-SCHEMA -->\n<script type="application/ld+json">\n${JSON.stringify(graph)}\n</script>`;
}

function relatedBar(city, kind, file) {
  const s = city.slug;
  const links = [
    ['soft', 'Soft Washing', sf(s, 'soft')],
    ['roof', 'Roof Cleaning', sf(s, 'roof')],
    ['gutter', 'Gutter Cleaning', sf(s, 'gutter')],
    ['concrete', 'Concrete', sf(s, 'concrete')],
    ['window', 'Windows', sf(s, 'window')],
  ];
  const pills = links.map(([, label, href]) => {
    const active = href === file ? ' class="active"' : '';
    return `<a href="${href}"${active}>${label}</a>`;
  }).join('');
  return `<!-- RANK-RELATED -->\n<div class="related-svc reveal">${pills}</div>`;
}

function localMnBlock(city, kind) {
  const n = city.name;
  const isRoof = kind === 'roof';
  const lead = isRoof
    ? `${n} roofs face some of the toughest conditions in the Upper Midwest — lake-effect moisture, long shaded winters, and freeze-thaw cycles that let moss hold water against shingles. Professional roof cleaning is how ${city.region} homeowners protect warranties and avoid premature replacement.`
    : `Gutters and fascia on ${n} homes collect pollen, algae, and road film faster than many regions because of ${city.region} humidity and tree cover. Finish-safe gutter cleaning keeps aluminum bright without dents — and helps prevent moisture damage to fascia before winter.`;
  const bullets = isRoof
    ? [`<li><span class="ice">✓</span> Warranty-aligned soft wash — never high PSI on shingles</li>`,
      `<li><span class="ice">✓</span> Moss & black streak treatment for ${city.state} north slopes</li>`,
      `<li><span class="ice">✓</span> Bundle with ${n} gutter cleaning in one visit</li>`,
      `<li><span class="ice">✓</span> Veteran-founded · $1M insured · 5-star rated</li>`]
    : [`<li><span class="ice">✓</span> Tiger stripe & algae removal on aluminum gutters</li>`,
      `<li><span class="ice">✓</span> Fascia, soffit & full roofline brightening</li>`,
      `<li><span class="ice">✓</span> Pair with ${n} roof cleaning to prevent re-streaking</li>`,
      `<li><span class="ice">✓</span> Residential & commercial scheduling in ${city.region}</li>`];
  return `<!-- RANK-LOCAL-MN -->
<section class="local-mn">
  <div class="wrap center">
    <span class="eyebrow"><span class="dot"></span>Minnesota &amp; Northland Expertise</span>
    <h2>Why ${n} trusts <span class="gold">Up North</span> for ${isRoof ? 'roof cleaning' : 'gutter cleaning'}</h2>
    <p style="max-width:720px;margin:12px auto 0;color:var(--text-dim)">${lead}</p>
    <ul class="mn-grid" style="list-style:none;text-align:left">${bullets.join('')}</ul>
    <p style="margin-top:22px"><a href="${sf(city.slug, isRoof ? 'blogRoof' : 'blogGutter')}" style="color:var(--ice);font-weight:600">Read our ${n} ${isRoof ? 'roof cleaning' : 'gutter cleaning'} guide →</a></p>
  </div>
</section>`;
}

function eduBlock(city, kind) {
  const s = city.slug;
  const blog = kind === 'roof' ? sf(s, 'blogRoof') : sf(s, 'blogGutter');
  const other = kind === 'roof' ? sf(s, 'gutter') : sf(s, 'roof');
  const label = kind === 'roof' ? 'Roof Cleaning' : 'Gutter Cleaning';
  const otherLabel = kind === 'roof' ? 'Gutter Cleaning' : 'Roof Cleaning';
  return `<!-- RANK-EDU -->
<section class="edu-sec" style="padding:48px 0;border-top:1px solid var(--line)">
  <div class="wrap center" style="text-align:center">
    <p style="font-size:.74rem;letter-spacing:.22em;text-transform:uppercase;color:var(--ice);font-weight:600;margin-bottom:12px">Learning Center</p>
    <h2 style="font-family:'Fraunces',serif;font-size:1.6rem;margin-bottom:16px">${label} resources for <span style="color:#e3b53e">${city.name}</span></h2>
    <p style="margin-bottom:20px"><a href="${blog}" style="color:var(--ice);font-weight:600;margin:0 12px">${city.name} ${label} Guide →</a>
    <a href="${other}" style="color:var(--ice);font-weight:600;margin:0 12px">Also see ${otherLabel} in ${city.name} →</a>
    <a href="${city.hubFile}" style="color:var(--ice);font-weight:600;margin:0 12px">All ${city.name} services →</a></p>
  </div>
</section>`;
}

function stripRankBlocks(html) {
  return html
    .replace(/<!-- RANK-FAQ -->[\s\S]*?<\/section>\s*/g, '')
    .replace(/<!-- RANK-SCHEMA -->[\s\S]*?<\/script>\s*/g, '')
    .replace(/<!-- RANK-RELATED -->[\s\S]*?<\/div>\s*/g, '')
    .replace(/<!-- RANK-LOCAL-MN -->[\s\S]*?<\/section>\s*/g, '')
    .replace(/<!-- RANK-EDU -->[\s\S]*?<\/section>\s*/g, '')
    .replace(/<!-- RANK-HUB-ROOF -->[\s\S]*?<\/section>\s*/g, '')
    .replace(/<!-- RANK-HUB-GUTTER -->[\s\S]*?<\/section>\s*/g, '')
    .replace(/<style id="rank-faq-css">[\s\S]*?<\/style>\s*/g, '');
}

function boostRoofGutterPage(html, city, kind) {
  const s = city.slug;
  const file = kind === 'roof' ? sf(s, 'roof') : sf(s, 'gutter');
  const meta = kind === 'roof' ? roofMeta(city) : gutterMeta(city);
  const faqs = kind === 'roof' ? roofFaqs(city) : gutterFaqs(city);
  let out = stripRankBlocks(html);

  out = out.replace(/<title>[^<]*<\/title>/, `<title>${meta.title} | Up North</title>`);
  out = out.replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${meta.desc}">`);
  out = out.replace(/<meta property="og:title" content="[^"]*">/, `<meta property="og:title" content="${meta.title}">`);
  out = out.replace(/<meta property="og:description" content="[^"]*">/, `<meta property="og:description" content="${meta.desc}">`);
  out = out.replace(/<meta name="twitter:title" content="[^"]*">/, `<meta name="twitter:title" content="${meta.title} | Up North">`);
  out = out.replace(/<meta name="twitter:description" content="[^"]*">/, `<meta name="twitter:description" content="${meta.desc}">`);
  out = out.replace(/<meta property="og:image" content="[^"]*">/, `<meta property="og:image" content="${meta.og}">`);

  out = out.replace(/<h1>[\s\S]*?<\/h1>/, `<h1>${meta.h1}</h1>`);

  if (!out.includes('rank-faq-css')) {
    out = out.replace('</head>', () => `${FAQ_CSS}\n</head>`);
  }
  out = out.replace(/<script type="application\/ld\+json">[\s\S]*?"@type":"Service"[\s\S]*?<\/script>\s*/g, '');
  out = insertBeforeHeadClose(out, richSchema(city, kind, file, meta, faqs));

  if (!out.includes('RANK-LOCAL-MN')) {
    out = out.replace(/<!-- GUARANTEE -->/, () => `${localMnBlock(city, kind)}\n<!-- GUARANTEE -->`);
  }

  if (!out.includes('id="faq"')) {
    out = out.replace(/<!-- QUOTE FORM -->/, () => `${faqHtml(faqs, city, kind)}\n\n<!-- QUOTE FORM -->`);
  }

  return out;
}

function hubRoofSection(city) {
  const s = city.slug;
  const n = city.name;
  return `<!-- RANK-HUB-ROOF -->
<section class="block reveal" id="roof-cleaning">
  <div class="wrap center">
    <p class="section-eyebrow">Roof Cleaning</p>
    <h2>Roof Cleaning ${n}, ${city.state}</h2>
    <div class="ba" aria-label="Before and after roof cleaning slider. Drag to compare.">
      <img class="ba__after" src="images/ba/roof-after.jpg" alt="After roof cleaning in ${n}, ${city.state} — clean shingles | Up North Pressure Washing" loading="lazy" width="1000" height="750">
      <img class="ba__before" src="images/ba/roof-before.jpg" alt="Before roof cleaning in ${n}, ${city.state} — moss and black streaks on shingles | Up North Pressure Washing" loading="lazy" width="1000" height="750">
      <span class="ba__label ba__label--b">Before</span>
      <span class="ba__label ba__label--a">After</span>
      <div class="ba__handle" style="left:50%"><span class="ba__grip">&#8644;</span></div>
      <span class="ba__hint">&#8644; Drag to compare</span>
    </div>
    <p class="copy"><strong>Roof cleaning in ${n}</strong> removes moss, algae, and black streaks with a <strong>warranty-safe soft wash</strong> — never harsh pressure on asphalt shingles. North-facing slopes and tree shade in ${city.region} make professional treatment essential before freeze-thaw damage spreads.</p>
    <a class="btn btn--secondary" href="${sf(s, 'roof')}">Roof Cleaning Services in ${n} →</a>
  </div>
</section>

<div class="divider"></div>`;
}

function hubGutterSection(city) {
  const s = city.slug;
  const n = city.name;
  return `<!-- RANK-HUB-GUTTER -->
<section class="block reveal" id="gutter-cleaning">
  <div class="wrap center">
    <p class="section-eyebrow">Gutter Cleaning</p>
    <h2>Gutter Cleaning ${n}, ${city.state}</h2>
    <div class="ba" aria-label="Before and after gutter cleaning slider. Drag to compare.">
      <img class="ba__after" src="images/ba/stucco-after.jpg" alt="After gutter cleaning in ${n}, ${city.state} — bright clean gutters and fascia | Up North Pressure Washing" loading="lazy" width="1000" height="750">
      <img class="ba__before" src="images/ba/stucco-before.jpg" alt="Before gutter cleaning in ${n}, ${city.state} — stained fascia and roofline | Up North Pressure Washing" loading="lazy" width="1000" height="750">
      <span class="ba__label ba__label--b">Before</span>
      <span class="ba__label ba__label--a">After</span>
      <div class="ba__handle" style="left:50%"><span class="ba__grip">&#8644;</span></div>
      <span class="ba__hint">&#8644; Drag to compare</span>
    </div>
    <p class="copy"><strong>Gutter cleaning in ${n}</strong> eliminates tiger stripes and algae on aluminum gutters, fascia, and soffits using <strong>soft washing</strong> — brightening your entire roofline without dents or peeled paint common with pressure washing.</p>
    <a class="btn btn--secondary" href="${sf(s, 'gutter')}">Gutter Cleaning Services in ${n} →</a>
  </div>
</section>

<div class="divider"></div>`;
}

function boostHub(html, city) {
  let out = stripRankBlocks(html);
  if (!out.includes('id="roof-cleaning"')) {
    out = out.replace(
      /<div class="divider"><\/div>\s*\n<section class="block reveal">\s*\n  <div class="wrap center">\s*\n    <p class="section-eyebrow" id="concrete-washing">/,
      `${hubRoofSection(city)}\n${hubGutterSection(city)}\n<section class="block reveal">\n  <div class="wrap center">\n    <p class="section-eyebrow" id="concrete-washing">`
    );
    stats.hubs++;
  }

  const loc = `${city.name}, ${city.state}`;
  if (!out.includes('Gutter Cleaning')) {
    out = out.replace(
      /<meta name="description" content="[^"]*">/,
      m => m.replace(/soft washing/, 'soft washing, roof cleaning, gutter cleaning')
    );
  }
  out = out.replace(
    /Roof Soft Washing — /g,
    'Roof Cleaning — '
  );
  return out;
}

function boostFaq(html) {
  if (html.includes('id="roof-cleaning-faq"')) return html;
  const extra = `
  <h2 id="roof-cleaning-faq">Is roof cleaning safe for my shingles?</h2>
  <p>Yes — we use low-pressure soft washing recommended by shingle manufacturers. Never high PSI, which strips granules and voids warranties. Ideal for Duluth, the North Shore, and Iron Range homes with algae and moss.</p>
  <h2>What is gutter cleaning vs. gutter guard installation?</h2>
  <p>We clean existing gutters, fascia, and soffits — removing tiger stripes, algae, and buildup. We do not install guards; we restore the roofline you already have.</p>
  <h2>How much does roof or gutter cleaning cost?</h2>
  <p>Pricing depends on home size, stories, and severity. We provide free itemized quotes for every city we serve. <a href="soft-washing-duluth.html#quote">Request a quote</a> or call <a href="tel:+12185768610">218-576-8610</a>.</p>
  <h2>Best time for roof cleaning in Minnesota?</h2>
  <p>Late spring through early fall is ideal — after pollen season and before heavy ice. Many homeowners schedule roof and gutter cleaning together in one visit.</p>`;
  return html.replace(/<h2>How do I get a quote\?<\/h2>/, `${extra}\n  <h2>How do I get a quote?</h2>`);
}

function boostIndex(html) {
  const duluth = CITIES.find(c => c.slug === 'duluth');
  let out = stripRankBlocks(html);
  out = out.replace(
    /Soft Washing &bull; Roof Cleaning &bull; Window Cleaning/,
    'Soft Washing &bull; Roof Cleaning &bull; Gutter Cleaning &bull; Window Cleaning'
  );
  out = out.replace(/Roof Soft Washing/g, 'Roof Cleaning');
  if (duluth && !out.includes('id="roof-cleaning"')) {
    out = out.replace(
      /<div class="divider"><\/div>\s*\n<section class="block reveal">\s*\n  <div class="wrap center">\s*\n    <p class="section-eyebrow" id="concrete-washing">/,
      `${hubRoofSection(duluth)}\n${hubGutterSection(duluth)}\n<section class="block reveal">\n  <div class="wrap center">\n    <p class="section-eyebrow" id="concrete-washing">`
    );
  }
  return out;
}

// --- main ---
console.log('=== Rank boost: roof & gutter + MN SEO ===\n');

for (const city of CITIES) {
  for (const kind of ['roof', 'gutter']) {
    const file = kind === 'roof' ? sf(city.slug, 'roof') : sf(city.slug, 'gutter');
    const fp = path.join(SITE, file);
    if (!fs.existsSync(fp)) continue;
    const orig = fs.readFileSync(fp, 'utf8');
    const next = boostRoofGutterPage(orig, city, kind);
    if (next !== orig) {
      fs.writeFileSync(fp, next);
      stats.roofGutter++;
    }
  }
}

const hubFiles = ['index.html', ...CITIES.map(c => c.hubFile).filter((f, i, a) => a.indexOf(f) === i)];
for (const f of hubFiles) {
  const fp = path.join(SITE, f);
  if (!fs.existsSync(fp)) continue;
  const city = CITIES.find(c => c.hubFile === f) || CITIES[0];
  const orig = fs.readFileSync(fp, 'utf8');
  let next = f === 'index.html' ? boostIndex(orig) : boostHub(orig, city);
  if (next !== orig) {
    fs.writeFileSync(fp, next);
    if (f === 'index.html') stats.index++;
    else stats.hubsMeta++;
  }
}

const faqPath = path.join(SITE, 'faq.html');
if (fs.existsSync(faqPath)) {
  const orig = fs.readFileSync(faqPath, 'utf8');
  const next = boostFaq(orig);
  if (next !== orig) {
    fs.writeFileSync(faqPath, next);
    stats.faq++;
  }
}

// Update cluster labels site-wide
for (const file of fs.readdirSync(SITE).filter(f => f.endsWith('.html'))) {
  let html = fs.readFileSync(path.join(SITE, file), 'utf8');
  const orig = html;
  html = html.replace(/Roof Soft Washing — /g, 'Roof Cleaning — ');
  html = html.replace(/cluster-full">Roof Soft Washing/g, 'cluster-full">Roof Cleaning');
  if (html !== orig) {
    fs.writeFileSync(path.join(SITE, file), html);
    stats.blogs++;
  }
}

console.log(`Roof/gutter pages enhanced: ${stats.roofGutter}`);
console.log(`City hubs + roof/gutter sections: ${stats.hubs}`);
console.log(`Hub meta/labels: ${stats.hubsMeta}`);
console.log(`Index hero updated: ${stats.index}`);
console.log(`FAQ expanded: ${stats.faq}`);
console.log(`Cluster label patches: ${stats.blogs}`);

console.log('\nRunning pipeline...');
spawnSync('node', ['build-city-links.mjs'], { cwd: SITE, stdio: 'inherit' });
spawnSync('node', ['build-seo-site.mjs'], { cwd: SITE, stdio: 'inherit' });
spawnSync('node', ['build-polish-site.mjs'], { cwd: SITE, stdio: 'inherit' });
console.log('\nDone. Verify: roof-soft-washing-duluth.html, gutter-fascia-cleaning-duluth.html, index.html');
