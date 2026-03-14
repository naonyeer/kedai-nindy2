// ============================================
// KEDAI NINDY - Data Produk
// File ini berisi semua data produk toko.
// Dihasilkan otomatis oleh Admin Panel pada 13/3/2026, 12.11.54
// ============================================

const DEFAULT_PRODUCTS = [
  { id: 1, name: "Beras Premium 5kg", price: 65000, category: "beras", mainCat: "jualan", emoji: "🍚", desc: "Beras pulen kualitas terbaik", badge: "Best Seller" },
  { id: 2, name: "Beras Medium 5kg", price: 55000, category: "beras", mainCat: "jualan", emoji: "🍚", desc: "Beras sehari-hari harga terjangkau" },
  { id: 3, name: "Beras Merah 1kg", price: 22000, category: "beras", mainCat: "jualan", emoji: "🌾", desc: "Beras merah organik sehat" },
  { id: 4, name: "Beras Ketan 1kg", price: 25000, category: "beras", mainCat: "jualan", emoji: "🍘", desc: "Untuk kue dan jajanan tradisional" },
  { id: 5, name: "Beras Premium 10kg", price: 125000, category: "beras", mainCat: "jualan", emoji: "🍚", desc: "Beras premium kemasan besar", badge: "Hemat" },
  { id: 6, name: "Beras Pandan Wangi 5kg", price: 72000, category: "beras", mainCat: "jualan", emoji: "🌿", desc: "Nasi wangi alami pandan" },
  { id: 7, name: "Gudang Garam Filter", price: 28000, category: "rokok", mainCat: "jualan", emoji: "🚬", desc: "GG Filter 12 batang" },
  { id: 8, name: "Djarum Super", price: 26000, category: "rokok", mainCat: "jualan", emoji: "🚬", desc: "Djarum Super 12 batang", badge: "Populer" },
  { id: 9, name: "Surya 16", price: 32000, category: "rokok", mainCat: "jualan", emoji: "🚬", desc: "Gudang Garam Surya 16 batang" },
  { id: 10, name: "Sampoerna Mild", price: 30000, category: "rokok", mainCat: "jualan", emoji: "🚬", desc: "A Mild 16 batang" },
  { id: 11, name: "LA Bold", price: 24000, category: "rokok", mainCat: "jualan", emoji: "🚬", desc: "LA Bold 16 batang" },
  { id: 12, name: "Magnum Filter", price: 18000, category: "rokok", mainCat: "jualan", emoji: "🚬", desc: "Magnum Filter 12 batang" },
  { id: 13, name: "Chitato Sapi Panggang", price: 10000, category: "jajanan", mainCat: "jualan", emoji: "🍟", desc: "Keripik kentang rasa sapi panggang" },
  { id: 14, name: "Indomie Goreng", price: 3500, category: "jajanan", mainCat: "jualan", emoji: "🍜", desc: "Mi instan goreng favorit", badge: "Laris" },
  { id: 15, name: "Oreo Original", price: 8000, category: "jajanan", mainCat: "jualan", emoji: "🍪", desc: "Biskuit Oreo rasa original" },
  { id: 16, name: "Taro Net", price: 3000, category: "jajanan", mainCat: "jualan", emoji: "🥨", desc: "Snack ringan renyah" },
  { id: 17, name: "Richeese Nabati", price: 5000, category: "jajanan", mainCat: "jualan", emoji: "🧀", desc: "Wafer keju lezat" },
  { id: 18, name: "Beng-Beng", price: 3500, category: "jajanan", mainCat: "jualan", emoji: "🍫", desc: "Wafer karamel cokelat" },
  { id: 19, name: "Qtela Tempe", price: 9000, category: "jajanan", mainCat: "jualan", emoji: "🍘", desc: "Keripik tempe original krispi" },
  { id: 20, name: "Pop Mie Ayam", price: 5500, category: "jajanan", mainCat: "jualan", emoji: "🍜", desc: "Mi cup rasa ayam" },
  { id: 21, name: "Es Teh Pucuk Harum", price: 4000, category: "minuman", mainCat: "jualan", emoji: "🧊", desc: "Teh manis dingin segar" },
  { id: 22, name: "Coca-Cola 390ml", price: 6000, category: "minuman", mainCat: "jualan", emoji: "🥤", desc: "Minuman bersoda menyegarkan" },
  { id: 23, name: "Aqua 600ml", price: 4000, category: "minuman", mainCat: "jualan", emoji: "💧", desc: "Air mineral segar" },
  { id: 24, name: "Pocari Sweat 500ml", price: 8000, category: "minuman", mainCat: "jualan", emoji: "🥤", desc: "Minuman isotonik" },
  { id: 25, name: "Teh Botol Sosro", price: 5000, category: "minuman", mainCat: "jualan", emoji: "🍵", desc: "Teh manis original", badge: "Favorit" },
  { id: 26, name: "Sprite 390ml", price: 6000, category: "minuman", mainCat: "jualan", emoji: "🥤", desc: "Minuman lemon lime segar" },
  { id: 27, name: "Fanta Strawberry", price: 6000, category: "minuman", mainCat: "jualan", emoji: "🍓", desc: "Soda rasa stroberi segar" },
  { id: 28, name: "Yakult", price: 3000, category: "minuman", mainCat: "jualan", emoji: "🥛", desc: "Minuman probiotik sehat" },
  { id: 29, name: "Es Kopi Susu ABC", price: 5000, category: "minuman", mainCat: "jualan", emoji: "☕", desc: "Kopi susu siap minum" },
  { id: 30, name: "Floridina Orange", price: 4000, category: "minuman", mainCat: "jualan", emoji: "🍊", desc: "Minuman jeruk dengan bulir asli" },
  { id: 31, name: "Ayam Potong Utuh", price: 45000, category: "ayam", mainCat: "ayam", emoji: "🐔", desc: "Ayam potong segar utuh per ekor", badge: "Segar" },
  { id: 32, name: "Dada Ayam 1kg", price: 38000, category: "ayam", mainCat: "ayam", emoji: "🍗", desc: "Dada ayam fillet tanpa tulang" },
  { id: 33, name: "Paha Ayam 1kg", price: 35000, category: "ayam", mainCat: "ayam", emoji: "🍗", desc: "Paha ayam atas segar", badge: "Laris" },
  { id: 34, name: "Sayap Ayam 1kg", price: 32000, category: "ayam", mainCat: "ayam", emoji: "🍗", desc: "Sayap ayam segar untuk digoreng" },
  { id: 35, name: "Ceker Ayam 1kg", price: 18000, category: "ayam", mainCat: "ayam", emoji: "🐔", desc: "Ceker ayam segar untuk soto/sup" },
  { id: 36, name: "Ati Ampela 1kg", price: 28000, category: "ayam", mainCat: "ayam", emoji: "🫀", desc: "Ati ampela ayam segar" },
  { id: 37, name: "Ayam Kampung", price: 75000, category: "ayam", mainCat: "ayam", emoji: "🐓", desc: "Ayam kampung utuh per ekor", badge: "Premium" },
  { id: 38, name: "Kulit Ayam 1kg", price: 15000, category: "ayam", mainCat: "ayam", emoji: "🍗", desc: "Kulit ayam untuk kerupuk/goreng" },
  { id: 39, name: "Shake Mix Vanilla", price: 310000, category: "herbalife", mainCat: "herbalife", emoji: "🥤", desc: "Nutritional Shake Mix rasa vanila", badge: "Best Seller" },
  { id: 40, name: "Shake Mix Coklat", price: 310000, category: "herbalife", mainCat: "herbalife", emoji: "🍫", desc: "Nutritional Shake Mix rasa coklat" },
  { id: 41, name: "Shake Mix Berry", price: 310000, category: "herbalife", mainCat: "herbalife", emoji: "🍓", desc: "Nutritional Shake Mix rasa berry" },
  { id: 42, name: "Herbal Aloe Mango", price: 195000, category: "herbalife", mainCat: "herbalife", emoji: "🥭", desc: "Herbal Aloe Concentrate rasa mangga", badge: "Favorit" },
  { id: 43, name: "Herbal Tea Concentrate", price: 195000, category: "herbalife", mainCat: "herbalife", emoji: "🍵", desc: "Teh herbal pelangsing & energi" },
  { id: 44, name: "NRG Tea", price: 210000, category: "herbalife", mainCat: "herbalife", emoji: "⚡", desc: "Teh guarana untuk stamina & fokus" },
  { id: 45, name: "Liftoff Effervescent", price: 145000, category: "herbalife", mainCat: "herbalife", emoji: "🚀", desc: "Tablet energi instan 10 sachet" },
  { id: 46, name: "Fiber & Herb", price: 165000, category: "herbalife", mainCat: "herbalife", emoji: "🌿", desc: "Suplemen serat untuk pencernaan" },
  { id: 47, name: "Protein Powder PPP", price: 280000, category: "herbalife", mainCat: "herbalife", emoji: "💪", desc: "Personalized Protein Powder" },
  { id: 48, name: "Cell-U-Loss", price: 175000, category: "herbalife", mainCat: "herbalife", emoji: "💧", desc: "Membantu mengurangi retensi air" },
  { id: 49, name: "Ganti LCD HP", price: 150000, category: "service", mainCat: "service", emoji: "📱", desc: "Ganti LCD/layar HP (harga mulai dari)", badge: "Populer" },
  { id: 50, name: "Ganti Baterai HP", price: 75000, category: "service", mainCat: "service", emoji: "🔋", desc: "Ganti baterai HP semua merk" },
  { id: 51, name: "Service Software HP", price: 50000, category: "service", mainCat: "service", emoji: "⚙️", desc: "Flash, unlock, install ulang HP" },
  { id: 52, name: "Ganti Konektor Cas", price: 60000, category: "service", mainCat: "service", emoji: "🔌", desc: "Ganti port charging HP" },
  { id: 53, name: "Service Kipas Angin", price: 40000, category: "service", mainCat: "service", emoji: "🌀", desc: "Service & perbaikan kipas angin" },
  { id: 54, name: "Service Setrika", price: 35000, category: "service", mainCat: "service", emoji: "👔", desc: "Perbaikan setrika listrik" },
  { id: 55, name: "Service Rice Cooker", price: 45000, category: "service", mainCat: "service", emoji: "🍚", desc: "Perbaikan magic com/rice cooker" },
  { id: 56, name: "Pasang Tempered Glass", price: 20000, category: "service", mainCat: "service", emoji: "🛡️", desc: "Pasang anti gores kaca HP" },
  { id: 57, name: "Service Dispenser", price: 50000, category: "service", mainCat: "service", emoji: "💧", desc: "Perbaikan dispenser air" },
  { id: 58, name: "Isi Ulang Tinta Printer", price: 25000, category: "service", mainCat: "service", emoji: "🖨️", desc: "Refill tinta printer semua merk" },
  { id: 59, name: "Mobile Legends 86 Diamond", price: 19000, category: "topup", mainCat: "topup", emoji: "⚔️", desc: "Top up diamond ML via ID", badge: "Terlaris" },
  { id: 60, name: "Mobile Legends 172 Diamond", price: 37000, category: "topup", mainCat: "topup", emoji: "⚔️", desc: "Top up diamond ML via ID" },
  { id: 61, name: "Mobile Legends 344 Diamond", price: 72000, category: "topup", mainCat: "topup", emoji: "⚔️", desc: "Top up diamond ML via ID" },
  { id: 62, name: "Mobile Legends 706 Diamond", price: 143000, category: "topup", mainCat: "topup", emoji: "⚔️", desc: "Top up diamond ML via ID", badge: "Hemat" },
  { id: 63, name: "Free Fire 100 Diamond", price: 15000, category: "topup", mainCat: "topup", emoji: "🔥", desc: "Top up diamond FF via ID", badge: "Populer" },
  { id: 64, name: "Free Fire 310 Diamond", price: 46000, category: "topup", mainCat: "topup", emoji: "🔥", desc: "Top up diamond FF via ID" },
  { id: 65, name: "Free Fire 520 Diamond", price: 72000, category: "topup", mainCat: "topup", emoji: "🔥", desc: "Top up diamond FF via ID" },
  { id: 66, name: "PUBG Mobile 60 UC", price: 15000, category: "topup", mainCat: "topup", emoji: "🎯", desc: "Top up UC PUBG Mobile" },
  { id: 67, name: "PUBG Mobile 325 UC", price: 75000, category: "topup", mainCat: "topup", emoji: "🎯", desc: "Top up UC PUBG Mobile" },
  { id: 68, name: "Genshin Impact 60 Genesis", price: 16000, category: "topup", mainCat: "topup", emoji: "🌟", desc: "Top up Genesis Crystal Genshin" },
  { id: 69, name: "Genshin Impact 330 Genesis", price: 79000, category: "topup", mainCat: "topup", emoji: "🌟", desc: "Top up Genesis Crystal Genshin", badge: "Hot" },
  { id: 70, name: "Valorant 125 VP", price: 15000, category: "topup", mainCat: "topup", emoji: "🎮", desc: "Top up Valorant Points" },
  { id: 71, name: "Valorant 425 VP", price: 50000, category: "topup", mainCat: "topup", emoji: "🎮", desc: "Top up Valorant Points" },
  { id: 72, name: "Roblox 80 Robux", price: 15000, category: "topup", mainCat: "topup", emoji: "🧱", desc: "Top up Robux Roblox", badge: "Gen Z Fav" },
  { id: 73, name: "Roblox 400 Robux", price: 70000, category: "topup", mainCat: "topup", emoji: "🧱", desc: "Top up Robux Roblox" },
  { id: 74, name: "Roblox 800 Robux", price: 135000, category: "topup", mainCat: "topup", emoji: "🧱", desc: "Top up Robux Roblox" },
  { id: 75, name: "Honkai Star Rail 60 Oneiric", price: 16000, category: "topup", mainCat: "topup", emoji: "✨", desc: "Top up Oneiric Shard HSR" },
  { id: 76, name: "Honkai Star Rail 330 Oneiric", price: 79000, category: "topup", mainCat: "topup", emoji: "✨", desc: "Top up Oneiric Shard HSR" },
  { id: 77, name: "Clash of Clans 80 Gems", price: 15000, category: "topup", mainCat: "topup", emoji: "🏰", desc: "Top up Gems COC" },
  { id: 78, name: "Clash of Clans 500 Gems", price: 75000, category: "topup", mainCat: "topup", emoji: "🏰", desc: "Top up Gems COC" },
  { id: 79, name: "Call of Duty Mobile 80 CP", price: 15000, category: "topup", mainCat: "topup", emoji: "💀", desc: "Top up CP CODM" },
  { id: 80, name: "Fortnite 1000 V-Bucks", price: 60000, category: "topup", mainCat: "topup", emoji: "🎯", desc: "Top up V-Bucks Fortnite" },
  { id: 81, name: "Stumble Guys 250 Gems", price: 30000, category: "topup", mainCat: "topup", emoji: "🏃", desc: "Top up Gems Stumble Guys" },
  { id: 82, name: "Minecraft 1720 Minecoins", price: 75000, category: "topup", mainCat: "topup", emoji: "⛏️", desc: "Top up Minecoins Minecraft" },
  { id: 83, name: "Among Us Stars 50", price: 25000, category: "topup", mainCat: "topup", emoji: "🚀", desc: "Top up Stars Among Us" },
  { id: 84, name: "Arena of Valor 90 Voucher", price: 20000, category: "topup", mainCat: "topup", emoji: "🗡️", desc: "Top up Voucher AOV" },
  { id: 85, name: "Zenless Zone Zero 60 Polychrome", price: 16000, category: "topup", mainCat: "topup", emoji: "⚡", desc: "Top up Polychrome ZZZ" },
  { id: 86, name: "Wuthering Waves 60 Lunite", price: 16000, category: "topup", mainCat: "topup", emoji: "🌊", desc: "Top up Lunite Wuthering Waves" },
  { id: 87, name: "Tower of Fantasy 60 Tanium", price: 16000, category: "topup", mainCat: "topup", emoji: "🗼", desc: "Top up Tanium ToF" },
  { id: 88, name: "FIFA Mobile 100 Points", price: 15000, category: "topup", mainCat: "topup", emoji: "⚽", desc: "Top up FIFA Points" },
  { id: 89, name: "Netflix Premium 1 Bulan", price: 45000, category: "akun", mainCat: "akun", emoji: "🎬", desc: "Akun Netflix Premium UHD 4K", badge: "Best Seller" },
  { id: 90, name: "Netflix Premium 3 Bulan", price: 120000, category: "akun", mainCat: "akun", emoji: "🎬", desc: "Netflix Premium 3 bulan hemat", badge: "Hemat" },
  { id: 91, name: "Spotify Premium 1 Bulan", price: 15000, category: "akun", mainCat: "akun", emoji: "🎵", desc: "Spotify Premium tanpa iklan", badge: "Laris" },
  { id: 92, name: "Spotify Premium 6 Bulan", price: 75000, category: "akun", mainCat: "akun", emoji: "🎵", desc: "Spotify Premium 6 bulan hemat" },
  { id: 93, name: "YouTube Premium 1 Bulan", price: 20000, category: "akun", mainCat: "akun", emoji: "▶️", desc: "YouTube tanpa iklan + Music", badge: "Populer" },
  { id: 94, name: "YouTube Premium 3 Bulan", price: 55000, category: "akun", mainCat: "akun", emoji: "▶️", desc: "YouTube Premium 3 bulan hemat" },
  { id: 95, name: "Disney+ Hotstar 1 Bulan", price: 20000, category: "akun", mainCat: "akun", emoji: "🏰", desc: "Disney+ Hotstar Premium" },
  { id: 96, name: "Disney+ Hotstar 1 Tahun", price: 100000, category: "akun", mainCat: "akun", emoji: "🏰", desc: "Disney+ Hotstar Premium setahun", badge: "Hemat" },
  { id: 97, name: "Canva Pro 1 Bulan", price: 25000, category: "akun", mainCat: "akun", emoji: "🎨", desc: "Canva Pro full fitur design" },
  { id: 98, name: "Canva Pro 1 Tahun", price: 150000, category: "akun", mainCat: "akun", emoji: "🎨", desc: "Canva Pro setahun super hemat", badge: "Best Deal" },
  { id: 99, name: "ChatGPT Plus 1 Bulan", price: 200000, category: "akun", mainCat: "akun", emoji: "🤖", desc: "ChatGPT Plus GPT-4 akses penuh", badge: "Hot" },
  { id: 100, name: "Microsoft 365 1 Tahun", price: 85000, category: "akun", mainCat: "akun", emoji: "💼", desc: "Word, Excel, PowerPoint 1TB OneDrive" },
  { id: 101, name: "Zoom Pro 1 Bulan", price: 45000, category: "akun", mainCat: "akun", emoji: "📹", desc: "Zoom meeting tanpa batas 30 jam" },
  { id: 102, name: "WeTV VIP 1 Bulan", price: 15000, category: "akun", mainCat: "akun", emoji: "📺", desc: "WeTV Premium drakor & variety show" },
  { id: 103, name: "Vidio Premium 1 Bulan", price: 20000, category: "akun", mainCat: "akun", emoji: "🎞️", desc: "Vidio Premium film & sport" },
  { id: 104, name: "VIU Premium 1 Bulan", price: 15000, category: "akun", mainCat: "akun", emoji: "📱", desc: "VIU Premium drakor tanpa iklan" },
  { id: 105, name: "Apple Music 1 Bulan", price: 20000, category: "akun", mainCat: "akun", emoji: "🍎", desc: "Apple Music full catalog premium" },
  { id: 106, name: "Amazon Prime Video", price: 25000, category: "akun", mainCat: "akun", emoji: "📦", desc: "Amazon Prime Video 1 bulan" },
  { id: 107, name: "Grammarly Premium 1 Bulan", price: 35000, category: "akun", mainCat: "akun", emoji: "✍️", desc: "Grammarly Premium cek grammar AI" },
  { id: 108, name: "NordVPN Premium 1 Bulan", price: 20000, category: "akun", mainCat: "akun", emoji: "🔒", desc: "NordVPN akses server global" },
  { id: 109, name: "Adobe Creative Cloud", price: 75000, category: "akun", mainCat: "akun", emoji: "🖌️", desc: "Photoshop, Illustrator, Premiere 1 bln" },
  { id: 110, name: "IMEI Registration", price: 50000, category: "akun", mainCat: "akun", emoji: "📲", desc: "Jasa daftar IMEI HP resmi Kemenperin" },
  { id: 111, name: "iCloud Storage 50GB", price: 15000, category: "akun", mainCat: "akun", emoji: "☁️", desc: "iCloud 50GB penyimpanan 1 bulan" },
  { id: 112, name: "iCloud Storage 200GB", price: 45000, category: "akun", mainCat: "akun", emoji: "☁️", desc: "iCloud 200GB penyimpanan 1 bulan" },
  { id: 113, name: "HBO GO Premium", price: 25000, category: "akun", mainCat: "akun", emoji: "🎭", desc: "HBO GO Premium 1 bulan" },
  { id: 114, name: "IQIYI VIP 1 Bulan", price: 15000, category: "akun", mainCat: "akun", emoji: "📺", desc: "IQIYI VIP Premium tanpa iklan" },
  { id: 115, name: "Duolingo Plus 1 Bulan", price: 30000, category: "akun", mainCat: "akun", emoji: "🦉", desc: "Duolingo Plus belajar bahasa premium" },
  { id: 116, name: "Scribd Premium 1 Bulan", price: 25000, category: "akun", mainCat: "akun", emoji: "📚", desc: "Scribd unlimited buku & audiobook" },
  { id: 117, name: "Beras 50 kg", price: 500000, category: "beras", mainCat: "jualan", emoji: "🍚", desc: "Beras enak", badge: "Murah Meriah" },
  { id: 200, name: "Spotify Premium 3 Bulan", price: 40000, category: "akun", mainCat: "akun", emoji: "🎵", desc: "Spotify Premium 3 bulan hemat", badge: "Hemat" },
  { id: 201, name: "Spotify Premium 12 Bulan", price: 130000, category: "akun", mainCat: "akun", emoji: "🎵", desc: "Spotify Premium 12 bulan super hemat", badge: "Best Deal" },
];

// ============================================
// PREMIUM PRODUCTS - Grouped variant schema
// Used for Akun Premium category rendering
// ============================================
const PREMIUM_PRODUCTS = [
  {
    id: "netflix", name: "Netflix Premium", icon: "assets/products/netflix.png", emoji: "🎬", description: "Akun Netflix Premium UHD 4K. Streaming film, serial, dan dokumenter terbaik tanpa batas tanpa iklan.", badge: "Best Seller", variants: [
      { id: 89, label: "1 Bulan", price: 45000 },
      { id: 90, label: "3 Bulan", price: 120000 }
    ]
  },
  {
    id: "spotify", name: "Spotify Premium", icon: "assets/products/spotify.png", emoji: "🎵", description: "Spotify Premium tanpa iklan. Nikmati musik tanpa batas, skip lagu sepuasnya, kualitas audio jernih, dan download offline.", badge: "Laris", variants: [
      { id: 91, label: "1 Bulan", price: 15000 },
      { id: 200, label: "3 Bulan", price: 40000 },
      { id: 92, label: "6 Bulan", price: 75000 },
      { id: 201, label: "12 Bulan", price: 130000 }
    ]
  },
  {
    id: "youtube", name: "YouTube Premium", icon: "assets/products/youtube.png", emoji: "▶️", description: "YouTube tanpa iklan + YouTube Music. Streaming tanpa gangguan, download offline, dan putar di background.", badge: "Populer", variants: [
      { id: 93, label: "1 Bulan", price: 20000 },
      { id: 94, label: "3 Bulan", price: 55000 }
    ]
  },
  {
    id: "disney", name: "Disney+ Hotstar", icon: "assets/products/disney.png", emoji: "🏰", description: "Disney+ Hotstar Premium. Akses penuh konten Disney, Marvel, Star Wars, Pixar, dan National Geographic.", badge: "Hemat", variants: [
      { id: 95, label: "1 Bulan", price: 20000 },
      { id: 96, label: "1 Tahun", price: 100000 }
    ]
  },
  {
    id: "canva", name: "Canva Pro", icon: "assets/products/canva.png", emoji: "🎨", description: "Canva Pro full fitur design premium. Akses semua template, elemen, dan fitur AI.", badge: "Best Deal", variants: [
      { id: 97, label: "1 Bulan", price: 25000 },
      { id: 98, label: "1 Tahun", price: 150000 }
    ]
  },
  {
    id: "chatgpt", name: "ChatGPT Plus", icon: "assets/products/chatgpt.png", emoji: "🤖", description: "ChatGPT Plus GPT-4 akses penuh. Respon lebih cepat, fitur advanced, dan priority access.", badge: "Hot", variants: [
      { id: 99, label: "1 Bulan", price: 200000 }
    ]
  },
  {
    id: "microsoft365", name: "Microsoft 365", icon: "assets/products/microsoft365.png", emoji: "💼", description: "Word, Excel, PowerPoint, dan 1TB OneDrive cloud storage.", variants: [
      { id: 100, label: "1 Tahun", price: 85000 }
    ]
  },
  {
    id: "zoom", name: "Zoom Pro", icon: "assets/products/zoom.png", emoji: "📹", description: "Zoom Pro meeting tanpa batas waktu hingga 30 jam per sesi.", variants: [
      { id: 101, label: "1 Bulan", price: 45000 }
    ]
  },
  {
    id: "wetv", name: "WeTV VIP", icon: "assets/products/wetv.png", emoji: "📺", description: "WeTV VIP Premium drakor, drama China, dan variety show tanpa iklan.", variants: [
      { id: 102, label: "1 Bulan", price: 15000 }
    ]
  },
  {
    id: "vidio", name: "Vidio Premium", icon: "assets/products/vidio.png", emoji: "🎞️", description: "Vidio Premium film, series, dan olahraga live tanpa iklan.", variants: [
      { id: 103, label: "1 Bulan", price: 20000 }
    ]
  },
  {
    id: "viu", name: "VIU Premium", icon: "assets/products/viu.png", emoji: "📱", description: "VIU Premium drakor dan drama Asia tanpa iklan.", variants: [
      { id: 104, label: "1 Bulan", price: 15000 }
    ]
  },
  {
    id: "apple-music", name: "Apple Music", icon: "assets/products/apple-music.png", emoji: "🍎", description: "Apple Music full catalog premium dengan Spatial Audio dan Lossless.", variants: [
      { id: 105, label: "1 Bulan", price: 20000 }
    ]
  },
  {
    id: "amazon", name: "Amazon Prime Video", icon: "assets/products/amazon.png", emoji: "📦", description: "Amazon Prime Video streaming film dan series original Amazon.", variants: [
      { id: 106, label: "1 Bulan", price: 25000 }
    ]
  },
  {
    id: "grammarly", name: "Grammarly Premium", icon: "assets/products/grammarly.png", emoji: "✍️", description: "Grammarly Premium AI grammar checker dan plagiarism detector.", variants: [
      { id: 107, label: "1 Bulan", price: 35000 }
    ]
  },
  {
    id: "nordvpn", name: "NordVPN Premium", icon: "assets/products/nordvpn.png", emoji: "🔒", description: "NordVPN akses server global dengan kecepatan tinggi.", variants: [
      { id: 108, label: "1 Bulan", price: 20000 }
    ]
  },
  {
    id: "adobe", name: "Adobe Creative Cloud", icon: "assets/products/adobe.png", emoji: "🖌️", description: "Photoshop, Illustrator, Premiere Pro, dan semua aplikasi Adobe.", variants: [
      { id: 109, label: "1 Bulan", price: 75000 }
    ]
  },
  {
    id: "imei", name: "IMEI Registration", icon: "assets/products/imei.png", emoji: "📲", description: "Jasa daftar IMEI HP resmi Kemenperin.", variants: [
      { id: 110, label: "Sekali Daftar", price: 50000 }
    ]
  },
  {
    id: "icloud", name: "iCloud Storage", icon: "assets/products/icloud.png", emoji: "☁️", description: "iCloud penyimpanan cloud Apple untuk foto, video, dan data.", variants: [
      { id: 111, label: "50GB / Bulan", price: 15000 },
      { id: 112, label: "200GB / Bulan", price: 45000 }
    ]
  },
  {
    id: "hbo", name: "HBO GO Premium", icon: "assets/products/hbo.png", emoji: "🎭", description: "HBO GO Premium streaming film dan series HBO original.", variants: [
      { id: 113, label: "1 Bulan", price: 25000 }
    ]
  },
  {
    id: "iqiyi", name: "IQIYI VIP", icon: "assets/products/iqiyi.png", emoji: "📺", description: "IQIYI VIP Premium drama Asia tanpa iklan.", variants: [
      { id: 114, label: "1 Bulan", price: 15000 }
    ]
  },
  {
    id: "duolingo", name: "Duolingo Plus", icon: "assets/products/duolingo.png", emoji: "🦉", description: "Duolingo Plus belajar bahasa premium tanpa iklan dan offline.", variants: [
      { id: 115, label: "1 Bulan", price: 30000 }
    ]
  },
  {
    id: "scribd", name: "Scribd Premium", icon: "assets/products/scribd.png", emoji: "📚", description: "Scribd unlimited buku, audiobook, majalah, dan dokumen.", variants: [
      { id: 116, label: "1 Bulan", price: 25000 }
    ]
  }
];
