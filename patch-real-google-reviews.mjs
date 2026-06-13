import fs from 'fs';
import path from 'path';

const SITE = path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1'));
const GBP_PROFILE = 'https://g.page/r/CSCaz34lDtneEBE';
const GBP_REVIEW = `${GBP_PROFILE}/review`;

const reviews = [
  {
    id: 'bailey-siding',
    cats: ['soft', 'gutter'],
    tag: 'Soft Washing',
    text: 'We recently had the steel siding and trim on our home and garage power washed by Up North Pressure Washing. Henry did a thorough and complete job. He was punctual, easy to work with, and paid attention to details. In addition, the pricing was favorable. The siding looks like new!',
    author: 'Sandra Bailey',
    location: 'Duluth, MN',
  },
  {
    id: 'bennett-roof-siding',
    cats: ['roof', 'soft'],
    tag: 'Roof & Siding',
    text: 'Henry did a great and thorough job last summer cleaning the algae off my siding and removing the moss from my roof. He was punctual and easy to work with.',
    author: 'Judah Bennett',
    location: 'Duluth, MN',
  },
  {
    id: 'mr-blue-windows-softwash',
    cats: ['window', 'soft'],
    tag: 'Windows & Soft Wash',
    text: 'Great service! My windows are spotless, and the soft wash made my vinyl siding look like new again. Professional, reliable, and affordable. Highly recommend!',
    author: 'Mr Blue',
    location: 'Duluth, MN',
  },
  {
    id: 'endaldren-windows-oxidation',
    cats: ['window', 'soft'],
    tag: 'Windows',
    text: 'They did a great job cleaning my windows, and doing oxidation removal. Highly recommend!',
    author: 'Endaldren _',
    location: 'Duluth, MN',
  },
  {
    id: 'jack-concrete',
    cats: ['concrete'],
    tag: 'Concrete',
    text: 'These guys are the best they do amazing work and are timely. Henry was a real amazing worker and made my concrete look amazing again. Will be using him more 5/5 stars',
    author: 'Jack Stephen',
    location: 'Duluth, MN',
  },
  {
    id: 'ruloph-sidewalk',
    cats: ['concrete'],
    tag: 'Concrete',
    text: 'Henry was very nice and did a great job cleaning up the mess the plow left on our sidewalk.',
    author: 'Linda & Cory Ruloph',
    location: 'Duluth, MN',
  },
  {
    id: 'michael-window-softwash',
    cats: ['window', 'soft'],
    tag: 'Windows & Soft Wash',
    text: 'Henry is a hardworking young entrepreneur. This guy is dedicated to his craft and doing things the right way. I would trust Up North Pressure washing with any window or soft washing needs!',
    author: 'Michael Yuretich',
    location: 'Duluth, MN',
  },
  {
    id: 'shevan-general',
    cats: ['general'],
    tag: 'Service',
    text: 'Henry was great to work with. Prompt, courteous and did an excellent job. Highly recommended for all your pressure washing needs.',
    author: 'Shevan Weerasinghe',
    location: 'Duluth, MN',
  },
];

const CATEGORY_LABELS = {
  soft: 'Soft Washing Reviews',
  roof: 'Roof Cleaning Reviews',
  gutter: 'Gutter & Fascia Reviews',
  concrete: 'Concrete Cleaning Reviews',
  window: 'Window Cleaning Reviews',
  commercial: 'Commercial Cleaning Reviews',
  deck: 'Customer Reviews',
  hub: 'Local Google Reviews',
};

function esc(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function classify(file) {
  if (/^roof-soft-washing-/.test(file)) return 'roof';
  if (/^gutter-fascia-cleaning-/.test(file)) return 'gutter';
  if (/^concrete-washing-/.test(file)) return 'concrete';
  if (/^(window-cleaning|residential-window-cleaning|commercial-window-cleaning)-/.test(file)) return 'window';
  if (/^soft-washing-/.test(file)) return 'soft';
  if (/^commercial-soft-washing-/.test(file)) return 'commercial';
  if (/^deck-restoration-/.test(file)) return 'deck';
  if (file === 'index.html' || /(?:^|-)pressure-washing\.html$/.test(file) || /^pressure-washing-.+\.html$/.test(file)) return 'hub';
  return null;
}

function reviewSet(category) {
  if (category === 'commercial') {
    return reviews.filter((r) => r.cats.includes('window') || r.cats.includes('concrete') || r.cats.includes('soft'));
  }
  if (category === 'deck') {
    return reviews.filter((r) => r.cats.includes('general'));
  }
  if (category === 'hub') {
    return reviews.filter((r) => !r.cats.includes('general'));
  }
  return reviews.filter((r) => r.cats.includes(category));
}

function cards(category) {
  return reviewSet(category).map((review) => `
      <a class="review-slide" href="${GBP_PROFILE}" target="_blank" rel="noopener" aria-label="Read ${esc(review.author)}'s Google review for Up North Pressure Washing">
        <div class="review-meta">${googleLogo()}<div class="stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div><span class="via-g">Google Review</span></div>
        <span class="review-tag">${esc(review.tag)}</span>
        <p class="quote">&ldquo;${esc(review.text)}&rdquo;</p>
        <div class="who">${esc(review.author)}<small>${esc(review.location)}</small></div>
      </a>`).join('');
}

function slider(category) {
  const label = CATEGORY_LABELS[category] || 'Google Reviews';
  return `<div class="review-slider" aria-label="${esc(label)}">
${cards(category)}
    </div>
    <p class="review-slider-note reveal"><a href="${GBP_PROFILE}" target="_blank" rel="noopener">Read more Google reviews &rarr;</a></p>`;
}

function googleLogo() {
  return `<svg class="g-logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="17" height="17" aria-label="Google" role="img"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>`;
}

const REVIEW_CSS = `
/* CATEGORY-REVIEW-SLIDER */
.review-slider{display:grid;grid-auto-flow:column;grid-auto-columns:minmax(280px,420px);gap:18px;max-width:960px;margin:0 auto;overflow-x:auto;overscroll-behavior-inline:contain;scroll-snap-type:inline mandatory;padding:4px 4px 18px;scrollbar-color:rgba(227,181,62,.65) rgba(255,255,255,.08)}
.review-slide{scroll-snap-align:start;background:var(--glass);border:1px solid var(--glass-line);border-radius:20px;padding:28px 24px;backdrop-filter:blur(8px);color:inherit;text-decoration:none;display:flex;flex-direction:column;gap:12px;min-height:100%;transition:transform .25s,border-color .25s}
.review-slide:hover{transform:translateY(-4px);border-color:rgba(127,198,232,.65)}
.review-tag{align-self:flex-start;font-size:.68rem;letter-spacing:.12em;text-transform:uppercase;color:var(--gold);border:1px solid rgba(227,181,62,.35);border-radius:999px;padding:4px 10px}
.review-slider .quote{margin:0;flex:1}
.review-slider .who{margin-top:auto}
.review-slider-note{text-align:center;margin-top:.95rem}
.review-slider-note a{color:var(--ice);font-weight:700;text-decoration:none}
.review-slider-note a:hover{text-decoration:underline}
`;

function ensureCss(html) {
  if (html.includes('/* CATEGORY-REVIEW-SLIDER */')) return html;
  return html.replace('</style>', `${REVIEW_CSS}\n</style>`);
}

function fixGoogleLinks(html) {
  let out = html;
  out = out.replace(/<!-- TODO: replace href with your Google Business Profile reviews link -->\s*/g, '');
  out = out.replace(/★ Read &amp; Leave a Review on Google/g, '★ Read Reviews on Google');
  out = out.replace(/&#9733; Read &amp; Leave a Review on Google/g, '&#9733; Read Reviews on Google');
  out = out.replace(/href="https:\/\/g\.page\/r\/CSCaz34lDtneEBE\/review"([^>]*class="(?:g-review|review-card|review-slide)".*?>)/g, `href="${GBP_PROFILE}"$1`);
  out = out.replace(/(Leave a Google review[^<]*<\/a>)/g, (match) => match.replace(GBP_PROFILE, GBP_REVIEW));
  return out;
}

function patchExistingReviews(html, category) {
  if (!category) return fixGoogleLinks(html);

  let out = ensureCss(fixGoogleLinks(html));

  out = out.replace(
    /(<section id="reviews">\s*<div class="wrap">\s*<div class="sec-head reveal">[\s\S]*?<\/div>\s*)([\s\S]*?)(\s*<div class="svc-cta reveal" style="margin-top:2rem)/,
    `$1${slider(category)}$3`
  );
  if (out !== html && out.includes('class="review-slider"')) {
    return out;
  }

  out = out.replace(
    /<div class="test-grid">[\s\S]*?<\/div>\s*(?:<p class="reveal" style="text-align:center;margin-top:1\.2rem">[\s\S]*?<\/p>)?/,
    slider(category)
  );

  out = out.replace(
    /<a href="https:\/\/g\.page\/r\/CSCaz34lDtneEBE" target="_blank" rel="noopener" class="g-review"[\s\S]*?<\/a>/,
    slider(category)
  );

  return out;
}

let patched = 0;
for (const file of fs.readdirSync(SITE).filter((name) => name.endsWith('.html'))) {
  const fp = path.join(SITE, file);
  const before = fs.readFileSync(fp, 'utf8');
  const after = patchExistingReviews(before, classify(file));

  if (after !== before) {
    fs.writeFileSync(fp, after);
    patched++;
  }
}

console.log(`Patched category-aware Google review sliders on ${patched} HTML files.`);
console.log(`GBP profile/read link: ${GBP_PROFILE}`);
console.log(`GBP leave-review link: ${GBP_REVIEW}`);
