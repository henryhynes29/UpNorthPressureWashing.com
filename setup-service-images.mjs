import fs from 'fs';
import path from 'path';
import { spawnSync } from 'child_process';

const SITE = path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1'));
const DL = path.join(process.env.USERPROFILE || '', 'Downloads');
const IMG = path.join(SITE, 'images');

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
Write-Output 'Images prepared'
`;

const psPath = path.join(SITE, '_split-images.ps1');
fs.writeFileSync(psPath, psScript);
const r = spawnSync('powershell', ['-NoProfile', '-ExecutionPolicy', 'Bypass', '-File', psPath], { encoding: 'utf8' });
console.log(r.stdout || r.stderr || '');
if (r.status !== 0) process.exit(r.status || 1);
fs.unlinkSync(psPath);

function patchImgData(file, imgObj) {
  let html = fs.readFileSync(path.join(SITE, file), 'utf8');
  html = html.replace(/const IMGDATA = \{[\s\S]*?\};/, `const IMGDATA = ${JSON.stringify(imgObj)};`);
  fs.writeFileSync(path.join(SITE, file), html);
}

let w = 0, d = 0;
for (const f of fs.readdirSync(SITE)) {
  if (f.startsWith('window-cleaning-') && f.endsWith('.html')) { patchImgData(f, WINDOW_IMG); w++; }
  if (f.startsWith('deck-restoration-') && f.endsWith('.html')) { patchImgData(f, DECK_IMG); d++; }
}
console.log(`Patched ${w} window + ${d} deck IMGDATA maps`);
