const QUOTE_TO = process.env.QUOTE_EMAIL || 'Upnorthpressurewash@gmail.com';
const FROM = process.env.RESEND_FROM || 'Up North Website <onboarding@resend.dev>';

async function readJsonBody(req) {
  if (req.body) {
    if (typeof req.body === 'object') return req.body;
    if (typeof req.body === 'string' && req.body.trim()) return JSON.parse(req.body);
  }

  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', chunk => { data += chunk; });
    req.on('end', () => {
      try {
        resolve(data ? JSON.parse(data) : {});
      } catch (err) {
        reject(err);
      }
    });
    req.on('error', reject);
  });
}

function buildEmail(body) {
  const {
    first_name = '',
    last_name = '',
    email = '',
    phone = '',
    city = '',
    service = '',
    message = '',
    page = '',
  } = body;

  const name = [first_name, last_name].filter(Boolean).join(' ').trim() || 'Unknown';
  const subject = `Quote Request — ${name}${city ? ` (${city})` : ''}`;
  const text = [
    'New quote request — Up North Pressure Washing',
    '',
    `Page: ${page || 'website'}`,
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone || 'Not provided'}`,
    `City: ${city || 'Not provided'}`,
    `Service: ${service || 'Not specified'}`,
    '',
    message || '(No message provided)',
  ].join('\n');

  return { subject, text, replyTo: email || undefined };
}

async function sendViaResend({ subject, text, replyTo }) {
  const key = process.env.RESEND_API_KEY;
  if (!key) return { ok: false, error: 'RESEND_API_KEY not configured' };

  const payload = {
    from: FROM,
    to: [QUOTE_TO],
    subject,
    text,
  };
  if (replyTo) payload.reply_to = replyTo;

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const detail = await res.text();
    return { ok: false, error: detail || res.statusText };
  }
  return { ok: true };
}

async function sendViaWeb3Forms(body) {
  const key = process.env.WEB3FORMS_ACCESS_KEY;
  if (!key) return { ok: false, error: 'WEB3FORMS_ACCESS_KEY not configured' };

  const res = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      access_key: key,
      subject: `Quote Request — ${body.first_name || 'Website'}`,
      from_name: 'Up North Website',
      ...body,
    }),
  });

  const data = await res.json();
  if (!res.ok || !data.success) {
    return { ok: false, error: data.message || 'Web3Forms send failed' };
  }
  return { ok: true };
}

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    return res.end();
  }

  if (req.method === 'GET') {
    return res.status(200).json({ ok: true, service: 'quote-api' });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const body = await readJsonBody(req);

    if (body['bot-field']) return res.status(200).json({ ok: true });
    if (!body.first_name?.trim() || !body.email?.trim()) {
      return res.status(400).json({ error: 'First name and email are required.' });
    }

    const mail = buildEmail(body);
    let result = await sendViaResend(mail);
    if (!result.ok && process.env.WEB3FORMS_ACCESS_KEY) {
      result = await sendViaWeb3Forms(body);
    }
    if (!result.ok) {
      console.error('Quote email failed:', result.error);
      return res.status(500).json({
        error: 'Could not send quote request. Please call 218-576-8610.',
        detail: process.env.NODE_ENV === 'development' ? result.error : undefined,
      });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
};
