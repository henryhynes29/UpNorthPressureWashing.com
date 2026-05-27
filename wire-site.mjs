import fs from 'fs';
import path from 'path';

const SITE = path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1'));
const IMG = path.join(SITE, 'images');
const BA = path.join(IMG, 'ba');

const GOOGLE_REVIEWS = 'https://g.page/r/CSCaz34lDtneEBE/review';

const CITIES = [
  { slug: 'duluth', name: 'Duluth', hub: 'index.html' },
  { slug: 'hermantown', name: 'Hermantown', hub: 'hermantown-mn-pressure-washing.html' },
  { slug: 'proctor', name: 'Proctor', hub: 'proctor-mn-pressure-washing.html' },
  { slug: 'cloquet', name: 'Cloquet', hub: 'pressure-washing-cloquet-mn.html' },
  { slug: 'superior', name: 'Superior', hub: 'superior-wi-pressure-washing.html' },
  { slug: 'two-harbors', name: 'Two Harbors', hub: 'two-harbors-mn-pressure-washing.html' },
  { slug: 'esko', name: 'Esko', hub: 'esko-mn-pressure-washing.html' },
  { slug: 'carlton', name: 'Carlton', hub: 'carlton-mn-pressure-washing.html' },
  { slug: 'scanlon', name: 'Scanlon', hub: 'scanlon-mn-pressure-washing.html' },
  { slug: 'wrenshall', name: 'Wrenshall', hub: 'wrenshall-mn-pressure-washing.html' },
  { slug: 'barnum', name: 'Barnum', hub: 'barnum-mn-pressure-washing.html' },
  { slug: 'moose-lake', name: 'Moose Lake', hub: 'moose-lake-mn-pressure-washing.html' },
  { slug: 'silver-bay', name: 'Silver Bay', hub: 'silver-bay-mn-pressure-washing.html' },
  { slug: 'lake-nebagamon', name: 'Lake Nebagamon', hub: 'lake-nebagamon-wi-pressure-washing.html' },
  { slug: 'hibbing', name: 'Hibbing', hub: 'hibbing-mn-pressure-washing.html' },
  { slug: 'virginia', name: 'Virginia', hub: 'virginia-mn-pressure-washing.html' },
  { slug: 'eveleth', name: 'Eveleth', hub: 'eveleth-mn-pressure-washing.html' },
];

function bySlug(slug) {
  return CITIES.find(c => c.slug === slug);
}

function soft(slug) { return `soft-washing-${slug}.html`; }
function concrete(slug) { return `concrete-washing-${slug}.html`; }
function commercial(slug) { return `commercial-soft-washing-${slug}.html`; }
function blog(slug) { return `blog-soft-washing-home-value-${slug}.html`; }

function writeDataUri(filePath, dataUri) {
  const m = dataUri.match(/^data:([^;]+);base64,(.+)$/);
  if (!m) return false;
  fs.writeFileSync(filePath, Buffer.from(m[2], 'base64'));
  return true;
}

function extractDataUris(html, label) {
  const re = /src="(data:image\/[^"]+)"/g;
  let m, i = 0;
  const map = {};
  while ((m = re.exec(html)) !== null) {
    const key = `${label}-${i++}`;
    map[key] = m[1];
  }
  return map;
}

function extractImages() {
  fs.mkdirSync(BA, { recursive: true });

  const index = fs.readFileSync(path.join(SITE, 'index.html'), 'utf8');
  const herm = fs.readFileSync(path.join(SITE, 'hermantown-mn-pressure-washing.html'), 'utf8');
  const softDuluth = fs.readFileSync(path.join(SITE, 'soft-washing-duluth.html'), 'utf8');

  // Hero + logo from index
  const heroMatch = index.match(/<img class="bg" src="(data:image\/[^"]+)"/);
  if (heroMatch) writeDataUri(path.join(IMG, 'hero-bg.jpg'), heroMatch[1]);

  const logoMatch = index.match(/<img src="(data:image\/png;base64,[^"]+)"/);
  if (logoMatch) writeDataUri(path.join(IMG, 'logo.png'), logoMatch[1]);

  // Before/after from hermantown embedded images (same assets used site-wide)
  const baMap = {
    'house-wash-after.jpg': herm.match(/class="ba__after" src="(data:image[^"]+)"/)?.[1],
    'house-wash-before.jpg': herm.match(/class="ba__before" src="(data:image[^"]+)"/)?.[1],
  };

  // Additional BA pairs from hermantown sections
  const allAfter = [...herm.matchAll(/class="ba__after" src="(data:image[^"]+)"/g)].map(x => x[1]);
  const allBefore = [...herm.matchAll(/class="ba__before" src="(data:image[^"]+)"/g)].map(x => x[1]);
  const names = ['house-wash-after.jpg','house-wash-before.jpg','concrete-after.jpg','concrete-before.jpg','deck-after.jpg','deck-before.jpg','commercial-after.jpg','commercial-before.jpg','window-after.jpg','window-before.jpg'];
  names.forEach((name, i) => {
    const uri = name.includes('after') ? allAfter[Math.floor(i/2)] : allBefore[Math.floor(i/2)];
    if (uri && !fs.existsSync(path.join(IMG, name))) writeDataUri(path.join(IMG, name), uri);
  });

  // Soft-washing page slider images from IMGDATA
  const imgDataMatch = softDuluth.match(/const IMGDATA = (\{[\s\S]*?\});/);
  if (imgDataMatch) {
    const imgData = JSON.parse(imgDataMatch[1]);
    const keys = {
      HERO_BEFORE: 'hero-before.jpg', HERO_AFTER: 'hero-after.jpg',
      STUCCO_BEFORE: 'stucco-before.jpg', STUCCO_AFTER: 'stucco-after.jpg',
      ROOF_BEFORE: 'roof-before.jpg', ROOF_AFTER: 'roof-after.jpg',
      CONCRETE_BEFORE: 'concrete-ba-before.jpg', CONCRETE_AFTER: 'concrete-ba-after.jpg',
    };
    for (const [k, file] of Object.entries(keys)) {
      if (imgData[k]) writeDataUri(path.join(BA, file), imgData[k]);
    }
    // fill missing keys from IMGDATA dynamically
    for (const [k, v] of Object.entries(imgData)) {
      const f = path.join(BA, `${k.toLowerCase().replace(/_/g, '-')}.jpg`);
      if (!fs.existsSync(f)) writeDataUri(f, v);
    }
  }

  // Story bg - use hero or skip; lift bridge optional
  console.log('Images extracted to', IMG);
}

function externalizeSoftWashingImages(html) {
  const imgDataMatch = html.match(/const IMGDATA = (\{[\s\S]*?\});/);
  if (!imgDataMatch) return html;

  let imgData;
  try { imgData = JSON.parse(imgDataMatch[1]); } catch { return html; }

  const pathMap = {};
  for (const key of Object.keys(imgData)) {
    const file = `images/ba/${key.toLowerCase().replace(/_/g, '-')}.jpg`;
    pathMap[key] = file;
  }

  let out = html.replace(/const IMGDATA = \{[\s\S]*?\};/,
    `const IMGDATA = ${JSON.stringify(pathMap)};`);

  // Replace data URI values in pathMap strings - actually IMGDATA values should be paths not data uris
  out = out.replace(/const IMGDATA = (\{[^}]+\});/, () => {
    const paths = {};
    for (const k of Object.keys(imgData)) {
      paths[k] = `images/ba/${k.toLowerCase().replace(/_/g, '-')}.jpg`;
    }
    return `const IMGDATA = ${JSON.stringify(paths)};`;
  });

  return out;
}

function hubFixes(html, city) {
  const s = city.slug;
  let out = html;

  // Quote / contact
  out = out.replace(/href="contact\.html"/g, 'href="#quote"');

  // FAQ
  out = out.replace(/href="faq\.html"/g, 'href="faq.html"');

  // Window nav → home window section (only duluth has full page sections)
  out = out.replace(/href="window-cleaning-duluth-mn\.html"/g,
    s === 'duluth' ? 'href="#window-cleaning"' : `href="${city.hub}#window-cleaning"`);

  // Deck restoration
  out = out.replace(/href="deck-restoration-duluth-mn\.html"/g,
    s === 'duluth' ? 'href="#deck-restoration"' : `href="${city.hub}#deck-restoration"`);

  // Service buttons - ensure city-specific
  out = out.replace(/href="soft-washing-[a-z-]+\.html"/g, `href="${soft(s)}"`);
  out = out.replace(/href="concrete-washing-[a-z-]+\.html"/g, `href="${concrete(s)}"`);

  // Commercial section: add secondary link if missing, fix quote button
  if (out.includes('Commercial Cleaning') && !out.includes(`href="${commercial(s)}"`)) {
    out = out.replace(
      /(<h2>Commercial Cleaning[^<]*<\/h2>[\s\S]*?<p class="copy">[\s\S]*?<\/p>)\s*<a class="btn btn--quote" href="#quote">Get Your Free Quote<\/a>/,
      `$1\n    <a class="btn btn--secondary" href="${commercial(s)}">See Our Work &amp; Learn More</a>\n    <a class="btn btn--quote" href="#quote">Get Your Free Quote</a>`
    );
  }

  // Canonical fix
  out = out.replace(/https:\/\/upupup+northpressurewashing\.com/g, 'https://www.upnorthpressurewashing.com');

  // Google reviews
  out = out.replace(/href="REPLACE_WITH_YOUR_GOOGLE_REVIEWS_LINK"/g, `href="${GOOGLE_REVIEWS}"`);

  // Section IDs for anchor links
  out = out.replace(/<section class="block reveal">\s*\n\s*<div class="wrap center">\s*\n\s*<p class="section-eyebrow">Exterior Cleaning<\/p>/,
    '<section class="block reveal" id="soft-washing">\n  <div class="wrap center">\n    <p class="section-eyebrow">Exterior Cleaning</p>');
  out = out.replace(/<p class="section-eyebrow">Deep Clean Results<\/p>/,
    '<p class="section-eyebrow" id="concrete-washing">Deep Clean Results</p>');
  out = out.replace(/<p class="section-eyebrow">Wood Restoration<\/p>/,
    '<p class="section-eyebrow" id="deck-restoration">Wood Restoration</p>');
  out = out.replace(/<p class="section-eyebrow">Northland Businesses<\/p>/,
    '<p class="section-eyebrow" id="commercial-cleaning">Northland Businesses</p>');
  out = out.replace(/<p class="section-eyebrow">Streak-Free Glass<\/p>/,
    '<p class="section-eyebrow" id="window-cleaning">Streak-Free Glass</p>');

  // Quote section id
  out = out.replace(/<section class="block alt center">\s*\n\s*<div class="wrap">\s*\n\s*<h2>Get Your Free Quote<\/h2>/,
    '<section class="block alt center" id="quote">\n  <div class="wrap">\n    <h2>Get Your Free Quote</h2>');

  // Externalize hero/logo if still base64
  out = out.replace(/<img class="bg" src="data:image[^"]+"/,
    '<img class="bg" src="images/hero-bg.jpg" fetchpriority="high" decoding="async"');
  out = out.replace(/(<a[^>]*aria-label="Up North Pressure Washing home"[^>]*>\s*)<img src="data:image[^"]+"/,
    '$1<img src="images/logo.png" width="512" height="512" decoding="async"');

  // Ensure images/ paths have decoding lazy (already on ba)
  out = out.replace(/src="images\//g, 'src="images/');

  return out;
}

function servicePageFixes(html, type, slug) {
  const city = bySlug(slug);
  if (!city) return html;

  let out = html;

  // Brand → home
  out = out.replace(/<a href="#top" class="brand"/g, `<a href="${city.hub}" class="brand"`);
  out = out.replace(/<a href="\/" class="brand"/g, `<a href="index.html" class="brand"`);

  // Inject cross-links footer block before closing footer if not present
  const crossNav = `
    <div class="foot-col"><h4>${city.name} Pages</h4>
      <a href="${city.hub}">${city.name} Home</a>
      <a href="${soft(slug)}">Soft Washing</a>
      <a href="${concrete(slug)}">Concrete Washing</a>
      <a href="${commercial(slug)}">Commercial</a>
      <a href="${blog(slug)}">Home Value Guide</a>
      <a href="blog-index.html">Learning Center</a>
    </div>`;

  if (!out.includes('${city.name} Pages') && !out.includes(`${city.name} Pages`)) {
    out = out.replace(/<div class="foot-links">/, `<div class="foot-links">${crossNav}`);
  }

  if (type === 'soft') {
    out = externalizeSoftWashingImages(out);
  }

  out = out.replace(/https:\/\/upupup+northpressurewashing\.com/g, 'https://www.upnorthpressurewashing.com');
  out = out.replace(/\(218\)\s*000-0000/g, '218-576-8610');

  // Font display swap already in url - add preconnect if missing
  if (!out.includes('display=swap') && out.includes('fonts.googleapis.com')) {
    out = out.replace(/display=swap/, 'display=swap');
  }

  return out;
}

function createFaq() {
  const faq = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>FAQ | Up North Pressure Washing</title>
<meta name="description" content="Frequently asked questions about soft washing, concrete cleaning, and pressure washing in Duluth MN and the Twin Ports.">
<link rel="canonical" href="https://www.upnorthpressurewashing.com/faq.html">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700&family=Source+Sans+3:wght@400;600;700&display=swap" rel="stylesheet">
<style>
body{font-family:'Source Sans 3',sans-serif;background:#0d1b27;color:#e9f1f6;margin:0;line-height:1.65}
.wrap{max-width:760px;margin:0 auto;padding:2rem 1.25rem 4rem}
h1{font-family:'Barlow Condensed',sans-serif;text-transform:uppercase;color:#e3b53e}
h2{font-size:1.15rem;margin-top:2rem;color:#7fc6e8}
a{color:#7fc6e8}
.nav{margin-bottom:2rem}
.nav a{margin-right:1rem;text-decoration:none;font-weight:600}
</style>
</head>
<body>
<div class="wrap">
  <p class="nav"><a href="index.html">← Home</a><a href="blog-index.html">Learning Center</a><a href="index.html#quote">Free Quote</a></p>
  <h1>Frequently Asked Questions</h1>
  <h2>What is soft washing?</h2>
  <p>Soft washing uses low pressure and professional cleaning solutions to safely remove algae, mold, and grime from siding and roofs — without the damage risk of high-pressure washing.</p>
  <h2>Do you serve my city?</h2>
  <p>We serve Duluth, Hermantown, Proctor, Cloquet, Superior, Two Harbors, Esko, Carlton County, the North Shore, and the Iron Range. <a href="index.html">See all service areas</a>.</p>
  <h2>What's the difference between soft washing and pressure washing?</h2>
  <p>Soft washing is for delicate surfaces like siding and roofs. Hot water pressure washing is for concrete, driveways, and heavy grease or salt buildup.</p>
  <h2>Are you insured?</h2>
  <p>Yes — we carry $1M+ liability insurance and are fully insured for residential and commercial work.</p>
  <h2>Do you offer a guarantee?</h2>
  <p>Soft washes include a 1-year growth-free guarantee. If organic growth returns within 12 months, we retreat at no charge.</p>
  <h2>How do I get a quote?</h2>
  <p>Call <a href="tel:+12185768610">218-576-8610</a> or <a href="index.html#quote">request a free quote online</a>.</p>
</div>
</body>
</html>`;
  fs.writeFileSync(path.join(SITE, 'faq.html'), faq);
  console.log('Created faq.html');
}

function indexExternalize(html) {
  let out = html;
  out = out.replace(/<img class="bg" src="data:image[^"]+"/,
    '<img class="bg" src="images/hero-bg.jpg" fetchpriority="high" decoding="async" alt=""');
  out = out.replace(/(<a[^>]*aria-label="Up North Pressure Washing home"[^>]*>\s*)<img src="data:image[^"]+"/,
    '$1<img src="images/logo.png" alt="Up North Pressure Washing" width="512" height="512" decoding="async"');
  // Remove duplicate huge base64 from og:image - use hero path
  out = out.replace(/<meta property="og:image" content="data:image[^"]*">/,
    '<meta property="og:image" content="https://www.upnorthpressurewashing.com/images/hero-bg.jpg">');
  out = out.replace(/"image": "data:image[^"]*"/, '"image": "https://www.upnorthpressurewashing.com/images/hero-bg.jpg"');
  return out;
}

function main() {
  extractImages();
  createFaq();

  // Hub pages
  for (const city of CITIES) {
    const fp = path.join(SITE, city.hub);
    if (!fs.existsSync(fp)) continue;
    let html = fs.readFileSync(fp, 'utf8');
    html = hubFixes(html, city);
    if (city.slug === 'duluth') html = indexExternalize(html);
    fs.writeFileSync(fp, html);
    console.log('Wired hub:', city.hub);
  }

  // Service pages
  for (const city of CITIES) {
    for (const [type, file] of [
      ['soft', soft(city.slug)],
      ['concrete', concrete(city.slug)],
      ['commercial', commercial(city.slug)],
      ['blog', blog(city.slug)],
    ]) {
      const fp = path.join(SITE, file);
      if (!fs.existsSync(fp)) continue;
      let html = fs.readFileSync(fp, 'utf8');
      html = servicePageFixes(html, type, city.slug);
      if (type === 'soft' || type === 'concrete' || type === 'commercial') {
        html = externalizeSoftWashingImages(html); // same IMGDATA pattern on concrete/commercial
      }
      // Blog pages - link home
      if (type === 'blog') {
        html = html.replace(/href="\/"/g, 'href="index.html"');
        html = html.replace(/href="\/blog/g, 'href="blog');
      }
      fs.writeFileSync(fp, html);
    }
  }

  // Blog index + learning center
  for (const f of ['blog-index.html', 'learning-center-mn.html']) {
    const fp = path.join(SITE, f);
    if (!fs.existsSync(fp)) continue;
    let html = fs.readFileSync(fp, 'utf8');
    html = html.replace(/href="index\.html#quote"/g, 'href="index.html#quote"');
    fs.writeFileSync(fp, html);
  }

  // Verify broken links
  const broken = [];
  for (const f of fs.readdirSync(SITE).filter(x => x.endsWith('.html'))) {
    const html = fs.readFileSync(path.join(SITE, f), 'utf8');
    for (const m of html.matchAll(/href="([^"#][^"]*\.html)"/g)) {
      const target = m[1].split('/').pop();
      if (!fs.existsSync(path.join(SITE, target)) && !broken.includes(`${f} → ${target}`)) {
        broken.push(`${f} → ${target}`);
      }
    }
  }

  console.log('\n── Broken local links ──');
  console.log(broken.length ? broken.join('\n') : 'None found');

  const indexSize = (fs.statSync(path.join(SITE, 'index.html')).size / 1024 / 1024).toFixed(2);
  const softSize = (fs.statSync(path.join(SITE, 'soft-washing-duluth.html')).size / 1024 / 1024).toFixed(2);
  console.log(`\nindex.html: ${indexSize} MB | soft-washing-duluth.html: ${softSize} MB`);
}

main();
