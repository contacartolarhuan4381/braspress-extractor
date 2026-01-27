function unique(arr) {
  return [...new Set((arr || []).map((s) => (s || "").trim()).filter(Boolean))];
}

function extractEmails(html) {
  const re = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi;
  return unique(html.match(re) || []);
}

function extractPhones(html) {
  // Pega formatos comuns BR: (11) 99999-9999, 11 99999-9999, +55 11 99999-9999 etc.
  const re =
    /(\+?55\s?)?(\(?\d{2}\)?\s?)?(\d{4,5}[-\s]?\d{4})/g;
  const matches = html.match(re) || [];
  return unique(matches);
}

async function fetchWithTimeout(url, ms = 15000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), ms);

  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome Safari",
      },
    });

    const text = await res.text();
    return text;
  } finally {
    clearTimeout(id);
  }
}

async function tryFetchMany(urls) {
  for (const url of urls) {
    try {
      const html = await fetchWithTimeout(url, 15000);
      if (html && html.length > 100) return { ok: true, url, html };
    } catch {}
  }
  return { ok: false, url: "", html: "" };
}

function buildCandidateUrls(baseUrl) {
  const u = new URL(baseUrl);
  const origin = u.origin;

  // tenta páginas comuns
  return unique([
    baseUrl,
    origin + "/contato",
    origin + "/contact",
    origin + "/sobre",
    origin + "/about",
  ]);
}

module.exports = async function scrapeSite(websiteUrl) {
  try {
    const urls = buildCandidateUrls(websiteUrl);
    const { ok, html } = await tryFetchMany(urls);

    if (!ok) return { emails: [], phones: [] };

    const emails = extractEmails(html);
    const phones = extractPhones(html);

    return { emails, phones };
  } catch {
    return { emails: [], phones: [] };
  }
};