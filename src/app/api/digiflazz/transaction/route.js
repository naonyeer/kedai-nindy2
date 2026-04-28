import { NextResponse } from "next/server";
import { isConfigured, topup } from "@/lib/digiflazz";
import { isAdminAuthorized } from "@/lib/admin-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request) {
  if (!isAdminAuthorized(request)) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }
  if (!isConfigured()) {
    return NextResponse.json(
      { ok: false, error: "DIGIFLAZZ_USERNAME / DIGIFLAZZ_API_KEY belum di-set" },
      { status: 503 },
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid JSON body" }, { status: 400 });
  }

  const buyerSkuCode = body?.buyer_sku_code;
  const customerNo = body?.customer_no;
  const refId = body?.ref_id || `kg-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  if (!buyerSkuCode || !customerNo) {
    return NextResponse.json(
      { ok: false, error: "buyer_sku_code & customer_no wajib" },
      { status: 400 },
    );
  }

  try {
    const json = await topup({
      buyerSkuCode,
      customerNo,
      refId,
      maxPrice: body?.max_price,
      cbUrl: body?.cb_url,
      allowDot: body?.allow_dot,
      testing: body?.testing,
    });
    return NextResponse.json({ ok: true, ref_id: refId, result: json?.data ?? null });
  } catch (err) {
    return NextResponse.json({ ok: false, error: err.message, ref_id: refId }, { status: 502 });
  }
}
