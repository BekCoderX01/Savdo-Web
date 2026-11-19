# TexnoBozor — Zamonaviy texnika do‘koni

React + Vite asosida yaratilgan interaktiv e-commerce (texnika do‘koni) loyihasi.

## Funksionalliklar

- **Katalog, Qidiruv va Filtrlash:** Jonli qidiruv (`search-chip`), kategoriyalar (`Hammasi`, `Noutbuklar`, `Audio`, `Aksessuarlar`), sevimlilar filtri, narx bo‘yicha saralash va bo‘sh holat (`EmptyState`).
- **Savat va Rasmiylashtirish:** Miqdorni boshqarish (ombor `stock` nazorati bilan), promo-kodlar (`SALE10`, `TEXNO15`, `NEW20`), yetkazib berish turini tanlash (`Kuryer orqali` / `Olib ketish`) va buyurtma berish.
- **Buyurtmalarni boshqarish:** Holat bo‘yicha filtrlash (`Hammasi`, `Qabul qilindi`, `Bekor qilindi`), buyurtmani bekor qilish (zaxirani omborga qaytarish) va o‘chirish.
- **Autentifikatsiya va Profil:** Kirish (`azizbek@example.com` / parol: `123456`), ro‘yxatdan o‘tish va profil ma’lumotlarini tahrirlash modali.
- **Qo‘shimcha UX:** Dark Mode (tungi/kunduzgi rejim), Toast xabarnomalar va `localStorage` orqali ma’lumotlarni saqlash.

## Ishga tushirish

```bash
npm install
npm run dev
```

## Skriptlar

- `npm run dev` — local development serverni ishga tushirish
- `npm run build` — production build yaratish
- `npm run lint` — `oxlint` yordamida kodni tekshirish
