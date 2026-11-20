import { useEffect, useState } from "react";
import { formatPrice, parsePrice } from "../data/initialData";
import {
  CartIcon,
  CheckCircleIcon,
  CloseIcon,
  DeviceIcon,
  HeartIcon,
  StarIcon,
} from "./Icons";

function ProductModal({
  product,
  cartQuantity = 0,
  currentUser = null,
  onClose,
  onToggleLike,
  onAddToCart,
  onAddReview,
}) {
  const [installmentMonths, setInstallmentMonths] = useState(12);
  const [reviewAuthor, setReviewAuthor] = useState(currentUser?.name || "");
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");
  const [reviewError, setReviewError] = useState("");

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape") {
        onClose?.();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!product) return null;

  const isOut = product.stock === 0;
  const isLow = product.stock > 0 && product.stock <= 2;
  const isMaxInCart = !isOut && cartQuantity >= product.stock;

  const basePrice = product.priceValue || parsePrice(product.price);
  const monthlyPayment = Math.round(basePrice / installmentMonths);
  const specsList = (product.specs || "")
    .split("•")
    .map((s) => s.trim())
    .filter(Boolean);
  const reviews = Array.isArray(product.reviews) ? product.reviews : [];

  function handleReviewSubmit(e) {
    e.preventDefault();
    const author = reviewAuthor.trim();
    const comment = reviewComment.trim();

    if (!author) {
      setReviewError("Iltimos, ismingizni kiriting.");
      return;
    }

    if (comment.length < 4) {
      setReviewError("Iltimos, fikringizni batafsilroq yozing.");
      return;
    }

    onAddReview?.(product.id, {
      author,
      rating: Number(reviewRating),
      comment,
    });

    setReviewComment("");
    setReviewError("");
  }

  return (
    <div
      className="modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose?.();
      }}
    >
      <div
        className="modal-card product-modal-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-modal-title"
      >
        <div className="modal-header">
          <div className="product-modal-head-meta">
            <span className="product-category">{product.category}</span>
            <span className="product-rating">
              <StarIcon />
              {product.rating} ({reviews.length} ta sharh)
            </span>
          </div>

          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Yopish"
          >
            <CloseIcon />
          </button>
        </div>

        <div className="product-modal-grid">
          <div className="product-modal-visual-col">
            <div
              className={`product-modal-image-wrap ${
                isOut ? "product-visual--out" : ""
              }`}
            >
              <span
                className={`stock-badge ${
                  isOut ? "stock-badge--out" : isLow ? "stock-badge--low" : ""
                }`}
              >
                {isOut ? "Tugagan" : `Omborda: ${product.stock} ta`}
              </span>

              {product.image ? (
                <img
                  src={product.image}
                  alt={product.title}
                  className="product-modal-image"
                />
              ) : (
                <DeviceIcon type={product.icon} />
              )}
            </div>

            <div className="product-modal-perks">
              <div className="product-perk-item">
                <CheckCircleIcon />
                <span>{product.warranty || "12 oy rasmiy kafolat"}</span>
              </div>
              <div className="product-perk-item">
                <CheckCircleIcon />
                <span>100% original va zavod qadog‘ida</span>
              </div>
            </div>
          </div>

          <div className="product-modal-info-col">
            <h2 id="product-modal-title" className="product-modal-title">
              {product.title}
            </h2>

            <p className="product-modal-desc">
              {product.description || product.specs}
            </p>

            <div className="product-specs-chips">
              {specsList.map((spec) => (
                <span key={spec} className="product-spec-chip">
                  {spec}
                </span>
              ))}
            </div>

            <div className="product-modal-price-box">
              <div>
                <span className="product-modal-price-label">To‘liq narxi</span>
                <p className="product-modal-price">{product.price}</p>
              </div>

              <div className="product-modal-actions">
                <button
                  type="button"
                  className={`wishlist-toggle ${product.liked ? "active" : ""}`}
                  onClick={() => onToggleLike?.(product.id)}
                >
                  <HeartIcon filled={product.liked} />
                  <span>{product.liked ? "Sevimlilarda" : "Sevimliga"}</span>
                </button>

                <button
                  type="button"
                  className={`btn-add-cart ${
                    isOut || isMaxInCart ? "is-disabled" : ""
                  }`}
                  disabled={isOut || isMaxInCart}
                  onClick={() => onAddToCart?.(product.id)}
                >
                  <CartIcon />
                  <span>
                    {isOut
                      ? "Mavjud emas"
                      : isMaxInCart
                        ? `Savatda (${cartQuantity})`
                        : cartQuantity > 0
                          ? `Savatga (${cartQuantity})`
                          : "Savatga qo‘shish"}
                  </span>
                </button>
              </div>
            </div>

            <div className="installment-box">
              <div className="installment-header">
                <span className="installment-title">
                  Muddatli to‘lov (0% ustama)
                </span>
                <div className="installment-tabs">
                  {[3, 6, 12].map((m) => (
                    <button
                      key={m}
                      type="button"
                      className={`installment-tab ${
                        installmentMonths === m ? "active" : ""
                      }`}
                      onClick={() => setInstallmentMonths(m)}
                    >
                      {m} oy
                    </button>
                  ))}
                </div>
              </div>

              <div className="installment-result">
                <span>Oyiga to‘lov:</span>
                <strong>
                  {formatPrice(monthlyPayment)} × {installmentMonths} oy
                </strong>
              </div>
            </div>
          </div>
        </div>

        <div className="product-reviews-section">
          <h4 className="product-reviews-heading">
            Mijozlar sharhlari ({reviews.length})
          </h4>

          <div className="product-reviews-list">
            {reviews.length === 0 ? (
              <p className="orders-empty-text">
                Hozircha sharhlar yo‘q. Birinchi bo‘lib fikr qoldiring!
              </p>
            ) : (
              reviews.map((rev) => (
                <div key={rev.id} className="review-card">
                  <div className="review-card-top">
                    <strong>{rev.author}</strong>
                    <div className="review-card-meta">
                      <span className="product-rating">
                        <StarIcon />
                        {rev.rating}.0
                      </span>
                      <span className="review-date">{rev.date}</span>
                    </div>
                  </div>
                  <p className="review-comment">{rev.comment}</p>
                </div>
              ))
            )}
          </div>

          <form className="review-form" onSubmit={handleReviewSubmit}>
            <p className="checkout-heading">Yangi sharh qoldirish</p>
            <div className="review-form-row">
              <input
                type="text"
                className="form-field"
                placeholder="Ismingiz"
                value={reviewAuthor}
                onChange={(e) => {
                  setReviewAuthor(e.target.value);
                  if (reviewError) setReviewError("");
                }}
              />

              <select
                className="sort-select"
                value={reviewRating}
                onChange={(e) => setReviewRating(Number(e.target.value))}
              >
                <option value={5}>★★★★★ (5 - A’lo)</option>
                <option value={4}>★★★★☆ (4 - Yaxshi)</option>
                <option value={3}>★★★☆☆ (3 - O‘rtacha)</option>
                <option value={2}>★★☆☆☆ (2 - Qoniqarsiz)</option>
                <option value={1}>★☆☆☆☆ (1 - Yomon)</option>
              </select>
            </div>

            <div className="review-form-bottom">
              <input
                type="text"
                className="form-field"
                placeholder="Mahsulot haqida fikringizni yozing..."
                value={reviewComment}
                onChange={(e) => {
                  setReviewComment(e.target.value);
                  if (reviewError) setReviewError("");
                }}
              />
              <button type="submit" className="btn-promo review-submit-btn">
                Fikr qoldirish
              </button>
            </div>

            {reviewError && (
              <p
                style={{
                  margin: 0,
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "var(--danger)",
                }}
              >
                {reviewError}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProductModal;
