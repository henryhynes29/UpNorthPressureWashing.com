import fs from 'fs';
import path from 'path';

const SITE = path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1'));

const HUBS = fs.readdirSync(SITE).filter(f =>
  f.endsWith('.html') && (f === 'index.html' || f.includes('pressure-washing'))
);

const STANDARD_IMGDATA = '{"HERO_BEFORE":"images/ba/hero-before.jpg","HERO_AFTER":"images/ba/hero-after.jpg","STUCCO_BEFORE":"images/ba/stucco-before.jpg","STUCCO_AFTER":"images/ba/stucco-after.jpg","ROOF_BEFORE":"images/ba/roof-before.jpg","ROOF_AFTER":"images/ba/roof-after.jpg"}';

function baBlock(cityLabel, type) {
  const cfg = {
    deck: {
      aria: 'deck restoration',
      after: 'restored stained wood deck',
      before: 'weathered grey wood deck',
      afterFile: 'deck-after.jpg',
      beforeFile: 'deck-before.jpg',
    },
    commercial: {
      aria: 'commercial cleaning',
      after: 'pressure washed dumpster pad',
      before: 'dirty dumpster pad area',
      afterFile: 'commercial-after.jpg',
      beforeFile: 'commercial-before.jpg',
    },
    window: {
      aria: 'window cleaning',
      after: 'crystal clear windows on a commercial building',
      before: 'grimy commercial glass facade',
      afterFile: 'window-after.jpg',
      beforeFile: 'window-before.jpg',
    },
  }[type];

  return `
        <div class="ba" aria-label="Before and after ${cfg.aria} slider. Drag to compare.">
      <img class="ba__after" src="images/${cfg.afterFile}" alt="After ${cfg.aria} — ${cfg.after} in ${cityLabel}" loading="lazy" width="1000" height="750">
      <img class="ba__before" src="images/${cfg.beforeFile}" alt="Before ${cfg.aria} — ${cfg.before} in ${cityLabel}" loading="lazy" width="1000" height="750">
      <span class="ba__label ba__label--b">Before</span>
      <span class="ba__label ba__label--a">After</span>
      <div class="ba__handle" style="left:50%"><span class="ba__grip">&#8644;</span></div>
      <span class="ba__hint">&#8644; Drag to compare</span>
    </div>`;
}

function fixHubBaSliders(html) {
  let out = html;
  let changed = false;

  if (!out.includes('id="deck-restoration"') || out.match(/id="deck-restoration"[\s\S]*?<div class="ba"/)) {
    // ok or already has ba
  } else {
    out = out.replace(
      /(<p class="section-eyebrow" id="deck-restoration">[\s\S]*?<h2>Deck &amp; Fence Restoration ([^<]+)<\/h2>)\s*(<p class="copy">)/,
      (_, pre, city, rest) => {
        changed = true;
        return pre + baBlock(city.trim(), 'deck') + rest;
      }
    );
  }

  if (!out.includes('id="commercial-cleaning"') || out.match(/id="commercial-cleaning"[\s\S]*?<div class="ba"/)) {
    // ok
  } else {
    out = out.replace(
      /(<p class="section-eyebrow" id="commercial-cleaning">[\s\S]*?<h3 class="block-subhead">[^<]+<\/h3>)\s*(<p class="copy">)/,
      (_, pre, rest) => {
        const city = (pre.match(/Commercial Cleaning ([^<]+)<\/h2>/) || [])[1]?.trim() || 'your area';
        changed = true;
        return pre + baBlock(city, 'commercial') + rest;
      }
    );
  }

  if (!out.includes('id="window-cleaning"') || out.match(/id="window-cleaning"[\s\S]*?<div class="ba"/)) {
    // ok
  } else {
    out = out.replace(
      /(<p class="section-eyebrow" id="window-cleaning">[\s\S]*?<h2>Window Cleaning ([^<]+)<\/h2>)\s*(<p class="copy">)/,
      (_, pre, city, rest) => {
        changed = true;
        return pre + baBlock(city.trim(), 'window') + rest;
      }
    );
  }

  return { html: out, changed };
}

function fixServiceImgdata(html, file) {
  let out = html;
  let changed = false;

  // Only soft-washing pages use the standard siding/roof IMGDATA map
  if (file.startsWith('soft-washing-') && out.includes('const IMGDATA = ') && !out.includes(STANDARD_IMGDATA)) {
    out = out.replace(/const IMGDATA = (\{[\s\S]*?\});/, `const IMGDATA = ${STANDARD_IMGDATA};`);
    changed = true;
  }

  // Ensure ba placeholders exist in results grid
  if (out.includes('id="results"') && (out.match(/data-before="/g) || []).length < 3) {
    const grid = `
    <div class="ba-grid">
      <div class="ba-card reveal">
        <div class="cap"><h3>Before &amp; After Results</h3><span>Exterior Cleaning</span></div>
        <div class="ba" data-before="HERO_BEFORE" data-after="HERO_AFTER"></div>
      </div>
      <div class="ba-card reveal">
        <div class="cap"><h3>Surface Deep Clean</h3><span>Stucco &amp; Render</span></div>
        <div class="ba" data-before="STUCCO_BEFORE" data-after="STUCCO_AFTER"></div>
      </div>
      <div class="ba-card reveal">
        <div class="cap"><h3>Stain Removal</h3><span>Roof &amp; Siding</span></div>
        <div class="ba" data-before="ROOF_BEFORE" data-after="ROOF_AFTER"></div>
      </div>
    </div>`;
    if (!out.includes('class="ba-grid"')) {
      out = out.replace(
        /(<section id="results">[\s\S]*?<div class="sec-head reveal">[\s\S]*?<\/div>)\s*/,
        `$1\n${grid}\n`
      );
      changed = true;
    }
  }

  return { html: out, changed };
}

function auditImages(html, file) {
  const missing = [];
  for (const m of html.matchAll(/src="(images\/[^"]+)"/g)) {
    const rel = m[1];
    if (!fs.existsSync(path.join(SITE, rel))) missing.push(`${file}: ${rel}`);
  }
  const imgData = html.match(/const IMGDATA = (\{[\s\S]*?\});/);
  if (imgData) {
    try {
      const data = JSON.parse(imgData[1]);
      for (const v of Object.values(data)) {
        if (String(v).startsWith('images/') && !fs.existsSync(path.join(SITE, v))) {
          missing.push(`${file}: IMGDATA → ${v}`);
        }
      }
    } catch { /* ignore */ }
  }
  return missing;
}

const fixed = [];
const missingAll = [];

for (const f of fs.readdirSync(SITE).filter(x => x.endsWith('.html'))) {
  const fp = path.join(SITE, f);
  let html = fs.readFileSync(fp, 'utf8');
  let changed = false;

  if (HUBS.includes(f)) {
    const r = fixHubBaSliders(html);
    html = r.html;
    changed = changed || r.changed;
  }

  if (/^(soft-washing|concrete-washing|commercial-soft-washing)-/.test(f)) {
    const r = fixServiceImgdata(html, f);
    html = r.html;
    changed = changed || r.changed;
  }

  if (changed) {
    fs.writeFileSync(fp, html);
    fixed.push(f);
  }

  missingAll.push(...auditImages(html, f));
}

console.log('Fixed hub/service images on:', fixed.length ? fixed.join(', ') : 'none');

const baCounts = HUBS.map(f => {
  const html = fs.readFileSync(path.join(SITE, f), 'utf8');
  const ba = (html.match(/class="ba"/g) || []).length;
  const imgs = (html.match(/src="images\//g) || []).length;
  return `${f}: ${ba} sliders, ${imgs} images`;
});
console.log('\nHub image counts:');
console.log(baCounts.join('\n'));

const uniqMissing = [...new Set(missingAll)];
console.log('\nMissing image files:', uniqMissing.length ? uniqMissing.join('\n') : 'none');
