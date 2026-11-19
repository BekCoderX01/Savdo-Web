import FilterBar from "../components/FilterBar";
import OrdersSection from "../components/OrdersSection";
import ProductGrid from "../components/ProductGrid";

function HomePage({
  products = [],
  cartItems = [],
  orders = [],
  selectedCategory = "Hammasi",
  onCategoryChange,
  onlyLiked = false,
  onToggleOnlyLiked,
  sortBy = "default",
  onSortChange,
  searchQuery = "",
  onClearSearch,
  onToggleLike,
  onAddToCart,
  onResetFilters,
  onCancelOrder,
  onDeleteOrder,
}) {
  return (
    <>
      <FilterBar
        selectedCategory={selectedCategory}
        onCategoryChange={onCategoryChange}
        onlyLiked={onlyLiked}
        onToggleOnlyLiked={onToggleOnlyLiked}
        sortBy={sortBy}
        onSortChange={onSortChange}
        searchQuery={searchQuery}
        onClearSearch={onClearSearch}
        resultsCount={products.length}
      />
      <ProductGrid
        products={products}
        cartItems={cartItems}
        onToggleLike={onToggleLike}
        onAddToCart={onAddToCart}
        onResetFilters={onResetFilters}
      />
      <OrdersSection
        orders={orders}
        onCancelOrder={onCancelOrder}
        onDeleteOrder={onDeleteOrder}
      />
    </>
  );
}

export default HomePage;
