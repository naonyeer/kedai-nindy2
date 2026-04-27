import { NextResponse } from "next/server";
import { verifyWebhook } from "@/lib/digiflazz";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request) {
  const raw = await request.text();
  const sig = request.headers.get("x-hub-signature") || "";
  if (!verifyWebhook(raw, sig)) {
    return NextResponse.json({ ok: false, error: "invalid signature" }, { status: 401 });
  }
  let payload;
  try {
    payload = JSON.parse(raw);
  } catch {
    return NextResponse.json({ ok: false, error: "invalid JSON" }, { status: 400 });
  }
  console.log("[digiflazz webhook]", JSON.stringify(payload?.data ?? payload));
  return NextResponse.json({ ok: true });
}
