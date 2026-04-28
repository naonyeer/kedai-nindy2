export const ADMIN_PASSWORD_FALLBACK = "171202";

// Used only by the login check (/api/admin/check) — falls back to a default so
// the legacy hardcoded password keeps working when ADMIN_PASSWORD env is unset.
export function getAdminPassword() {
  return process.env.ADMIN_PASSWORD || ADMIN_PASSWORD_FALLBACK;
}

// Used by privileged endpoints (cek-saldo, transaction). Intentionally reads
// ADMIN_PASSWORD directly without fallback: when the env var is not set, any
// request is denied. This preserves the security-by-default behavior of the
// original per-route guards.
export function isAdminAuthorized(request) {
  const expected = process.env.ADMIN_PASSWORD || "";
  if (!expected) return false;
  const header = request.headers.get("x-admin-password") || "";
  return header === expected;
}
