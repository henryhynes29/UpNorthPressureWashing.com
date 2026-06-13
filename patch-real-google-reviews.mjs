import fs from 'fs';
import path from 'path';

const SITE = path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1'));
const GBP_PROFILE = 'https://g.page/r/CSCaz34lDtneEBE';
const GBP_REVIEW = `${GBP_PROFILE}/review`;

const reviews = {
  soft: {
    text: 'We recently had the steel siding and trim on our home and garage power washed by Up North Pressure Washing. Henry did a thorough and complete job. He was punctual, easy to work with, and paid attention to details. In addition, the pricing was favorable. The siding looks like new!',
    author: 'Sandra Bailey',
    location: 'Duluth, MN',
  },
  concrete: {
    text: 'These guys are the best they do amazing work and are timely. Henry was a real amazing worker and made my concrete look amazing again. Will be using him more 5/5 stars',
    author: 'Jack Stephen',
    location: 'Duluth, MN',
  },
  window: {
    text: 'Great service! My windows are spotless, and the soft wash made my vinyl siding look like new again. Professional, reliable, and affordable. Highly recommend!',
    author: 'Mr Blue',
    location: 'Duluth, MN',
  },
  deck: {
    text: 'Henry was great to work with. Prompt, courteous and did an excellent job. Highly recommended for all your pressure washing needs.',
    author: 'Shevan Weerasinghe',
    location: 'Duluth, MN',
  },
  quick: {
    text: 'Henry is a hardworking young entrepreneur. This guy is dedicated to his craft and doing things the right way. I would trust Up North Pressure washing with any window or soft washing needs!',
    author: 'Michael Yuretich',
    location: 'Duluth, MN',
  },
  roof: {
    text: 'Henry did a great and through job last summer cleaning the algee off my siding and removing the moss from my roof.He was punctual and easy to work with.',
    author: 'Judah Bennett',
    location: 'Duluth, MN',
  },
  oxidation: {
    text: 'They did a great job cleaning my windows, and doing oxidation removal. Highly recommend!',
    author: 'Endaldren _',
    location: 'Duluth, MN',
  },
};

function escHtml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function reviewCard({ text, author, location }) {
  return {
    text: escHtml(text),
    author: `&#8212; ${escHtml(author)}, ${escHtml(location)}`,
  };
}

function patchHubReviews(html) {
  let out = html;
  const ordered = [reviews.soft, reviews.window, reviews.concrete, reviews.roof, reviews.deck].map(reviewCard);
  let index = 0;

  out = out.replace(/<a href="https:\/\/g\.page\/r\/CSCaz34lDtneEBE\/review" target="_blank" rel="noopener" class="g-review">/g,
    `<a href="${GBP_PROFILE}" target="_blank" rel="noopener" class="g-review" aria-label="Read this Google review for Up North Pressure Washing">`);

  out = out.replace(
    /<p class="g-review-text">&ldquo;[\s\S]*?&rdquo;<\/p>\s*<div class="g-reviewer">[\s\S]*?<\/div>/g,
    (match) => {
      const review = ordered[index % ordered.length];
      index++;
      return `<p class="g-review-text">&ldquo;${review.text}&rdquo;</p>\n      <div class="g-reviewer">${review.author}</div>`;
    }
  );

  out = out.replace(/<!-- TODO: replace href with your Google Business Profile reviews link -->\s*/g, '');
  out = out.replace(/★ Read &amp; Leave a Review on Google/g, '★ Read Reviews on Google');

  return out;
}

function patchGenericTestimonials(html) {
  let out = html;
  const replacements = [
    {
      textRe: /Our windows hadn(?:'|&apos;)t been cleaned in years[\s\S]*?Worth every penny in [^"<]*\.?/g,
      text: reviews.window.text,
      authorRe: /<strong>Local Homeowner<\/strong>|Local Homeowner/g,
      author: 'Mr Blue',
    },
    {
      textRe: /We needed storefront glass done before a busy weekend[\s\S]*?long time\.?/g,
      text: reviews.oxidation.text,
      authorRe: /<strong>Business Owner<\/strong>|Business Owner/g,
      author: 'Endaldren _',
    },
    {
      textRe: /Our storefront windows have never looked this clear[\s\S]*?business!?/g,
      text: reviews.window.text,
      authorRe: /<strong>Local Business Owner<\/strong>|Local Business Owner/g,
      author: 'Mr Blue',
    },
    {
      textRe: /Our weathered deck looks brand new[\s\S]*?Highly recommend!?/g,
      text: reviews.deck.text,
      authorRe: /Tyler S\./g,
      author: 'Shevan Weerasinghe',
    },
    {
      textRe: /They(?:'|&apos;)re the best\. Great work on my driveway, highly recommend and will be calling again soon!?/g,
      text: reviews.concrete.text,
      authorRe: /Jack S\./g,
      author: 'Jack Stephen',
    },
    {
      textRe: /Henry did an incredible job on our driveway and garage floor[\s\S]*?Highly recommend!?/g,
      text: reviews.concrete.text,
      authorRe: /Jim P\./g,
      author: 'Jack Stephen',
    },
  ];

  for (const item of replacements) {
    out = out.replace(item.textRe, escHtml(item.text));
    out = out.replace(item.authorRe, item.author);
  }

  out = out.replace(/href="https:\/\/g\.page\/r\/CSCaz34lDtneEBE\/review"/g, `href="${GBP_PROFILE}"`);
  out = out.replace(/★ Read &amp; Leave a Review on Google/g, '★ Read Reviews on Google');
  out = out.replace(
    /<blockquote class="quote">"Up North Pressure Washing is professional, efficient, and their commercial-grade equipment easily handled our storefront's heavy winter salt and grime — highly recommend for any [^"]+ business!"<\/blockquote>/g,
    `<a href="${GBP_PROFILE}" target="_blank" rel="noopener" class="g-review" aria-label="Read this Google review for Up North Pressure Washing">
      <div class="g-review-top"><span class="g-stars-row">&#9733;&#9733;&#9733;&#9733;&#9733;</span><span class="g-via">Google Review</span></div>
      <p class="g-review-text">&ldquo;${escHtml(reviews.quick.text)}&rdquo;</p>
      <div class="g-reviewer">&#8212; ${escHtml(reviews.quick.author)}, ${escHtml(reviews.quick.location)}</div>
    </a>`
  );

  return out;
}

let patched = 0;
for (const file of fs.readdirSync(SITE).filter((name) => name.endsWith('.html'))) {
  const fp = path.join(SITE, file);
  const before = fs.readFileSync(fp, 'utf8');
  let after = patchHubReviews(before);
  after = patchGenericTestimonials(after);

  if (after !== before) {
    fs.writeFileSync(fp, after);
    patched++;
  }
}

console.log(`Patched real Google reviews on ${patched} HTML files.`);
console.log(`GBP profile/read link: ${GBP_PROFILE}`);
console.log(`GBP leave-review link: ${GBP_REVIEW}`);
