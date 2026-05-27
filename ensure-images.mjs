import fs from 'fs';
import path from 'path';

const SITE = path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1'));
const IMG = path.join(SITE, 'images');
const BA = path.join(IMG, 'ba');
const FALLBACK = path.join(process.env.USERPROFILE || '', 'Downloads', 'deck-pressure-washing-duluth-mn.jpg');

const REQUIRED = [
  'hero-bg.jpg', 'logo.png', 'duluth-lift-bridge.jpg',
  'house-wash-before.jpg', 'house-wash-after.jpg',
  'concrete-before.jpg', 'concrete-after.jpg',
  'deck-before.jpg', 'deck-after.jpg',
  'deck-process-before.jpg', 'deck-process-after.jpg',
  'commercial-before.jpg', 'commercial-after.jpg',
  'window-before.jpg', 'window-after.jpg',
  'window-res-before.jpg', 'window-res-after.jpg',
  'window-detail-before.jpg', 'window-interior-after.jpg',
  'soft-before.jpg', 'soft-after.jpg',
  'ba/hero-before.jpg', 'ba/hero-after.jpg',
  'ba/stucco-before.jpg', 'ba/stucco-after.jpg',
  'ba/roof-before.jpg', 'ba/roof-after.jpg',
];

fs.mkdirSync(BA, { recursive: true });

if (!fs.existsSync(FALLBACK)) {
  console.log('No fallback image at', FALLBACK);
  console.log('Add photos to images/ before deploy — run setup-service-images.mjs when source files are in Downloads.');
  process.exit(0);
}

let created = 0;
for (const rel of REQUIRED) {
  const dest = path.join(IMG, rel);
  if (!fs.existsSync(dest)) {
    fs.copyFileSync(FALLBACK, dest);
    created++;
  }
}

console.log(`Ensured images/ (${created} placeholders copied from deck photo, ${REQUIRED.length - created} already existed)`);
console.log('Replace placeholders with real before/after photos before production deploy.');
