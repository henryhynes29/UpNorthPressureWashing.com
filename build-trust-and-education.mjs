import fs from 'fs';
import path from 'path';

const SITE = path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1'));
const DOMAIN = 'https://www.upnorthpressurewashing.com';
const PHONE = '218-576-8610';
const GOOGLE_REVIEW = 'https://g.page/r/CSCaz34lDtneEBE/review';

function loadCities() {
  const code = fs.readFileSync(path.join(SITE, 'build-site.mjs'), 'utf8');
  const start = code.indexOf('const CITIES = [');
  const arrStart = code.indexOf('[', start);
  const arrEnd = code.indexOf('\n];', start) + 2;
  // eslint-disable-next-line no-eval
  return eval(code.slice(arrStart, arrEnd + 1));
}

const CITIES = loadCities();
const cityBySlug = Object.fromEntries(CITIES.map(c => [c.slug, c]));

const SERVICE_TYPES = {
  'soft-washing': { label: 'Soft Washing', heading: 'Soft Washing Guides' },
  'roof-soft-washing': { label: 'Roof Care', heading: 'Roof Soft Washing Guides' },
  'gutter-fascia-cleaning': { label: 'Gutters & Fascia', heading: 'Gutter & Fascia Guides' },
  'concrete-washing': { label: 'Concrete', heading: 'Concrete & Driveway Guides' },
  'commercial-soft-washing': { label: 'Commercial', heading: 'Commercial Cleaning Guides' },
  'window-cleaning': { label: 'Window Cleaning', heading: 'Window Cleaning Guides' },
  'residential-window-cleaning': { label: 'Residential Windows', heading: 'Residential Window Guides' },
  'commercial-window-cleaning': { label: 'Commercial Windows', heading: 'Commercial Window Guides' },
  'deck-restoration': { label: 'Deck & Fence', heading: 'Deck & Fence Guides' },
};

const EDUCATION_MAP = {
  'soft-washing': [
    ['blog-soft-washing-guide', 'Complete Soft Washing Guide'],
    ['blog-soft-washing-home-value', 'Soft Wash & Home Value'],
    ['blog-algae-mold-siding', 'Algae & Mold on Siding'],
    ['blog-oxidation-removal', 'Oxidation Removal'],
    ['blog-pollen-spring-cleanup', 'Spring Pollen Cleanup'],
    ['blog-seasonal-maintenance-guide', 'Seasonal Maintenance Guide'],
    ['blog-brick-stone-cleaning', 'Brick & Stone Cleaning'],
  ],
  'roof-soft-washing': [
    ['blog-roof-soft-washing', 'Roof Soft Washing Guide'],
    ['blog-gutter-fascia-cleaning', 'Gutter & Fascia Cleaning'],
    ['blog-algae-mold-siding', 'Algae & Mold on Siding'],
    ['blog-seasonal-maintenance-guide', 'Seasonal Maintenance Guide'],
    ['blog-soft-washing-guide', 'Complete Soft Washing Guide'],
  ],
  'gutter-fascia-cleaning': [
    ['blog-gutter-fascia-cleaning', 'Gutter & Fascia Cleaning Guide'],
    ['blog-roof-soft-washing', 'Roof Soft Washing'],
    ['blog-algae-mold-siding', 'Algae & Mold on Siding'],
    ['blog-pollen-spring-cleanup', 'Spring Pollen Cleanup'],
    ['blog-soft-washing-guide', 'Soft Washing Guide'],
  ],
  'concrete-washing': [
    ['blog-concrete-driveway-cleaning', 'Driveway Cleaning Guide'],
    ['blog-rust-stain-removal', 'Rust Stain Removal'],
    ['blog-salt-stain-removal', 'Salt Stain Removal'],
  ],
  'commercial-soft-washing': [
    ['blog-commercial-building-cleaning', 'Commercial Building Cleaning'],
    ['blog-parking-lot-cleaning', 'Parking Lot Cleaning'],
    ['blog-hoa-property-maintenance', 'HOA & Property Maintenance'],
    ['blog-restaurant-grease-cleaning', 'Restaurant Grease Cleaning'],
  ],
  'window-cleaning': [
    ['blog-window-cleaning-guide', 'Window Cleaning Guide'],
    ['blog-curb-appeal-checklist', 'Curb Appeal Checklist'],
  ],
  'residential-window-cleaning': [
    ['blog-window-cleaning-guide', 'Window Cleaning Guide'],
    ['blog-curb-appeal-checklist', 'Curb Appeal Checklist'],
    ['blog-pollen-spring-cleanup', 'Spring Pollen Cleanup'],
    ['blog-lakefront-exterior-care', 'Lakefront Exterior Care'],
  ],
  'commercial-window-cleaning': [
    ['blog-window-cleaning-guide', 'Commercial Window Guide'],
    ['blog-commercial-building-cleaning', 'Commercial Building Cleaning'],
    ['blog-curb-appeal-checklist', 'Curb Appeal Checklist'],
    ['blog-hoa-property-maintenance', 'HOA & Property Maintenance'],
  ],
  'deck-restoration': [
    ['blog-deck-fence-restoration', 'Deck & Fence Restoration'],
    ['blog-composite-deck-cleaning', 'Composite Deck Cleaning'],
    ['blog-lakefront-exterior-care', 'Lakefront Exterior Care'],
  ],
};

const HUB_EDUCATION = [
  ['blog-soft-washing-guide', 'Soft Washing', 'soft-washing'],
  ['blog-roof-soft-washing', 'Roof Soft Washing', 'roof-soft-washing'],
  ['blog-gutter-fascia-cleaning', 'Gutter Cleaning', 'gutter-fascia-cleaning'],
  ['blog-concrete-driveway-cleaning', 'Concrete', 'concrete-washing'],
  ['blog-commercial-building-cleaning', 'Commercial', 'commercial-soft-washing'],
  ['blog-window-cleaning-guide', 'Windows', 'window-cleaning'],
  ['blog-deck-fence-restoration', 'Deck & Fence', 'deck-restoration'],
  ['residential-window-cleaning', 'Residential Windows', 'residential-window-cleaning'],
  ['commercial-window-cleaning', 'Commercial Windows', 'commercial-window-cleaning'],
];

const TESTIMONIALS = [
  {
    cat: 'Soft Washing',
    stars: 5,
    text: 'We recently had the steel siding and trim on our home and garage power washed by Up North Pressure Washing. Henry did a thorough and complete job. He was punctual, easy to work with, and paid attention to details. In addition, the pricing was favorable. The siding looks like new!',
    author: 'Sandy & Mike Bailey',
    location: 'Duluth, MN',
  },
  {
    cat: 'Concrete',
    stars: 5,
    text: "They're the best. Great work on my driveway, highly recommend and will be calling again soon!",
    author: 'Jack S.',
    location: 'Duluth, MN',
  },
  {
    cat: 'Deck Restoration',
    stars: 5,
    text: 'Our weathered deck looks brand new. The soft washing removed years of grime without damaging the wood at all. Fast, professional, and worth every penny. Highly recommend!',
    author: 'Tyler S.',
    location: 'Hermantown, MN',
  },
  {
    cat: 'Commercial',
    stars: 5,
    text: "Up North Pressure Washing is professional, efficient, and their commercial-grade equipment easily handled our storefront's heavy winter salt and grime — highly recommend for any Duluth business!",
    author: 'Local Business Owner',
    location: 'Duluth, MN',
  },
  {
    cat: 'Window Cleaning',
    stars: 5,
    text: 'Our storefront windows have never looked this clear. Up North was professional, on time, and the results speak for themselves — highly recommend for any Duluth business!',
    author: 'Local Business Owner',
    location: 'Duluth, MN',
  },
];

const GALLERY = [
  { cat: 'soft-washing', title: 'Residential Soft Wash', before: 'images/soft-before.jpg', after: 'images/soft-after.jpg' },
  { cat: 'soft-washing', title: 'Full House Wash', before: 'images/house-wash-before.jpg', after: 'images/house-wash-after.jpg' },
  { cat: 'soft-washing', title: 'Exterior Restoration', before: 'images/ba/hero-before.jpg', after: 'images/ba/hero-after.jpg' },
  { cat: 'soft-washing', title: 'Stucco & Masonry', before: 'images/ba/stucco-before.jpg', after: 'images/ba/stucco-after.jpg' },
  { cat: 'soft-washing', title: 'Roof Soft Washing', before: 'images/ba/roof-before.jpg', after: 'images/ba/roof-after.jpg' },
  { cat: 'concrete-washing', title: 'Driveway Cleaning', before: 'images/concrete-before.jpg', after: 'images/concrete-after.jpg' },
  { cat: 'commercial-soft-washing', title: 'Commercial Flatwork', before: 'images/commercial-before.jpg', after: 'images/commercial-after.jpg' },
  { cat: 'window-cleaning', title: 'Residential Windows', before: 'images/window-res-before.jpg', after: 'images/window-res-after.jpg' },
  { cat: 'window-cleaning', title: 'Commercial Storefront', before: 'images/window-before.jpg', after: 'images/window-after.jpg' },
  { cat: 'deck-restoration', title: 'Deck Restoration', before: 'images/deck-before.jpg', after: 'images/deck-after.jpg' },
  { cat: 'deck-restoration', title: 'Fence & Rail Brightening', before: 'images/deck-process-before.jpg', after: 'images/deck-process-after.jpg' },
  { cat: 'deck-restoration', title: 'Patio Beside Deck', before: 'images/concrete-before.jpg', after: 'images/concrete-after.jpg' },
];

const SHARED_HEAD = `<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..900&family=Outfit:wght@300;400;500;600;700&display=swap" rel="stylesheet">`;

const SHARED_CSS = `
:root{--navy-900:#0c1824;--navy-800:#10212f;--ice:#7fc6e8;--gold:#e3b53e;--gold-deep:#caa033;--text:#e9f1f6;--text-dim:#b3c4cf;--line:rgba(150,190,215,.18);--glass:rgba(255,255,255,.045);--glass-line:rgba(160,200,225,.16)}
*{margin:0;padding:0;box-sizing:border-box}html{scroll-behavior:smooth}
body{font-family:'Outfit',sans-serif;background:var(--navy-900);color:var(--text);line-height:1.7;-webkit-font-smoothing:antialiased}
.atmosphere{position:fixed;inset:0;z-index:-2;background:radial-gradient(120% 80% at 80% -10%,#1c4259 0%,transparent 55%),linear-gradient(180deg,#0e1d2a,#0c1824)}
.wrap{max-width:1100px;margin:0 auto;padding:0 22px}
h1,h2,h3{font-family:'Fraunces',serif;font-weight:600;line-height:1.15}
.gold{color:var(--gold)}.ice{color:var(--ice)}
header.nav{position:sticky;top:0;z-index:50;backdrop-filter:blur(14px);background:rgba(11,22,34,.72);border-bottom:1px solid var(--line)}
.nav-in{max-width:1180px;margin:0 auto;padding:0 22px;display:flex;align-items:center;justify-content:space-between;height:70px}
.brand{display:flex;align-items:center;gap:11px;font-family:'Fraunces',serif;font-weight:600;font-size:1.18rem;color:#fff;text-decoration:none}
.brand .mark{width:38px;height:38px;border-radius:10px;display:grid;place-items:center;background:linear-gradient(140deg,#1d3a4d,#102330);border:1px solid var(--glass-line)}
.brand small{display:block;font-family:'Outfit';font-size:.6rem;letter-spacing:.28em;color:var(--ice);text-transform:uppercase}
.nav-links{display:flex;align-items:center;gap:18px}
.nav-links a{color:var(--text-dim);text-decoration:none;font-size:.88rem;font-weight:500}
.nav-links a:hover{color:var(--ice)}
.nav-cta{background:linear-gradient(135deg,var(--gold),var(--gold-deep));color:#1a1305;padding:11px 22px;border-radius:40px;font-weight:700;font-size:.85rem;text-decoration:none}
.hero{padding:64px 0 36px;text-align:center}
.eyebrow{display:inline-flex;align-items:center;gap:9px;font-size:.74rem;letter-spacing:.22em;text-transform:uppercase;color:var(--ice);font-weight:600;margin-bottom:20px;border:1px solid var(--glass-line);background:var(--glass);padding:7px 15px;border-radius:40px}
.hero h1{font-size:clamp(2.2rem,5.5vw,3.4rem);margin-bottom:14px}
.hero p{color:var(--text-dim);max-width:640px;margin:0 auto;font-size:1.08rem}
.btn-gold{display:inline-flex;align-items:center;gap:10px;background:linear-gradient(135deg,var(--gold),var(--gold-deep));color:#1a1305;padding:14px 28px;border-radius:46px;font-weight:700;font-size:.92rem;text-decoration:none;box-shadow:0 10px 30px rgba(227,181,62,.28)}
.btn-ghost{display:inline-flex;color:var(--ice);text-decoration:none;font-weight:600;margin-top:12px}
footer{border-top:1px solid var(--line);padding:40px 0 60px;text-align:center;color:var(--text-dim);font-size:.86rem}
footer a{color:var(--ice);text-decoration:none;margin:0 8px}
footer .flinks{list-style:none;display:flex;flex-wrap:wrap;justify-content:center;gap:8px 18px;margin:16px 0}
@media(max-width:720px){.nav-links{display:none}}
`;

function navHtml() {
  return `<header class="nav"><div class="nav-in">
  <a href="index.html" class="brand"><span class="mark"><svg viewBox="0 0 24 24" fill="none" width="21" height="21"><path d="M12 2L4 9v11h5v-6h6v6h5V9z" stroke="#7fc6e8" stroke-width="1.6" stroke-linejoin="round"/></svg></span><span>Up North<small>Pressure Washing</small></span></a>
  <nav class="nav-links"><a href="gallery.html">Gallery</a><a href="reviews.html">Reviews</a><a href="blog-index.html">Learning Center</a><a href="faq.html">FAQ</a></nav>
  <a href="index.html#quote" class="nav-cta">Free Quote</a>
</div></header>`;
}

function footerHtml() {
  return `<footer class="wrap">
  <a class="btn-gold" href="tel:+12185768610">${PHONE}</a>
  <ul class="flinks">
    <li><a href="index.html">Home</a></li>
    <li><a href="gallery.html">Photo Gallery</a></li>
    <li><a href="reviews.html">Reviews</a></li>
    <li><a href="blog-index.html">Learning Center</a></li>
    <li><a href="faq.html">FAQ</a></li>
  </ul>
  <p>© 2026 Up North Pressure Washing · Duluth, MN · Fully Insured &amp; 5-Star Rated</p>
</footer>`;
}

function stars(n) {
  return '★'.repeat(n) + '☆'.repeat(5 - n);
}

function buildReviewsPage() {
  const cards = TESTIMONIALS.map(t => `
  <article class="review-card" data-cat="${t.cat.toLowerCase().replace(/\s+/g, '-')}">
    <div class="review-top"><span class="tag">${t.cat}</span><span class="stars" aria-label="${t.stars} out of 5 stars">${stars(t.stars)}</span></div>
    <blockquote>${t.text}</blockquote>
    <footer><strong>${t.author}</strong> · ${t.location}</footer>
  </article>`).join('');

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Reviews &amp; Testimonials | ${PHONE} | Up North Pressure Washing</title>
<meta name="description" content="Read 5-star reviews for Up North Pressure Washing — soft washing, concrete, deck restoration, window cleaning &amp; commercial work across Duluth, the North Shore &amp; Twin Ports.">
<link rel="canonical" href="${DOMAIN}/reviews.html">
<meta name="robots" content="index,follow">
<meta property="og:title" content="Reviews &amp; Testimonials | Up North Pressure Washing">
<meta property="og:description" content="5-star rated exterior cleaning across Duluth and the Northland. Read what homeowners and businesses say.">
<meta property="og:url" content="${DOMAIN}/reviews.html">
<meta property="og:image" content="${DOMAIN}/images/house-wash-after.jpg">
${SHARED_HEAD}
<script type="application/ld+json">
{"@context":"https://schema.org","@type":"LocalBusiness","name":"Up North Pressure Washing","telephone":"+12185768610","url":"${DOMAIN}/","aggregateRating":{"@type":"AggregateRating","ratingValue":"5","reviewCount":"20","bestRating":"5"},"review":[${TESTIMONIALS.map(t => `{"@type":"Review","reviewRating":{"@type":"Rating","ratingValue":"${t.stars}","bestRating":"5"},"author":{"@type":"Person","name":"${t.author.replace(/"/g, '\\"')}"},"reviewBody":"${t.text.replace(/"/g, '\\"')}"}`).join(',')}]}
</script>
<style>${SHARED_CSS}
.filters{display:flex;flex-wrap:wrap;justify-content:center;gap:10px;margin:28px 0 36px}
.filters button{border:1px solid var(--glass-line);background:var(--glass);color:var(--text-dim);padding:9px 18px;border-radius:30px;font:inherit;font-size:.82rem;font-weight:600;cursor:pointer;transition:.2s}
.filters button.active,.filters button:hover{border-color:var(--ice);color:#fff}
.review-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:22px;padding-bottom:50px}
.review-card{background:var(--glass);border:1px solid var(--glass-line);border-radius:18px;padding:28px 26px;display:flex;flex-direction:column;gap:16px}
.review-top{display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap}
.review-card .tag{font-size:.68rem;letter-spacing:.12em;text-transform:uppercase;color:var(--gold);border:1px solid rgba(227,181,62,.35);border-radius:30px;padding:4px 11px}
.review-card .stars{color:var(--gold);letter-spacing:2px;font-size:.95rem}
.review-card blockquote{font-size:1.02rem;color:#dde7ed;line-height:1.65;font-style:italic;flex:1}
.review-card footer{color:var(--text-dim);font-size:.88rem}
.google-cta{text-align:center;padding:10px 0 50px}
.google-cta h2{font-size:1.8rem;margin-bottom:12px}
.google-cta p{color:var(--text-dim);max-width:520px;margin:0 auto 22px}
.trust-row{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin:36px 0 10px}
.trust-item{background:var(--glass);border:1px solid var(--glass-line);border-radius:14px;padding:20px 16px;text-align:center}
.trust-item strong{display:block;font-family:'Fraunces',serif;font-size:1.35rem;color:var(--gold)}
.trust-item span{font-size:.82rem;color:var(--text-dim)}
@media(max-width:760px){.review-grid,.trust-row{grid-template-columns:1fr}}
</style>
</head>
<body>
<div class="atmosphere"></div>
${navHtml()}
<main id="main">
<section class="hero wrap">
  <span class="eyebrow">5-Star Rated · Duluth &amp; Northland</span>
  <h1>Reviews &amp; <span class="gold">Testimonials</span></h1>
  <p>Homeowners and businesses across the Twin Ports, North Shore, and Iron Range trust Up North for soft washing, concrete, decks, windows, and commercial cleaning.</p>
  <div class="trust-row wrap">
    <div class="trust-item"><strong>5.0</strong><span>Google Rating</span></div>
    <div class="trust-item"><strong>$1M+</strong><span>Liability Insured</span></div>
    <div class="trust-item"><strong>1-Year</strong><span>Growth-Free Guarantee</span></div>
    <div class="trust-item"><strong>Veteran</strong><span>Founded</span></div>
  </div>
</section>
<div class="wrap">
  <div class="filters" role="tablist" aria-label="Filter reviews by service">
    <button class="active" data-filter="all" type="button">All Reviews</button>
    <button data-filter="soft-washing" type="button">Soft Washing</button>
    <button data-filter="concrete" type="button">Concrete</button>
    <button data-filter="deck-restoration" type="button">Deck</button>
    <button data-filter="commercial" type="button">Commercial</button>
    <button data-filter="window-cleaning" type="button">Windows</button>
  </div>
  <div class="review-grid" id="reviewGrid">${cards}</div>
</div>
<section class="google-cta wrap">
  <h2>Read &amp; Leave a Review on <span class="ice">Google</span></h2>
  <p>Your feedback helps Northland neighbors find reliable exterior cleaning — and helps us keep improving every job.</p>
  <a class="btn-gold" href="${GOOGLE_REVIEW}" target="_blank" rel="noopener">★ Review Us on Google</a>
  <br><a href="gallery.html" class="btn-ghost">See our photo gallery →</a>
</section>
</main>
${footerHtml()}
<script>
document.querySelectorAll('.filters button').forEach(btn=>{
  btn.addEventListener('click',()=>{
    document.querySelectorAll('.filters button').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    const f=btn.dataset.filter;
    document.querySelectorAll('.review-card').forEach(card=>{
      const show=f==='all'||card.dataset.cat===f;
      card.style.display=show?'flex':'none';
    });
  });
});
</script>
</body>
</html>`;
  fs.writeFileSync(path.join(SITE, 'reviews.html'), html);
}

function buildGalleryPage() {
  const items = GALLERY.map((g, i) => {
    const catLabel = SERVICE_TYPES[g.cat]?.label || g.cat;
    return `<figure class="gal-item" data-cat="${g.cat}" tabindex="0" role="button" aria-label="View ${g.title} before and after">
      <div class="ba-pair">
        <img src="${g.before}" alt="Before — ${g.title}" loading="lazy" width="600" height="450">
        <img src="${g.after}" alt="After — ${g.title}" loading="lazy" width="600" height="450">
      </div>
      <figcaption><span class="tag">${catLabel}</span><strong>${g.title}</strong><span class="hint">Click to enlarge</span></figcaption>
    </figure>`;
  }).join('');

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Photo Gallery — Before &amp; After | Up North Pressure Washing</title>
<meta name="description" content="Before and after photos — soft washing, concrete cleaning, deck restoration, window cleaning &amp; commercial work across Duluth and the Northland.">
<link rel="canonical" href="${DOMAIN}/gallery.html">
<meta name="robots" content="index,follow">
<meta property="og:title" content="Photo Gallery | Up North Pressure Washing">
<meta property="og:description" content="Real before and after results from Duluth, the North Shore, and Twin Ports exterior cleaning projects.">
<meta property="og:url" content="${DOMAIN}/gallery.html">
<meta property="og:image" content="${DOMAIN}/images/house-wash-after.jpg">
${SHARED_HEAD}
<style>${SHARED_CSS}
.filters{display:flex;flex-wrap:wrap;justify-content:center;gap:10px;margin:28px 0 34px}
.filters button{border:1px solid var(--glass-line);background:var(--glass);color:var(--text-dim);padding:9px 18px;border-radius:30px;font:inherit;font-size:.82rem;font-weight:600;cursor:pointer;transition:.2s}
.filters button.active,.filters button:hover{border-color:var(--ice);color:#fff}
.gallery{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;padding-bottom:50px}
.gal-item{margin:0;background:var(--glass);border:1px solid var(--glass-line);border-radius:16px;overflow:hidden;cursor:pointer;transition:border-color .25s,transform .25s}
.gal-item:hover,.gal-item:focus{border-color:var(--ice);transform:translateY(-3px);outline:none}
.ba-pair{display:grid;grid-template-columns:1fr 1fr;gap:2px;background:#000}
.ba-pair img{width:100%;aspect-ratio:4/3;object-fit:cover;display:block}
.gal-item figcaption{padding:14px 16px 16px;display:flex;flex-direction:column;gap:6px}
.gal-item .tag{align-self:flex-start;font-size:.65rem;letter-spacing:.1em;text-transform:uppercase;color:var(--gold);border:1px solid rgba(227,181,62,.35);border-radius:30px;padding:3px 10px}
.gal-item strong{font-family:'Fraunces',serif;font-size:1rem;color:#fff}
.gal-item .hint{font-size:.78rem;color:var(--text-dim)}
.cta-row{text-align:center;padding:10px 0 50px}
.lb{position:fixed;inset:0;z-index:200;background:rgba(4,10,16,.92);display:none;align-items:center;justify-content:center;padding:20px}
.lb.open{display:flex}
.lb img{max-width:min(96vw,1100px);max-height:90vh;border-radius:12px;box-shadow:0 20px 60px rgba(0,0,0,.5)}
.lb-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;max-width:min(96vw,1100px)}
.lb-grid img{width:100%;border-radius:10px}
.lb-close{position:absolute;top:18px;right:22px;background:none;border:none;color:#fff;font-size:2.2rem;cursor:pointer;line-height:1}
.lb-label{position:absolute;top:18px;left:22px;color:var(--ice);font-weight:600;font-size:.9rem}
@media(max-width:900px){.gallery{grid-template-columns:repeat(2,1fr)}}
@media(max-width:580px){.gallery,.lb-grid{grid-template-columns:1fr}}
</style>
</head>
<body>
<div class="atmosphere"></div>
${navHtml()}
<main id="main">
<section class="hero wrap">
  <span class="eyebrow">Real Results · No Filters</span>
  <h1>Before &amp; After <span class="gold">Gallery</span></h1>
  <p>Genuine project photos from soft washing, concrete cleaning, deck restoration, window cleaning, and commercial work across the Northland.</p>
</section>
<div class="wrap">
  <div class="filters" role="tablist" aria-label="Filter gallery by service">
    <button class="active" data-filter="all" type="button">All</button>
    <button data-filter="soft-washing" type="button">Soft Washing</button>
    <button data-filter="concrete-washing" type="button">Concrete</button>
    <button data-filter="commercial-soft-washing" type="button">Commercial</button>
    <button data-filter="window-cleaning" type="button">Windows</button>
    <button data-filter="deck-restoration" type="button">Deck &amp; Fence</button>
  </div>
  <div class="gallery" id="gallery">${items}</div>
</div>
<section class="cta-row wrap">
  <a class="btn-gold" href="index.html#quote">Get Your Free Quote →</a>
  <br><a href="reviews.html" class="btn-ghost">Read customer reviews →</a>
</section>
</main>
${footerHtml()}
<div class="lb" id="lightbox" role="dialog" aria-modal="true" aria-label="Enlarged gallery image">
  <button class="lb-close" id="lbClose" aria-label="Close">×</button>
  <span class="lb-label" id="lbLabel"></span>
  <div class="lb-grid" id="lbGrid"></div>
</div>
<script>
const GALLERY=${JSON.stringify(GALLERY)};
const lb=document.getElementById('lightbox'),lbGrid=document.getElementById('lbGrid'),lbLabel=document.getElementById('lbLabel');
function openLb(i){
  const g=GALLERY[i];
  lbLabel.textContent=g.title;
  lbGrid.innerHTML='<img src="'+g.before+'" alt="Before — '+g.title+'"><img src="'+g.after+'" alt="After — '+g.title+'">';
  lb.classList.add('open');
}
document.querySelectorAll('.gal-item').forEach((el,i)=>el.addEventListener('click',()=>openLb(i)));
document.getElementById('lbClose').addEventListener('click',()=>lb.classList.remove('open'));
lb.addEventListener('click',e=>{if(e.target===lb)lb.classList.remove('open');});
document.querySelectorAll('.filters button').forEach(btn=>{
  btn.addEventListener('click',()=>{
    document.querySelectorAll('.filters button').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    const f=btn.dataset.filter;
    document.querySelectorAll('.gal-item').forEach(item=>{
      item.style.display=(f==='all'||item.dataset.cat===f)?'':'none';
    });
  });
});
</script>
</body>
</html>`;
  fs.writeFileSync(path.join(SITE, 'gallery.html'), html);
}

const EDUCATION_CSS = `
.edu-sec{padding:56px 0 20px;border-top:1px solid var(--line)}
.edu-sec .sec-head{text-align:center;margin-bottom:28px}
.edu-sec .sec-head h2{font-size:clamp(1.6rem,4vw,2.2rem);margin-bottom:10px}
.edu-sec .sec-head p{color:var(--text-dim);max-width:560px;margin:0 auto;font-size:.98rem}
.edu-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}
.edu-card{display:block;background:var(--glass);border:1px solid var(--glass-line);border-radius:14px;padding:20px 18px;text-decoration:none;transition:border-color .25s,transform .25s}
.edu-card:hover{border-color:var(--ice);transform:translateY(-3px)}
.edu-card .t{font-family:'Fraunces',serif;font-size:1.02rem;color:#fff;margin-bottom:6px;line-height:1.25}
.edu-card .d{font-size:.82rem;color:var(--text-dim)}
.edu-card .go{font-size:.78rem;color:var(--ice);margin-top:10px;font-weight:600}
.edu-more{text-align:center;margin-top:22px}
.edu-more a{color:var(--ice);font-weight:600;text-decoration:none}
@media(max-width:760px){.edu-grid{grid-template-columns:1fr}}
`;

function educationSection(serviceType, slug, cityName) {
  const meta = SERVICE_TYPES[serviceType];
  const blogs = EDUCATION_MAP[serviceType] || [];
  const cards = blogs.map(([prefix, title]) =>
    `<a class="edu-card" href="${prefix}-${slug}.html"><div class="t">${title}</div><div class="d">Local guide for ${cityName} homeowners &amp; businesses</div><div class="go">Read article →</div></a>`
  ).join('\n      ');
  return `<!-- EDUCATION-LINKS -->
<section class="edu-sec" id="guides">
  <div class="wrap">
    <div class="sec-head">
      <span class="eyebrow" style="display:inline-flex;align-items:center;gap:9px;font-size:.74rem;letter-spacing:.22em;text-transform:uppercase;color:var(--ice);font-weight:600;margin-bottom:14px;border:1px solid var(--glass-line);background:var(--glass);padding:7px 15px;border-radius:40px">Learning Center</span>
      <h2>${meta.heading} for <span class="gold">${cityName}</span></h2>
      <p>Educational articles to help you understand ${meta.label.toLowerCase()} — written specifically for ${cityName} properties.</p>
    </div>
    <div class="edu-grid">
      ${cards}
    </div>
    <p class="edu-more"><a href="blog-index.html">Browse all Learning Center articles →</a> · <a href="gallery.html">See photo gallery</a> · <a href="reviews.html">Read reviews</a></p>
  </div>
</section>`;
}

function hubEducationSection(slug, cityName) {
  const cards = HUB_EDUCATION.map(([prefix, label, svcType]) =>
    `<a class="edu-card" href="${prefix}-${slug}.html"><div class="t">${label} Guide</div><div class="d">${cityName} — ${SERVICE_TYPES[svcType].heading.replace(' Guides', '')}</div><div class="go">Read article →</div></a>`
  ).join('\n      ');
  return `<!-- EDUCATION-LINKS -->
<section class="edu-sec hub-edu" style="padding:48px 0;border-top:1px solid rgba(150,190,215,.18);background:rgba(255,255,255,.02)">
  <div class="wrap center" style="text-align:center">
    <p class="section-eyebrow" style="font-size:.74rem;letter-spacing:.22em;text-transform:uppercase;color:#7fc6e8;font-weight:600;margin-bottom:12px">Learning Center</p>
    <h2 style="font-family:'Fraunces',serif;font-size:clamp(1.5rem,4vw,2rem);margin-bottom:10px">Local Guides for <span style="color:#e3b53e">${cityName}</span></h2>
    <p style="color:#b3c4cf;max-width:560px;margin:0 auto 24px">Explore educational articles matched to each service — soft washing, concrete, commercial, windows, and deck care.</p>
    <div class="edu-grid" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:14px;text-align:left;max-width:900px;margin:0 auto">
      ${cards}
    </div>
    <p style="margin-top:22px"><a href="blog-index.html" style="color:#7fc6e8;font-weight:600;text-decoration:none">All Learning Center articles →</a> · <a href="gallery.html" style="color:#7fc6e8;font-weight:600;text-decoration:none">Photo gallery</a> · <a href="reviews.html" style="color:#7fc6e8;font-weight:600;text-decoration:none">Reviews</a></p>
  </div>
</section>`;
}

function injectEducation(html, section) {
  html = html.replace(/<!-- EDUCATION-LINKS -->[\s\S]*?(?=<!-- FOOTER -->|<footer)/, '');
  if (html.includes('<!-- FOOTER -->')) {
    return html.replace('<!-- FOOTER -->', section + '\n\n<!-- FOOTER -->');
  }
  if (html.includes('<footer>')) {
    return html.replace('<footer>', section + '\n\n<footer>');
  }
  return html;
}

function injectEducationCss(html) {
  if (html.includes('/* EDUCATION-BLOCK */')) return html;
  if (html.includes('</style>')) {
    return html.replace('</style>', `/* EDUCATION-BLOCK */${EDUCATION_CSS}\n</style>`);
  }
  return html;
}

function addFooterLinks(html) {
  html = html.replace(/learning-center-mn\.html/g, 'blog-index.html');
  if (html.includes('href="reviews.html"')) return html;

  // Service page foot-col links
  html = html.replace(
    /(<div class="foot-col"><h4>[^<]+<\/h4>\s*)<a href="blog-index\.html">Learning Center<\/a>/g,
    '$1<a href="blog-index.html">Learning Center</a>\n      <a href="gallery.html">Photo Gallery</a>\n      <a href="reviews.html">Reviews</a>'
  );
  // Hub flinks list items
  html = html.replace(
    /<li><a href="blog-index\.html">Learning Center<\/a><\/li>/g,
    '<li><a href="blog-index.html">Learning Center</a></li>\n      <li><a href="gallery.html">Photo Gallery</a></li>\n      <li><a href="reviews.html">Reviews</a></li>'
  );
  // Index trust block links
  html = html.replace(
    /<p style="margin-top:1\.4rem"><a href="blog-index\.html" style="font-family:var\(--f-display\);text-transform:uppercase;letter-spacing:1px;font-size:1\.2rem">Learning Center<\/a><\/p>/,
    '<p style="margin-top:1.4rem"><a href="blog-index.html" style="font-family:var(--f-display);text-transform:uppercase;letter-spacing:1px;font-size:1.2rem">Learning Center</a></p>\n    <p style="margin-top:1rem"><a href="gallery.html" style="font-family:var(--f-display);text-transform:uppercase;letter-spacing:1px;font-size:1.2rem">Photo Gallery</a></p>\n    <p style="margin-top:1rem"><a href="reviews.html" style="font-family:var(--f-display);text-transform:uppercase;letter-spacing:1px;font-size:1.2rem">Reviews</a></p>'
  );
  // Blog article footers only (copyright line)
  html = html.replace(
    /(<footer class="wrap">© 2026[^<]*<a href="blog-index\.html">Learning Center<\/a>)/g,
    '$1 · <a href="gallery.html">Gallery</a> · <a href="reviews.html">Reviews</a>'
  );
  // Standalone trust pages footer flinks — handled at generation
  return html;
}

// Build pages
buildReviewsPage();
buildGalleryPage();

let servicePatched = 0;
let hubPatched = 0;
let otherPatched = 0;

  const serviceRe = /^(soft-washing|concrete-washing|commercial-soft-washing|window-cleaning|deck-restoration|roof-soft-washing|gutter-fascia-cleaning|residential-window-cleaning|commercial-window-cleaning)-(.+)\.html$/;

for (const file of fs.readdirSync(SITE).filter(f => f.endsWith('.html'))) {
  const fp = path.join(SITE, file);
  let html = fs.readFileSync(fp, 'utf8');
  const orig = html;

  html = addFooterLinks(html);

  const m = file.match(serviceRe);
  if (m) {
    const [, serviceType, slug] = m;
    const city = cityBySlug[slug];
    const cityName = city?.name || slug;
    html = injectEducationCss(html);
    html = injectEducation(html, educationSection(serviceType, slug, cityName));
    if (html !== orig) servicePatched++;
  } else if (file === 'index.html' || file.endsWith('-pressure-washing.html')) {
    let slug = 'duluth';
    if (file !== 'index.html') {
      const city = CITIES.find(c => c.hubFile === file);
      slug = city?.slug || 'duluth';
    }
    const cityName = cityBySlug[slug]?.name || 'Duluth';
    html = injectEducation(html, hubEducationSection(slug, cityName));
    if (html !== orig) hubPatched++;
  } else if (file.startsWith('blog-') || file === 'faq.html' || file === 'blog-index.html') {
    // blog footers
    if (html !== orig) otherPatched++;
  }

  if (html !== orig) fs.writeFileSync(fp, html);
}

// Update blog-index hero links
let blogIndex = fs.readFileSync(path.join(SITE, 'blog-index.html'), 'utf8');
if (!blogIndex.includes('href="reviews.html"')) {
  blogIndex = blogIndex.replace(
    '<a href="index.html#quote" class="nav-cta">Free Quote</a>',
    '<nav class="nav-links" style="display:flex;gap:16px;margin-right:12px"><a href="gallery.html" style="color:#b3c4cf;text-decoration:none;font-size:.85rem">Gallery</a><a href="reviews.html" style="color:#b3c4cf;text-decoration:none;font-size:.85rem">Reviews</a></nav>\n  <a href="index.html#quote" class="nav-cta">Free Quote</a>'
  );
  blogIndex = addFooterLinks(blogIndex);
  fs.writeFileSync(path.join(SITE, 'blog-index.html'), blogIndex);
}

console.log('Created reviews.html and gallery.html');
console.log(`Service pages wired with Learning Center guides: ${servicePatched}`);
console.log(`Hub pages wired with education sections: ${hubPatched}`);
console.log('Run: node build-city-links.mjs && node build-sitemap.mjs');
