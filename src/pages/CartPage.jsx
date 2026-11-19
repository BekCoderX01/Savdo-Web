import CartItemCard from "../components/CartItemCard";
import CartSummary from "../components/CartSummary";
import EmptyState from "../components/EmptyState";
import { ArrowLeftIcon, CartIcon } from "../components/Icons";

function CartPage({
  cartItems = [],
  subtotal = 0,
  cartCount = 0,
  currentUser = null,
  onIncrease,
  onDecrease,
  onRemove,
  onClearCart,
  onCheckout,
  onNavigate,
  onNotify,
}) {
  return (
    <section
      className="cart-page-section"
      aria-label="Savat sahifasi"
      style={{ marginTop: 0, paddingTop: 0, borderTop: "none" }}
    >
      <div className="cart-page-top">
        <div>
          <span className="auth-badge">Savat</span>
          <h2 className="cart-page-title">Savatingiz</h2>
          <p className="cart-page-subtitle">
            {cartCount > 0
              ? `${cartCount} ta mahsulot tanlangan — buyurtmani rasmiylashtiring`
              : "Savatingiz hozircha bo‘sh — katalogdan mahsulot tanlang"}
          </p>
        </div>

        <button
          type="button"
          className="auth-back-btn"
          onClick={() => onNavigate?.("home")}
        >
          <ArrowLeftIcon />
          <span>Do‘konga qaytish</span>
        </button>
      </div>

      <div className="cart-page-grid">
        <div className="cart-items-card">
          <div className="cart-header">
            <h3 className="cart-title">
              <CartIcon />
              <span>Tanlangan mahsulotlar ({cartCount})</span>
            </h3>
            {cartItems.length > 0 && (
              <button
                type="button"
                className="btn-clear"
                onClick={onClearCart}
              >
                Savatni tozalash
              </button>
            )}
          </div>

          {cartItems.length === 0 ? (
            <div style={{ marginTop: "16px" }}>
              <EmptyState
                title="Savatingiz bo‘sh"
                description="Hozircha savatga hech qanday mahsulot qo‘shilmagan. Katalogdan o‘zingizga mos texnikani tanlang."
                actionLabel="Xaridni boshlash"
                onReset={() => onNavigate?.("home")}
              />
            </div>
          ) : (
            <ul className="cart-page-list">
              {cartItems.map((item) => (
                <CartItemCard
                  key={item.id}
                  item={item}
                  onIncrease={onIncrease}
                  onDecrease={onDecrease}
                  onRemove={onRemove}
                />
              ))}
            </ul>
          )}
        </div>

        <CartSummary
          key={currentUser?.id || "guest"}
          subtotal={subtotal}
          cartCount={cartCount}
          currentUser={currentUser}
          onCheckout={onCheckout}
          onNotify={onNotify}
        />
      </div>
    </section>
  );
}

export default CartPage;
