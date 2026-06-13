import fs from 'fs';
import path from 'path';

const SITE = path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1'));

const PROMO_CSS = `
/* LIMITED-TIME-OFFER */
.promo-banner{width:min(100% - 2rem,var(--maxw,1080px));margin:1.1rem auto 0;padding:1rem 1.05rem;border-radius:18px;background:rgba(224,177,62,.13);border:1px solid rgba(224,177,62,.48);color:var(--text,#f3f7fa);text-align:center;box-shadow:0 16px 42px -30px rgba(0,0,0,.75)}
.promo-banner__label{display:inline-flex;align-items:center;justify-content:center;margin-bottom:.35rem;padding:.28rem .7rem;border-radius:999px;background:var(--gold,#e0b13e);color:var(--ink-on-gold,#22303d);font-size:.68rem;font-weight:800;letter-spacing:.12em;text-transform:uppercase}
.promo-banner__title{margin:0;font-family:var(--f-display,Georgia,serif);font-size:clamp(1.08rem,3.8vw,1.42rem);line-height:1.15;color:var(--white,#fff)}
.promo-banner__copy{margin:.35rem auto 0;max-width:620px;color:var(--text-dim,#b8c9d6);font-size:.92rem;line-height:1.5}
.promo-banner__copy strong{color:var(--gold,#e0b13e)}
.promo-banner__link{display:inline-flex;margin-top:.65rem;color:var(--gold,#e0b13e);font-weight:800;text-decoration:none}
.promo-banner__link:hover{text-decoration:underline}
.qbox .promo-banner{width:100%;margin:0 0 1.25rem;padding:.95rem;background:#fff8e8;border-color:#e3b53e;color:#1a2630;box-shadow:none}
.qbox .promo-banner__title{color:#13212c;font-size:1.18rem}
.qbox .promo-banner__copy{color:#4a5a64}
.qbox .promo-banner__link{color:#9a6a00}
`;

const HERO_PROMO = `<div class="promo-banner" role="note" aria-label="Limited-time soft wash promotion">
      <span class="promo-banner__label">Limited-Time Offer</span>
      <p class="promo-banner__title">Free exterior window cleaning with any full house soft wash.</p>
      <p class="promo-banner__copy">Book by <strong>June 24</strong> and get exterior windows included for an average-home value of about <strong>$300</strong>. Residential homes only; final scope confirmed with your quote.</p>
      <a class="promo-banner__link" href="#quote">Claim the offer →</a>
    </div>`;

const FORM_PROMO = `<div class="promo-banner" role="note" aria-label="Limited-time soft wash promotion">
          <span class="promo-banner__label">Book by June 24</span>
          <p class="promo-banner__title">Free exterior windows with a full house soft wash.</p>
          <p class="promo-banner__copy">Normally about a <strong>$300 value</strong> for an average home. Mention the offer in your request and we will include it in your estimate.</p>
        </div>`;

function isHubPage(file) {
  return file === 'index.html' || /(?:^|-)pressure-washing\.html$/.test(file) || /^pressure-washing-.+\.html$/.test(file);
}

function ensureCss(html) {
  if (html.includes('/* LIMITED-TIME-OFFER */')) return html;
  return html.replace('</style>', `${PROMO_CSS}\n</style>`);
}

function patchHero(html) {
  if (html.includes('Free exterior window cleaning with any full house soft wash.')) return html;
  return html.replace(
    /(<p class="trust-bar">[\s\S]*?<\/p>)/,
    `$1\n    ${HERO_PROMO}`
  );
}

function patchQuoteForm(html) {
  if (html.includes('Free exterior windows with a full house soft wash.')) return html;
  return html.replace(
    /(<form id="quoteForm"[\s\S]*?>\s*<input type="hidden" name="page" value="">\s*<p hidden><label>Don't fill this out: <input name="bot-field"><\/label><\/p>)/,
    `$1\n        ${FORM_PROMO}`
  );
}

let patched = 0;
for (const file of fs.readdirSync(SITE).filter((name) => name.endsWith('.html') && isHubPage(name))) {
  const fp = path.join(SITE, file);
  const before = fs.readFileSync(fp, 'utf8');
  let after = ensureCss(before);
  after = patchHero(after);
  after = patchQuoteForm(after);

  if (after !== before) {
    fs.writeFileSync(fp, after);
    patched++;
  }
}

console.log(`Patched limited-time offer banner on ${patched} hub pages.`);
