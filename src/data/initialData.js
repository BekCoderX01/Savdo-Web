export const INITIAL_PRODUCTS = [
  {
    id: 1,
    title: 'MacBook Air M2 13"',
    category: "Noutbuklar",
    specs: "8GB RAM • 256GB SSD • Space Gray",
    description:
      "Apple M2 chipi bilan jihozlangan ultra-yupqa va yengil noutbuk. 13.6 dyuymli Liquid Retina displey va 18 soatgacha avtonom ishlash vaqti dasturlash, dizayn va kundalik ishlar uchun mukammal tanlov.",
    warranty: "12 oy rasmiy Apple kafolati",
    priceValue: 12400000,
    price: "12 400 000 so'm",
    rating: "4.9",
    stock: 5,
    liked: false,
    icon: "laptop",
    image: "/products/macbook-air-m2.jpg",
    reviews: [
      {
        id: "r1",
        author: "Azizbek Karimov",
        rating: 5,
        date: "14-Noyabr, 2026",
        comment:
          "Batareyasi kun bo‘yi bemalol yetadi, ekrani juda tiniq va tezligi a’lo darajada!",
      },
      {
        id: "r2",
        author: "Sardor Aliyev",
        rating: 5,
        date: "10-Noyabr, 2026",
        comment: "Dasturlash uchun oldim, umuman qizimaydi va ovozsiz ishlaydi.",
      },
    ],
  },
  {
    id: 2,
    title: "Sony WH-1000XM5",
    category: "Audio",
    specs: "Active Noise Cancelling • 30 soat batareya",
    description:
      "Sanoatdagi eng ilg‘or shovqinni so‘ndirish (ANC) tizimiga ega premium simsiz quloqchin. 8 ta mikrofon va 2 ta protsessor tashqi shovqinni to‘liq bloklaydi va studiya darajasidagi Hi-Res ovoz beradi.",
    warranty: "12 oy rasmiy kafolat",
    priceValue: 4200000,
    price: "4 200 000 so'm",
    rating: "4.8",
    stock: 2,
    liked: false,
    icon: "headphones",
    image: "/products/sony-wh-1000xm5.jpg",
    reviews: [
      {
        id: "r3",
        author: "Malika Rustamova",
        rating: 5,
        date: "12-Noyabr, 2026",
        comment:
          "Shovqinni so‘ndirish funksiyasi haqiqatan ham mo‘jiza, ofisda ishlash uchun juda qulay.",
      },
    ],
  },
  {
    id: 3,
    title: "Keychron K2 Pro",
    category: "Aksessuarlar",
    specs: "Mexanik klaviatura • Bluetooth / USB-C",
    description:
      "QMK/VIA dasturlash imkoniyatiga ega 75% formatdagi simsiz mexanik klaviatura. Hot-swappable switchlar, PBT tugmalar, RGB yoritish hamda macOS va Windows uchun maxsus tugmalar to‘plami bilan.",
    warranty: "12 oy do‘kon kafolati",
    priceValue: 1350000,
    price: "1 350 000 so'm",
    rating: "4.7",
    stock: 8,
    liked: false,
    icon: "keyboard",
    image: "/products/keychron-k2-pro.jpg",
    reviews: [
      {
        id: "r4",
        author: "Javohir T.",
        rating: 5,
        date: "8-Noyabr, 2026",
        comment:
          "Yozish jarayoni juda yoqimli, ovozi (thocky) va sifatiga gap yo‘q.",
      },
    ],
  },
  {
    id: 4,
    title: "Apple Watch Series 9",
    category: "Aksessuarlar",
    specs: "45mm Aluminium • GPS • Midnight",
    description:
      "Yangi S9 SiP protsessori, Double Tap (ikki marta barmoq urish) imo-ishora boshqaruvi, 2000 nit yorqinlikdagi Always-On Retina displey va salomatlikni 24/7 kuzatish sensorlariga ega aqlli soat.",
    warranty: "12 oy rasmiy Apple kafolati",
    priceValue: 5100000,
    price: "5 100 000 so'm",
    rating: "4.8",
    stock: 4,
    liked: false,
    icon: "watch",
    image: "/products/apple-watch-series-9.jpg",
    reviews: [
      {
        id: "r5",
        author: "Dilshod M.",
        rating: 5,
        date: "5-Noyabr, 2026",
        comment:
          "Double Tap funksiyasi juda qulay ekan, quyoshda ham ekrani aniq ko‘rinadi.",
      },
    ],
  },
  {
    id: 5,
    title: "ASUS Zenbook 14 OLED",
    category: "Noutbuklar",
    specs: "16GB RAM • 512GB SSD • Core Ultra 5",
    description:
      "AI tezlashtirgichli Intel Core Ultra 5 protsessori va 3K 120Hz ASUS Lumina OLED ekraniga ega zamonaviy ultrabuk. Atigi 1.2 kg vazn va metall korpus bilan yuqori unumdorlikni birlashtiradi.",
    warranty: "12 oy rasmiy ASUS kafolati",
    priceValue: 10800000,
    price: "10 800 000 so'm",
    rating: "4.7",
    stock: 0,
    liked: false,
    icon: "laptop",
    image: "/products/asus-zenbook-14-oled.jpg",
    reviews: [
      {
        id: "r6",
        author: "Temur B.",
        rating: 5,
        date: "1-Noyabr, 2026",
        comment: "OLED ekrani ranglarni nihoyatda chiroyli ko‘rsatadi!",
      },
    ],
  },
  {
    id: 6,
    title: "Logitech MX Master 3S",
    category: "Aksessuarlar",
    specs: "8000 DPI • Silent Click • Wireless",
    description:
      "Shovqinsiz Quiet Click tugmalari, soniyasiga 1000 qatorni aylantiruvchi MagSpeed elektromagnit g‘ildiragi va har qanday sirtda (hatto oynada) ishlovchi 8000 DPI optik sensorga ega ergonomik sichqoncha.",
    warranty: "12 oy rasmiy kafolat",
    priceValue: 1180000,
    price: "1 180 000 so'm",
    rating: "4.9",
    stock: 6,
    liked: false,
    icon: "mouse",
    image: "/products/logitech-mx-master-3s.jpg",
    reviews: [
      {
        id: "r7",
        author: "Azizbek Karimov",
        rating: 5,
        date: "15-Noyabr, 2026",
        comment:
          "Qo‘lga juda qulay joylashadi, g‘ildiragi va ovozsiz tugmalari mukammal.",
      },
    ],
  },
  {
    id: 7,
    title: "iPhone 15 Pro Max",
    category: "Smartfonlar",
    specs: "256GB • Natural Titanium • A17 Pro",
    description:
      "Aerokosmik darajadagi titan korpus, 3-nanometrli A17 Pro chipi, 5x optik zumga ega 48MP Pro kamera tizimi, Action tugmasi va USB-C 3.0 yuqori tezlikdagi ma’lumot uzatish imkoniyati.",
    warranty: "12 oy rasmiy Apple kafolati",
    priceValue: 15200000,
    price: "15 200 000 so'm",
    rating: "4.9",
    stock: 6,
    liked: false,
    icon: "watch",
    image: "/products/iphone-15-pro-max.jpg",
    reviews: [
      {
        id: "r8",
        author: "Shohruh K.",
        rating: 5,
        date: "16-Noyabr, 2026",
        comment:
          "Natural Titanium rangi jonli holatda juda chiroyli, kamerasi va 5x zoom ajoyib!",
      },
    ],
  },
  {
    id: 8,
    title: "Samsung Galaxy S24 Ultra",
    category: "Smartfonlar",
    specs: "12/256GB • Titanium Gray • S-Pen",
    description:
      "Galaxy AI sun’iy intellekt imkoniyatlari, 200MP asosiy kamera, Snapdragon 8 Gen 3 for Galaxy protsessori, aks qaytarishni kamaytiruvchi Gorilla Armor tekis Dynamic AMOLED 2X displey va o‘rnatilgan S-Pen.",
    warranty: "12 oy rasmiy Samsung kafolati",
    priceValue: 14600000,
    price: "14 600 000 so'm",
    rating: "4.9",
    stock: 4,
    liked: false,
    icon: "watch",
    image: "/products/samsung-galaxy-s24-ultra.jpg",
    reviews: [
      {
        id: "r9",
        author: "Ulug‘bek R.",
        rating: 5,
        date: "17-Noyabr, 2026",
        comment:
          "Ekranning aks qaytarmasligi va S-Pen bilan ishlash tezligi tahsinga sazovor.",
      },
    ],
  },
  {
    id: 9,
    title: "AirPods Pro 2 (USB-C)",
    category: "Audio",
    specs: "Active Noise Cancellation • MagSafe Case",
    description:
      "Apple H2 chipi asosida 2 barobar kuchliroq shovqinni so‘ndirish, Adaptive Audio rejimi, suhbatni aniqlash (Conversation Awareness) va chang-suvdan IP54 himoyasiga ega MagSafe USB-C g‘ilof.",
    warranty: "12 oy rasmiy Apple kafolati",
    priceValue: 2950000,
    price: "2 950 000 so'm",
    rating: "4.8",
    stock: 7,
    liked: false,
    icon: "headphones",
    image: "/products/airpods-pro-2.jpg",
    reviews: [
      {
        id: "r10",
        author: "Madina S.",
        rating: 5,
        date: "11-Noyabr, 2026",
        comment:
          "iPhone va MacBook o‘rtasida avtomatik ulanishi hamda ovoz sifati juda yoqdi.",
      },
    ],
  },
];

export const INITIAL_CART = [];

export const INITIAL_ORDERS = [
  {
    id: "#1024",
    customer: "Azizbek Karimov",
    itemsSummary: "MacBook Air M2 (1x), Logitech MX Master 3S (1x)",
    items: [
      { productId: 1, quantity: 1 },
      { productId: 6, quantity: 1 },
    ],
    delivery: "Kuryer orqali",
    status: "Qabul qilindi",
    total: "13 610 000 so'm",
  },
  {
    id: "#1023",
    customer: "Malika Rustamova",
    itemsSummary: "Sony WH-1000XM5 (1x)",
    items: [{ productId: 2, quantity: 1 }],
    delivery: "Do‘kondan olib ketish",
    status: "Qabul qilindi",
    total: "4 200 000 so'm",
  },
];

export const INITIAL_USERS = [
  {
    id: 1,
    name: "Azizbek Karimov",
    email: "azizbek@example.com",
    phone: "+998 90 123 45 67",
    password: "123456",
  },
];

export const PROMO_CODES = {
  SALE10: 0.1,
  TEXNO15: 0.15,
  NEW20: 0.2,
};

export function formatPrice(amount) {
  const num = Math.max(0, Math.round(Number(amount) || 0));
  return `${num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} so'm`;
}

export function parsePrice(priceStr) {
  if (typeof priceStr === "number") return priceStr;
  return Number(String(priceStr).replace(/[^\d]/g, "")) || 0;
}
