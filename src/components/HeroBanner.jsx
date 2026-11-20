import { useState } from "react";
import { CheckCircleIcon } from "./Icons";

function HeroBanner({ onSelectCategory, onNotify, totalProducts = 9 }) {
  const [copiedCode, setCopiedCode] = useState("");

  const promos = [
    { code: "SALE10", label: "-10% chegirma" },
    { code: "TEXNO15", label: "-15% chegirma" },
    { code: "NEW20", label: "-20% super aksiya" },
  ];

  function handleCopyPromo(code) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(code).catch(() => {});
    }
    setCopiedCode(code);
    onNotify?.(
      `«${code}» promo-kodi nusxalandi! Savatda qo‘llashingiz mumkin.`,
      "success"
    );
    setTimeout(() => {
      setCopiedCode((prev) => (prev === code ? "" : prev));
    }, 2500);
  }

  return (
    <section className="hero-banner" aria-label="Maxsus aksiya va takliflar">
      <div className="hero-banner-content">
        <div className="hero-badge-row">
          <span className="hero-pill-badge">MAXSUS TAKLIF • -20% GACHA</span>
          <span className="hero-pill-sub">
            12 oy rasmiy kafolat va bo‘lib to‘lash
          </span>
        </div>

        <h1 className="hero-title">
          Yangi avlod flagman texnikalari — rasmiy kafolat bilan
        </h1>
        <p className="hero-desc">
          Apple, Sony, Samsung, ASUS va Keychron original mahsulotlarini maxsus
          promo-kodlar yoki 3, 6 va 12 oylik muddatli to‘lov asosida xarid
          qiling.
        </p>

        <div className="hero-promos">
          <span className="hero-promos-label">
            Promo-kodni bosib nusxalang:
          </span>
          <div className="hero-promo-list">
            {promos.map((item) => {
              const isCopied = copiedCode === item.code;
              return (
                <button
                  key={item.code}
                  type="button"
                  className={`hero-promo-chip ${isCopied ? "is-copied" : ""}`}
                  onClick={() => handleCopyPromo(item.code)}
                  title="Nusxalash uchun bosing"
                >
                  <span className="hero-promo-code">{item.code}</span>
                  <span className="hero-promo-discount">
                    {isCopied ? "Nusxalandi!" : item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="hero-banner-aside">
        <div className="hero-highlights-card">
          <div className="hero-highlight-item">
            <CheckCircleIcon />
            <div>
              <strong>{totalProducts} ta original model</strong>
              <span>Smartfonlar, noutbuklar, audio va aksessuarlar</span>
            </div>
          </div>
          <div className="hero-highlight-item">
            <CheckCircleIcon />
            <div>
              <strong>0% boshlang‘ich to‘lov</strong>
              <span>3, 6 va 12 oyga bo‘lib to‘lash kalkulyatori</span>
            </div>
          </div>
          <div className="hero-highlight-item">
            <CheckCircleIcon />
            <div>
              <strong>Tezkor yetkazib berish</strong>
              <span>Kuryer orqali eshikkacha yoki do‘kondan olib ketish</span>
            </div>
          </div>

          <button
            type="button"
            className="hero-cta-btn"
            onClick={() => onSelectCategory?.("Smartfonlar")}
          >
            Yangi smartfonlarni ko‘rish →
          </button>
        </div>
      </div>
    </section>
  );
}

export default HeroBanner;
