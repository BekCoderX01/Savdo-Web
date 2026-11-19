import { useState } from "react";
import { PROMO_CODES, formatPrice } from "../data/initialData";

function CartSummary({
  subtotal = 0,
  cartCount = 0,
  currentUser = null,
  onCheckout,
  onNotify,
}) {
  const [promoInput, setPromoInput] = useState("");
  const [appliedPromo, setAppliedPromo] = useState("");
  const [promoError, setPromoError] = useState("");
  const [deliveryMethod, setDeliveryMethod] = useState("courier");
  const [customerName, setCustomerName] = useState(currentUser?.name || "");
  const [customerPhone, setCustomerPhone] = useState(currentUser?.phone || "");
  const [formError, setFormError] = useState("");

  const discountRate = appliedPromo ? PROMO_CODES[appliedPromo] || 0 : 0;
  const discountAmount = Math.round(subtotal * discountRate);
  const deliveryCost =
    subtotal > 0 && deliveryMethod === "courier" ? 30000 : 0;
  const total = Math.max(0, subtotal - discountAmount + deliveryCost);

  function handleApplyPromo() {
    const code = promoInput.trim().toUpperCase();
    if (!code) {
      setAppliedPromo("");
      setPromoError("Promo kodni kiriting (masalan: SALE10)");
      return;
    }

    if (PROMO_CODES[code]) {
      setAppliedPromo(code);
      setPromoError("");
      onNotify?.(
        `${code} promo-kodi qo‘llandi (${Math.round(PROMO_CODES[code] * 100)}% chegirma)`,
        "success"
      );
    } else {
      setAppliedPromo("");
      setPromoError("Noto‘g‘ri promo kod (SALE10 kodini sinab ko‘ring)");
      onNotify?.("Promo-kod noto‘g‘ri kiritildi", "danger");
    }
  }

  function handleSubmitOrder() {
    if (cartCount === 0 || subtotal === 0) {
      setFormError("Buyurtma berish uchun savatga mahsulot qo‘shing.");
      return;
    }

    if (!customerName.trim()) {
      setFormError("Iltimos, ismingizni kiriting.");
      return;
    }

    if (!customerPhone.trim() || customerPhone.trim().length < 7) {
      setFormError("Iltimos, telefon raqamingizni to‘liq kiriting.");
      return;
    }

    setFormError("");
    onCheckout?.({
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
      deliveryMethod,
      total,
      discountAmount,
      appliedPromo,
    });

    setPromoInput("");
    setAppliedPromo("");
  }

  return (
    <aside className="cart-summary-card">
      <h3 className="cart-summary-title">Buyurtmani rasmiylashtirish</h3>

      <div className="promo-section">
        <div className="promo-row">
          <input
            type="text"
            className="promo-input"
            placeholder="Promo kod (masalan: SALE10)"
            value={promoInput}
            onChange={(e) => {
              setPromoInput(e.target.value);
              if (promoError) setPromoError("");
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleApplyPromo();
              }
            }}
          />
          <button
            type="button"
            className="btn-promo"
            onClick={handleApplyPromo}
          >
            Qo‘llash
          </button>
        </div>

        {appliedPromo && (
          <p className="promo-status">
            {appliedPromo} qo‘llandi — {Math.round(discountRate * 100)}% chegirma
          </p>
        )}

        {promoError && (
          <p className="promo-status" style={{ color: "var(--danger)" }}>
            {promoError}
          </p>
        )}
      </div>

      <div className="checkout-form">
        <p className="checkout-heading">Buyurtma ma’lumotlari</p>

        <input
          type="text"
          className="form-field"
          placeholder="Ismingiz"
          value={customerName}
          onChange={(e) => {
            setCustomerName(e.target.value);
            if (formError) setFormError("");
          }}
        />

        <input
          type="tel"
          className="form-field"
          placeholder="+998 90 123 45 67"
          value={customerPhone}
          onChange={(e) => {
            setCustomerPhone(e.target.value);
            if (formError) setFormError("");
          }}
        />

        <div className="delivery-options">
          <button
            type="button"
            className={`delivery-chip ${
              deliveryMethod === "courier" ? "active" : ""
            }`}
            onClick={() => setDeliveryMethod("courier")}
          >
            Kuryer orqali
            <span>30 000 so'm</span>
          </button>
          <button
            type="button"
            className={`delivery-chip ${
              deliveryMethod === "pickup" ? "active" : ""
            }`}
            onClick={() => setDeliveryMethod("pickup")}
          >
            Olib ketish
            <span>Bepul</span>
          </button>
        </div>

        {formError && (
          <p
            style={{
              margin: "2px 0 0",
              fontSize: "12px",
              fontWeight: 600,
              color: "var(--danger)",
            }}
          >
            {formError}
          </p>
        )}
      </div>

      <div className="cart-summary">
        <div className="summary-row">
          <span>Mahsulotlar</span>
          <span>{formatPrice(subtotal)}</span>
        </div>

        {discountAmount > 0 && (
          <div className="summary-row summary-row--discount">
            <span>Chegirma ({Math.round(discountRate * 100)}%)</span>
            <span>− {formatPrice(discountAmount)}</span>
          </div>
        )}

        <div className="summary-row">
          <span>Yetkazib berish</span>
          <span>
            {deliveryCost > 0 ? formatPrice(deliveryCost) : "Bepul"}
          </span>
        </div>

        <div className="summary-total">
          <span>Jami summa</span>
          <span>{formatPrice(total)}</span>
        </div>
      </div>

      <button
        type="button"
        className="btn-checkout"
        onClick={handleSubmitOrder}
        disabled={cartCount === 0}
        style={
          cartCount === 0
            ? { opacity: 0.5, cursor: "not-allowed" }
            : undefined
        }
      >
        Buyurtma berish
      </button>
    </aside>
  );
}

export default CartSummary;
