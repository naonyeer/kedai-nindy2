import { NextResponse } from "next/server";
import { getAdminPassword } from "@/lib/admin-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request) {
  let password = "";
  try {
    const body = await request.json();
    password = body?.password || "";
  } catch {
    password = request.headers.get("x-admin-password") || "";
  }
  const expected = getAdminPassword();
  if (!expected) {
    return NextResponse.json({ ok: false, error: "ADMIN_PASSWORD belum di-set" }, { status: 503 });
  }
  if (password === expected) {
    return NextResponse.json({ ok: true });
  }
  return NextResponse.json({ ok: false, error: "wrong password" }, { status: 401 });
}
