import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function getPassword() {
  return process.env.ADMIN_PASSWORD || "171202";
}

export async function POST(request) {
  let password = "";
  try {
    const body = await request.json();
    password = body?.password || "";
  } catch {
    password = request.headers.get("x-admin-password") || "";
  }
  const expected = getPassword();
  if (!expected) {
    return NextResponse.json({ ok: false, error: "ADMIN_PASSWORD belum di-set" }, { status: 503 });
  }
  if (password === expected) {
    return NextResponse.json({ ok: true });
  }
  return NextResponse.json({ ok: false, error: "wrong password" }, { status: 401 });
}
