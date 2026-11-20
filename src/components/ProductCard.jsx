import { formatPrice, parsePrice } from "../data/initialData";
import { CartIcon, DeviceIcon, HeartIcon, StarIcon } from "./Icons";

function ProductCard({
  product,
  cartQuantity = 0,
  onToggleLike,
  onAddToCart,
  onSelectProduct,
}) {
  const isOut = product.stock === 0;
  const isLow = product.stock > 0 && product.stock <= 2;
  const isMaxInCart = !isOut && cartQuantity >= product.stock;

  const basePrice = product.priceValue || parsePrice(product.price);
  const monthly12 = Math.round(basePrice / 12);
  const reviewCount = Array.isArray(product.reviews)
    ? product.reviews.length
    : 0;

  return (
    <article className="product-card">
      <div
        className={`product-visual ${isOut ? "product-visual--out" : ""}`}
        onClick={() => onSelectProduct?.(product.id)}
        style={{ cursor: "pointer" }}
      >
        <span
          className={`stock-badge ${
            isOut ? "stock-badge--out" : isLow ? "stock-badge--low" : ""
          }`}
        >
          {isOut ? "Tugagan" : `Omborda: ${product.stock} ta`}
        </span>

        <button
          type="button"
          className={`wishlist-btn ${product.liked ? "is-liked" : ""}`}
          aria-label="Sevimlilarga qo'shish"
          onClick={(e) => {
            e.stopPropagation();
            onToggleLike?.(product.id);
          }}
        >
          <HeartIcon filled={product.liked} />
        </button>

        {product.image ? (
          <img
            src={product.image}
            alt={product.title}
            className="product-image"
            loading="lazy"
          />
        ) : (
          <DeviceIcon type={product.icon} />
        )}

        <span className="product-quickview-pill">Batafsil ko‘rish</span>
      </div>

      <div className="product-body">
        <div className="product-meta">
          <span className="product-category">{product.category}</span>
          <span className="product-rating">
            <StarIcon />
            {product.rating}
            {reviewCount > 0 ? ` (${reviewCount})` : ""}
          </span>
        </div>

        <h3
          className="product-title product-title--clickable"
          onClick={() => onSelectProduct?.(product.id)}
        >
          {product.title}
        </h3>
        <p className="product-specs">{product.specs}</p>

        <div className="product-installment-badge">
          <span>Muddatli to‘lov:</span>
          <strong>{formatPrice(monthly12)} / 12 oy</strong>
        </div>

        <div className="product-footer">
          <span className="product-price">{product.price}</span>

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
                    : "Savatga"}
            </span>
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
