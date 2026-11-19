export const INITIAL_PRODUCTS = [
  {
    id: 1,
    title: 'MacBook Air M2 13"',
    category: "Noutbuklar",
    specs: "8GB RAM • 256GB SSD • Space Gray",
    priceValue: 12400000,
    price: "12 400 000 so'm",
    rating: "4.9",
    stock: 5,
    liked: true,
    icon: "laptop",
  },
  {
    id: 2,
    title: "Sony WH-1000XM5",
    category: "Audio",
    specs: "Active Noise Cancelling • 30 soat batareya",
    priceValue: 4200000,
    price: "4 200 000 so'm",
    rating: "4.8",
    stock: 2,
    liked: false,
    icon: "headphones",
  },
  {
    id: 3,
    title: "Keychron K2 Pro",
    category: "Aksessuarlar",
    specs: "Mexanik klaviatura • Bluetooth / USB-C",
    priceValue: 1350000,
    price: "1 350 000 so'm",
    rating: "4.7",
    stock: 8,
    liked: true,
    icon: "keyboard",
  },
  {
    id: 4,
    title: "Apple Watch Series 9",
    category: "Aksessuarlar",
    specs: "45mm Aluminium • GPS • Midnight",
    priceValue: 5100000,
    price: "5 100 000 so'm",
    rating: "4.8",
    stock: 4,
    liked: false,
    icon: "watch",
  },
  {
    id: 5,
    title: "ASUS Zenbook 14 OLED",
    category: "Noutbuklar",
    specs: "16GB RAM • 512GB SSD • Core Ultra 5",
    priceValue: 10800000,
    price: "10 800 000 so'm",
    rating: "4.7",
    stock: 0,
    liked: false,
    icon: "laptop",
  },
  {
    id: 6,
    title: "Logitech MX Master 3S",
    category: "Aksessuarlar",
    specs: "8000 DPI • Silent Click • Wireless",
    priceValue: 1180000,
    price: "1 180 000 so'm",
    rating: "4.9",
    stock: 6,
    liked: false,
    icon: "mouse",
  },
];

export const INITIAL_CART = [
  {
    productId: 2,
    quantity: 1,
  },
  {
    productId: 3,
    quantity: 2,
  },
];

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
