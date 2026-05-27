import fs from 'fs';
import path from 'path';
import { loadCities } from './city-links.mjs';

const SITE = path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1'));
const CITIES = loadCities();

const CONCRETE_IMG = {
  HERO_BEFORE: 'images/concrete-before.jpg',
  HERO_AFTER: 'images/concrete-after.jpg',
  STUCCO_BEFORE: 'images/concrete-before.jpg',
  STUCCO_AFTER: 'images/concrete-after.jpg',
  ROOF_BEFORE: 'images/commercial-before.jpg',
  ROOF_AFTER: 'images/commercial-after.jpg',
};

const COMMERCIAL_IMG = {
  HERO_BEFORE: 'images/commercial-before.jpg',
  HERO_AFTER: 'images/commercial-after.jpg',
  LOT_BEFORE: 'images/concrete-before.jpg',
  LOT_AFTER: 'images/concrete-after.jpg',
  GLASS_BEFORE: 'images/window-before.jpg',
  GLASS_AFTER: 'images/window-after.jpg',
};

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

const stats = { files: 0, images: 0, banners: 0, dividers: 0, hubs: 0 };

function patchImgData(html, imgObj) {
  const block = `const IMGDATA = ${JSON.stringify(imgObj)};`;
  if (!html.includes('const IMGDATA')) return html;
  return html.replace(/const IMGDATA = \{[\s\S]*?\};/, block);
}

function cleanBanners(html) {
  let out = html;
  let changed = false;

  // Remove pill-style related service bar (duplicate nav banners)
  if (out.includes('related-svc')) {
    out = out.replace(/<!-- RANK-RELATED -->[\s\S]*?<\/div>\s*/g, '');
    out = out.replace(/<div class="related-svc reveal">[\s\S]*?<\/div>\s*/g, '');
    changed = true;
    stats.banners++;
  }

  // Remove duplicate roof/gutter CTA button rows on hub pages
  const dupBtn = /(\s*<a class="btn btn--secondary" href="[^"]*roof-soft-washing[^"]*"[^>]*>Roof Cleaning<\/a>\s*<a class="btn btn--secondary" href="[^"]*gutter-fascia-cleaning[^"]*"[^>]*>Gutter Cleaning<\/a>)+/g;
  if (dupBtn.test(out)) {
    out = out.replace(dupBtn, '');
    changed = true;
    stats.banners++;
  }

  // Collapse stacked dividers
  const collapsed = out.replace(/(<div class="divider"><\/div>\s*){2,}/g, '<div class="divider"></div>\n');
  if (collapsed !== out) {
    out = collapsed;
    stats.dividers++;
    changed = true;
  }

  // Remove redundant RANK-EDU (duplicates Learning Center blocks)
  if (out.includes('<!-- RANK-EDU -->')) {
    out = out.replace(/<!-- RANK-EDU -->[\s\S]*?<\/section>\s*/g, '');
    changed = true;
  }

  // Remove rank-faq-css if no faq section left
  if (!out.includes('class="faq-sec"') && out.includes('rank-faq-css')) {
    out = out.replace(/<style id="rank-faq-css">[\s\S]*?<\/style>\s*/g, '');
    changed = true;
  }

  return changed ? out : html;
}

function fixHubGutterImages(html) {
  // Hub gutter sliders should show roofline/stucco, not whole-house soft wash
  return html.replace(
    /(id="gutter-cleaning"[\s\S]*?<img class="ba__after" src=")images\/house-wash-after\.jpg(")/,
    '$1images/ba/stucco-after.jpg$2'
  ).replace(
    /(id="gutter-cleaning"[\s\S]*?<img class="ba__before" src=")images\/house-wash-before\.jpg(")/,
    '$1images/ba/stucco-before.jpg$2'
  );
}

function gutterAlts(city) {
  const loc = `${city.name}, ${city.state}`;
  return {
    HERO_BEFORE: `Before gutter and fascia cleaning in ${loc} — black streaks on gutters and soffits | Up North Pressure Washing`,
    HERO_AFTER: `After gutter and fascia cleaning in ${loc} — bright clean gutters and fascia boards | Up North Pressure Washing`,
    SOFFIT_BEFORE: `Before exterior soft washing in ${loc} — dirty siding and fascia with organic growth | Up North Pressure Washing`,
    SOFFIT_AFTER: `After exterior soft washing in ${loc} — clean siding, soffits, and roofline | Up North Pressure Washing`,
  };
}

function roofAlts(city) {
  const loc = `${city.name}, ${city.state}`;
  return {
    HERO_BEFORE: `Before roof soft washing in ${loc} — asphalt shingles with black streak algae and moss | Up North Pressure Washing`,
    HERO_AFTER: `After roof soft washing in ${loc} — clean roof shingles after gentle soft-wash treatment | Up North Pressure Washing`,
    BUNDLE_BEFORE: `Before full exterior soft washing in ${loc} — home with dirty roof and algae-streaked siding | Up North Pressure Washing`,
    BUNDLE_AFTER: `After full exterior soft washing in ${loc} — restored roof and bright siding | Up North Pressure Washing`,
  };
}

for (const file of fs.readdirSync(SITE).filter(f => f.endsWith('.html'))) {
  const fp = path.join(SITE, file);
  let html = fs.readFileSync(fp, 'utf8');
  const orig = html;

  html = cleanBanners(html);

  if (file.startsWith('concrete-washing-')) {
    html = patchImgData(html, CONCRETE_IMG);
    stats.images++;
  } else if (file.startsWith('commercial-soft-washing-')) {
    html = patchImgData(html, COMMERCIAL_IMG);
    stats.images++;
  } else if (file.startsWith('roof-soft-washing-')) {
    const slug = file.replace('roof-soft-washing-', '').replace('.html', '');
    const city = CITIES.find(c => c.slug === slug);
    html = patchImgData(html, ROOF_IMG);
    if (city) {
      html = html.replace(
        /const ALTDATA = \{[\s\S]*?\};/,
        `const ALTDATA = ${JSON.stringify(roofAlts(city))};`
      );
    }
    stats.images++;
  } else if (file.startsWith('gutter-fascia-cleaning-')) {
    const slug = file.replace('gutter-fascia-cleaning-', '').replace('.html', '');
    const city = CITIES.find(c => c.slug === slug);
    html = patchImgData(html, GUTTER_IMG);
    if (city) {
      html = html.replace(
        /const ALTDATA = \{[\s\S]*?\};/,
        `const ALTDATA = ${JSON.stringify(gutterAlts(city))};`
      );
    }
    stats.images++;
  }

  if (file === 'index.html' || file.includes('pressure-washing')) {
    html = fixHubGutterImages(html);
    if (html !== orig) stats.hubs++;
  }

  if (html !== orig) {
    fs.writeFileSync(fp, html);
    stats.files++;
  }
}

console.log('Site glitch fix complete:');
console.log(`  Files patched: ${stats.files}`);
console.log(`  Image maps restored: ${stats.images}`);
console.log(`  Banner/pill cleanups: ${stats.banners}`);
console.log(`  Divider collapses: ${stats.dividers}`);
console.log(`  Hub gutter images fixed: ${stats.hubs}`);
