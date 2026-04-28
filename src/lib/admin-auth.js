export const ADMIN_PASSWORD_FALLBACK = "171202";

export function getAdminPassword() {
  return process.env.ADMIN_PASSWORD || ADMIN_PASSWORD_FALLBACK;
}

export function isAdminAuthorized(request) {
  const expected = getAdminPassword();
  if (!expected) return false;
  const header = request.headers.get("x-admin-password") || "";
  return header === expected;
}
