import { DeviceIcon, TrashIcon } from "./Icons";

function CartItemCard({ item, onIncrease, onDecrease, onRemove }) {
  const isMaxStock = item.stock !== undefined && item.quantity >= item.stock;

  return (
    <li className="cart-page-item">
      <div className="cart-item-thumb">
        <DeviceIcon type={item.icon} />
      </div>

      <div className="cart-page-item-info">
        <span className="product-category">{item.category}</span>
        <p className="cart-page-item-name">{item.name}</p>
        <p className="cart-page-item-specs">{item.specs}</p>
        <p className="cart-page-item-unit">
          1 dona narxi: {item.unitPrice}
        </p>
      </div>

      <div className="cart-page-item-controls">
        <div className="qty-stepper">
          <button
            type="button"
            className="qty-btn"
            onClick={() => onDecrease?.(item.id)}
            aria-label="Miqdorni kamaytirish"
          >
            −
          </button>
          <span className="qty-value">{item.quantity}</span>
          <button
            type="button"
            className="qty-btn"
            onClick={() => onIncrease?.(item.id)}
            disabled={isMaxStock}
            title={
              isMaxStock
                ? `Omborda faqat ${item.stock} ta mavjud`
                : "Miqdorni oshirish"
            }
            style={
              isMaxStock ? { opacity: 0.4, cursor: "not-allowed" } : undefined
            }
            aria-label="Miqdorni oshirish"
          >
            +
          </button>
        </div>

        <span className="cart-page-item-subtotal">{item.subtotal}</span>

        <button
          type="button"
          className="btn-remove-item"
          aria-label="O'chirish"
          onClick={() => onRemove?.(item.id)}
        >
          <TrashIcon />
        </button>
      </div>
    </li>
  );
}

export default CartItemCard;
