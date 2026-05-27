import fs from 'fs';
import path from 'path';
import { spawnSync } from 'child_process';
import {
  DOMAIN,
  loadCities,
  detectCityFromFile,
} from './city-links.mjs';

const SITE = path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1'));
const CITIES = loadCities();
const BRAND = 'Up North Pressure Washing';
const PHONE = '218-576-8610';
const PHONE_TEL = '+12185768610';
const GOOGLE_REVIEW = 'https://g.page/r/CSCaz34lDtneEBE/review';
const LOGO = `${DOMAIN}/images/hero-bg.jpg`;
const DEFAULT_OG = `${DOMAIN}/images/hero-bg.jpg`;

const stats = {
  patched: 0,
  globalSchema: 0,
  hubGraph: 0,
  blogUpgrade: 0,
  metaFilled: 0,
  dedupedCrumbs: 0,
  deferred: 0,
};

function pageUrl(file) {
  return file === 'index.html' ? `${DOMAIN}/` : `${DOMAIN}/${file}`;
}

function meta(html, name) {
  const m = html.match(new RegExp(`<meta name="${name}" content="([^"]*)">`));
  return m ? m[1] : '';
}

function title(html) {
  return (html.match(/<title>([^<]*)<\/title>/) || [])[1] || '';
}

function areaServedList(city) {
  const names = [city.name, ...city.nearby.slice(0, 5)];
  return [...new Set(names)].map(n => ({
    '@type': 'City',
    name: n.includes(',') ? n : `${n}, ${city.state}`,
  }));
}

function globalSchemaScript() {
  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${DOMAIN}/#website`,
        url: `${DOMAIN}/`,
        name: BRAND,
        inLanguage: 'en-US',
        publisher: { '@id': `${DOMAIN}/#organization` },
      },
      {
        '@type': 'Organization',
        '@id': `${DOMAIN}/#organization`,
        name: BRAND,
        url: `${DOMAIN}/`,
        logo: { '@type': 'ImageObject', url: LOGO },
        telephone: PHONE_TEL,
        sameAs: [GOOGLE_REVIEW],
      },
    ],
  };
  return `<!-- SITE-SEO-GLOBAL -->\n<script type="application/ld+json">\n${JSON.stringify(graph)}\n</script>`;
}

function hubGraphScript(city, pageTitle, description, file) {
  const url = pageUrl(file);
  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${DOMAIN}/#website`,
        url: `${DOMAIN}/`,
        name: BRAND,
        inLanguage: 'en-US',
        publisher: { '@id': `${DOMAIN}/#organization` },
      },
      {
        '@type': 'Organization',
        '@id': `${DOMAIN}/#organization`,
        name: BRAND,
        url: `${DOMAIN}/`,
        logo: { '@type': 'ImageObject', url: LOGO },
        telephone: PHONE_TEL,
        sameAs: [GOOGLE_REVIEW],
      },
      {
        '@type': ['LocalBusiness', 'HomeAndConstructionBusiness'],
        '@id': `${DOMAIN}/#business`,
        name: BRAND,
        url: `${DOMAIN}/`,
        telephone: PHONE_TEL,
        priceRange: '$$',
        image: DEFAULT_OG,
        geo: { '@type': 'GeoCoordinates', latitude: city.lat, longitude: city.lng },
        address: {
          '@type': 'PostalAddress',
          addressLocality: city.name,
          addressRegion: city.state,
          postalCode: city.zip,
          addressCountry: 'US',
        },
        areaServed: areaServedList(city),
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '5',
          reviewCount: '20',
          bestRating: '5',
        },
        sameAs: [GOOGLE_REVIEW],
      },
      {
        '@type': 'WebPage',
        '@id': `${url}#webpage`,
        url,
        name: pageTitle,
        description,
        isPartOf: { '@id': `${DOMAIN}/#website` },
        about: { '@id': `${DOMAIN}/#business` },
        inLanguage: 'en-US',
        primaryImageOfPage: { '@type': 'ImageObject', url: DEFAULT_OG },
      },
    ],
  };
  return `<!-- SITE-SEO-HUB -->\n<script type="application/ld+json">\n${JSON.stringify(graph)}\n</script>`;
}

function serviceWebPageScript(file, city, pageTitle, description, serviceName, ogImage) {
  const url = pageUrl(file);
  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${url}#webpage`,
        url,
        name: pageTitle,
        description,
        isPartOf: { '@id': `${DOMAIN}/#website` },
        about: {
          '@type': 'Service',
          name: serviceName,
          provider: { '@id': `${DOMAIN}/#business` },
          areaServed: { '@type': 'City', name: `${city.name}, ${city.state}` },
        },
        inLanguage: 'en-US',
        primaryImageOfPage: { '@type': 'ImageObject', url: ogImage },
      },
    ],
  };
  return `<!-- SITE-SEO-PAGE -->\n<script type="application/ld+json">\n${JSON.stringify(graph)}\n</script>`;
}

function defaultOgImage(file) {
  if (file.includes('window')) return `${DOMAIN}/images/window-res-after.jpg`;
  if (file.includes('deck')) return `${DOMAIN}/images/deck-after.jpg`;
  if (file.includes('concrete')) return `${DOMAIN}/images/concrete-after.jpg`;
  if (file.includes('commercial')) return `${DOMAIN}/images/commercial-after.jpg`;
  if (file.includes('soft-washing') || file.includes('roof-soft') || file.includes('gutter-fascia')) {
    return `${DOMAIN}/images/ba/hero-after.jpg`;
  }
  if (file.startsWith('blog-')) return `${DOMAIN}/images/ba/hero-after.jpg`;
  return DEFAULT_OG;
}

function serviceLabel(file) {
  if (file.startsWith('soft-washing-')) return 'Soft Washing';
  if (file.startsWith('roof-soft-washing-')) return 'Roof Cleaning';
  if (file.startsWith('gutter-fascia-cleaning-')) return 'Gutter Cleaning';
  if (file.startsWith('concrete-washing-')) return 'Concrete Pressure Washing';
  if (file.startsWith('deck-restoration-')) return 'Deck Restoration';
  if (file.startsWith('residential-window-cleaning-')) return 'Residential Window Cleaning';
  if (file.startsWith('commercial-window-cleaning-')) return 'Commercial Window Cleaning';
  if (file.startsWith('window-cleaning-')) return 'Window Cleaning';
  if (file.startsWith('commercial-soft-washing-')) return 'Commercial Soft Washing';
  return 'Exterior Cleaning';
}

function isHub(file, city) {
  return city && city.hubFile === file;
}

function isServicePage(file) {
  return /^(soft-washing|concrete-washing|commercial-soft-washing|window-cleaning|deck-restoration|roof-soft-washing|gutter-fascia-cleaning|residential-window-cleaning|commercial-window-cleaning)-/.test(file);
}

function insertBeforeHeadClose(html, snippet) {
  return html.replace(/<\/head>/i, () => `${snippet}\n</head>`);
}

function stripMarkers(html) {
  return html
    .replace(/<!-- SITE-SEO-GLOBAL -->[\s\S]*?<\/script>\s*/g, '')
    .replace(/<!-- SITE-SEO-HUB -->[\s\S]*?<\/script>\s*/g, '')
    .replace(/<!-- SITE-SEO-PAGE -->[\s\S]*?<\/script>\s*/g, '')
    .replace(/<!-- SITE-SEO-BLOG -->[\s\S]*?<\/script>\s*/g, '')
    .replace(/<!-- SITE-SEO-REVIEWS -->[\s\S]*?<\/script>\s*/g, '')
    .replace(/<!-- SITE-SEO-REVIEWS-PAGE -->[\s\S]*?<\/script>\s*/g, '');
}

function dedupeBreadcrumbs(html) {
  const matches = [...html.matchAll(/<script type="application\/ld\+json">\s*(\{[\s\S]*?\})\s*<\/script>/g)];
  let breadcrumbCount = 0;
  for (const m of matches) {
    try {
      const data = JSON.parse(m[1]);
      if (data['@type'] === 'BreadcrumbList') breadcrumbCount++;
      if (data['@graph']) {
        for (const node of data['@graph']) {
          if (node['@type'] === 'BreadcrumbList') breadcrumbCount++;
        }
      }
    } catch { /* skip */ }
  }
  if (breadcrumbCount <= 1) return html;

  let seen = 0;
  return html.replace(/<script type="application\/ld\+json">\s*(\{[\s\S]*?\})\s*<\/script>/g, (full, json) => {
    try {
      const data = JSON.parse(json);
      if (data['@type'] === 'BreadcrumbList') {
        seen++;
        if (seen > 1) {
          stats.dedupedCrumbs++;
          return '';
        }
      }
    } catch { /* keep */ }
    return full;
  });
}

function ensureUniversalHead(html, file, city) {
  let out = html;
  let changed = false;

  if (!out.includes('lang="en-US"')) {
    out = out.replace(/<html lang="en">/, '<html lang="en-US">');
    changed = true;
  }

  if (!out.includes('name="robots"')) {
    out = out.replace(
      '<meta charset',
      '<meta name="robots" content="index,follow,max-image-preview:large">\n<meta charset'
    );
    changed = true;
  } else if (!out.includes('max-image-preview')) {
    out = out.replace(
      /<meta name="robots" content="[^"]*">/,
      '<meta name="robots" content="index,follow,max-image-preview:large">'
    );
    changed = true;
  }

  if (!out.includes('rel="canonical"')) {
    out = insertBeforeHeadClose(out, `<link rel="canonical" href="${pageUrl(file)}">`);
    changed = true;
  }

  const headExtras = [];
  if (!out.includes('theme-color')) {
    headExtras.push('<meta name="theme-color" content="#0c1824">');
  }
  if (!out.includes('format-detection')) {
    headExtras.push('<meta name="format-detection" content="telephone=yes">');
  }
  if (!out.includes('rel="sitemap"')) {
    headExtras.push(`<link rel="sitemap" type="application/xml" title="Sitemap" href="${DOMAIN}/sitemap.xml">`);
  }
  if (!out.includes('og:locale')) {
    headExtras.push('<meta property="og:locale" content="en_US">');
  }
  if (!out.includes('og:site_name')) {
    headExtras.push(`<meta property="og:site_name" content="${BRAND}">`);
  }
  if (!out.includes('twitter:card')) {
    headExtras.push('<meta name="twitter:card" content="summary_large_image">');
  }
  if (!out.includes('dns-prefetch')) {
    headExtras.push('<link rel="dns-prefetch" href="https://fonts.googleapis.com">');
    headExtras.push('<link rel="dns-prefetch" href="https://fonts.gstatic.com">');
  }

  if (city && !out.includes('geo.position')) {
    headExtras.push(`<meta name="geo.position" content="${city.lat};${city.lng}">`);
    headExtras.push(`<meta name="ICBM" content="${city.lat}, ${city.lng}">`);
  }

  const t = title(out);
  const d = meta(out, 'description');
  const og = defaultOgImage(file);
  const url = pageUrl(file);

  if (!out.includes('property="og:title"') && t) {
    headExtras.push(`<meta property="og:title" content="${t.replace(/"/g, '&quot;')}">`);
  }
  if (!out.includes('property="og:description"') && d) {
    headExtras.push(`<meta property="og:description" content="${d.replace(/"/g, '&quot;')}">`);
  }
  if (!out.includes('property="og:url"')) {
    headExtras.push(`<meta property="og:url" content="${url}">`);
  }
  if (!out.includes('property="og:image"')) {
    headExtras.push(`<meta property="og:image" content="${og}">`);
  }
  if (!out.includes('twitter:title') && t) {
    headExtras.push(`<meta name="twitter:title" content="${t.replace(/"/g, '&quot;')}">`);
  }
  if (!out.includes('twitter:description') && d) {
    headExtras.push(`<meta name="twitter:description" content="${d.replace(/"/g, '&quot;')}">`);
  }
  if (!out.includes('twitter:image')) {
    headExtras.push(`<meta name="twitter:image" content="${og}">`);
  }

  const ogImageMatch = out.match(/<meta property="og:image" content="([^"]*)">/);
  if (ogImageMatch) {
    const ogImg = ogImageMatch[1];
    const twMatch = out.match(/<meta name="twitter:image" content="([^"]*)">/);
    if (twMatch && twMatch[1] !== ogImg) {
      out = out.replace(
        /<meta name="twitter:image" content="[^"]*">/,
        `<meta name="twitter:image" content="${ogImg}">`
      );
      changed = true;
    }
  }

  if (headExtras.length) {
    out = insertBeforeHeadClose(out, headExtras.join('\n'));
    changed = true;
    stats.metaFilled++;
  }

  return changed ? out : html;
}

function blogTagFromHtml(html) {
  const eyebrow = html.match(/class="eyebrow"[\s\S]*?·\s*([^<]+)/);
  return eyebrow ? eyebrow[1].trim() : 'Exterior Cleaning';
}

function buildBlogPostingSchema(html, file, city) {
  const url = pageUrl(file);
  const headline = (html.match(/<h1>([^<]*)<\/h1>/) || [])[1]
    || title(html).replace(/\s*\|\s*Up North Pressure Washing$/, '');
  const description = meta(html, 'description');
  const imageMatch = html.match(/<meta property="og:image" content="([^"]*)">/);
  const image = imageMatch ? imageMatch[1] : defaultOgImage(file);
  const pubMatch = html.match(/property="article:published_time" content="([^"]*)">/);
  const modMatch = html.match(/property="article:modified_time" content="([^"]*)">/);
  const tag = blogTagFromHtml(html);
  const cityName = city ? `${city.name}, ${city.state}` : meta(html, 'geo.placename');

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline,
    description,
    datePublished: pubMatch ? pubMatch[1] : '2026-05-01',
    dateModified: modMatch ? modMatch[1] : '2026-05-25',
    inLanguage: 'en-US',
    author: { '@type': 'Organization', '@id': `${DOMAIN}/#organization`, name: BRAND },
    publisher: {
      '@type': 'Organization',
      '@id': `${DOMAIN}/#organization`,
      name: BRAND,
      logo: { '@type': 'ImageObject', url: LOGO },
    },
    image,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    isPartOf: { '@id': `${DOMAIN}/#website` },
    about: {
      '@type': 'Service',
      name: tag,
      areaServed: cityName ? { '@type': 'City', name: cityName } : undefined,
    },
  };
}

function upgradeBlog(html, file, city) {
  if (!file.startsWith('blog-')) return html;
  let out = html;

  if (!out.includes('property="og:type"')) {
    out = insertBeforeHeadClose(out, '<meta property="og:type" content="article">');
  }

  const jsonMatch = out.match(/<!-- SITE-SEO-BLOG -->[\s\S]*?<\/script>|(<script type="application\/ld\+json">\s*(\{[\s\S]*?"@type":"BlogPosting"[\s\S]*?\})\s*<\/script>)/);
  if (jsonMatch) {
    try {
      const raw = jsonMatch[0].includes('SITE-SEO-BLOG')
        ? jsonMatch[0].match(/\{[\s\S]*\}/)[0]
        : jsonMatch[2];
      const data = JSON.parse(raw);
      data.inLanguage = 'en-US';
      data.author = { '@type': 'Organization', '@id': `${DOMAIN}/#organization`, name: BRAND };
      data.publisher = {
        '@type': 'Organization',
        '@id': `${DOMAIN}/#organization`,
        name: BRAND,
        logo: { '@type': 'ImageObject', url: LOGO },
      };
      data.isPartOf = { '@id': `${DOMAIN}/#website` };
      const upgraded = `<!-- SITE-SEO-BLOG -->\n<script type="application/ld+json">\n${JSON.stringify(data)}\n</script>`;
      out = out.replace(jsonMatch[0], upgraded);
      stats.blogUpgrade++;

      if (data.datePublished && !out.includes('article:published_time')) {
        out = insertBeforeHeadClose(out, `<meta property="article:published_time" content="${data.datePublished}">`);
      }
      if (data.dateModified && !out.includes('article:modified_time')) {
        out = insertBeforeHeadClose(out, `<meta property="article:modified_time" content="${data.dateModified}">`);
      }
    } catch { /* keep original */ }
  } else {
    const data = buildBlogPostingSchema(out, file, city);
    if (!out.includes('article:published_time')) {
      out = insertBeforeHeadClose(out, `<meta property="article:published_time" content="${data.datePublished}">`);
    }
    if (!out.includes('article:modified_time')) {
      out = insertBeforeHeadClose(out, `<meta property="article:modified_time" content="${data.dateModified}">`);
    }
    const block = `<!-- SITE-SEO-BLOG -->\n<script type="application/ld+json">\n${JSON.stringify(data)}\n</script>`;
    out = insertBeforeHeadClose(out, block);
    stats.blogUpgrade++;
  }

  return out;
}

function upgradeReviews(html, file) {
  if (file !== 'reviews.html') return html;
  if (!html.includes('"@type":"LocalBusiness"') && !html.includes('"@type": "LocalBusiness"')) return html;

  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${DOMAIN}/reviews.html#webpage`,
        url: `${DOMAIN}/reviews.html`,
        name: title(html),
        description: meta(html, 'description'),
        isPartOf: { '@id': `${DOMAIN}/#website` },
        about: { '@id': `${DOMAIN}/#business` },
        inLanguage: 'en-US',
      },
    ],
  };

  let out = html.replace(
    /<script type="application\/ld\+json">\s*\{[\s\S]*?"@type":"LocalBusiness"[\s\S]*?<\/script>/,
    (block) => {
      try {
        const json = block.match(/\{[\s\S]*\}/)[0];
        const data = JSON.parse(json);
        data['@id'] = `${DOMAIN}/#business`;
        return `<!-- SITE-SEO-REVIEWS -->\n<script type="application/ld+json">\n${JSON.stringify(data)}\n</script>`;
      } catch {
        return block;
      }
    }
  );

  if (!out.includes('SITE-SEO-REVIEWS-PAGE')) {
    out = insertBeforeHeadClose(out, `<!-- SITE-SEO-REVIEWS-PAGE -->\n<script type="application/ld+json">\n${JSON.stringify(graph)}\n</script>`);
  }
  return out;
}

function deferHeavyScripts(html) {
  if (html.includes('<script defer>\nconst IMGDATA') || html.includes('<script defer>\r\nconst IMGDATA')) {
    return html;
  }
  const next = html.replace(/\n<script>\nconst IMGDATA/, '\n<script defer>\nconst IMGDATA');
  if (next !== html) stats.deferred++;
  return next;
}

function injectGlobalSchema(html) {
  if (html.includes('#website') && html.includes('#organization')) return html;
  stats.globalSchema++;
  return insertBeforeHeadClose(html, globalSchemaScript());
}

function injectHubSchema(html, city, file) {
  const t = title(html);
  const d = meta(html, 'description');
  const hubBlock = hubGraphScript(city, t, d, file);
  let out = html.replace(
    /<!-- SITE-SEO-HUB -->[\s\S]*?<\/script>\s*/g,
    ''
  ).replace(
    /<script type="application\/ld\+json">\s*\{[\s\S]*?"@type"\s*:\s*"HomeAndConstructionBusiness"[\s\S]*?<\/script>\s*/g,
    ''
  ).replace(
    /<script type="application\/ld\+json">\s*\{[\s\S]*?"@type"\s*:\s*\[[^\]]*HomeAndConstructionBusiness[\s\S]*?<\/script>\s*/g,
    ''
  );
  stats.hubGraph++;
  return insertBeforeHeadClose(out, hubBlock);
}

function injectServicePageSchema(html, file, city) {
  if (html.includes('@graph') && html.includes('#webpage')) return html;
  if (html.includes('SITE-SEO-PAGE')) return html;
  const t = title(html);
  const d = meta(html, 'description');
  const svc = serviceLabel(file);
  const og = defaultOgImage(file);
  const block = serviceWebPageScript(file, city, t, d, svc, og);
  return insertBeforeHeadClose(html, block);
}

function patchFile(file) {
  const fp = path.join(SITE, file);
  let html = fs.readFileSync(fp, 'utf8');
  const orig = html;
  const city = detectCityFromFile(file, CITIES);

  html = stripMarkers(html);
  html = ensureUniversalHead(html, file, city);
  html = dedupeBreadcrumbs(html);
  html = upgradeBlog(html, file, city);
  html = upgradeReviews(html, file);
  html = deferHeavyScripts(html);

  if (isHub(file, city)) {
    html = injectHubSchema(html, city, file);
  } else if (isServicePage(file) && city) {
    html = injectGlobalSchema(html);
    if (!html.includes('"@graph"') || !html.includes('#webpage')) {
      html = injectServicePageSchema(html, file, city);
    }
  } else if (file.startsWith('blog-') || ['reviews.html', 'gallery.html', 'faq.html', 'blog-index.html'].includes(file)) {
    html = injectGlobalSchema(html);
  } else if (city) {
    html = injectGlobalSchema(html);
  }

  if (html !== orig) {
    fs.writeFileSync(fp, html);
    stats.patched++;
  }
}

for (const file of fs.readdirSync(SITE).filter(f => f.endsWith('.html'))) {
  patchFile(file);
}

spawnSync('node', ['build-sitemap.mjs'], { cwd: SITE, stdio: 'inherit' });

console.log('Site-wide SEO pass complete:');
console.log(`  Pages patched: ${stats.patched}`);
console.log(`  Global WebSite+Organization schema: ${stats.globalSchema}`);
console.log(`  City hub @graph upgrades: ${stats.hubGraph}`);
console.log(`  Blog schema upgrades: ${stats.blogUpgrade}`);
console.log(`  Meta stacks filled: ${stats.metaFilled}`);
console.log(`  Duplicate breadcrumbs removed: ${stats.dedupedCrumbs}`);
console.log(`  Deferred slider scripts: ${stats.deferred}`);
