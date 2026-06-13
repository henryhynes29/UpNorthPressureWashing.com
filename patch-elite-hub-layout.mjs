import fs from 'fs';
import path from 'path';

const SITE = path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1'));

const SERVICE_META = [
  {
    key: 'soft',
    eyebrow: 'House Wash / Soft Wash',
    benefit: 'Low-pressure cleaning for siding, trim, oxidation, algae, and Northland grime.',
    chips: ['Vinyl & steel siding', 'Algae & mold', 'Trim & exterior buildup'],
  },
  {
    key: 'window',
    eyebrow: 'Streak-Free Glass',
    benefit: 'Detailed glass cleaning that removes pollen, hard-water spots, salt film, and cobwebs.',
    chips: ['Exterior windows', 'Interior available', 'Screens, sills & tracks'],
  },
  {
    key: 'gutter',
    eyebrow: 'Roofline Detail',
    benefit: 'Brighten gutters, fascia, and soffits without denting aluminum or peeling paint.',
    chips: ['Gutters', 'Fascia & soffits', 'Roofline bundles'],
  },
  {
    key: 'roof',
    eyebrow: 'Warranty-Safe Roof Care',
    benefit: 'Remove moss, algae, and black streaks with soft washing instead of destructive pressure.',
    chips: ['Moss removal', 'Black streaks', 'Asphalt shingles'],
  },
  {
    key: 'concrete',
    eyebrow: 'Hot Water Cleaning',
    benefit: 'Commercial-grade hot water breaks down salt, grease, oil, and embedded concrete grime.',
    chips: ['Driveways', 'Sidewalks', 'Garage floors'],
  },
  {
    key: 'commercial',
    eyebrow: 'Business Exterior Care',
    benefit: 'Insured commercial cleaning for storefronts, pads, entries, and high-traffic surfaces.',
    chips: ['Storefronts', 'Dumpster pads', 'After-hours available'],
  },
  {
    key: 'deck',
    eyebrow: 'Wood-Safe Restoration',
    benefit: 'Soft-wash deck and fence cleaning that removes algae and gray weathering without furring wood.',
    chips: ['Decks', 'Fences', 'Stain-ready prep'],
  },
];

const ELITE_CSS = `
/* ELITE-HUB-POLISH */
.hub-proof{padding:24px 0;border-top:1px solid rgba(150,190,215,.16);border-bottom:1px solid rgba(150,190,215,.16);background:linear-gradient(90deg,rgba(255,255,255,.035),rgba(227,181,62,.055),rgba(255,255,255,.035))}
.hub-proof__grid{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}
.hub-proof__item{border:1px solid rgba(150,190,215,.16);background:rgba(255,255,255,.045);border-radius:16px;padding:16px 14px;text-align:center;box-shadow:0 18px 45px -35px rgba(0,0,0,.75)}
.hub-proof__item strong{display:block;color:var(--gold);font-family:var(--f-display);font-size:1.05rem;margin-bottom:4px}
.hub-proof__item span{font-size:.82rem;color:var(--text-dim);font-weight:700;letter-spacing:.04em;text-transform:uppercase}
.service-kicker{display:inline-flex;align-items:center;justify-content:center;margin:0 auto .75rem;padding:.38rem .82rem;border-radius:999px;border:1px solid rgba(227,181,62,.36);background:rgba(227,181,62,.09);color:var(--gold);font-size:.72rem;font-weight:800;letter-spacing:.16em;text-transform:uppercase}
.service-best{display:flex;flex-wrap:wrap;gap:.5rem;justify-content:center;margin:1rem auto 1.25rem;padding:0;list-style:none}
.service-best li{border:1px solid rgba(127,198,232,.24);background:rgba(127,198,232,.07);border-radius:999px;padding:.45rem .72rem;color:#d8e8f1;font-size:.82rem;font-weight:700}
.service-summary{max-width:680px;margin:.8rem auto 1.15rem;color:var(--text-dim);font-size:1rem;line-height:1.65}
.service-actions{display:flex;flex-wrap:wrap;gap:.75rem;justify-content:center;align-items:center;margin:1.15rem 0}
.service-actions .btn,.service-actions .btn--secondary,.service-actions .btn--quote{margin:0}
.hub-final-cta{padding:62px 0;border-top:1px solid rgba(150,190,215,.16);background:radial-gradient(80% 120% at 50% 0%,rgba(227,181,62,.13),transparent 58%),rgba(255,255,255,.018)}
.hub-final-cta__box{max-width:820px;margin:0 auto;text-align:center;border:1px solid rgba(227,181,62,.24);background:rgba(255,255,255,.045);border-radius:24px;padding:34px 26px;box-shadow:0 28px 70px -45px rgba(0,0,0,.85)}
.hub-final-cta__box h2{font-size:clamp(1.55rem,4vw,2.25rem);margin-bottom:.65rem}
.hub-final-cta__box p{max-width:620px;margin:0 auto 1.2rem;color:var(--text-dim);line-height:1.7}
@media(max-width:760px){.hub-proof__grid{grid-template-columns:repeat(2,1fr)}.hub-proof__item{padding:14px 10px}.service-best{gap:.4rem}.service-best li{font-size:.76rem}.hub-final-cta__box{padding:28px 18px}}
`;

function isHubPage(file) {
  return file === 'index.html' || file === 'pressure-washing-cloquet-mn.html' || /^[a-z-]+-(?:mn|wi)-pressure-washing\.html$/.test(file);
}

function ensureCss(html) {
  if (html.includes('/* ELITE-HUB-POLISH */')) return html;
  return html.replace('</style>', `${ELITE_CSS}\n</style>`);
}

function proofStrip() {
  return `<section class="hub-proof" aria-label="Why homeowners trust Up North Pressure Washing">
  <div class="wrap hub-proof__grid">
    <div class="hub-proof__item"><strong>5-Star</strong><span>Google Rated</span></div>
    <div class="hub-proof__item"><strong>$1M+</strong><span>Insured</span></div>
    <div class="hub-proof__item"><strong>Guardsman</strong><span>Founded</span></div>
    <div class="hub-proof__item"><strong>1-Year</strong><span>Soft Wash Guarantee</span></div>
  </div>
</section>`;
}

function finalCta() {
  return `<section class="hub-final-cta">
  <div class="wrap">
    <div class="hub-final-cta__box reveal">
      <p class="service-kicker">Not Sure What You Need?</p>
      <h2>Send a few photos. We will recommend the safest cleaning plan.</h2>
      <p>Tell us what looks dirty, stained, green, streaked, or weathered. We will point you toward the right service for your home, roofline, concrete, windows, deck, or business exterior.</p>
      <div class="service-actions">
        <a class="btn btn--quote" href="#quote">Request My Free Quote</a>
        <a class="btn btn--ghost" href="tel:+12185768610">Call 218-576-8610</a>
      </div>
    </div>
  </div>
</section>`;
}

function metaForSection(section) {
  const copyStart = section.search(/<p class="copy"/);
  const header = section.slice(0, copyStart > -1 ? copyStart : Math.min(section.length, 1800));
  let key = '';

  if (/id="gutter-cleaning"|Gutter Cleaning/i.test(header)) key = 'gutter';
  else if (/id="deck-restoration"|Deck &amp; Fence|Deck and Fence|Wood Restoration/i.test(header)) key = 'deck';
  else if (/id="window-cleaning"|Window Cleaning|Streak-Free Glass/i.test(header)) key = 'window';
  else if (/id="roof-cleaning"|Roof Cleaning/i.test(header)) key = 'roof';
  else if (/id="concrete-washing"|Hot Water Pressure Washing|Concrete/i.test(header)) key = 'concrete';
  else if (/id="commercial-cleaning"|Commercial Cleaning|Northland Businesses/i.test(header)) key = 'commercial';
  else if (/id="soft-washing"|Soft Washing/i.test(header)) key = 'soft';

  return SERVICE_META.find((item) => item.key === key);
}

function normalizeSectionEnd(section) {
  const hasReview = /<div class="review-slider"/.test(section);
  const closing = hasReview ? '\n  </div>\n</section>' : '\n    </div>\n  </div>\n</section>';
  return section.replace(/\s*(?:<\/div>\s*)+<\/section>\s*$/, closing);
}

function addServicePolish(section) {
  const meta = metaForSection(section);
  if (!meta) return section;

  const secondary = section.match(/<a class="btn btn--secondary"[\s\S]*?<\/a>/)?.[0]?.trim();
  const quote = section.match(/<a class="btn btn--quote"[\s\S]*?<\/a>/)?.[0]?.trim() || '<a class="btn btn--quote" href="#quote">Get Your Free Quote</a>';
  const actions = `<div class="service-actions">\n      ${secondary || ''}\n      ${quote}\n    </div>`;

  let out = section
    .replace(/\s*<p class="service-kicker">[\s\S]*?<\/p>/g, '')
    .replace(/\s*<p class="service-summary">[\s\S]*?<\/p>/g, '')
    .replace(/\s*<ul class="service-best"[\s\S]*?<\/ul>/g, '')
    .replace(/\s*<div class="service-actions">\s*/g, '\n')
    .replace(/\s*<a class="btn btn--secondary"[\s\S]*?<\/a>/g, '')
    .replace(/\s*<a class="btn btn--quote"[\s\S]*?<\/a>/g, '');

  out = out.replace(/(\n\s*)<\/div>\s*\n<\/section>$/, '$1</section>');

  out = out.replace(
    /(<p class="section-eyebrow"[^>]*>[\s\S]*?<\/p>\s*<h2>[\s\S]*?<\/h2>)/,
    `<p class="service-kicker">${meta.eyebrow}</p>\n    $1`
  );

  out = out.replace(
    /(<p class="copy">[\s\S]*?<\/p>)/,
    `$1\n    <p class="service-summary">${meta.benefit}</p>\n    <ul class="service-best" aria-label="Best for">${meta.chips.map((chip) => `<li>${chip}</li>`).join('')}</ul>\n    ${actions}`
  );

  return normalizeSectionEnd(out);
}

function patchHub(html) {
  let out = ensureCss(html);

  if (!out.includes('class="hub-proof"')) {
    out = out.replace(/<\/section>\s*(?=<section class="story reveal")/, `</section>\n\n${proofStrip()}\n`);
  }

  out = out.replace(/<section class="block(?: alt)? reveal"[\s\S]*?<\/section>/g, addServicePolish);

  if (!out.includes('class="hub-final-cta"')) {
    out = out.replace(/<section class="reviews">/, `${finalCta()}\n\n<section class="reviews">`);
  }

  return out;
}

let patched = 0;
let cleaned = 0;
for (const file of fs.readdirSync(SITE).filter((name) => name.endsWith('.html'))) {
  const fp = path.join(SITE, file);
  const before = fs.readFileSync(fp, 'utf8');
  if (!isHubPage(file)) {
    const marker = '/* ELITE-HUB-POLISH */';
    const start = before.indexOf(marker);
    const end = start > -1 ? before.indexOf('\n\n</style>', start) : -1;
    const after = start > -1 && end > -1 ? before.slice(0, start) + before.slice(end + 2) : before;
    if (after !== before) {
      fs.writeFileSync(fp, after);
      cleaned++;
    }
    continue;
  }

  const after = patchHub(before);
  if (after !== before) {
    fs.writeFileSync(fp, after);
    patched++;
  }
}

console.log(`Applied elite hub layout polish to ${patched} hub pages. Cleaned ${cleaned} non-hub pages.`);
