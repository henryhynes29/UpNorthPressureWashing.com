import fs from 'fs';
import path from 'path';

const SITE = path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1'));
const DL = path.join(SITE, '..');

const PHONE = '218-576-8610';
const DOMAIN = 'https://www.upnorthpressurewashing.com';

const CITIES = [
  'duluth', 'hermantown', 'proctor', 'cloquet', 'superior', 'two-harbors',
  'esko', 'carlton', 'scanlon', 'wrenshall', 'barnum', 'moose-lake',
  'silver-bay', 'lake-nebagamon', 'hibbing', 'virginia', 'eveleth',
];

const CITY_NAMES = {
  duluth: 'Duluth', hermantown: 'Hermantown', proctor: 'Proctor', cloquet: 'Cloquet',
  superior: 'Superior', 'two-harbors': 'Two Harbors', esko: 'Esko', carlton: 'Carlton',
  scanlon: 'Scanlon', wrenshall: 'Wrenshall', barnum: 'Barnum', 'moose-lake': 'Moose Lake',
  'silver-bay': 'Silver Bay', 'lake-nebagamon': 'Lake Nebagamon', hibbing: 'Hibbing',
  virginia: 'Virginia', eveleth: 'Eveleth',
};

function fixGlobal(html) {
  return html
    .replace(/\(218\)\s*000-0000/g, PHONE)
    .replace(/northpressurewashing\.com/g, 'upnorthpressurewashing.com')
    .replace(/hot-water-pressure-washing-([a-z-]+)(?:-(?:mn|wi))?\.html/g, 'concrete-washing-$1.html')
    .replace(/soft-washing-([a-z-]+)-(?:mn|wi)\.html/g, 'soft-washing-$1.html')
    .replace(/concrete-washing-([a-z-]+)-(?:mn|wi)\.html/g, 'concrete-washing-$1.html')
    .replace(/commercial-soft-washing-([a-z-]+)-(?:mn|wi)\.html/g, 'commercial-soft-washing-$1.html');
}

function pickSource(baseName) {
  const candidates = [
    path.join(DL, baseName),
    path.join(SITE, baseName),
    path.join(SITE, baseName.replace('.html', '-mn.html')),
    path.join(SITE, baseName.replace('.html', '-wi.html')),
  ];
  for (const c of candidates) {
    if (fs.existsSync(c)) return c;
  }
  return null;
}

function copyPage(baseName, fallbacks = []) {
  let src = pickSource(baseName);
  for (const fb of fallbacks) {
    if (!src) src = pickSource(fb);
  }
  if (!src) {
    console.warn('MISSING:', baseName);
    return false;
  }
  let html = fs.readFileSync(src, 'utf8');
  html = fixGlobal(html);
  fs.writeFileSync(path.join(SITE, baseName), html);
  console.log('OK:', baseName, '←', path.basename(src));
  return true;
}

function generateFromTemplate(templateName, outName, replacements) {
  const src = pickSource(templateName);
  if (!src) {
    console.warn('NO TEMPLATE for', outName);
    return false;
  }
  let html = fs.readFileSync(src, 'utf8');
  for (const [from, to] of replacements) {
    html = html.split(from).join(to);
  }
  html = fixGlobal(html);
  fs.writeFileSync(path.join(SITE, outName), html);
  console.log('GENERATED:', outName);
  return true;
}

function main() {
  let ok = 0;
  let fail = 0;

  // ── 17 soft washing ──
  for (const c of CITIES) {
    if (copyPage(`soft-washing-${c}.html`, [`soft-washing-${c} (1).html`])) ok++; else fail++;
  }

  // ── 17 concrete washing ──
  for (const c of CITIES) {
    if (copyPage(`concrete-washing-${c}.html`, [`concrete-washing-${c} (1).html`])) ok++; else fail++;
  }

  // ── 17 commercial soft washing ──
  for (const c of CITIES) {
    if (copyPage(`commercial-soft-washing-${c}.html`, [`commercial-soft-washing-${c} (1).html`])) ok++; else fail++;
  }

  // Generate missing commercial silver-bay from two-harbors
  if (!fs.existsSync(path.join(SITE, 'commercial-soft-washing-silver-bay.html'))) {
    generateFromTemplate('commercial-soft-washing-two-harbors.html', 'commercial-soft-washing-silver-bay.html', [
      ['Two Harbors', 'Silver Bay'], ['two-harbors', 'silver-bay'],
      ['47.02215', '47.29437'], ['91.67073', '91.26679'], ['55616', '55614'],
      ['North Shore harbor town', 'North Shore mining community'],
    ]);
    ok++;
  }

  // ── 18 Learning Center (blog-index + 17 posts) ──
  if (copyPage('blog-index.html')) ok++; else fail++;

  for (const c of CITIES) {
    if (copyPage(`blog-soft-washing-home-value-${c}.html`, [`blog-soft-washing-home-value-${c} (1).html`])) ok++; else fail++;
  }

  // Generate missing lake-nebagamon blog from superior
  if (!fs.existsSync(path.join(SITE, 'blog-soft-washing-home-value-lake-nebagamon.html'))) {
    generateFromTemplate('blog-soft-washing-home-value-superior.html', 'blog-soft-washing-home-value-lake-nebagamon.html', [
      ['Superior', 'Lake Nebagamon'], ['superior', 'lake-nebagamon'],
      ['Twin Ports Wisconsin', 'Douglas County lake community'], ['54880', '54849'],
    ]);
    ok++;
  }

  // Learning center alias (index.html links to this)
  const blogIndex = fs.readFileSync(path.join(SITE, 'blog-index.html'), 'utf8');
  fs.writeFileSync(path.join(SITE, 'learning-center-mn.html'), blogIndex);
  console.log('OK: learning-center-mn.html ← blog-index.html');

  // Fix all HTML links site-wide to simple filenames
  for (const f of fs.readdirSync(SITE).filter(x => x.endsWith('.html'))) {
    const fp = path.join(SITE, f);
    let html = fs.readFileSync(fp, 'utf8');
    const fixed = fixGlobal(html);
    if (fixed !== html) fs.writeFileSync(fp, fixed);
  }

  // Update index.html service links
  const indexPath = path.join(SITE, 'index.html');
  if (fs.existsSync(indexPath)) {
    let index = fs.readFileSync(indexPath, 'utf8');
    index = fixGlobal(index);
    index = index.replace(/href="soft-washing-duluth-mn\.html"/g, 'href="soft-washing-duluth.html"');
    index = index.replace(/href="concrete-washing-duluth-mn\.html"/g, 'href="concrete-washing-duluth.html"');
    index = index.replace(/href="learning-center-mn\.html"/g, 'href="blog-index.html"');
    if (!index.includes('blog-index.html')) {
      index = index.replace(
        /href="learning-center-mn\.html"/g,
        'href="blog-index.html"'
      );
    }
    fs.writeFileSync(indexPath, index);
  }

  // Verify counts
  const counts = {
    soft: CITIES.filter(c => fs.existsSync(path.join(SITE, `soft-washing-${c}.html`))).length,
    concrete: CITIES.filter(c => fs.existsSync(path.join(SITE, `concrete-washing-${c}.html`))).length,
    commercial: CITIES.filter(c => fs.existsSync(path.join(SITE, `commercial-soft-washing-${c}.html`))).length,
    blog: CITIES.filter(c => fs.existsSync(path.join(SITE, `blog-soft-washing-home-value-${c}.html`))).length,
    blogIndex: fs.existsSync(path.join(SITE, 'blog-index.html')),
  };

  console.log('\n── Verification ──');
  console.log(`Soft washing:          ${counts.soft}/17`);
  console.log(`Concrete washing:      ${counts.concrete}/17`);
  console.log(`Commercial soft wash:  ${counts.commercial}/17`);
  console.log(`Blog posts:            ${counts.blog}/17`);
  console.log(`Blog index:            ${counts.blogIndex ? 'yes' : 'NO'}`);
  console.log(`Learning center alias: ${fs.existsSync(path.join(SITE, 'learning-center-mn.html')) ? 'yes' : 'NO'}`);
  console.log(`Total service pages:   ${counts.soft + counts.concrete + counts.commercial + counts.blog + (counts.blogIndex ? 1 : 0)}/69`);
  console.log(`Total HTML in folder:  ${fs.readdirSync(SITE).filter(x => x.endsWith('.html')).length}`);
}

main();
