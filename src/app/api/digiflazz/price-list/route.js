import { NextResponse } from "next/server";
import { isConfigured, priceList } from "@/lib/digiflazz";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

let cache = { at: 0, payload: null };
const TTL_MS = 30 * 60 * 1000;

export async function GET(request) {
  const url = new URL(request.url);
  const force = url.searchParams.get("refresh") === "1";
  const category = url.searchParams.get("category") || undefined;
  const brand = url.searchParams.get("brand") || undefined;
  const type = url.searchParams.get("type") || undefined;

  if (!isConfigured()) {
    return NextResponse.json(
      {
        ok: false,
        error: "DIGIFLAZZ_USERNAME / DIGIFLAZZ_API_KEY belum di-set",
        data: [],
      },
      { status: 503 },
    );
  }

  const cacheable = !category && !brand && !type;
  if (!force && cacheable && cache.payload && Date.now() - cache.at < TTL_MS) {
    return NextResponse.json({ ok: true, cached: true, ...cache.payload });
  }

  try {
    const json = await priceList({ category, brand, type });
    const payload = { data: json?.data ?? [] };
    if (cacheable) cache = { at: Date.now(), payload };
    return NextResponse.json({ ok: true, cached: false, ...payload });
  } catch (err) {
    return NextResponse.json({ ok: false, error: err.message, data: [] }, { status: 502 });
  }
}
