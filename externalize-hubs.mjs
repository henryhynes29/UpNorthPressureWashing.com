import fs from 'fs';
import path from 'path';

const SITE = path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1'));

const hubFiles = fs.readdirSync(SITE).filter(f =>
  f.endsWith('.html') &&
  (f === 'index.html' || f.includes('pressure-washing'))
);

function externalizeHub(html) {
  let out = html;

  out = out.replace(/<img class="bg" src="data:image[^"]+"/g,
    '<img class="bg" src="images/hero-bg.jpg" fetchpriority="high" decoding="async"');
  out = out.replace(/(<a[^>]*aria-label="Up North Pressure Washing home"[^>]*>\s*)<img src="data:image[^"]+"/g,
    '$1<img src="images/logo.png" alt="Up North Pressure Washing" width="120" height="46" decoding="async"');
  out = out.replace(/<meta property="og:image" content="data:image[^"]*">/g,
    '<meta property="og:image" content="https://www.upnorthpressurewashing.com/images/hero-bg.jpg">');
  out = out.replace(/"image": "data:image[^"]*"/g,
    '"image": "https://www.upnorthpressurewashing.com/images/hero-bg.jpg"');

  const baMap = [
    ['house-wash-after.jpg', 'ba__after'],
    ['house-wash-before.jpg', 'ba__before'],
    ['concrete-after.jpg', 'ba__after'],
    ['concrete-before.jpg', 'ba__before'],
    ['deck-after.jpg', 'ba__after'],
    ['deck-before.jpg', 'ba__before'],
    ['commercial-after.jpg', 'ba__after'],
    ['commercial-before.jpg', 'ba__before'],
    ['window-after.jpg', 'ba__after'],
    ['window-before.jpg', 'ba__before'],
  ];

  let baIndex = 0;
  out = out.replace(/<img class="(ba__after|ba__before)" src="data:image[^"]+"/g, (match, cls) => {
    const file = baMap[baIndex]?.[0];
    baIndex++;
    if (!file) return match.replace(/src="data:image[^"]+"/, 'src="images/house-wash-after.jpg"');
    return `<img class="${cls}" src="images/${file}" loading="lazy" decoding="async"`;
  });

  // story bg base64
  out = out.replace(/<img class="story__bg" src="data:image[^"]+"/g,
    '<img class="story__bg" src="images/duluth-lift-bridge.jpg" loading="lazy" decoding="async"');

  return out;
}

for (const f of hubFiles) {
  const fp = path.join(SITE, f);
  let html = fs.readFileSync(fp, 'utf8');
  if (!html.includes('data:image')) continue;
  html = externalizeHub(html);
  fs.writeFileSync(fp, html);
  const kb = Math.round(fs.statSync(fp).size / 1024);
  console.log(`Externalized ${f} → ${kb} KB`);
}
