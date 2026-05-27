import fs from 'fs';
import path from 'path';

const SITE = path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1'));
const DOMAIN = 'https://www.upnorthpressurewashing.com';
let fixed = 0;

for (const f of fs.readdirSync(SITE).filter(x => x.endsWith('.html'))) {
  let h = fs.readFileSync(path.join(SITE, f), 'utf8');
  const orig = h;
  h = h.replace(/ decoding="async" alt="([^"]+)" height="46"/g, ' decoding="async" alt="$1"');
  if (h.includes('property="og:title"') && !h.includes('property="og:image"')) {
    let og = 'images/concrete-after.jpg';
    if (f.startsWith('window-cleaning-')) og = 'images/window-res-after.jpg';
    else if (f.startsWith('deck-restoration-')) og = 'images/deck-after.jpg';
    else if (f.startsWith('soft-washing-')) og = 'images/ba/hero-after.jpg';
    else if (f.startsWith('commercial-soft-washing-')) og = 'images/commercial-after.jpg';
    else if (f.includes('pressure-washing') || f === 'index.html') og = 'images/hero-bg.jpg';
    h = h.replace('</head>', `<meta property="og:image" content="${DOMAIN}/${og}">\n<meta name="twitter:card" content="summary_large_image">\n</head>`);
  }
  if (h !== orig) {
    fs.writeFileSync(path.join(SITE, f), h);
    fixed++;
  }
}
console.log('Fixed', fixed, 'files');
