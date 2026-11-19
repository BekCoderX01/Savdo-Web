import { useState } from "react";
import { INITIAL_ORDERS } from "../data/initialData";
import OrderCard from "./OrderCard";

function OrdersSection({
  orders = INITIAL_ORDERS,
  onCancelOrder,
  onDeleteOrder,
}) {
  const [statusFilter, setStatusFilter] = useState("Hammasi");

  const filterTabs = ["Hammasi", "Qabul qilindi", "Bekor qilindi"];

  const filteredOrders = orders.filter((order) => {
    if (statusFilter === "Hammasi") return true;
    return order.status === statusFilter;
  });

  return (
    <section
      id="orders-section"
      className="orders-section"
      aria-label="So'nggi buyurtmalar"
    >
      <div className="orders-header">
        <div>
          <h2 className="orders-title">So‘nggi buyurtmalar</h2>
          <p className="orders-subtitle">
            Tasdiqlangan va boshqariladigan buyurtmalar ro‘yxati ({orders.length})
          </p>
        </div>

        <div className="orders-filter-tabs">
          {filterTabs.map((tab) => (
            <button
              key={tab}
              type="button"
              className={`filter-tab ${statusFilter === tab ? "active" : ""}`}
              onClick={() => setStatusFilter(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {filteredOrders.length === 0 ? (
        <p className="orders-empty-text">
          Tanlangan holat bo‘yicha buyurtmalar mavjud emas.
        </p>
      ) : (
        <div className="orders-grid">
          {filteredOrders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              onCancelOrder={onCancelOrder}
              onDeleteOrder={onDeleteOrder}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default OrdersSection;
