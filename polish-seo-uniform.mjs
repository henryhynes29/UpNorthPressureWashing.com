import fs from 'fs';
import path from 'path';
import { spawnSync } from 'child_process';

const SITE = path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1'));
const DL = path.join(process.env.USERPROFILE || '', 'Downloads');
const IMG = path.join(SITE, 'images');
const DOMAIN = 'https://www.upnorthpressurewashing.com';
const BRAND = 'Up North Pressure Washing';

function loadCities() {
  const code = fs.readFileSync(path.join(SITE, 'build-site.mjs'), 'utf8');
  const start = code.indexOf('const CITIES = [');
  const arrStart = code.indexOf('[', start);
  const arrEnd = code.indexOf('\n];', start) + 2;
  // eslint-disable-next-line no-eval
  return eval(code.slice(arrStart, arrEnd + 1));
}

const CITIES = loadCities();
const cityBySlug = Object.fromEntries(CITIES.map(c => [c.slug, c]));
cityBySlug.duluth = CITIES.find(c => c.slug === 'duluth');

const WINDOW_IMG = {
  HERO_BEFORE: 'images/window-res-before.jpg',
  HERO_AFTER: 'images/window-res-after.jpg',
  DETAIL_BEFORE: 'images/window-detail-before.jpg',
  DETAIL_AFTER: 'images/window-interior-after.jpg',
  STORE_BEFORE: 'images/window-before.jpg',
  STORE_AFTER: 'images/window-after.jpg',
};

const DECK_IMG = {
  HERO_BEFORE: 'images/deck-before.jpg',
  HERO_AFTER: 'images/deck-after.jpg',
  FENCE_BEFORE: 'images/deck-process-before.jpg',
  FENCE_AFTER: 'images/deck-process-after.jpg',
  PATIO_BEFORE: 'images/concrete-before.jpg',
  PATIO_AFTER: 'images/concrete-after.jpg',
};

const SOFT_IMG = {
  HERO_BEFORE: 'images/ba/hero-before.jpg',
  HERO_AFTER: 'images/ba/hero-after.jpg',
  STUCCO_BEFORE: 'images/ba/stucco-before.jpg',
  STUCCO_AFTER: 'images/ba/stucco-after.jpg',
  ROOF_BEFORE: 'images/ba/roof-before.jpg',
  ROOF_AFTER: 'images/ba/roof-after.jpg',
};

const CONCRETE_IMG = {
  HERO_BEFORE: 'images/concrete-before.jpg',
  HERO_AFTER: 'images/concrete-after.jpg',
  STUCCO_BEFORE: 'images/commercial-before.jpg',
  STUCCO_AFTER: 'images/commercial-after.jpg',
  ROOF_BEFORE: 'images/concrete-before.jpg',
  ROOF_AFTER: 'images/concrete-after.jpg',
};

const COMMERCIAL_IMG = {
  HERO_BEFORE: 'images/commercial-before.jpg',
  HERO_AFTER: 'images/commercial-after.jpg',
  LOT_BEFORE: 'images/concrete-before.jpg',
  LOT_AFTER: 'images/concrete-after.jpg',
  GLASS_BEFORE: 'images/window-before.jpg',
  GLASS_AFTER: 'images/window-after.jpg',
};

function loc(city) {
  return `${city.name}, ${city.state}`;
}

function alt(city, service, when, detail) {
  return `${when} ${service} in ${loc(city)} — ${detail} | ${BRAND}`;
}

function windowAlts(city) {
  return {
    HERO_BEFORE: alt(city, 'window cleaning', 'Before', 'filmy residential glass with hard-water spotting and pollen'),
    HERO_AFTER: alt(city, 'window cleaning', 'After', 'crystal-clear residential glass with streak-free lake views'),
    DETAIL_BEFORE: alt(city, 'window cleaning', 'Before', 'professional pure-water pole cleaning on exterior glass'),
    DETAIL_AFTER: alt(city, 'window cleaning', 'After', 'bright streak-free interior multi-pane windows'),
    STORE_BEFORE: alt(city, 'commercial window cleaning', 'Before', 'storefront glass with salt film and traffic grime'),
    STORE_AFTER: alt(city, 'commercial window cleaning', 'After', 'spotless commercial glass facade and entry doors'),
  };
}

function deckAlts(city) {
  return {
    HERO_BEFORE: alt(city, 'deck restoration', 'Before', 'weathered grey wood deck boards with algae and mildew'),
    HERO_AFTER: alt(city, 'deck restoration', 'After', 'restored stain-ready cedar deck with rich wood tone'),
    FENCE_BEFORE: alt(city, 'deck and fence cleaning', 'Before', 'pressure-washing weathered wood boards in progress'),
    FENCE_AFTER: alt(city, 'deck and fence cleaning', 'After', 'finished lakefront deck with bright rails and boards'),
    PATIO_BEFORE: alt(city, 'patio cleaning', 'Before', 'stained concrete patio and walkway beside deck'),
    PATIO_AFTER: alt(city, 'patio cleaning', 'After', 'clean hot-water-washed concrete flatwork next to restored deck'),
  };
}

function softAlts(city) {
  return {
    HERO_BEFORE: alt(city, 'soft washing', 'Before', 'algae-streaked vinyl siding and organic growth on home exterior'),
    HERO_AFTER: alt(city, 'soft washing', 'After', 'clean bright siding after low-pressure soft wash treatment'),
    STUCCO_BEFORE: alt(city, 'soft washing', 'Before', 'stucco and masonry with green mildew and weather staining'),
    STUCCO_AFTER: alt(city, 'soft washing', 'After', 'restored stucco and masonry with even clean finish'),
    ROOF_BEFORE: alt(city, 'roof soft washing', 'Before', 'roof shingles with moss and black streak algae'),
    ROOF_AFTER: alt(city, 'roof soft washing', 'After', 'clean roof shingles after gentle soft-wash treatment'),
  };
}

function concreteAlts(city) {
  return {
    HERO_BEFORE: alt(city, 'concrete pressure washing', 'Before', 'oil-stained driveway with road salt and grime'),
    HERO_AFTER: alt(city, 'concrete pressure washing', 'After', 'bright clean concrete driveway after hot-water wash'),
    STUCCO_BEFORE: alt(city, 'commercial concrete cleaning', 'Before', 'grease-stained commercial dumpster pad and flatwork'),
    STUCCO_AFTER: alt(city, 'commercial concrete cleaning', 'After', 'restored commercial concrete pad and loading area'),
    ROOF_BEFORE: alt(city, 'patio pressure washing', 'Before', 'dirty concrete patio and garage apron with winter buildup'),
    ROOF_AFTER: alt(city, 'patio pressure washing', 'After', 'even surface-cleaner finish on patio and garage concrete'),
  };
}

function commercialAlts(city) {
  return {
    HERO_BEFORE: alt(city, 'commercial pressure washing', 'Before', 'greasy commercial dumpster pad and building apron'),
    HERO_AFTER: alt(city, 'commercial pressure washing', 'After', 'sanitized commercial pad and clean building exterior'),
    LOT_BEFORE: alt(city, 'parking lot cleaning', 'Before', 'stained parking lot concrete with salt and oil marks'),
    LOT_AFTER: alt(city, 'parking lot cleaning', 'After', 'bright parking lot concrete after hot-water cleaning'),
    GLASS_BEFORE: alt(city, 'storefront window cleaning', 'Before', 'commercial storefront glass with streaks and salt film'),
    GLASS_AFTER: alt(city, 'storefront window cleaning', 'After', 'crystal-clear storefront windows for customer-facing businesses'),
  };
}

function hubAlts(city) {
  const l = loc(city);
  return {
    softBefore: alt(city, 'soft washing', 'Before', 'algae and green buildup on home siding'),
    softAfter: alt(city, 'soft washing', 'After', 'clean restored home exterior after soft wash'),
    concreteBefore: alt(city, 'concrete pressure washing', 'Before', 'stained concrete walkway with salt and grime'),
    concreteAfter: alt(city, 'concrete pressure washing', 'After', 'clean hot-water-washed concrete walkway'),
    deckBefore: alt(city, 'deck restoration', 'Before', 'weathered grey wood deck with slippery algae'),
    deckAfter: alt(city, 'deck restoration', 'After', 'restored stain-ready wood deck boards'),
    commercialBefore: alt(city, 'commercial cleaning', 'Before', 'dirty commercial dumpster pad and grease buildup'),
    commercialAfter: alt(city, 'commercial cleaning', 'After', 'sanitized commercial pad and building exterior'),
    windowBefore: alt(city, 'window cleaning', 'Before', 'filmy residential glass with hard-water spotting'),
    windowAfter: alt(city, 'window cleaning', 'After', 'crystal-clear residential glass with streak-free finish'),
    hero: `${BRAND} truck and trailer serving ${l} — soft washing, concrete, deck, window and commercial cleaning`,
    logo: `${BRAND} logo — exterior cleaning company serving ${l}`,
    story: `Duluth lift bridge and Lake Superior skyline near ${city.name} service area`,
  };
}

function prepareImages() {
  const psScript = String.raw`
Add-Type -AssemblyName System.Drawing
function Split-HalfImage($src, $beforeOut, $afterOut) {
  $img = [System.Drawing.Image]::FromFile($src)
  $w = [int]($img.Width / 2)
  $h = $img.Height
  $before = New-Object System.Drawing.Bitmap $w, $h
  $after = New-Object System.Drawing.Bitmap ($img.Width - $w), $h
  $g1 = [System.Drawing.Graphics]::FromImage($before)
  $g2 = [System.Drawing.Graphics]::FromImage($after)
  $g1.DrawImage($img, 0, 0, (New-Object System.Drawing.Rectangle 0, 0, $w, $h), [System.Drawing.GraphicsUnit]::Pixel)
  $g2.DrawImage($img, 0, 0, (New-Object System.Drawing.Rectangle $w, 0, ($img.Width - $w), $h), [System.Drawing.GraphicsUnit]::Pixel)
  $before.Save($beforeOut, [System.Drawing.Imaging.ImageFormat]::Jpeg)
  $after.Save($afterOut, [System.Drawing.Imaging.ImageFormat]::Jpeg)
  $g1.Dispose(); $g2.Dispose(); $before.Dispose(); $after.Dispose(); $img.Dispose()
}
function Copy-Image($src, $dest) { [System.IO.File]::Copy($src, $dest, $true) }
$imgDir = '${IMG.replace(/\\/g, '\\\\')}'
$dl = '${DL.replace(/\\/g, '\\\\')}'
Split-HalfImage "$dl\\Window cleaning Home img 1.jpg" "$imgDir\\window-res-before.jpg" "$imgDir\\window-res-after.jpg"
Split-HalfImage "$dl\\Deck-Restoration-Duluth-MN.jpg" "$imgDir\\deck-before.jpg" "$imgDir\\deck-after.jpg"
Copy-Image "$dl\\window-cleaning-duluth-mn-wfp-on-window.jpg" "$imgDir\\window-detail-before.jpg"
Copy-Image "$dl\\window-cleaning-clean-interior-shot-duluth-mn-up-north-pressure-washing.jpg" "$imgDir\\window-interior-after.jpg"
Copy-Image "$dl\\deck-presure-washing-duluth-mn-up-north-pressure-washing.jpg" "$imgDir\\deck-process-before.jpg"
Copy-Image "$dl\\pressure-washing-deck-duluth-mn-up-north-pressure-washing.jpg" "$imgDir\\deck-process-after.jpg"
Write-Output 'ok'
`;
  const psPath = path.join(SITE, '_prep-images.ps1');
  fs.writeFileSync(psPath, psScript);
  const r = spawnSync('powershell', ['-NoProfile', '-ExecutionPolicy', 'Bypass', '-File', psPath], { encoding: 'utf8' });
  fs.unlinkSync(psPath);
  if (r.status !== 0) throw new Error(r.stderr || 'image prep failed');
}

function injectSliderBlock(html, imgData, altData) {
  const block = `const IMGDATA = ${JSON.stringify(imgData)};
const ALTDATA = ${JSON.stringify(altData)};

// Build before/after sliders
document.querySelectorAll('.ba').forEach(ba=>{
  const before = IMGDATA[ba.dataset.before];
  const after  = IMGDATA[ba.dataset.after];
  ba.innerHTML = \`
    <img src="\${before}" alt="\${ALTDATA[ba.dataset.before]}" width="1000" height="750" decoding="async" loading="lazy">
    <div class="after-wrap"><img src="\${after}" alt="\${ALTDATA[ba.dataset.after]}" width="1000" height="750" decoding="async" loading="lazy"></div>
    <div class="tag before">Before</div>
    <div class="tag after">After</div>
    <div class="handle"></div>
    <div class="knob"><svg viewBox="0 0 24 24" fill="none"><path d="M8 7l-4 5 4 5M16 7l4 5-4 5" stroke="#7fc6e8" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
  \`;`;

  return html.replace(
    /const IMGDATA = \{[\s\S]*?\/\/ Build before\/after sliders[\s\S]*?`\;\s*\n\s*const wrap = ba\.querySelector\('\.after-wrap'\);/,
    `${block}\n  const wrap = ba.querySelector('.after-wrap');`
  );
}

function ensureSeoHead(html, { canonical, title, description, ogImage, city, serviceType }) {
  let out = html;
  const ogAbs = ogImage.startsWith('http') ? ogImage : `${DOMAIN}/${ogImage.replace(/^\//, '')}`;
  const relPreload = ogImage.replace(/^\//, '');

  if (!out.includes('meta name="robots"')) {
    out = out.replace(
      '<meta name="viewport"',
      '<meta name="robots" content="index,follow,max-image-preview:large">\n<meta name="viewport"'
    );
  }
  if (!out.includes('geo.region')) {
    const region = city.state === 'WI' ? 'US-WI' : 'US-MN';
    out = out.replace(
      '<meta name="viewport"',
      `<meta name="geo.region" content="${region}">\n<meta name="geo.placename" content="${city.name}, ${city.stateFull}">\n<meta name="viewport"`
    );
  }
  if (canonical && !out.includes('rel="canonical"')) {
    out = out.replace('</head>', `<link rel="canonical" href="${canonical}">\n</head>`);
  }
  if (!out.includes('property="og:image"')) {
    const ogBlock = `
<meta property="og:type" content="website">
<meta property="og:site_name" content="${BRAND}">
${out.includes('property="og:title"') ? '' : `<meta property="og:title" content="${title.replace(/"/g, '&quot;')}">`}
${out.includes('property="og:description"') ? '' : `<meta property="og:description" content="${description.replace(/"/g, '&quot;')}">`}
<meta property="og:url" content="${canonical || DOMAIN}">
<meta property="og:image" content="${ogAbs}">
<meta property="og:image:alt" content="${alt(city, serviceType, 'Professional', `${serviceType} results in ${loc(city)}`)}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${title.replace(/"/g, '&quot;')}">
<meta name="twitter:description" content="${description.replace(/"/g, '&quot;')}">
<meta name="twitter:image" content="${ogAbs}">`;
    out = out.replace('</head>', `${ogBlock}\n</head>`);
  } else if (!out.includes('property="og:title"')) {
    const ogBlock = `
<meta property="og:type" content="website">
<meta property="og:site_name" content="${BRAND}">
<meta property="og:title" content="${title.replace(/"/g, '&quot;')}">
<meta property="og:description" content="${description.replace(/"/g, '&quot;')}">
<meta property="og:url" content="${canonical || DOMAIN}">
<meta property="og:image" content="${ogAbs}">
<meta property="og:image:alt" content="${alt(city, serviceType, 'Professional', `${serviceType} results in ${loc(city)}`)}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${title.replace(/"/g, '&quot;')}">
<meta name="twitter:description" content="${description.replace(/"/g, '&quot;')}">
<meta name="twitter:image" content="${ogAbs}">`;
    out = out.replace('</head>', `${ogBlock}\n</head>`);
  }
  if (!out.includes('rel="preload" as="image"') && relPreload.includes('hero-bg')) {
    out = out.replace('</head>', `<link rel="preload" as="image" href="${relPreload}" fetchpriority="high">\n</head>`);
  }
  if (!out.includes('"@type":"Service"') && !out.includes('"@type": "Service"') && serviceType) {
    const schema = `
<script type="application/ld+json">
{
  "@context":"https://schema.org",
  "@type":"Service",
  "name":"${serviceType} ${loc(city)}",
  "description":"${description.replace(/"/g, '\\"')}",
  "provider":{"@type":"LocalBusiness","name":"${BRAND}","telephone":"+1-218-576-8610","url":"${DOMAIN}"},
  "areaServed":{"@type":"City","name":"${city.name}","addressRegion":"${city.state}"},
  "serviceType":"${serviceType}"
}
</script>`;
    out = out.replace('</head>', `${schema}\n</head>`);
  }
  out = out.replace(/fetchpriority="high" decoding="async"[^>]*fetchpriority="high"/, 'fetchpriority="high" decoding="async"');
  out = out.replace(/width="120" height="46" decoding="async" alt="([^"]*)"(?: height="46")?/, 'width="120" height="46" decoding="async" alt="$1"');
  if (!out.includes('rel="dns-prefetch"')) {
    out = out.replace('</head>', '<link rel="dns-prefetch" href="https://fonts.googleapis.com">\n</head>');
  }
  return out;
}

function patchHub(html, city) {
  const a = hubAlts(city);
  let out = html;
  out = out.replace(/alt="Up North Pressure Washing logo[^"]*"/, `alt="${a.logo}"`);
  out = out.replace(/alt="Up North Pressure Washing truck[^"]*"/, `alt="${a.hero}"`);
  out = out.replace(
    /(<img class="ba__before" src="images\/house-wash-before\.jpg" alt=")[^"]+/,
    `$1${a.softBefore}`
  );
  out = out.replace(
    /(<img class="ba__after" src="images\/house-wash-after\.jpg" alt=")[^"]+/,
    `$1${a.softAfter}`
  );
  out = out.replace(
    /(<img class="ba__before" src="images\/concrete-before\.jpg" alt=")[^"]+/,
    `$1${a.concreteBefore}`
  );
  out = out.replace(
    /(<img class="ba__after" src="images\/concrete-after\.jpg" alt=")[^"]+/,
    `$1${a.concreteAfter}`
  );
  out = out.replace(
    /(<img class="ba__before" src="images\/deck-before\.jpg" alt=")[^"]+/,
    `$1${a.deckBefore}`
  );
  out = out.replace(
    /(<img class="ba__after" src="images\/deck-after\.jpg" alt=")[^"]+/,
    `$1${a.deckAfter}`
  );
  out = out.replace(
    /(<img class="ba__before" src="images\/commercial-before\.jpg" alt=")[^"]+/,
    `$1${a.commercialBefore}`
  );
  out = out.replace(
    /(<img class="ba__after" src="images\/commercial-after\.jpg" alt=")[^"]+/,
    `$1${a.commercialAfter}`
  );
  out = out.replace(
    /(<img class="ba__before" src="images\/window-res-before\.jpg" alt=")[^"]+/,
    `$1${a.windowBefore}`
  );
  out = out.replace(
    /(<img class="ba__after" src="images\/window-res-after\.jpg" alt=")[^"]+/,
    `$1${a.windowAfter}`
  );
  const titleMatch = out.match(/<title>([^<]*)<\/title>/);
  const descMatch = out.match(/<meta name="description" content="([^"]*)">/);
  if (titleMatch && descMatch) {
    out = ensureSeoHead(out, {
      canonical: `${DOMAIN}/${city.hubFile === 'index.html' ? '' : city.hubFile}`.replace(/\/$/, '/'),
      title: titleMatch[1],
      description: descMatch[1],
      ogImage: 'images/hero-bg.jpg',
      city,
      serviceType: 'Exterior Cleaning',
    });
  }
  return out;
}

function patchServicePage(file, city, type, imgData, altData, ogImage, serviceType) {
  let html = fs.readFileSync(path.join(SITE, file), 'utf8');
  html = injectSliderBlock(html, imgData, altData);
  const title = (html.match(/<title>([^<]*)<\/title>/) || [])[1] || '';
  const description = (html.match(/<meta name="description" content="([^"]*)">/) || [])[1] || '';
  const canonical = `${DOMAIN}/${file}`;
  html = ensureSeoHead(html, { canonical, title, description, ogImage, city, serviceType });
  if (!html.includes('<script defer>') && html.includes('\n<script>\nconst IMGDATA')) {
    html = html.replace('\n<script>\nconst IMGDATA', '\n<script defer>\nconst IMGDATA');
  }
  fs.writeFileSync(path.join(SITE, file), html);
}

function main() {
  prepareImages();

  const stats = { window: 0, deck: 0, soft: 0, concrete: 0, commercial: 0, hub: 0 };

  for (const city of CITIES) {
    const slug = city.slug;
    const files = {
      window: `window-cleaning-${slug}.html`,
      deck: `deck-restoration-${slug}.html`,
      soft: `soft-washing-${slug}.html`,
      concrete: `concrete-washing-${slug}.html`,
      commercial: `commercial-soft-washing-${slug}.html`,
    };
    if (fs.existsSync(path.join(SITE, files.window))) {
      patchServicePage(files.window, city, 'window', WINDOW_IMG, windowAlts(city), WINDOW_IMG.HERO_AFTER, 'Window Cleaning');
      stats.window++;
    }
    if (fs.existsSync(path.join(SITE, files.deck))) {
      patchServicePage(files.deck, city, 'deck', DECK_IMG, deckAlts(city), DECK_IMG.HERO_AFTER, 'Deck and Fence Restoration');
      stats.deck++;
    }
    if (fs.existsSync(path.join(SITE, files.soft))) {
      patchServicePage(files.soft, city, 'soft', SOFT_IMG, softAlts(city), SOFT_IMG.HERO_AFTER, 'Soft Washing');
      stats.soft++;
    }
    if (fs.existsSync(path.join(SITE, files.concrete))) {
      patchServicePage(files.concrete, city, 'concrete', CONCRETE_IMG, concreteAlts(city), CONCRETE_IMG.HERO_AFTER, 'Concrete Pressure Washing');
      stats.concrete++;
    }
    if (fs.existsSync(path.join(SITE, files.commercial))) {
      patchServicePage(files.commercial, city, 'commercial', COMMERCIAL_IMG, commercialAlts(city), COMMERCIAL_IMG.HERO_AFTER, 'Commercial Soft Washing');
      stats.commercial++;
    }
    const hubPath = path.join(SITE, city.hubFile);
    if (fs.existsSync(hubPath)) {
      fs.writeFileSync(hubPath, patchHub(fs.readFileSync(hubPath, 'utf8'), city));
      stats.hub++;
    }
  }

  // sync build-service-pages image maps
  let build = fs.readFileSync(path.join(SITE, 'build-service-pages.mjs'), 'utf8');
  for (const [name, obj] of [['WINDOW_IMG', WINDOW_IMG], ['DECK_IMG', DECK_IMG]]) {
    const json = JSON.stringify(obj, null, 2).replace(/"([^"]+)":/g, '$1:');
    build = build.replace(new RegExp(`const ${name} = \\{[\\s\\S]*?\\};`), `const ${name} = ${json};`);
  }
  fs.writeFileSync(path.join(SITE, 'build-service-pages.mjs'), build);

  // update window slider 2 label uniformly
  for (const f of fs.readdirSync(SITE).filter(x => x.startsWith('window-cleaning-'))) {
    let html = fs.readFileSync(path.join(SITE, f), 'utf8');
    html = html.replace(
      '<h3>Interior Clarity</h3><span>Multi-Pane Windows</span>',
      '<h3>Pro Technique to Interior Clarity</h3><span>Exterior Wash → Streak-Free Inside</span>'
    );
    fs.writeFileSync(path.join(SITE, f), html);
  }

  console.log('SEO + uniform polish complete:', stats);
}

main();
