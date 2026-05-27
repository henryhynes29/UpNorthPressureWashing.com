import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const SITE = path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1'));
const IMG = path.join(SITE, 'images');

let sharp;
try {
  sharp = require('sharp');
} catch {
  console.log('Installing sharp for image optimization...');
  const { execSync } = await import('child_process');
  execSync('npm install sharp --no-save', { cwd: SITE, stdio: 'inherit' });
  sharp = require('sharp');
}

async function optimizeJpeg(fp, maxW = 1600, quality = 82) {
  const buf = fs.readFileSync(fp);
  const meta = await sharp(buf).metadata();
  let pipe = sharp(buf);
  if (meta.width > maxW) pipe = pipe.resize(maxW, null, { withoutEnlargement: true });
  const out = await pipe.jpeg({ quality, mozjpeg: true }).toBuffer();
  if (out.length < buf.length) {
    fs.writeFileSync(fp, out);
    return { saved: buf.length - out.length, w: meta.width };
  }
  return { saved: 0, w: meta.width };
}

async function optimizeLogo() {
  const fp = path.join(IMG, 'logo.png');
  if (!fs.existsSync(fp)) return;
  const buf = fs.readFileSync(fp);
  const out = await sharp(buf)
    .resize(240, null, { withoutEnlargement: true })
    .png({ compressionLevel: 9, palette: true })
    .toBuffer();
  fs.writeFileSync(fp, out);
  console.log(`logo.png: ${Math.round(buf.length/1024)}KB → ${Math.round(out.length/1024)}KB`);
}

async function main() {
  const jpegs = fs.readdirSync(IMG, { recursive: true })
    .filter(f => String(f).endsWith('.jpg'))
    .map(f => path.join(IMG, f));

  let totalSaved = 0;
  for (const fp of jpegs) {
    const before = fs.statSync(fp).size;
    const maxW = fp.includes('hero-bg') ? 1920 : fp.includes('lift-bridge') ? 1400 : 1200;
    await optimizeJpeg(fp, maxW);
    const after = fs.statSync(fp).size;
    totalSaved += before - after;
    if (before !== after) console.log(`${path.basename(fp)}: ${Math.round(before/1024)}KB → ${Math.round(after/1024)}KB`);
  }

  await optimizeLogo();
  console.log(`Total JPEG savings: ${Math.round(totalSaved/1024)}KB`);
}

main().catch(e => { console.error(e); process.exit(1); });
