// Sample Digiflazz price-list response, used when DIGIFLAZZ_USERNAME / API_KEY
// is not configured. Shape matches https://api.digiflazz.com/v1/price-list.

const make = (brand, items) =>
  items.map((it) => ({
    product_name: it.name,
    category: "Games",
    brand,
    type: "Umum",
    seller_name: "Demo Seller",
    price: it.price,
    buyer_sku_code: it.sku,
    buyer_product_status: true,
    seller_product_status: true,
    unlimited_stock: true,
    stock: 0,
    multi: false,
    start_cut_off: "00:00",
    end_cut_off: "23:59",
    desc: it.name,
  }));

export const MOCK_PRICE_LIST = [
  ...make("MOBILE LEGENDS", [
    { name: "86 Diamond", sku: "ML86", price: 22500 },
    { name: "172 Diamond", sku: "ML172", price: 44500 },
    { name: "257 Diamond", sku: "ML257", price: 66000 },
    { name: "344 Diamond", sku: "ML344", price: 88000 },
    { name: "706 Diamond", sku: "ML706", price: 175000 },
    { name: "Weekly Diamond Pass", sku: "MLWEEK", price: 28500 },
  ]),
  ...make("FREE FIRE", [
    { name: "70 Diamond", sku: "FF70", price: 11500 },
    { name: "140 Diamond", sku: "FF140", price: 22500 },
    { name: "355 Diamond", sku: "FF355", price: 55000 },
    { name: "720 Diamond", sku: "FF720", price: 110000 },
    { name: "Membership Mingguan", sku: "FFWEEK", price: 32500 },
  ]),
  ...make("PUBG MOBILE", [
    { name: "60 UC", sku: "PUBG60", price: 14500 },
    { name: "325 UC", sku: "PUBG325", price: 75000 },
    { name: "660 UC", sku: "PUBG660", price: 150000 },
    { name: "1800 UC", sku: "PUBG1800", price: 380000 },
  ]),
  ...make("GENSHIN IMPACT", [
    { name: "60 Genesis Crystal", sku: "GI60", price: 16500 },
    { name: "300 Genesis Crystal", sku: "GI300", price: 79000 },
    { name: "Blessing of the Welkin Moon", sku: "GIWELKIN", price: 79000 },
    { name: "980 Genesis Crystal", sku: "GI980", price: 248000 },
  ]),
  ...make("VALORANT", [
    { name: "125 Valorant Points", sku: "VP125", price: 16500 },
    { name: "420 Valorant Points", sku: "VP420", price: 49500 },
    { name: "700 Valorant Points", sku: "VP700", price: 79500 },
    { name: "1375 Valorant Points", sku: "VP1375", price: 149000 },
  ]),
  ...make("HONOR OF KINGS", [
    { name: "78 Token", sku: "HOK78", price: 22500 },
    { name: "390 Token", sku: "HOK390", price: 110000 },
    { name: "780 Token", sku: "HOK780", price: 215000 },
  ]),
  ...make("CALL OF DUTY MOBILE", [
    { name: "80 CP", sku: "CODM80", price: 14500 },
    { name: "400 CP", sku: "CODM400", price: 70000 },
    { name: "800 CP", sku: "CODM800", price: 140000 },
  ]),
  ...make("RAGNAROK M", [
    { name: "30 BCC", sku: "ROM30", price: 49000 },
    { name: "150 BCC", sku: "ROM150", price: 245000 },
    { name: "300 BCC", sku: "ROM300", price: 489000 },
  ]),
  ...make("POINT BLANK", [
    { name: "PB Cash 1.000", sku: "PB1K", price: 12500 },
    { name: "PB Cash 5.000", sku: "PB5K", price: 60500 },
    { name: "PB Cash 10.000", sku: "PB10K", price: 119500 },
  ]),
  ...make("LEAGUE OF LEGENDS WILD RIFT", [
    { name: "275 Wild Cores", sku: "WR275", price: 49000 },
    { name: "565 Wild Cores", sku: "WR565", price: 99000 },
    { name: "1180 Wild Cores", sku: "WR1180", price: 199000 },
  ]),
  ...make("STUMBLE GUYS", [
    { name: "65 Gems", sku: "SG65", price: 14500 },
    { name: "330 Gems", sku: "SG330", price: 65000 },
    { name: "700 Gems", sku: "SG700", price: 130000 },
  ]),
  ...make("ROBLOX", [
    { name: "100 Robux", sku: "RBX100", price: 17000 },
    { name: "400 Robux", sku: "RBX400", price: 65000 },
    { name: "800 Robux", sku: "RBX800", price: 130000 },
  ]),
];
