// Curated catalog of game brands. We map Digiflazz `brand` (string) to a
// human-friendly slug, hero color and image. Anything in Digiflazz price-list
// that isn't in this map is still shown under "Lainnya".

export const GAMES = [
  {
    slug: "mobile-legends",
    digiflazzBrand: "MOBILE LEGENDS",
    name: "Mobile Legends",
    publisher: "Moonton",
    image:
      "https://play-lh.googleusercontent.com/Op7v9XdsyxjrKImMD5RLyiLRCAHs3DMQFANwfsuMTw1hq0lH4j8tOqD3Fd7zyr4ixmC0xoqqRkQDBjAd46NsFQ=w480-h960-rw",
    accent: "#7c3aed",
    fields: [
      { name: "user_id", label: "User ID", placeholder: "12345678", required: true },
      { name: "zone_id", label: "Zone ID", placeholder: "1234", required: true },
    ],
    customerNo: ({ user_id, zone_id }) => `${user_id}${zone_id}`,
    badge: "Terlaris",
  },
  {
    slug: "free-fire",
    digiflazzBrand: "FREE FIRE",
    name: "Free Fire",
    publisher: "Garena",
    image:
      "https://play-lh.googleusercontent.com/VxqoBX9loIqsESn5OPhXDLLYw8YFAlLJX3TJUb7ovyIQdRRWwGuG3jD9konTZAeWzd8VlVTDt8fkJ8BAEU4ZHQ=w480-h960-rw",
    accent: "#f97316",
    fields: [
      { name: "user_id", label: "Player ID", placeholder: "1234567890", required: true },
    ],
    customerNo: ({ user_id }) => user_id,
    badge: "Populer",
  },
  {
    slug: "pubg-mobile",
    digiflazzBrand: "PUBG MOBILE",
    name: "PUBG Mobile",
    publisher: "Tencent",
    image:
      "https://play-lh.googleusercontent.com/JRd05pyBH41qjgsJuWduRJpDeZG0Hnb0yjf2nWqO7VaGKL10-G5UIygxED-WNOc3pg=w480-h960-rw",
    accent: "#fbbf24",
    fields: [
      { name: "user_id", label: "Player ID", placeholder: "5xxxxxxxxx", required: true },
    ],
    customerNo: ({ user_id }) => user_id,
  },
  {
    slug: "genshin-impact",
    digiflazzBrand: "GENSHIN IMPACT",
    name: "Genshin Impact",
    publisher: "HoYoverse",
    image:
      "https://play-lh.googleusercontent.com/pIIPLp6AMSwivRf0oVMUL-xXn07p_sb4wzvWipJVfRs9Khe7JlcrFR62HYfw45uRA0Y=w480-h960-rw",
    accent: "#0ea5e9",
    fields: [
      { name: "user_id", label: "UID", placeholder: "8xxxxxxxx", required: true },
      { name: "server", label: "Server", placeholder: "Asia", required: true },
    ],
    customerNo: ({ user_id, server }) => `${user_id}|${server}`,
  },
  {
    slug: "valorant",
    digiflazzBrand: "VALORANT",
    name: "Valorant",
    publisher: "Riot Games",
    image:
      "https://play-lh.googleusercontent.com/7lyHRHBYZpv2g5EZ6bVZX4Ntu6AOjLm3ELKqLRgzTPtzN6Z2IyyChs3v-JqLg2MiWHU=w480-h960-rw",
    accent: "#ef4444",
    fields: [
      { name: "user_id", label: "Riot ID (Email/Username)", placeholder: "your.email@example.com", required: true },
    ],
    customerNo: ({ user_id }) => user_id,
  },
  {
    slug: "honor-of-kings",
    digiflazzBrand: "HONOR OF KINGS",
    name: "Honor of Kings",
    publisher: "TiMi Studio",
    image:
      "https://play-lh.googleusercontent.com/4nm9pP5w-8PcvmQ_KzD0MPRQA59UrEv-LbafEgg4vWsa3oiK7QM5mF2t7n5UR8jWLyc=w480-h960-rw",
    accent: "#22c55e",
    fields: [
      { name: "user_id", label: "User ID", placeholder: "12345678", required: true },
      { name: "zone_id", label: "Server ID", placeholder: "12345", required: true },
    ],
    customerNo: ({ user_id, zone_id }) => `${user_id}${zone_id}`,
  },
  {
    slug: "call-of-duty-mobile",
    digiflazzBrand: "CALL OF DUTY MOBILE",
    name: "Call of Duty Mobile",
    publisher: "Activision",
    image:
      "https://play-lh.googleusercontent.com/JBLmZpL85svPBUEmoKbQtEnTibd_iSqBSNSeZHxXtdWi6Da5Bs5KjB2ivAmF9yVAW1qO=w480-h960-rw",
    accent: "#475569",
    fields: [
      { name: "user_id", label: "Open ID", placeholder: "65xxxxxxxxxxxxxxxx", required: true },
    ],
    customerNo: ({ user_id }) => user_id,
  },
  {
    slug: "ragnarok-m",
    digiflazzBrand: "RAGNAROK M",
    name: "Ragnarok M",
    publisher: "Gravity",
    image:
      "https://play-lh.googleusercontent.com/Hv9DJSHa8WHU6XRbYnwL0uOsKzjsr9F3bBQvE3nwDP0DqLwDvJhjr-TlHKkFn7gZkA=w480-h960-rw",
    accent: "#a855f7",
    fields: [
      { name: "user_id", label: "Game ID", placeholder: "1234567", required: true },
    ],
    customerNo: ({ user_id }) => user_id,
  },
  {
    slug: "point-blank",
    digiflazzBrand: "POINT BLANK",
    name: "Point Blank",
    publisher: "Zepetto",
    image:
      "https://play-lh.googleusercontent.com/WiIybIpwDYAGSXqzxr2Ywh2nUM5Q6ws6ko9R7vwHcK1bM3Y5mpjuw5KHN3JhYwhPnvI=w480-h960-rw",
    accent: "#dc2626",
    fields: [
      { name: "user_id", label: "Username PB", placeholder: "username", required: true },
    ],
    customerNo: ({ user_id }) => user_id,
  },
  {
    slug: "league-of-legends-wild-rift",
    digiflazzBrand: "LEAGUE OF LEGENDS WILD RIFT",
    name: "Wild Rift",
    publisher: "Riot Games",
    image:
      "https://play-lh.googleusercontent.com/vL4cZOWfrUNTQtV-sR_y3W7-q9Ek0qMPmJBcRjFZ6jD9bMdVxKjmQEKQXmvP3UsJWg=w480-h960-rw",
    accent: "#0284c7",
    fields: [
      { name: "user_id", label: "Riot ID", placeholder: "Username#TAG", required: true },
    ],
    customerNo: ({ user_id }) => user_id,
  },
  {
    slug: "stumble-guys",
    digiflazzBrand: "STUMBLE GUYS",
    name: "Stumble Guys",
    publisher: "Kitka Games",
    image:
      "https://play-lh.googleusercontent.com/Pi2YcLpIgoa-7aRRzgsIO85tHZJqq4FRk4MBQa-BzOZJRzeWznzZqqdkv3DoFNlLqg=w480-h960-rw",
    accent: "#ec4899",
    fields: [
      { name: "user_id", label: "User ID", placeholder: "user-id", required: true },
    ],
    customerNo: ({ user_id }) => user_id,
  },
  {
    slug: "roblox",
    digiflazzBrand: "ROBLOX",
    name: "Roblox",
    publisher: "Roblox Corp",
    image:
      "https://play-lh.googleusercontent.com/WNWZaxi9RdJKe34qZfpKxFfBkrwT_lmJxNKhlcWyy55r2eVPAXM6f6npTdjFLcJxIA=w480-h960-rw",
    accent: "#16a34a",
    fields: [
      { name: "user_id", label: "Username Roblox", placeholder: "username", required: true },
    ],
    customerNo: ({ user_id }) => user_id,
  },
];

export function getGameBySlug(slug) {
  return GAMES.find((g) => g.slug === slug);
}

export function getGameByDigiflazzBrand(brand) {
  if (!brand) return null;
  const upper = String(brand).toUpperCase().trim();
  return GAMES.find((g) => g.digiflazzBrand.toUpperCase() === upper) || null;
}
