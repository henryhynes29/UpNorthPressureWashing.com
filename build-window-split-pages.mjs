import fs from 'fs';
import path from 'path';

const SITE = path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1'));
const DOMAIN = 'https://www.upnorthpressurewashing.com';
const PHONE = '218-576-8610';
const PHONE_TEL = '+12185768610';
const GOOGLE_REVIEW = 'https://g.page/r/CSCaz34lDtneEBE/review';
const BRAND = 'Up North Pressure Washing';

function loadCities() {
  const code = fs.readFileSync(path.join(SITE, 'build-site.mjs'), 'utf8');
  const start = code.indexOf('const CITIES = [');
  const arrEnd = code.indexOf('\n];', start) + 2;
  // eslint-disable-next-line no-eval
  return eval(code.slice(code.indexOf('[', start), arrEnd + 1));
}

const CITIES = loadCities();

function sf(slug, type) {
  const m = {
    hub: `window-cleaning-${slug}.html`,
    res: `residential-window-cleaning-${slug}.html`,
    com: `commercial-window-cleaning-${slug}.html`,
    soft: `soft-washing-${slug}.html`,
    roof: `roof-soft-washing-${slug}.html`,
    gutter: `gutter-fascia-cleaning-${slug}.html`,
    concrete: `concrete-washing-${slug}.html`,
    commercial: `commercial-soft-washing-${slug}.html`,
    deck: `deck-restoration-${slug}.html`,
    blog: `blog-soft-washing-home-value-${slug}.html`,
  };
  return m[type];
}

function baGrid(sliders) {
  return sliders.map(s => `
      <div class="ba-card reveal">
        <div class="cap"><h3>${s.title}</h3><span>${s.span}</span></div>
        <div class="ba" data-before="${s.before}" data-after="${s.after}"></div>
      </div>`).join('');
}

function cityOpts(city) {
  return [...new Set([city.name, ...city.nearby.slice(0, 3), 'Surrounding area'])]
    .map(o => `<option>${o}</option>`).join('');
}

function footCol(city) {
  const s = city.slug;
  return `<div class="foot-col"><h4>${city.name} Pages</h4>
      <a href="${city.hubFile}">${city.name} Home</a>
      <a href="${sf(s, 'hub')}">Window Cleaning Hub</a>
      <a href="${sf(s, 'res')}">Residential Windows</a>
      <a href="${sf(s, 'com')}">Commercial Windows</a>
      <a href="${sf(s, 'soft')}">Soft Washing</a>
      <a href="${sf(s, 'roof')}">Roof Soft Washing</a>
      <a href="${sf(s, 'gutter')}">Gutter Cleaning</a>
      <a href="${sf(s, 'concrete')}">Concrete Washing</a>
      <a href="${sf(s, 'deck')}">Deck Restoration</a>
      <a href="${sf(s, 'commercial')}">Commercial Cleaning</a>
      <a href="blog-index.html">Learning Center</a>
      <a href="gallery.html">Photo Gallery</a>
      <a href="reviews.html">Reviews</a>
    </div>`;
}

function footAreas(city) {
  return `<div class="foot-col"><h4>Service Areas</h4>${[city.name, ...city.nearby.slice(0, 4)].map(a => `<p>${a}</p>`).join('')}</div>`;
}

function stripEducation(html) {
  return html.replace(/<!-- EDUCATION-LINKS -->[\s\S]*?(?=<!-- FOOTER -->|<footer)/, '');
}

function stripSplitStyles(html) {
  return html.replace(/<style>\.faq-sec\{padding:70px[\s\S]*?<\/style>\n?/g, '');
}

function stripOldSchema(html) {
  return stripSplitStyles(html)
    .replace(/<script type="application\/ld\+json">[\s\S]*?"@type":"BreadcrumbList"[\s\S]*?<\/script>\s*/g, '')
    .replace(/<script type="application\/ld\+json">[\s\S]*?"@type":"FAQPage"[\s\S]*?<\/script>\s*/g, '')
    .replace(/<script type="application\/ld\+json">[\s\S]*?"@type":"Service"[\s\S]*?<\/script>\s*/g, '')
    .replace(/<script type="application\/ld\+json">[\s\S]*?"@graph"[\s\S]*?<\/script>\s*/g, '');
}

function seoCopy(city, kind) {
  const isRes = kind === 'res';
  const loc = `${city.name}, ${city.state}`;
  const r = city.region;
  if (isRes) {
    return {
      title: `House Window Cleaning ${loc} | Interior & Exterior Near Me`,
      desc: `Professional residential window cleaning in ${loc}. Interior & exterior house window washing, hard-water & salt removal, multi-story & lakefront homes. ${r}. Free quotes — ${PHONE}.`,
      h1: `House Window Cleaning<br><em>${loc}</em>`,
      eyebrow: `${city.name} · Residential Window Washing Near Me`,
      ogAlt: `Streak-free residential window cleaning in ${loc} — before and after house window washing by ${BRAND}`,
    };
  }
  return {
    title: `Commercial Window Cleaning ${loc} | Storefront & Office Glass`,
    desc: `Commercial window cleaning in ${loc}. Storefront glass, offices, medical & restaurant entries — after-hours scheduling & recurring contracts. Insured. ${r}. Call ${PHONE}.`,
    h1: `Commercial Window Cleaning<br><em>${loc}</em>`,
    eyebrow: `${city.name} · Storefront & Office Window Cleaning`,
    ogAlt: `Professional commercial storefront window cleaning in ${loc} — streak-free glass by ${BRAND}`,
  };
}

function areaServed(city) {
  const stateByName = new Map(CITIES.map(c => [c.name, c.state]));
  return [city.name, ...city.nearby.slice(0, 5)].map(n => {
    const state = stateByName.get(n) || city.state;
    return {
      '@type': 'City',
      name: n.includes(',') ? n : `${n}, ${state}`,
    };
  });
}

function stripSplitHeroBlocks(html) {
  return html
    .replace(/<div class="split-cards reveal">[\s\S]*?<\/div>\s*/g, '')
    .replace(/<div class="split-nav reveal">[\s\S]*?<\/div>\s*/g, '');
}

function offerItems(city, kind) {
  const isRes = kind === 'res';
  const items = isRes
    ? [
      ['Maintenance Window Cleaning', 'Twice-yearly exterior glass cleaning for pollen and light film'],
      ['Full Home Window Wash', 'Interior and exterior panes, tracks, frames, and screens'],
      ['Lakefront & Multi-Story Window Cleaning', 'Pure-water pole systems for elevated and lakefront glass'],
      ['Pre-Listing Window Detail', 'Maximize natural light before photos and showings'],
    ]
    : [
      ['Storefront Window Cleaning', 'Display glass, entry doors, and transoms for retail businesses'],
      ['Office & Medical Window Cleaning', 'Scheduled glass cleaning for professional facilities'],
      ['Recurring Commercial Contracts', 'Weekly, bi-weekly, or monthly window maintenance plans'],
      ['Restaurant & Hospitality Glass', 'Grease film and traffic grime removal before opening hours'],
    ];
  const loc = `${city.name}, ${city.state}`;
  return items.map(([name, description], i) => ({
    '@type': 'Offer',
    position: i + 1,
    itemOffered: {
      '@type': 'Service',
      name,
      description,
      areaServed: { '@type': 'City', name: loc },
    },
  }));
}

function schemaBlock(city, kind, url, desc, faqs, imagePath) {
  const isRes = kind === 'res';
  const loc = `${city.name}, ${city.state}`;
  const hubUrl = `${DOMAIN}/${sf(city.slug, 'hub')}`;
  const label = isRes ? 'Residential Window Cleaning' : 'Commercial Window Cleaning';
  const svcName = isRes ? `Residential Window Cleaning in ${loc}` : `Commercial Window Cleaning in ${loc}`;
  const imageUrl = `${DOMAIN}/${imagePath}`;
  const steps = howToSteps(city, kind);
  const howToName = isRes ? `How professional house window cleaning works in ${city.name}` : `How commercial storefront window cleaning works in ${city.name}`;
  const served = areaServed(city);
  const seo = seoCopy(city, kind);

  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'LocalBusiness',
        '@id': `${DOMAIN}/#business`,
        name: BRAND,
        url: `${DOMAIN}/`,
        telephone: PHONE_TEL,
        priceRange: '$$',
        image: imageUrl,
        geo: { '@type': 'GeoCoordinates', latitude: city.lat, longitude: city.lng },
        address: {
          '@type': 'PostalAddress',
          addressLocality: city.name,
          addressRegion: city.state,
          postalCode: city.zip,
          addressCountry: 'US',
        },
        areaServed: served,
        aggregateRating: { '@type': 'AggregateRating', ratingValue: '5', reviewCount: '20', bestRating: '5' },
        sameAs: [GOOGLE_REVIEW],
      },
      {
        '@type': 'Service',
        '@id': `${url}#service`,
        name: svcName,
        serviceType: label,
        description: desc,
        provider: { '@id': `${DOMAIN}/#business` },
        areaServed: served,
        url,
        image: imageUrl,
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: isRes ? `${city.name} Residential Window Packages` : `${city.name} Commercial Window Plans`,
          itemListElement: offerItems(city, kind),
        },
      },
      {
        '@type': 'WebPage',
        '@id': `${url}#webpage`,
        url,
        name: seo.title,
        description: desc,
        isPartOf: { '@id': `${DOMAIN}/#website` },
        about: { '@id': `${url}#service` },
        primaryImageOfPage: {
          '@type': 'ImageObject',
          url: imageUrl,
          caption: seo.ogAlt,
        },
        breadcrumb: { '@id': `${url}#breadcrumb` },
        speakable: { '@type': 'SpeakableSpecification', cssSelector: ['.lede', '#faq summary'] },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${url}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${DOMAIN}/` },
          { '@type': 'ListItem', position: 2, name: `Window Cleaning ${city.name}`, item: hubUrl },
          { '@type': 'ListItem', position: 3, name: label, item: url },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': `${url}#faq`,
        mainEntity: faqs.map(f => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a.replace(/<[^>]+>/g, '') },
        })),
      },
      {
        '@type': 'HowTo',
        '@id': `${url}#howto`,
        name: howToName,
        description: isRes
          ? `Four-step residential window washing process for ${loc} homes.`
          : `Four-step commercial window cleaning process for ${loc} businesses.`,
        step: steps.map(([name, text], i) => ({
          '@type': 'HowToStep',
          position: i + 1,
          name,
          text,
        })),
      },
    ],
  };

  return `<script type="application/ld+json">\n${JSON.stringify(graph)}\n</script>`;
}

function hubSchema(city, url, desc) {
  const loc = `${city.name}, ${city.state}`;
  const resUrl = `${DOMAIN}/${sf(city.slug, 'res')}`;
  const comUrl = `${DOMAIN}/${sf(city.slug, 'com')}`;
  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'LocalBusiness',
        '@id': `${DOMAIN}/#business`,
        name: BRAND,
        url: `${DOMAIN}/`,
        telephone: PHONE_TEL,
        geo: { '@type': 'GeoCoordinates', latitude: city.lat, longitude: city.lng },
        areaServed: areaServed(city),
        aggregateRating: { '@type': 'AggregateRating', ratingValue: '5', reviewCount: '20' },
      },
      {
        '@type': 'WebPage',
        '@id': `${url}#webpage`,
        url,
        name: `Window Cleaning ${loc} | Residential & Commercial`,
        description: desc,
        breadcrumb: { '@id': `${url}#breadcrumb` },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${url}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${DOMAIN}/` },
          { '@type': 'ListItem', position: 2, name: `Window Cleaning ${city.name}`, item: url },
        ],
      },
      {
        '@type': 'ItemList',
        '@id': `${url}#services`,
        name: `Window cleaning services in ${city.name}`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Residential Window Cleaning', url: resUrl },
          { '@type': 'ListItem', position: 2, name: 'Commercial Window Cleaning', url: comUrl },
        ],
      },
    ],
  };
  return `<script type="application/ld+json">\n${JSON.stringify(graph)}\n</script>`;
}

function howToSteps(city, kind) {
  const isRes = kind === 'res';
  const n = city.name;
  return isRes
    ? [
      [`Assess your ${n} home`, `Walk the property, note hard-water stains, salt film, screen condition, and interior/exterior scope.`],
      ['Prep & protect', 'Landscape-safe setup, drop cloths for interiors, and screen removal when included.'],
      ['Squeegee & pure-water clean', 'Professional squeegee technique and deionized pure-water rinsing for streak-free exterior glass.'],
      ['Detail tracks & inspect', 'Wipe sills, tracks, and frames; final walk-through on every pane.'],
    ]
    : [
      [`Scope ${n} storefront glass`, 'Inventory display windows, entry doors, transoms, and interior office glass.'],
      ['Schedule around business hours', 'Early-morning, evening, or low-traffic windows so customers and staff are not disrupted.'],
      ['Streak-free commercial clean', 'Professional squeegee and pure-water methods for salt film, grease, and traffic grime.'],
      ['Document & repeat', 'Final inspection, COI on file for property managers, and contract scheduling if requested.'],
    ];
}

function faqHtml(faqs) {
  return `<section id="faq" class="faq-sec">
  <div class="wrap">
    <div class="sec-head reveal">
      <span class="eyebrow"><span class="dot"></span>Expert Answers</span>
      <h2>${faqs.length}+ Window Cleaning <span class="gold">Questions Answered</span></h2>
      <p>Common questions about professional window washing in our service area — from pricing factors to scheduling.</p>
    </div>
    <div class="faq-list reveal">${faqs.map((f, i) => `
      <details class="faq-item"${i === 0 ? ' open' : ''}>
        <summary>${f.q}</summary>
        <p>${f.a}</p>
      </details>`).join('')}
    </div>
  </div>
</section>`;
}

function resFaqs(city) {
  const n = city.name;
  const r = city.region;
  const loc = `${n}, ${city.state}`;
  return [
    { q: `How much does residential window cleaning cost in ${n}?`, a: `House window cleaning in ${loc} typically depends on pane count, stories, interior/exterior scope, and hard-water treatment needs. Most ${n} homes fall in a moderate range — we provide free written quotes after a quick walkthrough or photo review so you know the price before we arrive.` },
    { q: `How often should I have my windows cleaned in ${n}?`, a: `Most ${n} homeowners schedule twice per year — spring after pollen season and fall before the holidays. Lakefront and heavily shaded homes in ${r} often benefit from three visits because humidity and hard-water spotting accumulate faster.` },
    { q: `Do you clean interior and exterior windows in ${n}?`, a: `Yes. Full home window washing includes interior and exterior panes, tracks, frames, and screens. Interior service is especially popular before listing a ${n} home or hosting events.` },
    { q: `Is there residential window cleaning near me in ${n}?`, a: `Yes — we serve ${n}, ${city.nearby.slice(0, 4).join(', ')}, and surrounding ${city.stateFull} communities within our ${r} service radius. Enter your address on our quote form or call ${PHONE} for same-week availability.` },
    { q: `How do you remove hard-water stains on ${n} glass?`, a: `${r} water and lake spray leave mineral deposits that DIY products cannot fix. We use professional squeegee technique, pure-water systems where appropriate, and targeted treatment for baked-on spotting — always streak-free.` },
    { q: `What is included in a residential window cleaning visit?`, a: `Every ${n} home visit includes glass cleaning, sill and track wipe-down, frame detailing, and screen cleaning upon request. We protect landscaping and entry areas throughout the job.` },
    { q: `Can you reach second-story and lakefront windows safely?`, a: `Yes. We use pure-water pole systems and professional ladder setups for multi-story ${n} homes, lakefront properties, and hillside lots — without leaving ladder marks or streaks.` },
    { q: `Why hire a professional instead of cleaning windows myself?`, a: `Professional window cleaning in ${n} saves hours, eliminates streaks, and handles ${r}-specific challenges like salt film and pollen between screens and glass — problems that store-bought tools rarely solve.` },
    { q: `Do you offer recurring residential maintenance plans?`, a: `Yes. Many ${n} homeowners set spring/fall or quarterly schedules so glass stays clear through ${city.possessive || n + "'s"} seasonal swings without rebooking each time.` },
    { q: `What is the best time of year for window cleaning in ${n}?`, a: `Late spring after pollen settles and early fall before winter salt season are ideal for ${n}. Pre-listing and holiday prep are also peak times — book two to three weeks ahead during busy seasons.` },
    { q: `Do you clean window screens and tracks?`, a: `Yes. Screen brushing and track wipe-down are available on every ${n} residential visit. Tracks collect pollen and dust that redeposit on glass if skipped — we detail them as part of a full home wash.` },
    { q: `Are you insured for residential work in ${n}?`, a: `Up North Pressure Washing carries $1M+ liability insurance. We are veteran-founded, fully insured, and trusted across ${r} for exterior cleaning.` },
  ];
}

function comFaqs(city) {
  const n = city.name;
  const r = city.region;
  const loc = `${n}, ${city.state}`;
  return [
    { q: `How much does commercial window cleaning cost in ${n}?`, a: `Commercial window cleaning in ${loc} depends on storefront square footage, pane count, frequency, and after-hours requirements. ${n} retail and office clients receive itemized quotes — recurring contracts often reduce per-visit cost versus one-time service.` },
    { q: `How often should ${n} businesses clean storefront glass?`, a: `Retail, restaurants, and medical offices in ${n} typically schedule monthly or bi-weekly cleaning. Professional storefront glass directly affects customer perception — especially on high-traffic corridors in ${r}.` },
    { q: `Do you offer after-hours commercial window cleaning in ${n}?`, a: `Yes. We schedule around business hours for ${n} storefronts, offices, and clinics — early morning, evening, or low-traffic windows so your team and customers are never disrupted.` },
    { q: `Is there commercial window cleaning near me in ${n}?`, a: `We serve ${n} businesses plus ${city.nearby.slice(0, 4).join(', ')} and ${r} commercial corridors. Property managers with multi-location portfolios can bundle sites on one contract.` },
    { q: `What commercial properties do you serve in ${n}?`, a: `We clean storefronts, office entryways, medical clinics, restaurants, retail chains, property-management portfolios, and mixed-use buildings across ${n} and ${r}.` },
    { q: `Can you handle multi-story commercial buildings?`, a: `Yes. Pure-water pole systems and professional access methods allow us to clean ${n} commercial glass safely on multi-story facades without damaging seals or leaving residue.` },
    { q: `Do you offer recurring commercial contracts?`, a: `Property managers and ${n} business owners use weekly, bi-weekly, or monthly plans. Consistent glass maintenance keeps brand presentation sharp year-round.` },
    { q: `How do you remove salt and grime from ${n} entry glass?`, a: `${r} winters track salt and brine onto commercial entries. Professional squeegee work and pure-water rinsing remove haze that makes storefronts look closed or neglected.` },
    { q: `Can you provide a certificate of insurance for ${n} property managers?`, a: `Yes — $1M+ liability coverage with COI available on request. We document service dates for commercial portfolios and HOA-managed properties.` },
    { q: `Do you clean restaurant and hospitality entry glass?`, a: `Yes. Grease film and foot-traffic grime on ${n} restaurant entries are scheduled before opening hours so dining rooms stay open during service.` },
    { q: `Can window cleaning be bundled with storefront pressure washing?`, a: `Absolutely. Many ${n} businesses bundle entry glass with <a href="${sf(city.slug, 'commercial')}" style="color:var(--ice)">commercial soft washing</a>, sidewalk cleaning, and dumpster pad service for one coordinated visit.` },
    { q: `Are your commercial crews insured?`, a: `Yes — $1M+ liability coverage, commercial-grade equipment, and documented service for ${n} property managers who require certificates of insurance.` },
  ];
}

function includedBlock(city, kind) {
  const n = city.name;
  const items = kind === 'res'
    ? ['Exterior glass — streak-free squeegee finish', 'Interior panes (upon request)', 'Window tracks, sills & frames wiped', 'Screen cleaning available', 'Hard-water & salt film treatment', 'Second-story & lakefront access', 'Landscape-safe setup', 'Final walk-through inspection']
    : ['Storefront & entry glass', 'Display windows & door glass', 'Interior office glass (scheduled)', 'Multi-story pure-water reach', 'After-hours scheduling available', 'Recurring contract options', 'Salt film & traffic grime removal', 'COI available for property managers'];
  return `<section class="included-sec">
  <div class="wrap">
    <div class="sec-head reveal">
      <span class="eyebrow"><span class="dot"></span>What's Included</span>
      <h2>Every ${kind === 'res' ? 'Residential' : 'Commercial'} Visit in <span class="ice">${n}</span></h2>
    </div>
    <ul class="included-grid reveal">${items.map(i => `<li><span class="ck">✓</span>${i}</li>`).join('')}</ul>
  </div>
</section>`;
}

function localAuthority(city, kind) {
  const n = city.name;
  const r = city.region;
  const paras = kind === 'res'
    ? [
      `<p><strong>${n} residential windows</strong> face a tougher cycle than inland homes — ${r} humidity, lake spray, road salt, and heavy pollen leave film that bakes onto glass within weeks. Generic national chains miss those local factors. We clean glass specifically for ${city.possessive || n + "'s"} climate.</p>`,
      `<p>Whether you own a hillside home, a lakefront cabin, or a neighborhood ranch, professional window cleaning restores natural light and curb appeal before guests arrive or before you list. Homeowners across ${n}, ${city.nearby.slice(0, 2).join(', ')}, and surrounding ${city.stateFull} communities trust our streak-free standard.</p>`,
      `<p>We also serve homeowners preparing for seasonal moves, holiday gatherings, and pre-listing photography — when crystal-clear glass makes ${n} properties photograph larger and brighter online. See our <a href="blog-window-cleaning-guide-${city.slug}.html" style="color:var(--ice)">${n} window cleaning guide</a> and <a href="gallery.html" style="color:var(--ice)">before/after gallery</a>.</p>`,
    ]
    : [
      `<p><strong>${n} commercial glass</strong> is your first impression — before a customer reads signage or walks through the door. Entryways coated in ${r} salt film and traffic grime signal neglect. Scheduled professional cleaning keeps ${n} businesses looking open, sharp, and trustworthy.</p>`,
      `<p>From single storefronts to multi-location portfolios, we deliver consistent results for retail, medical, hospitality, and office properties. Property managers across ${n} and ${city.nearby.slice(0, 2).join(', ')} rely on after-hours scheduling and recurring contracts.</p>`,
      `<p>Bundle commercial window cleaning with <a href="${sf(city.slug, 'commercial')}" style="color:var(--ice)">commercial soft washing</a>, parking lot cleaning, and facade care for maximum curb appeal per visit. Read our <a href="blog-commercial-building-cleaning-${city.slug}.html" style="color:var(--ice)">commercial building cleaning guide</a>.</p>`,
    ];
  return `<section class="auth-sec">
  <div class="wrap auth-grid reveal">
    <div>
      <span class="eyebrow"><span class="dot"></span>Local Expertise</span>
      <h2>${kind === 'res' ? 'Residential' : 'Commercial'} Window Cleaning Built for <span class="gold">${n}</span></h2>
    </div>
    <div class="auth-copy">${paras.join('')}</div>
  </div>
</section>`;
}


function pricingBlock(city, kind) {
  const isRes = kind === 'res';
  const n = city.name;
  const factors = isRes
    ? [
      ['Number of panes & stories', `More glass and second-story access add time — common on ${city.region} lakefront and hillside homes.`],
      ['Interior + exterior scope', 'Full inside-and-out visits cost more than exterior-only but deliver the brightest results for showings.'],
      ['Hard-water & salt treatment', `${n} lake spray and mineral deposits may need extra attention beyond a standard squeegee pass.`],
      ['Screen & track detailing', `Included options that affect total time on older ${n} homes with heavy pollen buildup.`],
      ['Frequency & maintenance plans', 'Spring/fall or quarterly schedules spread cost and keep glass clear year-round.'],
    ]
    : [
      ['Storefront square footage', `Display windows and entry door counts drive scope for ${n} retail and restaurant locations.`],
      ['Visit frequency', 'Weekly, bi-weekly, and monthly contracts reduce per-visit cost versus one-time service.'],
      ['After-hours scheduling', `Early-morning or evening work may apply for ${n} businesses that cannot close during the day.`],
      ['Multi-location portfolios', 'Property managers bundling several ${city.region} sites receive coordinated pricing.'],
      ['Bundled exterior cleaning', 'Combining glass with facade soft washing or sidewalk cleaning improves value per visit.'],
    ];
  return `<section class="seo-price">
  <div class="wrap">
    <div class="sec-head reveal">
      <span class="eyebrow"><span class="dot"></span>Pricing</span>
      <h2>What Affects ${isRes ? 'House' : 'Commercial'} Window Cleaning Cost in <span class="gold">${n}</span>?</h2>
      <p>Every job is quoted free — no surprise fees. These factors help ${isRes ? 'homeowners' : 'business owners'} understand typical ${n} window cleaning estimates.</p>
    </div>
    <div class="price-grid reveal">${factors.map(([h, p]) => `<div class="price-card"><h3>${h}</h3><p>${p}</p></div>`).join('')}</div>
    <p class="price-cta reveal">Ready for a number? <a href="#quote">Request your free ${n} ${isRes ? 'residential' : 'commercial'} quote</a> or call <a href="tel:${PHONE_TEL}">${PHONE}</a>.</p>
  </div>
</section>`;
}

function compareBlock(city, kind) {
  const isRes = kind === 'res';
  const n = city.name;
  const rows = isRes
    ? [
      ['Streak-free finish', 'Professional squeegee + pure-water', 'Paper towels & spray often leave haze'],
      ['Hard-water & salt removal', 'Targeted treatment for lakefront glass', 'Mineral spots often remain'],
      ['Multi-story / lakefront access', 'Poles, ladders, insured crews', `Safety risk DIY on ${n} hillsides`],
      ['Time to complete', 'Hours for whole-home scope', 'Full weekend for large homes'],
      ['Interior + tracks + screens', 'One coordinated visit', 'Easy to skip detail areas'],
    ]
    : [
      ['Brand presentation', 'Consistent contract-ready results', 'Inconsistent staff results'],
      ['After-hours scheduling', 'Before opening / after close', 'Disrupts business hours'],
      ['Salt & traffic grime', 'Commercial-grade removal', 'Streaks return quickly'],
      ['Multi-story storefronts', 'Pure-water reach systems', 'Limited DIY access'],
      ['Insurance & COI', '$1M+ liability, COI on file', 'No certificate for landlords'],
    ];
  return `<section class="seo-compare">
  <div class="wrap">
    <div class="sec-head reveal">
      <span class="eyebrow"><span class="dot"></span>Why Go Pro</span>
      <h2>Professional vs DIY Window Cleaning in <span class="ice">${n}</span></h2>
    </div>
    <div class="compare-table reveal">
      <div class="compare-row compare-head"><span>Factor</span><span>Up North Pro</span><span>DIY</span></div>
      ${rows.map(([f, pro, diy]) => `<div class="compare-row"><span>${f}</span><span>${pro}</span><span>${diy}</span></div>`).join('')}
    </div>
  </div>
</section>`;
}

function relatedLinksBlock(city, kind) {
  const s = city.slug;
  const isRes = kind === 'res';
  const links = isRes
    ? [
      [sf(s, 'hub'), `Window cleaning hub — ${city.name}`],
      [sf(s, 'com'), `Commercial windows — ${city.name}`],
      [`blog-window-cleaning-guide-${s}.html`, `${city.name} window cleaning guide`],
      [`blog-curb-appeal-checklist-${s}.html`, 'Curb appeal checklist'],
      [sf(s, 'soft'), `Soft washing — ${city.name}`],
      ['gallery.html', 'Window cleaning photo gallery'],
      ['reviews.html', 'Customer reviews'],
    ]
    : [
      [sf(s, 'hub'), `Window cleaning hub — ${city.name}`],
      [sf(s, 'res'), `Residential windows — ${city.name}`],
      [`blog-commercial-building-cleaning-${s}.html`, 'Commercial building cleaning guide'],
      [sf(s, 'commercial'), `Commercial soft washing — ${city.name}`],
      [`blog-hoa-property-maintenance-${s}.html`, 'HOA & property maintenance'],
      ['gallery.html', 'Before & after gallery'],
      ['reviews.html', 'Google reviews'],
    ];
  return `<section class="seo-related">
  <div class="wrap">
    <div class="sec-head reveal">
      <span class="eyebrow"><span class="dot"></span>Related Services</span>
      <h2>More ${isRes ? 'Home' : 'Business'} Exterior Resources</h2>
    </div>
    <nav class="related-grid reveal" aria-label="Related pages">${links.map(([href, label]) => `<a href="${href}">${label}</a>`).join('')}</nav>
  </div>
</section>`;
}

function whySection(city, kind) {
  const n = city.name;
  const r = city.region;
  const isRes = kind === 'res';
  const items = isRes
    ? [
      ['Streak-free every pane.', `Professional squeegee and pure-water methods — no haze, no drips, no missed corners on ${n} homes.`],
      [`Built for ${n} glass.`, `Salt spray, hard-water spotting, and pollen common across ${r} — we treat what generic cleaners miss.`],
      ['Interior, exterior & tracks.', 'Full home window washing including screens and sills — popular before listings and holidays.'],
      ['More light, better views.', `Clean windows transform how ${n} properties look inside and out — especially lake-facing glass.`],
    ]
    : [
      ['First impression glass.', `${n} customers judge your business at the entry — streak-free storefront glass signals professionalism.`],
      ['After-hours & contracts.', `Weekly, bi-weekly, or monthly plans for ${r} retailers, offices, and property managers.`],
      [`${r} salt & grime removal.`, 'Winter brine and traffic film on commercial entries — removed with commercial-grade squeegee work.'],
      ['Insured commercial crews.', 'COI available, documented service, and bundled facade cleaning for maximum curb appeal.'],
    ];
  return `<section>
  <div class="wrap why">
    <div class="reveal">
      <span class="eyebrow"><span class="dot"></span>Why Pro Windows</span>
      <h2 style="font-size:clamp(1.9rem,4.5vw,2.8rem)">${isRes ? 'Clear glass. Brighter homes.' : 'Sharp storefronts. Stronger brands.'}<br><span class="ice">Built for ${n}.</span></h2>
      <ul>${items.map(([b, s]) => `<li><span class="ck"><svg viewBox="0 0 24 24" fill="none"><path d="M4 12l5 5L20 6" stroke="#7fc6e8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></span><div><b>${b}</b> <span>${s}</span></div></li>`).join('')}
      </ul>
    </div>
  </div>
</section>`;
}

function seoContentBlocks(city, kind) {
  return `${pricingBlock(city, kind)}\n${compareBlock(city, kind)}\n${relatedLinksBlock(city, kind)}`;
}

function splitNav(city) {
  return `<div class="split-nav reveal">
    <a href="${sf(city.slug, 'hub')}" class="split-pill">All Window Services</a>
    <a href="${sf(city.slug, 'res')}" class="split-pill">Residential</a>
    <a href="${sf(city.slug, 'com')}" class="split-pill">Commercial</a>
  </div>`;
}

const RES_IMG = { HERO_BEFORE: 'images/window-res-before.jpg', HERO_AFTER: 'images/window-res-after.jpg' };
const COM_IMG = { HERO_BEFORE: 'images/window-before.jpg', HERO_AFTER: 'images/window-after.jpg' };
const RES_SLIDERS = [{ before: 'HERO_BEFORE', after: 'HERO_AFTER', title: 'Same Window — Crystal Clear', span: 'Residential Glass' }];
const COM_SLIDERS = [{ before: 'HERO_BEFORE', after: 'HERO_AFTER', title: 'Storefront Transformation', span: 'Commercial Entry Glass' }];

function resAccordions(city) {
  const n = city.name;
  return `<div class="reveal">
    <div class="acc"><div class="acc-head"><h3>Maintenance Window Cleaning</h3><div class="ic"></div></div><div class="acc-body"><div class="inner"><div class="badge"></div><div><p>Twice-yearly service for <b>${n} homes</b> — clears pollen, dust, and light hard-water film before it etches glass.</p><div class="feat"><span>Spring &amp; fall</span><span>Streak-free</span></div></div></div></div></div>
    <div class="acc"><div class="acc-head"><h3>Full Home Window Wash</h3><div class="ic"></div></div><div class="acc-body"><div class="inner"><div class="badge"></div><div><p><b>Most popular in ${n}.</b> Interior &amp; exterior panes, tracks, frames, and screens — salt film and hard-water spots removed.</p><div class="feat"><span>Inside &amp; out</span><span>Most popular</span></div></div></div></div></div>
    <div class="acc"><div class="acc-head"><h3>Lakefront &amp; Multi-Story Homes</h3><div class="ic"></div></div><div class="acc-body"><div class="inner"><div class="badge"></div><div><p>Pure-water pole systems for <b>${n} lakefront and hillside properties</b> — hard-water spray and elevated glass handled safely.</p><div class="feat"><span>Pure-water</span><span>Multi-story</span></div></div></div></div></div>
    <div class="acc"><div class="acc-head"><h3>Pre-Listing &amp; Move-In Detail</h3><div class="ic"></div></div><div class="acc-body"><div class="inner"><div class="badge"></div><div><p>Maximize natural light before <b>${n} listing photos</b> or new occupancy — one of the fastest curb appeal upgrades available.</p><div class="feat"><span>Listing prep</span><span>Move-in ready</span></div></div></div></div></div>
  </div>`;
}

function comAccordions(city) {
  const n = city.name;
  return `<div class="reveal">
    <div class="acc"><div class="acc-head"><h3>Storefront &amp; Entry Glass</h3><div class="ic"></div></div><div class="acc-body"><div class="inner"><div class="badge"></div><div><p>Keep <b>${n} retail entries</b> crystal clear — display windows, door glass, and transoms that customers see first.</p><div class="feat"><span>Storefronts</span><span>Display glass</span></div></div></div></div></div>
    <div class="acc"><div class="acc-head"><h3>Office &amp; Medical Facilities</h3><div class="ic"></div></div><div class="acc-body"><div class="inner"><div class="badge"></div><div><p>Scheduled cleaning for <b>${n} offices and clinics</b> — professional presentation for patients, clients, and tenants.</p><div class="feat"><span>Offices</span><span>Medical</span></div></div></div></div></div>
    <div class="acc"><div class="acc-head"><h3>Recurring Commercial Contracts</h3><div class="ic"></div></div><div class="acc-body"><div class="inner"><div class="badge"></div><div><p>Weekly, bi-weekly, or monthly plans for <b>${n} property managers</b> — consistent brand presentation across locations.</p><div class="feat"><span>Contracts</span><span>After-hours</span></div></div></div></div></div>
    <div class="acc"><div class="acc-head"><h3>Restaurant &amp; Hospitality Glass</h3><div class="ic"></div></div><div class="acc-body"><div class="inner"><div class="badge"></div><div><p>Grease film and traffic grime removed from <b>${n} restaurant entries</b> — scheduled before opening hours.</p><div class="feat"><span>Restaurants</span><span>Early AM</span></div></div></div></div></div>
  </div>`;
}

function testimonials(city, kind) {
  const loc = `${city.name}, ${city.state}`;
  if (kind === 'res') {
    return `<div class="test-grid">
      <div class="test reveal"><div class="stars">★★★★★</div><p class="quote">"Our windows hadn't been cleaned in years — the difference is incredible. Every pane is crystal clear and the crew was careful around our landscaping."</p><div class="who">Local Homeowner<small>${loc}</small></div></div>
      <div class="test reveal"><div class="stars">★★★★★</div><p class="quote">"Interior and exterior done in one visit. Hard-water spots gone from our lake-facing windows. Worth every penny in ${city.name}."</p><div class="who">Homeowner<small>${loc}</small></div></div>
    </div>
    <p class="reveal" style="text-align:center;margin-top:1.2rem"><a href="reviews.html" style="color:var(--ice);font-weight:600;text-decoration:none">Read all reviews →</a> · <a href="gallery.html" style="color:var(--ice);font-weight:600;text-decoration:none">See window photos</a></p>`;
  }
  return `<div class="test-grid">
      <div class="test reveal"><div class="stars">★★★★★</div><p class="quote">"Our storefront windows have never looked this clear. Up North was professional, on time, and the results speak for themselves — highly recommend for any ${city.name} business!"</p><div class="who">Local Business Owner<small>${loc}</small></div></div>
      <div class="test reveal"><div class="stars">★★★★★</div><p class="quote">"We needed storefront glass done before a busy weekend. Fast, professional, and streak-free. Our shop looks sharper than it has in a long time."</p><div class="who">Business Owner<small>${loc}</small></div></div>
    </div>
    <p class="reveal" style="text-align:center;margin-top:1.2rem"><a href="reviews.html" style="color:var(--ice);font-weight:600;text-decoration:none">Read all reviews →</a> · <a href="${sf(city.slug, 'commercial')}" style="color:var(--ice);font-weight:600;text-decoration:none">Commercial exterior cleaning →</a></p>`;
}

function extraCss() {
  return `.faq-sec{padding:70px 0}.faq-list{max-width:820px;margin:0 auto;display:flex;flex-direction:column;gap:12px}
.faq-item{background:var(--glass);border:1px solid var(--glass-line);border-radius:14px;padding:0 22px}
.faq-item summary{cursor:pointer;font-weight:600;color:#fff;padding:18px 0;list-style:none;font-family:'Fraunces',serif;font-size:1.05rem}
.faq-item summary::-webkit-details-marker{display:none}
.faq-item p{color:var(--text-dim);padding:0 0 18px;font-size:.98rem;line-height:1.65}
.included-sec{padding:60px 0;background:rgba(255,255,255,.015)}
.included-grid{list-style:none;display:grid;grid-template-columns:repeat(2,1fr);gap:14px 24px;max-width:820px;margin:0 auto}
.included-grid li{display:flex;gap:12px;color:var(--text-dim);font-size:.96rem}
.included-grid .ck{color:var(--gold);font-weight:700;flex-shrink:0}
.auth-sec{padding:64px 0;border-top:1px solid var(--line)}
.auth-grid{display:grid;grid-template-columns:1fr 1.2fr;gap:40px;align-items:start}
.auth-copy p{margin-bottom:16px;color:var(--text-dim);font-size:1.02rem}
.split-nav{display:flex;flex-wrap:wrap;gap:10px;margin-top:24px}
.split-pill{padding:10px 18px;border-radius:30px;border:1px solid var(--glass-line);background:var(--glass);color:var(--text-dim);text-decoration:none;font-size:.84rem;font-weight:600;transition:.2s}
.split-pill:hover,.split-pill.active{border-color:var(--ice);color:#fff}
.split-cards{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin:40px 0 10px}
.split-card{display:block;background:var(--glass);border:1px solid var(--glass-line);border-radius:18px;padding:28px 24px;text-decoration:none;transition:.25s}
.split-card:hover{border-color:var(--ice);transform:translateY(-4px)}
.split-card .tag{font-size:.68rem;letter-spacing:.12em;text-transform:uppercase;color:var(--gold);margin-bottom:10px;display:block}
.split-card h3{font-family:'Fraunces',serif;color:#fff;font-size:1.35rem;margin-bottom:8px}
.split-card p{color:var(--text-dim);font-size:.92rem}
.split-card .go{color:var(--ice);font-weight:600;font-size:.85rem;margin-top:14px;display:block}
.seo-area,.seo-price,.seo-compare,.seo-related{padding:64px 0;border-top:1px solid var(--line)}
.seo-area{background:rgba(255,255,255,.012)}
.area-grid{display:flex;flex-wrap:wrap;gap:10px;justify-content:center;max-width:920px;margin:0 auto}
.area-link{padding:12px 18px;border-radius:30px;border:1px solid var(--glass-line);background:var(--glass);color:var(--text-dim);text-decoration:none;font-size:.88rem;font-weight:500;transition:.2s}
.area-link:hover{border-color:var(--ice);color:#fff}
.price-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:16px;max-width:960px;margin:0 auto}
.price-card{background:var(--glass);border:1px solid var(--glass-line);border-radius:14px;padding:20px}
.price-card h3{font-size:1rem;color:#fff;margin-bottom:8px}
.price-card p{color:var(--text-dim);font-size:.92rem;line-height:1.55}
.price-cta{text-align:center;margin-top:24px;color:var(--text-dim)}
.price-cta a{color:var(--ice);font-weight:600;text-decoration:none}
.compare-table{max-width:880px;margin:0 auto;border:1px solid var(--glass-line);border-radius:14px;overflow:hidden}
.compare-row{display:grid;grid-template-columns:1.1fr 1fr 1fr;gap:0;border-bottom:1px solid var(--glass-line)}
.compare-row:last-child{border-bottom:none}
.compare-row span{padding:14px 16px;font-size:.88rem;color:var(--text-dim);border-right:1px solid var(--glass-line)}
.compare-row span:last-child{border-right:none}
.compare-head span{background:rgba(255,255,255,.04);color:#fff;font-weight:600;font-family:'Fraunces',serif}
.related-grid{display:flex;flex-wrap:wrap;gap:10px;justify-content:center;max-width:900px;margin:0 auto}
.related-grid a{padding:10px 16px;border-radius:10px;border:1px solid var(--glass-line);color:var(--ice-soft);text-decoration:none;font-size:.86rem;transition:.2s}
.related-grid a:hover{border-color:var(--ice);color:#fff}
@media(max-width:760px){.included-grid,.auth-grid,.split-cards{grid-template-columns:1fr}.compare-row{grid-template-columns:1fr}.compare-row span{border-right:none;border-bottom:1px solid var(--glass-line)}.compare-head{display:none}}`;
}

function applySplitPage(html, city, kind) {
  const isRes = kind === 'res';
  const s = city.slug;
  const loc = `${city.name}, ${city.state}`;
  const nearby = city.nearby.slice(0, 3).join(', ');
  const file = sf(s, kind);
  const url = `${DOMAIN}/${file}`;
  const faqs = isRes ? resFaqs(city) : comFaqs(city);
  const seo = seoCopy(city, kind);
  const imagePath = isRes ? 'images/window-res-after.jpg' : 'images/window-after.jpg';
  let out = stripEducation(stripOldSchema(stripSplitHeroBlocks(html)));

  const lede = isRes
    ? `<strong>Residential window cleaning in ${loc}</strong> — house window washing near you with streak-free interior &amp; exterior results. Tracks, screens, hard-water stains, and ${city.region} salt film removed with professional squeegee and pure-water methods.`
    : `<strong>Commercial window cleaning in ${loc}</strong> for storefronts, offices, medical facilities, and property managers — streak-free entry glass, after-hours scheduling, and recurring contracts across ${city.region}.`;
  const serving = isRes
    ? `House &amp; home window washing near ${city.name} — serving ${nearby} · ZIP ${city.zip} · free quotes.`
    : `Storefront &amp; office glass in ${city.name} — ${nearby} · insured crews · COI available.`;

  out = out.replace(/<title>[^<]*<\/title>/, `<title>${seo.title} | Up North</title>`);
  out = out.replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${seo.desc}">`);
  out = out.replace(/<meta name="geo\.region" content="[^"]*">/, `<meta name="geo.region" content="US-${city.state}">`);
  out = out.replace(/<meta name="geo\.placename" content="[^"]*">/, `<meta name="geo.placename" content="${city.name}, ${city.stateFull}">`);
  if (!out.includes('geo.position')) {
    out = out.replace(/<meta name="geo\.placename"[^>]*>/,
      `$&\n<meta name="geo.position" content="${city.lat};${city.lng}">\n<meta name="ICBM" content="${city.lat}, ${city.lng}">`);
  }
  out = out.replace(/<link rel="canonical" href="[^"]*">/, `<link rel="canonical" href="${url}">`);
  out = out.replace(/<meta property="og:title" content="[^"]*">/g, `<meta property="og:title" content="${seo.title}">`);
  out = out.replace(/<meta property="og:description" content="[^"]*">/g, `<meta property="og:description" content="${seo.desc}">`);
  out = out.replace(/<meta property="og:url" content="[^"]*">/g, `<meta property="og:url" content="${url}">`);
  out = out.replace(/<meta name="twitter:title" content="[^"]*">/g, `<meta name="twitter:title" content="${seo.title}">`);
  out = out.replace(/<meta name="twitter:description" content="[^"]*">/g, `<meta name="twitter:description" content="${seo.desc}">`);
  out = out.replace(/<meta property="og:image" content="[^"]*">/, `<meta property="og:image" content="${DOMAIN}/${imagePath}">`);
  out = out.replace(/<meta property="og:image:alt" content="[^"]*">/, `<meta property="og:image:alt" content="${seo.ogAlt}">`);
  if (!out.includes('og:locale')) {
    out = out.replace(/<meta property="og:type"/, `<meta property="og:locale" content="en_US">\n<meta property="og:type"`);
  }

  out = out.replace(/<span class="dot"><\/span>[^<]*<\/span>\s*\n\s*<h1>/, `<span class="dot"></span>${seo.eyebrow}</span>\n    <h1>`);
  out = out.replace(/<h1>[\s\S]*?<\/h1>/, `<h1>${seo.h1}</h1>`);
  out = out.replace(/<p class="lede">[\s\S]*?<\/p>/, `<p class="lede">${lede}</p>`);
  out = out.replace(/<p class="serving">[\s\S]*?<\/p>/, `<p class="serving">${serving}</p>`);
  out = out.replace(/<div class="hero-cta-row">/, `${splitNav(city).replace('split-pill">Residential', `split-pill${isRes ? ' active' : ''}">Residential`).replace('split-pill">Commercial', `split-pill${!isRes ? ' active' : ''}">Commercial`)}\n    <div class="hero-cta-row">`);

  out = out.replace(/Streak-Free<\/span><span class="lbl">Glass Guarantee/, isRes ? 'Inside &amp;<br>Out</span><span class="lbl">Available' : 'After-<br>Hours</span><span class="lbl">Scheduling');
  out = out.replace(/Inside &amp;<br>Out<\/span><span class="lbl">Available/, isRes ? 'Pure-<br>Water</span><span class="lbl">Multi-Story' : 'Recurring<br>Contracts</span><span class="lbl">Available');

  const resultsIntro = isRes
    ? `<p>Real ${city.name} residential window cleaning results — same-window before &amp; after on ${city.region} homes. No filters, no stock photos.</p>`
    : `<p>Real ${city.name} commercial storefront results — entry glass before &amp; after on ${city.region} businesses.</p>`;
  out = out.replace(/<p>No filters, no editing — just genuine window cleaning results on homes and businesses across [^<]*<\/p>/, resultsIntro);

  const sliders = isRes ? RES_SLIDERS : COM_SLIDERS;
  out = out.replace(/<div class="ba-grid">[\s\S]*?<\/div>\s*<p class="fit-note">/,
    `<div class="ba-grid">${baGrid(sliders)}\n    </div>\n    <p class="fit-note">`);

  const svcHead = isRes
    ? `Residential Window Services<br>For <span class="ice">${city.name} Homes</span>`
    : `Commercial Window Services<br>For <span class="ice">${city.name} Businesses</span>`;
  out = out.replace(/Window Cleaning Options<br>For <span class="ice">[^<]*<\/span>/, svcHead);
  out = out.replace(/Residential Window Services<br>For <span class="ice">[^<]*<\/span>/, svcHead);
  out = out.replace(/Commercial Window Services<br>For <span class="ice">[^<]*<\/span>/, svcHead);
  out = out.replace(/<div class="reveal">\s*<div class="acc">[\s\S]*?<\/div>\s*<div class="svc-cta"><a href="#quote" class="btn-gold">Get a Free/,
    `${isRes ? resAccordions(city) : comAccordions(city)}\n    <div class="svc-cta"><a href="#quote" class="btn-gold">Get a Free`);

  const processHead = isRes
    ? `Our <span class="gold">house window washing</span> process`
    : `Our <span class="gold">commercial window cleaning</span> process`;
  const processSub = isRes
    ? `A proven four-step residential method built for ${city.name}'s lake humidity, pollen seasons, and hard-water spotting.`
    : `A proven four-step commercial method for ${city.name} storefronts — scheduled around your business hours.`;
  out = out.replace(/Our <span class="gold">window cleaning<\/span> process/, processHead);
  out = out.replace(/A proven four-step method built for [^<]*<\/p>/, `${processSub}</p>`);

  out = out.replace(/<!-- WHY SOFT WASH -->[\s\S]*?<!-- GUARANTEE -->/,
    `${whySection(city, kind)}\n<!-- GUARANTEE -->`);

  const cta = isRes ? `Get a Free ${city.name} Residential Window Quote` : `Get a Free ${city.name} Commercial Window Quote`;
  out = out.replace(/Get a Free [^<]*Window (Cleaning )?Quote/, cta);

  out = out.replace(/<!-- GUARANTEE -->[\s\S]*?<!-- TESTIMONIALS -->/,
    `${includedBlock(city, kind)}\n${localAuthority(city, kind)}\n${seoContentBlocks(city, kind)}\n<!-- GUARANTEE -->\n<section>\n  <div class="wrap">\n    <div class="guarantee reveal">\n      <div class="seal"><svg viewBox="0 0 24 24" fill="none"><path d="M12 2l7 3v6c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V5z" stroke="#e3b53e" stroke-width="1.5" stroke-linejoin="round"/><path d="M9 12l2 2 4-4" stroke="#e3b53e" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg></div>\n      <h2>The <span class="gold">Streak-Free</span> Guarantee</h2>\n      <p>Every ${isRes ? 'residential' : 'commercial'} window cleaning job in ${city.name} is backed by our streak-free guarantee. ${isRes ? 'Professional squeegee and pure-water methods tuned for ' + city.region + '.' : 'After-hours scheduling and insured crews for ' + city.region + ' businesses.'} <b style="color:#fff">If you are not satisfied with the clarity, we make it right.</b></p>\n    </div>\n  </div>\n</section>\n\n<!-- TESTIMONIALS -->`);

  const reviewHead = isRes
    ? `What ${city.name} <span class="ice">homeowners</span> are saying`
    : `What ${city.name} <span class="ice">business owners</span> are saying`;
  out = out.replace(/What [^<]*<span class="ice">customers<\/span> are saying/, reviewHead);

  out = out.replace(/<div class="test-grid">[\s\S]*?<div class="svc-cta reveal" style="margin-top:2rem/,
    `${testimonials(city, kind)}\n    <div class="svc-cta reveal" style="margin-top:2rem`);

  out = out.replace(/<!-- QUOTE FORM -->/, () => `${faqHtml(faqs)}\n\n<!-- QUOTE FORM -->`);

  const opts = isRes
    ? `<option>Full Home Window Wash</option><option>Maintenance Cleaning</option><option>Interior &amp; Exterior</option><option>Lakefront / Multi-Story</option><option>Pre-Listing Detail</option>`
    : `<option>Storefront Glass</option><option>Office / Medical</option><option>Recurring Contract</option><option>Restaurant Entry</option><option>Multi-Location Portfolio</option>`;
  out = out.replace(/<option>[^<]*<\/option>[\s\S]*?<option>Custom Solution<\/option>/, opts + '<option>Custom Solution</option>');
  out = out.replace(/<select id="city">[\s\S]*?<\/select>/, `<select id="city">${cityOpts(city)}</select>`);
  out = out.replace(/placeholder="[^"]*"/, isRes
    ? `placeholder="Number of windows, stories, interior/exterior, lakefront — anything helpful..."`
    : `placeholder="Storefront size, locations, after-hours needs, contract frequency..."`);
  out = out.replace(/Tell us about your [^<]*estimate\./, isRes
    ? `Tell us about your ${city.name} home and we will send a free residential window cleaning estimate.`
    : `Tell us about your ${city.name} business and we will send a free commercial window quote.`);

  out = out.replace(/href="index\.html"/g, `href="${city.hubFile}"`);
  out = out.replace(/Streak-free window cleaning for [^<]*\./, isRes
    ? `Residential window cleaning for ${city.name} &amp; ${city.region}. Streak-free inside and out.`
    : `Commercial window cleaning for ${city.name} &amp; ${city.region}. Storefronts, offices &amp; contracts.`);

  out = out.replace(/<div class="foot-col"><h4>[^<]*Pages<\/h4>[\s\S]*?<a href="reviews\.html">Reviews<\/a>\s*<\/div>/, footCol(city));
  out = out.replace(/<div class="foot-col"><h4>Service Areas<\/h4>[\s\S]*?<div class="foot-col"><h4>Get Started<\/h4>/,
    `${footAreas(city)}\n      <div class="foot-col"><h4>Also See</h4><a href="${sf(s, isRes ? 'com' : 'res')}">${isRes ? 'Commercial' : 'Residential'} Windows</a><a href="${sf(s, 'hub')}">Window Hub</a><a href="blog-window-cleaning-guide-${s}.html">Window Cleaning Guide</a></div>\n      <div class="foot-col"><h4>Get Started</h4>`);

  out = out.replace(/© 2026 Up North Pressure Washing · [^·]+ · [^<]+/,
    `© 2026 Up North Pressure Washing · ${loc} · ${isRes ? 'Streak-Free Residential Windows' : 'Commercial Window Cleaning'}`);

  const imgs = isRes ? RES_IMG : COM_IMG;
  const alts = isRes
    ? { HERO_BEFORE: `Before residential window cleaning in ${loc} — filmy glass same window | Up North`, HERO_AFTER: `After residential window cleaning in ${loc} — streak-free same window | Up North` }
    : { HERO_BEFORE: `Before commercial window cleaning in ${loc} — storefront glass with grime | Up North`, HERO_AFTER: `After commercial window cleaning in ${loc} — spotless storefront glass | Up North` };
  out = out.replace(/const IMGDATA = \{[\s\S]*?\};\s*(const ALTDATA = \{[\s\S]*?\};)?/,
    `const IMGDATA = ${JSON.stringify(imgs)};\nconst ALTDATA = ${JSON.stringify(alts)};`);

  out = out.replace('</head>', () => schemaBlock(city, kind, url, seo.desc, faqs, imagePath) + '\n<style>' + extraCss() + '</style>\n</head>');

  return out.replace(/\bDuluth's\b/g, city.possessive || `${city.name}'s`).replace(/\bDuluth\b/g, city.name);
}

function applyHubPage(html, city) {
  const s = city.slug;
  const loc = `${city.name}, ${city.state}`;
  const hubFile = sf(s, 'hub');
  const url = `${DOMAIN}/${hubFile}`;
  const desc = `Window cleaning in ${loc} — residential house window washing & commercial storefront glass. Streak-free squeegee & pure-water pros serving ${city.region}. Free quotes: ${PHONE}.`;
  let out = stripOldSchema(stripSplitHeroBlocks(html));

  out = out.replace(/<title>[^<]*<\/title>/, `<title>Window Cleaning ${loc} | Residential &amp; Commercial Near Me</title>`);
  out = out.replace(/<meta name="description" content="[^"]*">/,
    `<meta name="description" content="${desc}">`);
  out = out.replace(/<meta name="geo\.region" content="[^"]*">/, `<meta name="geo.region" content="US-${city.state}">`);
  out = out.replace(/<meta name="geo\.placename" content="[^"]*">/, `<meta name="geo.placename" content="${city.name}, ${city.stateFull}">`);
  if (!out.includes('geo.position')) {
    out = out.replace(/<meta name="geo\.placename"[^>]*>/,
      `$&\n<meta name="geo.position" content="${city.lat};${city.lng}">\n<meta name="ICBM" content="${city.lat}, ${city.lng}">`);
  }
  if (!out.includes('rel="canonical"')) {
    out = out.replace(/<meta name="description"[^>]*>/, `$&\n<link rel="canonical" href="${url}">`);
  } else {
    out = out.replace(/<link rel="canonical" href="[^"]*">/, `<link rel="canonical" href="${url}">`);
  }
  if (!out.includes('og:title')) {
    out = out.replace(/<link rel="canonical"[^>]*>/,
      `$&\n<meta property="og:type" content="website">\n<meta property="og:site_name" content="${BRAND}">\n<meta property="og:title" content="Window Cleaning ${loc} | Residential &amp; Commercial">\n<meta property="og:description" content="${desc}">\n<meta property="og:url" content="${url}">\n<meta property="og:image" content="${DOMAIN}/images/window-res-after.jpg">\n<meta name="twitter:card" content="summary_large_image">\n<meta name="twitter:title" content="Window Cleaning ${loc}">\n<meta name="twitter:description" content="${desc}">`);
  }

  out = out.replace(/<h1>Window Cleaning in<br><em>[^<]*<\/em><\/h1>/,
    `<h1>Window Cleaning in<br><em>${loc}</em></h1>`);
  out = out.replace(/<p class="lede">[\s\S]*?<\/p>/,
    `<p class="lede">${city.windowCopy} Choose your path — <a href="${sf(s, 'res')}" style="color:var(--ice);font-weight:600">residential house window cleaning</a> for homes or <a href="${sf(s, 'com')}" style="color:var(--ice);font-weight:600">commercial storefront window cleaning</a> for businesses in ${city.name}.</p>`);

  out = out.replace(/<div class="hero-cta-row">/,
    `<div class="split-cards reveal">
      <a class="split-card" href="${sf(s, 'res')}"><span class="tag">Homes · Near Me</span><h3>Residential Window Cleaning ${city.name}</h3><p>Interior &amp; exterior house window washing, tracks, screens, lakefront &amp; multi-story — streak-free for ${city.region} homeowners.</p><span class="go">Residential services →</span></a>
      <a class="split-card" href="${sf(s, 'com')}"><span class="tag">Businesses</span><h3>Commercial Window Cleaning ${city.name}</h3><p>Storefronts, offices, clinics &amp; recurring contracts — after-hours scheduling across ${city.region}.</p><span class="go">Commercial services →</span></a>
    </div>
    ${splitNav(city)}
    <div class="hero-cta-row">`);

  out = out.replace(/<style>\s*\.atmosphere\{background:[\s\S]*?<\/style>/, '');
  out = out.replace('</head>', () => hubSchema(city, url, desc) + '\n<style>' + extraCss() + '</style>\n</head>');

  out = out.replace(/<div class="foot-col"><h4>[^<]*Pages<\/h4>[\s\S]*?<a href="reviews\.html">Reviews<\/a>\s*<\/div>/, footCol(city));

  return out.replace(/\bDuluth\b/g, city.name);
}

function wireHubFooters(html, city) {
  const s = city.slug;
  if (html.includes(sf(s, 'res'))) return html;
  return html.replace(
    /(<li><a href="[^"]*window-cleaning-[^"]*">Window Washing<\/a><\/li>)/,
    `$1\n      <li><a href="${sf(s, 'res')}">Residential Windows</a></li>\n      <li><a href="${sf(s, 'com')}">Commercial Windows</a></li>`
  );
}

function main() {
  const tpl = fs.readFileSync(path.join(SITE, 'window-cleaning-duluth.html'), 'utf8');
  const created = [];

  for (const city of CITIES) {
    const resFile = sf(city.slug, 'res');
    fs.writeFileSync(path.join(SITE, resFile), applySplitPage(tpl, city, 'res'));
    created.push(resFile);

    const comFile = sf(city.slug, 'com');
    fs.writeFileSync(path.join(SITE, comFile), applySplitPage(tpl, city, 'com'));
    created.push(comFile);

    const hubPath = path.join(SITE, sf(city.slug, 'hub'));
    fs.writeFileSync(hubPath, applyHubPage(fs.readFileSync(hubPath, 'utf8'), city));
  }

  const serviceRe = /^(soft-washing|concrete-washing|commercial-soft-washing|window-cleaning|deck-restoration|roof-soft-washing|gutter-fascia-cleaning|residential-window-cleaning|commercial-window-cleaning)-(.+)\.html$/;
  let footers = 0;
  for (const f of fs.readdirSync(SITE).filter(x => x.endsWith('.html'))) {
    const m = f.match(serviceRe);
    if (!m) continue;
    const city = CITIES.find(c => c.slug === m[2]);
    if (!city) continue;
    const fp = path.join(SITE, f);
    let html = fs.readFileSync(fp, 'utf8');
    const orig = html;
    html = html.replace(/<div class="foot-col"><h4>[^<]*Pages<\/h4>[\s\S]*?<a href="reviews\.html">Reviews<\/a>\s*<\/div>/, footCol(city));
    if (html !== orig) { fs.writeFileSync(fp, html); footers++; }
  }

  const hubFiles = ['index.html', ...CITIES.map(c => c.hubFile).filter((f, i, a) => a.indexOf(f) === i && f !== 'index.html')];
  for (const f of hubFiles) {
    const fp = path.join(SITE, f);
    if (!fs.existsSync(fp)) continue;
    const city = CITIES.find(c => c.hubFile === f) || CITIES[0];
    let html = wireHubFooters(fs.readFileSync(fp, 'utf8'), city);
    html = html.replace(
      /(<a class="btn btn--secondary" href=")window-cleaning-[^"]+(">See Our Work)/,
      `$1${sf(city.slug, 'res')}$2`
    );
    fs.writeFileSync(fp, html);
  }

  console.log(`Created ${created.length} window split pages (${CITIES.length} residential + ${CITIES.length} commercial)`);
  console.log(`Updated ${CITIES.length} window cleaning hub pages`);
  console.log(`Updated footers on ${footers} service pages`);
  console.log(`Wired ${hubFiles.length} city hub footers`);
  console.log('Run: node build-city-links.mjs && node build-sitemap.mjs');
}

main();
