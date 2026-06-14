import fs from 'fs';
import path from 'path';

const SITE = path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1'));
const MARKER = '/* UI-ICON-POLISH */';

const ICON = {
  phone: '<span class="ui-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.41 2.33.63 3.57.63a1 1 0 011 1V21a1 1 0 01-1 1C10.85 22 2 13.15 2 2a1 1 0 011-1h3.5a1 1 0 011 1c0 1.24.22 2.45.63 3.57a1 1 0 01-.25 1.01l-2.26 2.21z"/></svg></span>',
  star: '<span class="ui-icon ui-icon--star" aria-hidden="true"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z"/></svg></span>',
  check: '<span class="ui-icon ui-icon--check" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 13l4 4L19 7"/></svg></span>',
  arrow: '<span class="ui-icon ui-icon--arrow" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span>',
  pointer: '<span class="ui-icon ui-icon--pointer" aria-hidden="true"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M13 1.07V9h7.07C19.48 12.58 16.79 15.5 13 16.91V23l-1.5-1.5C6.5 17.5 3 13.14 3 8.5 3 5.42 5.42 3 8.5 3c1.74 0 3.41.81 4.5 2.07z"/></svg></span>',
  truck: '<span class="ui-icon ui-icon--lg" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7h11v8H3zM14 10h4l3 3v2h-7z"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/></svg></span>',
  pin: '<span class="ui-icon ui-icon--lg" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s6-5.33 6-10a6 6 0 10-12 0c0 4.67 6 10 6 10z"/><circle cx="12" cy="11" r="2.5"/></svg></span>',
  calendar: '<span class="ui-icon ui-icon--lg" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/></svg></span>',
  shield: '<span class="ui-icon ui-icon--lg" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l8 4v6c0 5-3.5 9.5-8 10-4.5-.5-8-5-8-10V6l8-4z"/></svg></span>',
  help: '<span class="ui-icon ui-icon--lg" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 115 0c0 2-2.5 2-2.5 4M12 17h.01"/></svg></span>',
};

const STARS5 = `<span class="stars-inline" aria-hidden="true">${ICON.star}${ICON.star}${ICON.star}${ICON.star}${ICON.star}</span>`;

const POLISH_CSS = `${MARKER}
.ui-icon{width:1em;height:1em;display:inline-flex;align-items:center;justify-content:center;vertical-align:-.12em;flex-shrink:0;color:inherit}
.ui-icon svg{width:100%;height:100%;display:block}
.ui-icon--star{color:var(--gold,#e3b53e)}
.ui-icon--check{color:var(--gold,#e3b53e)}
.ui-icon--lg{width:1.35em;height:1.35em;color:var(--ice,#7fc6e8)}
.stars-inline{display:inline-flex;align-items:center;gap:.12em;color:var(--gold,#e3b53e)}
.nav-phone,.nav-cta{display:inline-flex;align-items:center;justify-content:center;min-height:44px;line-height:1.1;box-sizing:border-box}
.nav-phone{padding:11px 16px}
.travel-icon{width:28px;height:28px;color:var(--ice);flex-shrink:0;display:flex;align-items:center;justify-content:center}
.travel-icon .ui-icon{width:28px;height:28px}
.sticky-cta{align-items:stretch;gap:.55rem}
.sticky-cta .btn{flex:1 1 0;min-height:48px;max-width:none;display:inline-flex;align-items:center;justify-content:center;gap:.35rem}
.sticky-cta .btn--call{background:#16303f;color:#7fc6e8;border:1px solid #2a4a66;box-shadow:none;margin-left:0!important}
.mobile-cta{align-items:stretch}
.mobile-cta a{display:inline-flex;align-items:center;justify-content:center;gap:.35rem;min-height:48px}
.nav-backdrop{position:fixed;inset:0;background:rgba(8,16,24,.55);opacity:0;visibility:hidden;transition:opacity .3s,visibility .3s;z-index:48;backdrop-filter:blur(2px)}
.nav-backdrop.open{opacity:1;visibility:visible}
body.nav-open{overflow:hidden}
.pop-services li::before{content:'';width:14px;height:14px;flex-shrink:0;background:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23e3b53e' stroke-width='2.5' stroke-linecap='round'%3E%3Cpath d='M5 13l4 4L19 7'/%3E%3C/svg%3E") center/contain no-repeat}
`;

const MOBILE_NAV_FULL_OLD = `.nav-links{display:none;position:fixed;inset:0;top:70px;background:rgba(11,22,34,.97);flex-direction:column;align-items:center;justify-content:center;gap:28px;z-index:49}
  .nav-links.open{display:flex}
  .burger{display:flex}`;

const MOBILE_NAV_FULL_NEW = `header.nav{position:sticky}
  .nav-in{position:relative}
  .nav-links{display:none;position:absolute;left:0;right:0;top:100%;background:rgba(11,22,34,.98);flex-direction:column;align-items:stretch;justify-content:flex-start;gap:0;z-index:51;max-height:min(72vh,480px);overflow-y:auto;border-bottom:1px solid var(--glass-line);box-shadow:0 18px 40px rgba(0,0,0,.45);padding:6px 0}
  .nav-links.open{display:flex}
  .nav-links a{padding:14px 22px;border-bottom:1px solid rgba(255,255,255,.06);width:100%;text-align:left}
  .nav-links .nav-phone,.nav-links .nav-cta{margin:10px 16px;width:calc(100% - 32px);justify-content:center;text-align:center}
  .burger{display:flex;position:relative;z-index:52}
  body.nav-open{overflow:hidden}`;

const MOBILE_NAV_PANEL_OLD = `.nav-links{display:none}
  .nav-links.open{display:flex;position:fixed;top:70px;left:0;right:0;flex-direction:column;align-items:center;
    background:rgba(11,22,34,.98);padding:26px;gap:20px;border-bottom:1px solid var(--line);backdrop-filter:blur(16px);z-index:55}
  .nav-links.open a{font-size:1.1rem}
  .burger{display:flex}`;

const MOBILE_NAV_PANEL_NEW = `header.nav{position:sticky}
  .nav-in{position:relative}
  .nav-links{display:none}
  .nav-links.open{display:flex;position:absolute;left:0;right:0;top:100%;flex-direction:column;align-items:stretch;
    background:rgba(11,22,34,.98);padding:6px 0;gap:0;border-bottom:1px solid var(--line);backdrop-filter:blur(16px);z-index:51;max-height:min(72vh,480px);overflow-y:auto;box-shadow:0 18px 40px rgba(0,0,0,.45)}
  .nav-links.open a{font-size:1rem;padding:14px 22px;border-bottom:1px solid rgba(255,255,255,.06);width:100%;text-align:left}
  .nav-links.open .nav-phone,.nav-links.open .nav-cta{margin:10px 16px;width:calc(100% - 32px);justify-content:center;text-align:center}
  .burger{display:flex;position:relative;z-index:52}
  body.nav-open{overflow:hidden}`;

const HERO_ALIGN_OLD = `.hero__actions{grid-template-columns:1fr 1fr;max-width:520px;margin-inline:auto}
    .hero__actions .btn--quote{grid-column:1/-1}`;

const HERO_ALIGN_NEW = `.hero__actions{display:flex;flex-wrap:wrap;justify-content:center;gap:.65rem;max-width:560px;margin-inline:auto}
    .hero__actions .btn{flex:1 1 200px;min-width:min(100%,200px);min-height:48px;width:auto}`;

const BURGER_JS_OLD_A = `const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');
if (burger && navLinks) {
  burger.addEventListener('click', () => {
    burger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });
  navLinks.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => {
      burger.classList.remove('open');
      navLinks.classList.remove('open');
    })
  );
}`;

const BURGER_JS_OLD_B = `const burger=document.getElementById('burger');
const navLinks=document.getElementById('navLinks');
if(burger&&navLinks){
  burger.addEventListener('click',()=>{burger.classList.toggle('open');navLinks.classList.toggle('open');});
  navLinks.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{burger.classList.remove('open');navLinks.classList.remove('open');}));
}`;

const BURGER_JS_OLD_C = `const burger=document.getElementById('burger'),navLinks=document.querySelector('.nav-links');
if(burger&&navLinks){burger.addEventListener('click',()=>{burger.classList.toggle('open');navLinks.classList.toggle('open');});navLinks.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{burger.classList.remove('open');navLinks.classList.remove('open');}));}`;

const BURGER_JS_NEW = `const burger=document.getElementById('burger'),navLinks=document.getElementById('navLinks')||document.querySelector('.nav-links'),navBackdrop=document.getElementById('navBackdrop');
function closeNav(){if(burger)burger.classList.remove('open');if(navLinks)navLinks.classList.remove('open');if(navBackdrop){navBackdrop.classList.remove('open');navBackdrop.hidden=true}document.body.classList.remove('nav-open')}
function openNav(){if(burger)burger.classList.add('open');if(navLinks)navLinks.classList.add('open');if(navBackdrop){navBackdrop.classList.remove('hidden');navBackdrop.hidden=false;navBackdrop.classList.add('open')}document.body.classList.add('nav-open')}
if(burger&&navLinks){burger.addEventListener('click',()=>navLinks.classList.contains('open')?closeNav():openNav());if(navBackdrop)navBackdrop.addEventListener('click',closeNav);navLinks.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeNav));}`;

function replaceEmojis(html) {
  let out = html;
  out = out.replace(/<div class="travel-icon">🚛<\/div>/g, `<div class="travel-icon">${ICON.truck}</div>`);
  out = out.replace(/<div class="travel-icon">📍<\/div>/g, `<div class="travel-icon">${ICON.pin}</div>`);
  out = out.replace(/<div class="travel-icon">📞<\/div>/g, `<div class="travel-icon">${ICON.phone}</div>`);
  out = out.replace(/<div class="travel-icon">🗓️<\/div>/g, `<div class="travel-icon">${ICON.calendar}</div>`);
  out = out.replace(/<div class="travel-icon">🛡️<\/div>/g, `<div class="travel-icon">${ICON.shield}</div>`);
  out = out.replace(/<div class="travel-icon">❓<\/div>/g, `<div class="travel-icon">${ICON.help}</div>`);
  out = out.replace(/📞\s*Call/g, `${ICON.phone} Call`);
  out = out.replace(/📞\s*/g, `${ICON.phone} `);
  out = out.replace(/★★★★★/g, STARS5);
  out = out.replace(/5\.0★/g, `5.0${ICON.star}`);
  out = out.replace(/★ Read/g, `${ICON.star} Read`);
  out = out.replace(/<span aria-hidden="true">&#10003;<\/span>/g, ICON.check);
  out = out.replace(/&#128070;\s*/g, `${ICON.pointer} `);
  out = out.replace(/content:'✓'/g, `content:''`);
  out = out.replace(/ ✓ /g, ` ${ICON.check} `);
  out = out.replace(/<li>✓ /g, `<li>${ICON.check} `);
  out = out.replace(/<span class="ice">✓<\/span>/g, `<span class="ice">${ICON.check}</span>`);
  out = out.replace(/<span class="ck">✓<\/span>/g, `<span class="ck">${ICON.check}</span>`);
  out = out.replace(/ →/g, ` ${ICON.arrow}`);
  out = out.replace(/content:"⤢ Tap to enlarge"/g, `content:"Tap to enlarge"`);
  out = out.replace(
    /<a class="btn btn--pill" href="tel:\+12185768610" style="background:#16303f;color:#7fc6e8;border:1px solid #2a4a66;margin-left:8px" aria-label="Call 218-576-8610">(?:<span class="ui-icon"[\s\S]*?<\/span>\s*)?Call<\/a>/g,
    `<a class="btn btn--pill btn--call" href="tel:+12185768610" aria-label="Call 218-576-8610">${ICON.phone} Call</a>`
  );
  return out;
}

function injectCss(html) {
  if (html.includes(MARKER)) return html;
  if (html.includes('</style>')) {
    return html.replace('</style>', `${POLISH_CSS}\n</style>`);
  }
  return html;
}

function patchMobileNav(html) {
  let out = html;
  if (out.includes(MOBILE_NAV_FULL_OLD)) {
    out = out.replace(MOBILE_NAV_FULL_OLD, MOBILE_NAV_FULL_NEW);
  }
  if (out.includes(MOBILE_NAV_PANEL_OLD)) {
    out = out.replace(MOBILE_NAV_PANEL_OLD, MOBILE_NAV_PANEL_NEW);
  }
  if (out.includes(HERO_ALIGN_OLD)) {
    out = out.replace(HERO_ALIGN_OLD, HERO_ALIGN_NEW);
  }
  if (out.includes(BURGER_JS_OLD_A)) out = out.replace(BURGER_JS_OLD_A, BURGER_JS_NEW);
  else if (out.includes(BURGER_JS_OLD_B)) out = out.replace(BURGER_JS_OLD_B, BURGER_JS_NEW);
  else if (out.includes(BURGER_JS_OLD_C)) out = out.replace(BURGER_JS_OLD_C, BURGER_JS_NEW);

  if (out.includes('id="burger"') && !out.includes('id="navBackdrop"')) {
    out = out.replace(
      /<\/header>\s*\n(<main>|<!--)/,
      `</header>\n<div class="nav-backdrop" id="navBackdrop" hidden></div>\n$1`
    );
  }
  return out;
}

function patchFile(filePath) {
  let html = fs.readFileSync(filePath, 'utf8');
  const before = html;
  // Re-run emoji/icon pass even when polish CSS already present
  html = replaceEmojis(html);
  html = injectCss(html);
  html = patchMobileNav(html);
  if (html !== before) {
    fs.writeFileSync(filePath, html, 'utf8');
    return true;
  }
  return false;
}

function walk(dir) {
  let changed = 0;
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      if (name === 'node_modules' || name === '.git') continue;
      changed += walk(full);
    } else if (name.endsWith('.html')) {
      if (patchFile(full)) {
        changed++;
        console.log('patched', path.relative(SITE, full));
      }
    }
  }
  return changed;
}

const count = walk(SITE);
console.log(`Done. ${count} HTML files updated.`);
