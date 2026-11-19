import { TrashIcon } from "./Icons";

function OrderCard({ order, onCancelOrder, onDeleteOrder }) {
  const isCancelled = order.status === "Bekor qilindi";

  return (
    <article
      className={`order-card ${isCancelled ? "order-card--cancelled" : ""}`}
    >
      <div className="order-top">
        <span className="order-id">
          {order.id} — {order.customer}
        </span>
        <span
          className={`order-status ${
            isCancelled ? "order-status--cancelled" : ""
          }`}
        >
          {order.status}
        </span>
      </div>

      <p className="order-meta">{order.itemsSummary}</p>

      <div className="order-bottom">
        <span className="order-delivery">{order.delivery}</span>

        <div className="order-actions-right">
          <span className="order-total">{order.total}</span>

          {!isCancelled ? (
            <button
              type="button"
              className="order-cancel-btn"
              onClick={() => onCancelOrder?.(order.id)}
            >
              Bekor qilish
            </button>
          ) : (
            <button
              type="button"
              className="order-delete-btn"
              onClick={() => onDeleteOrder?.(order.id)}
              title="Ro‘yxatdan o‘chirish"
              aria-label="Buyurtmani o'chirish"
            >
              <TrashIcon />
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

export default OrderCard;
