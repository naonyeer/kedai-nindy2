import { NextResponse } from "next/server";
import { cekSaldo, isConfigured } from "@/lib/digiflazz";
import { isAdminAuthorized } from "@/lib/admin-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request) {
  if (!isAdminAuthorized(request)) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }
  if (!isConfigured()) {
    return NextResponse.json(
      { ok: false, error: "DIGIFLAZZ_USERNAME / DIGIFLAZZ_API_KEY belum di-set" },
      { status: 503 },
    );
  }
  try {
    const json = await cekSaldo();
    return NextResponse.json({ ok: true, deposit: json?.data?.deposit ?? null });
  } catch (err) {
    return NextResponse.json({ ok: false, error: err.message }, { status: 502 });
  }
}
