export function stripHtml(html) {
  if (!html) return "";
  return html.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();
}

export function truncate(str, max = 2000) {
  if (!str || str.length <= max) return str;
  return str.slice(0, max) + "...[truncated]";
}

export async function callWP({ endpoint, method = "GET", body = null }) {
  const wpUrl = process.env.WP_URL;
  const username = process.env.WP_USERNAME;
  const appPassword = process.env.WP_APP_PASSWORD;

  if (!wpUrl || !username || !appPassword) {
    return { ok: false, status: 0, error: "WordPress credentials not configured." };
  }

  const url = `${wpUrl}/wp-json${endpoint}`;
  const auth = Buffer.from(`${username}:${appPassword}`).toString("base64");

  const headers = {
    Authorization: `Basic ${auth}`,
    "Content-Type": "application/json",
    "User-Agent": "PersuadablesHelper/1.0",
  };

  try {
    const opts = { method, headers };
    if (body && method !== "GET") {
      opts.body = JSON.stringify(body);
    }

    const res = await fetch(url, opts);
    let data;
    const contentType = res.headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
      data = await res.json();
    } else {
      data = await res.text();
    }

    if (!res.ok) {
      const errMsg = typeof data === "object" && data.message ? data.message : `HTTP ${res.status}`;
      return { ok: false, status: res.status, error: errMsg };
    }

    return { ok: true, status: res.status, data };
  } catch (err) {
    return { ok: false, status: 0, error: err.message || "Network error connecting to WordPress." };
  }
}
