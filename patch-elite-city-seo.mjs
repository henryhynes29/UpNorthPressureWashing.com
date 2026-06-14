/**
 * Elite city-specific SEO — idempotent patches for geo service pages + blogs.
 * Run: node patch-elite-city-seo.mjs
 */
import fs from 'fs';
import path from 'path';
import {
  DOMAIN,
  loadCities,
  detectCityFromFile,
  publicUrl,
} from './city-links.mjs';
import { eliteFor, blogSpotlight, FILE_TO_SERVICE } from './elite-city-seo-data.mjs';

const SITE = path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1'));
const CITIES = loadCities();
const BRAND = 'Up North Pressure Washing';
const PHONE = '218-576-8610';

const stats = { service: 0, blog: 0, meta: 0, schema: 0, faq: 0, skipped: 0 };

const SERVICE_FILES = [
  'soft-washing',
  'concrete-washing',
  'deck-restoration',
  'window-cleaning',
  'residential-window-cleaning',
  'commercial-window-cleaning',
  'commercial-soft-washing',
  'roof-soft-washing',
  'gutter-fascia-cleaning',
];

function esc(s) {
  return s.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
}

function stripTags(s) {
  return s.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
}

function metaDesc(html) {
  return (html.match(/<meta name="description" content="([^"]*)"/) || [])[1] || '';
}

function titleText(html) {
  return (html.match(/<title>([^<]*)<\/title>/) || [])[1] || '';
}

function serviceKeyFromFile(file) {
  for (const [prefix, key] of Object.entries(FILE_TO_SERVICE)) {
    if (file.startsWith(`${prefix}-`) && !file.startsWith('blog-')) return key;
  }
  return null;
}

function serviceLabel(key) {
  const labels = {
    soft: 'Soft Washing',
    concrete: 'Concrete Washing',
    deck: 'Deck Restoration',
    window: 'Window Cleaning',
    resWindow: 'Residential Window Cleaning',
    comWindow: 'Commercial Window Cleaning',
    commercial: 'Commercial Soft Washing',
    roof: 'Roof Soft Washing',
    gutter: 'Gutter & Fascia Cleaning',
  };
  return labels[key] || 'Exterior Cleaning';
}

function challengeSection(city, key, block) {
  const n = city.name;
  const markerKey = key === 'resWindow' || key === 'comWindow' ? 'window' : key;
  const challengeTitle = key === 'concrete'
    ? `Why ${n} Concrete Gets <span class="ice">Stained &amp; Slippery</span>`
    : key === 'deck'
      ? `Why ${n} Decks Turn <span class="ice">Green &amp; Gray</span> So Fast`
      : key === 'window' || key === 'resWindow' || key === 'comWindow'
        ? `Why ${n} Windows Get <span class="ice">Hazy &amp; Streaked</span>`
        : key === 'commercial'
          ? `Why ${n} Businesses Need <span class="ice">Professional</span> Exterior Care`
          : `Why ${n} Homes Develop <span class="ice">Algae &amp; Mold</span> Faster`;
  const eyebrow = key === 'commercial'
    ? `${n} Commercial Conditions`
    : `${n}&apos;s Unique Challenge`;

  return `<!-- ELITE-CITY-SEO:${markerKey} -->
<section class="seo-split" id="local-challenge">
  <div class="wrap">
    <div class="seo-split-grid">
      <div class="seo-split-text reveal">
        <span class="eyebrow"><span class="dot"></span>${eyebrow}</span>
        <h2>${challengeTitle}</h2>
        <p>${block.intro}</p>
        <ul class="seo-list">
          ${block.bullets.map(b => `<li>${b}</li>`).join('\n          ')}
        </ul>
        <p>${block.close}</p>
      </div>
      <div class="seo-stats reveal">
        <div class="stat-card">
          <div class="stat-num">Local</div>
          <div class="stat-lbl">Copy written for ${n}, ${city.state} — ${city.region} conditions, not a national template</div>
        </div>
        <div class="stat-card">
          <div class="stat-num">100%</div>
          <div class="stat-lbl">Insured, veteran-founded crews serving ${n} &amp; ${city.nearby.slice(0, 2).join(', ')}</div>
        </div>
        <div class="stat-card">
          <div class="stat-num">5.0<span style="color:var(--gold)">★</span></div>
          <div class="stat-lbl">Google-rated exterior cleaning across ${city.region}</div>
        </div>
      </div>
    </div>
  </div>
</section>
<!-- /ELITE-CITY-SEO:${markerKey} -->`;
}

function softFaqs(city) {
  const n = city.name;
  const loc = `${n}, ${city.state}`;
  const block = eliteFor(city, 'soft');
  const hook = block?.builtFor?.replace(/&apos;/g, "'") || `${city.region} moisture and shade`;
  return [
    [`How much does soft washing cost in ${n}?`, `Quotes depend on siding type, stories, roofline access, and how heavy algae is on shaded walls. We provide free, itemized estimates for ${loc} — no surprise upsells.`],
    [`Is soft washing safe for vinyl siding in ${n}?`, `Yes. Low-pressure soft washing is the manufacturer-recommended approach for vinyl, LP SmartSide, and stucco in ${city.region} — we never blast ${n} homes with high PSI.`],
    [`What causes green streaks on ${n} siding?`, `Gloeocapsa magma algae thrives where shade and moisture linger. In ${n}, ${hook.split('—')[0].trim().toLowerCase()} accelerates growth on north-facing walls.`],
    [`How often should ${n} homeowners soft wash?`, `Most ${city.region} homes benefit every 1–2 years depending on tree cover. Heavily shaded ${n} lots may schedule annually; open-sun walls often go longer.`],
    [`Can you soft wash roofs in ${loc}?`, `We offer dedicated roof soft washing for ${n} homes — low pressure only, never shingle-blasting. Bundle roof and siding for coordinated results.`],
    [`Do you serve ${city.nearby.slice(0, 2).join(' and ')} from ${n}?`, `Yes — this page is built for ${loc}. Nearby hub pages cover ${city.nearby.slice(0, 3).join(', ')} with their own local detail.`],
    [`When is the best time to soft wash in ${city.state}?`, `Late spring through early fall works best for ${n}, once pollen season slows and before freeze-up. Pre-listing washes should happen 1–2 weeks before photos.`],
    [`What is your guarantee in ${n}?`, `Every ${n} soft wash includes our one-year regrowth guarantee. If algae or mold returns within 12 months, we come back and make it right.`],
  ];
}

function faqSection(city, faqs, label) {
  const items = faqs.map(([q, a]) =>
    `<details class="faq-item"><summary>${q}</summary><p>${a}</p></details>`
  ).join('\n      ');
  return `<!-- ELITE-FAQ -->
<section id="faq" class="faq-sec">
  <div class="wrap">
    <div class="sec-head reveal">
      <span class="eyebrow"><span class="dot"></span>Common Questions</span>
      <h2>${label} FAQ — <span class="ice">${city.name}, ${city.state}</span></h2>
      <p>Answers for ${city.name} homeowners searching ${label.toLowerCase()} in ${city.stateFull}.</p>
    </div>
    <div class="faq-list reveal">${items}</div>
  </div>
</section>
<!-- /ELITE-FAQ -->`;
}

const FAQ_CSS = `<style id="elite-faq-css">.faq-sec{padding:70px 0}.faq-list{max-width:820px;margin:0 auto;display:flex;flex-direction:column;gap:12px}
.faq-item{background:var(--glass);border:1px solid var(--glass-line);border-radius:14px;padding:0 22px}
.faq-item summary{cursor:pointer;font-weight:600;color:#fff;padding:18px 0;list-style:none;font-family:'Fraunces',serif;font-size:1.05rem}
.faq-item summary::-webkit-details-marker{display:none}
.faq-item p{color:var(--text-dim);padding:0 0 18px;font-size:.98rem;line-height:1.65}</style>`;

const SEO_SPLIT_CSS = `<style id="elite-seo-split-css">.seo-split{padding:72px 0;border-top:1px solid var(--line)}
.seo-split-grid{display:grid;grid-template-columns:1fr 360px;gap:56px;align-items:start}
.seo-split-text h2{font-size:clamp(1.7rem,4vw,2.4rem);margin-bottom:18px}
.seo-split-text p{color:var(--text-dim);line-height:1.72;margin-bottom:16px;font-size:.96rem}
.seo-list{list-style:none;margin:18px 0;display:flex;flex-direction:column;gap:14px}
.seo-list li{color:var(--text-dim);font-size:.95rem;line-height:1.65;padding-left:0}
.seo-stats{display:flex;flex-direction:column;gap:14px}
.stat-card{background:var(--glass);border:1px solid var(--glass-line);border-radius:16px;padding:22px 24px}
.stat-num{font-family:'Fraunces',serif;font-size:1.8rem;color:var(--gold);margin-bottom:6px}
.stat-lbl{font-size:.86rem;color:var(--text-dim);line-height:1.5}
@media(max-width:820px){.seo-split-grid{grid-template-columns:1fr;gap:36px}}</style>`;

function ensureCss(html, id, css) {
  if (html.includes(id)) return html;
  return html.replace('</head>', `${css}\n</head>`);
}

function dedupeEliteSections(html) {
  const blockRe = /<!-- ELITE-CITY-SEO:[^>]+ -->[\s\S]*?<!-- \/ELITE-CITY-SEO:[^>]+ -->/g;
  let seen = false;
  return html.replace(blockRe, (match) => {
    if (seen) return '';
    seen = true;
    return match;
  });
}

function replaceEliteSection(html, key, section) {
  const marked = new RegExp(
    `<!-- ELITE-CITY-SEO:(?:${key}|resWindow|comWindow) -->[\\s\\S]*?<!-- /ELITE-CITY-SEO:(?:${key}|resWindow|comWindow) -->`,
    'i'
  );
  if (marked.test(html)) return html.replace(marked, section);

  const legacySoft = /<!-- SEO SECTION 1:[\s\S]*?<section class="seo-split">[\s\S]*?<\/section>/i;
  if (key === 'soft' && legacySoft.test(html)) {
    return html.replace(legacySoft, section);
  }

  const afterResults = /(<section id="results">[\s\S]*?<\/section>\s*)/i;
  if (afterResults.test(html)) {
    return html.replace(afterResults, `$1\n${section}\n`);
  }
  const afterHero = /(<section class="hero[\s\S]*?<\/section>\s*)/i;
  if (afterHero.test(html)) {
    return html.replace(afterHero, `$1\n${section}\n`);
  }
  return html;
}

function fixSocialAndSchema(html, city, file, key) {
  const url = publicUrl(file);
  const desc = metaDesc(html);
  const title = titleText(html);
  const label = serviceLabel(key);
  const loc = `${city.name}, ${city.state}`;
  const hasRankSchema = html.includes('<!-- RANK-SCHEMA -->');

  if (desc) {
    const ogDesc = esc(desc);
    const ogBefore = html;
    html = html.replace(
      /<meta property="og:description" content="[^"]*">/,
      `<meta property="og:description" content="${ogDesc}">`
    );
    html = html.replace(
      /<meta name="twitter:description" content="[^"]*">/,
      `<meta name="twitter:description" content="${ogDesc}">`
    );
    if (html !== ogBefore) stats.meta++;
  }

  if (html.includes('property="og:url"')) {
    html = html.replace(
      /<meta property="og:url" content="[^"]*">/,
      `<meta property="og:url" content="${url}">`
    );
  }

  if (!hasRankSchema) {
    const svcName = `${label} ${loc}`;
    const svcDesc = desc || `${label} in ${loc} by ${BRAND}.`;
    const svcBefore = html;
    html = html.replace(
      /<script type="application\/ld\+json">\s*\{"@context":"https:\/\/schema.org","@type":"Service"[\s\S]*?<\/script>/,
      `<script type="application/ld+json">\n${JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: svcName,
        description: stripTags(svcDesc),
        provider: {
          '@type': 'LocalBusiness',
          name: BRAND,
          telephone: '+1-218-576-8610',
          url: `${DOMAIN}/`,
        },
        areaServed: { '@type': 'City', name: city.name, addressRegion: city.state },
        serviceType: label,
        url,
      })}\n</script>`
    );

    const webPageGraph = {
      '@context': 'https://schema.org',
      '@graph': [{
        '@type': 'WebPage',
        '@id': `${url}#webpage`,
        url,
        name: title,
        description: stripTags(desc),
        isPartOf: { '@id': `${DOMAIN}/#website` },
        about: {
          '@type': 'Service',
          name: label,
          provider: { '@id': `${DOMAIN}/#business` },
          areaServed: { '@type': 'City', name: loc },
        },
        inLanguage: 'en-US',
      }],
    };

    html = html.replace(
      /<script type="application\/ld\+json">\s*\{"@context":"https:\/\/schema.org","@graph":\[\{"@type":"WebPage"[\s\S]*?<\/script>/,
      `<script type="application/ld+json">\n${JSON.stringify(webPageGraph)}\n</script>`
    );
    if (html !== svcBefore) stats.schema++;
  }

  html = html.replace(/soft-washing-duluth\.html#webpage/g, `${file.replace(/\.html$/, '')}#webpage`);
  html = html.replace(/soft-washing-duluth\.html/g, file.replace(/\.html$/, ''));
  return html;
}

function patchBuiltFor(html, city, block) {
  if (!block?.builtFor) return html;
  return html.replace(
    /<b>Built for [^<]*<\/b>\s*<span>[^<]*<\/span>/,
    `<b>Built for ${city.name}.</b> <span>${block.builtFor}</span>`
  );
}

function patchGuarantee(html, city, block) {
  if (!block?.guarantee || !html.includes('guarantee')) return html;
  return html.replace(
    /<p>Every soft washing job we complete in [^<]*is backed by[\s\S]*?If growth comes back within a year, we make it right\.<\/b><\/p>/,
    `<p>${block.guarantee} <b style="color:#fff">If growth comes back within a year, we make it right.</b></p>`
  );
}

function patchResultsEyebrow(html, block) {
  if (!block?.resultsEyebrow) return html;
  return html
    .replace(/<span class="eyebrow"><span class="dot"><\/span>Real Twin Ports Results<\/span>/g,
      `<span class="eyebrow"><span class="dot"></span>${block.resultsEyebrow}</span>`)
    .replace(/<span class="eyebrow"><span class="dot"><\/span>Real Duluth Results<\/span>/g,
      `<span class="eyebrow"><span class="dot"></span>${block.resultsEyebrow}</span>`);
}

function roofGutterBlock(city, key, base) {
  const n = city.name;
  if (key === 'roof') {
    return {
      ...base,
      intro: `Roofs in ${n} collect Gloeocapsa algae and moss on north slopes where ${city.region} shade and moisture linger — black streaks hold water against shingles and shorten roof life if left untreated.`,
      bullets: [
        `<b>North-slope algae.</b> ${n} roofs with tree cover or lake exposure see streaks years before south slopes.`,
        `<b>Moss before freeze-up.</b> ${city.state} winters trap moisture under moss — soft wash treatment before snow is critical.`,
        `<b>Never pressure-wash shingles.</b> High PSI voids warranties on ${n} asphalt roofs — low-pressure chemistry is the manufacturer standard.`,
        `<b>Bundle with gutters.</b> Roof runoff re-streaks gutters fast — coordinating both on one visit saves ${n} homeowners a second trip.`,
      ],
      close: `Roof soft washing in ${n} removes algae and moss with warranty-safe methods — protecting shingles through ${city.region} wet seasons.`,
      builtFor: `Roof soft washing calibrated for ${n} north slopes, ${city.region} moisture, and freeze-thaw roof conditions.`,
      resultsEyebrow: `Real ${n} Roof Results`,
    };
  }
  return {
    ...base,
    intro: `Gutters and fascia on ${n} homes collect tiger-stripe algae, pollen film, and road dust — ${city.region} humidity makes black streaks return fast if only scrubbed, not treated.`,
    bullets: [
      `<b>Tiger stripes on aluminum.</b> Runoff feeds dark lines on ${n} gutter faces — soft washing treats the biology, not just the surface.`,
      `<b>Fascia rot prevention.</b> Organic buildup holds moisture against trim through ${city.state} wet seasons.`,
      `<b>No dented gutters.</b> We never pressure-blast ${n} aluminum — finish-safe roofline cleaning only.`,
      `<b>Full roofline brightening.</b> Gutters, fascia, and soffits cleaned together for uniform curb appeal.`,
    ],
    close: `Gutter and fascia cleaning in ${n} brightens the entire roofline without damaging aluminum or painted trim.`,
    builtFor: `Roofline soft washing for ${n} pollen seasons, ${city.region} humidity, and aluminum gutter finishes.`,
    resultsEyebrow: `Real ${n} Gutter Results`,
  };
}

function patchSoftFaq(html, city) {
  const section = faqSection(city, softFaqs(city), 'Soft Washing');
  if (html.includes('<!-- ELITE-FAQ -->')) {
    return html.replace(/<!-- ELITE-FAQ -->[\s\S]*?<!-- \/ELITE-FAQ -->/, section);
  }
  const insertBefore = /<!-- GUARANTEE -->|<!-- TESTIMONIALS -->|<section id="reviews">/;
  if (insertBefore.test(html)) {
    html = ensureCss(html, 'elite-faq-css', FAQ_CSS);
    return html.replace(insertBefore, `${section}\n$&`);
  }
  return html;
}

function patchServiceFile(file) {
  const city = detectCityFromFile(file, CITIES);
  const key = serviceKeyFromFile(file);
  if (!city || !key) return false;

  let block = eliteFor(city, key);
  if (!block) return false;
  if (key === 'roof' || key === 'gutter') {
    block = roofGutterBlock(city, key, block);
  }

  const fp = path.join(SITE, file);
  let html = fs.readFileSync(fp, 'utf8');
  const before = html;
  html = dedupeEliteSections(html);

  html = ensureCss(html, 'elite-seo-split-css', SEO_SPLIT_CSS);
  const markerKey = key === 'resWindow' || key === 'comWindow' ? 'window' : key;
  const section = challengeSection(city, key, block);
  if (html.includes(`<!-- ELITE-CITY-SEO:${markerKey} -->`)) {
    html = replaceEliteSection(html, markerKey, section);
  } else if (key === 'roof' || key === 'gutter') {
    const afterLocal = /(<!-- RANK-LOCAL-MN -->[\s\S]*?<\/section>\s*)/i;
    html = afterLocal.test(html)
      ? html.replace(afterLocal, `$1\n${section}\n`)
      : replaceEliteSection(html, key, section);
  } else {
    html = replaceEliteSection(html, markerKey, section);
  }
  html = fixSocialAndSchema(html, city, file, key);
  html = patchBuiltFor(html, city, block);
  html = patchGuarantee(html, city, block);
  html = patchResultsEyebrow(html, block);

  if (key === 'soft') {
    html = patchSoftFaq(html, city);
    if (html !== before) stats.faq++;
  }

  if (html !== before) {
    fs.writeFileSync(fp, html);
    stats.service++;
    return true;
  }
  stats.skipped++;
  return false;
}

function detectBlogCity(file, cities) {
  for (const city of cities) {
    if (file === `blog-soft-washing-home-value-${city.slug}.html`) return city;
    if (file.endsWith(`-${city.slug}.html`)) return city;
  }
  return detectCityFromFile(file, cities);
}

function patchBlogFile(file) {
  const city = detectBlogCity(file, CITIES);
  if (!city || !file.startsWith('blog-')) return false;

  const spotlight = blogSpotlight(city);
  if (!spotlight) return false;

  const fp = path.join(SITE, file);
  let html = fs.readFileSync(fp, 'utf8');
  const block = `<!-- ELITE-BLOG-LOCAL -->
<div class="takeaways" style="border-left-color:var(--ice)">
  <h3>Local context — ${city.name}, ${city.state}</h3>
  <p style="margin:0;color:var(--text-dim);font-size:.99rem;line-height:1.7">${spotlight}</p>
</div>
<!-- /ELITE-BLOG-LOCAL -->`;

  let next;
  if (html.includes('<!-- ELITE-BLOG-LOCAL -->')) {
    next = html.replace(/<!-- ELITE-BLOG-LOCAL -->[\s\S]*?<!-- \/ELITE-BLOG-LOCAL -->/, block);
  } else if (html.includes('<p class="lead">')) {
    next = html.replace(
      /(<p class="lead">[\s\S]*?<\/p>)/,
      `$1\n  ${block}`
    );
  } else {
    return false;
  }

  const desc = metaDesc(html);
  if (desc) {
    next = next.replace(
      /<meta property="og:description" content="[^"]*">/,
      `<meta property="og:description" content="${esc(desc)}">`
    );
  }

  if (next !== html) {
    fs.writeFileSync(fp, next);
    stats.blog++;
    return true;
  }
  return false;
}

function main() {
  for (const prefix of SERVICE_FILES) {
    for (const city of CITIES) {
      const file = `${prefix}-${city.slug}.html`;
      if (fs.existsSync(path.join(SITE, file))) patchServiceFile(file);
    }
  }

  for (const f of fs.readdirSync(SITE).filter(x => x.startsWith('blog-') && x.endsWith('.html'))) {
    patchBlogFile(f);
  }

  console.log('Elite city SEO patch complete:');
  console.log(`  Service pages updated: ${stats.service}`);
  console.log(`  Blog local blocks added: ${stats.blog}`);
  console.log(`  Meta/OG syncs: ${stats.meta}`);
  console.log(`  Schema fixes: ${stats.schema}`);
  console.log(`  Soft-wash FAQ sections: ${stats.faq}`);
  console.log(`  Unchanged: ${stats.skipped}`);
}

main();
