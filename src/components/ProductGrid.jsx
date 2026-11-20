import EmptyState from "./EmptyState";
import ProductCard from "./ProductCard";

function ProductGrid({
  products = [],
  cartItems = [],
  onToggleLike,
  onAddToCart,
  onResetFilters,
  onSelectProduct,
}) {
  if (products.length === 0) {
    return <EmptyState onReset={onResetFilters} />;
  }

  return (
    <section className="product-grid" aria-label="Mahsulotlar katalogi">
      {products.map((product) => {
        const cartEntry = cartItems.find(
          (item) => item.productId === product.id || item.id === product.id
        );
        const cartQuantity = cartEntry ? cartEntry.quantity : 0;

        return (
          <ProductCard
            key={product.id}
            product={product}
            cartQuantity={cartQuantity}
            onToggleLike={onToggleLike}
            onAddToCart={onAddToCart}
            onSelectProduct={onSelectProduct}
          />
        );
      })}
    </section>
  );
}

export default ProductGrid;
