import crypto from "node:crypto";

const BASE_URL = "https://api.digiflazz.com/v1";

function md5(value) {
  return crypto.createHash("md5").update(value).digest("hex");
}

function getCreds() {
  const username = process.env.DIGIFLAZZ_USERNAME || "";
  const apiKey = process.env.DIGIFLAZZ_API_KEY || "";
  const isProd = String(process.env.DIGIFLAZZ_PROD || "false").toLowerCase() === "true";
  return { username, apiKey, isProd };
}

export function isConfigured() {
  const { username, apiKey } = getCreds();
  return Boolean(username && apiKey);
}

export function sign(suffix) {
  const { username, apiKey } = getCreds();
  return md5(`${username}${apiKey}${suffix}`);
}

async function call(endpoint, body) {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    cache: "no-store",
  });
  const text = await res.text();
  let json;
  try {
    json = JSON.parse(text);
  } catch {
    throw new Error(`Digiflazz returned non-JSON (status ${res.status}): ${text.slice(0, 200)}`);
  }
  if (!res.ok) {
    throw new Error(`Digiflazz HTTP ${res.status}: ${text.slice(0, 200)}`);
  }
  return json;
}

export async function cekSaldo() {
  const { username } = getCreds();
  return call("/cek-saldo", {
    cmd: "deposit",
    username,
    sign: sign("depo"),
  });
}

export async function priceList({ category, brand, type, code } = {}) {
  const { username } = getCreds();
  const body = {
    cmd: "prepaid",
    username,
    sign: sign("pricelist"),
  };
  if (category) body.category = category;
  if (brand) body.brand = brand;
  if (type) body.type = type;
  if (code) body.code = code;
  return call("/price-list", body);
}

export async function topup({ buyerSkuCode, customerNo, refId, maxPrice, cbUrl, allowDot, testing }) {
  const { username, isProd } = getCreds();
  const body = {
    username,
    buyer_sku_code: buyerSkuCode,
    customer_no: customerNo,
    ref_id: refId,
    sign: sign(refId),
  };
  const useTesting = testing ?? !isProd;
  if (useTesting) body.testing = true;
  if (maxPrice) body.max_price = maxPrice;
  if (cbUrl) body.cb_url = cbUrl;
  if (allowDot) body.allow_dot = true;
  return call("/transaction", body);
}

export function verifyWebhook(rawBody, headerSignature) {
  const secret = process.env.DIGIFLAZZ_WEBHOOK_SECRET || "";
  if (!secret) return false;
  const h = crypto.createHmac("sha1", secret).update(rawBody).digest("hex");
  const expected = `sha1=${h}`;
  if (!headerSignature) return false;
  const a = Buffer.from(expected);
  const b = Buffer.from(headerSignature);
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}
