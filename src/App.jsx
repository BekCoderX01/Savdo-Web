import { useCallback, useEffect, useMemo, useState } from "react";
import Header from "./components/Header";
import ProductModal from "./components/ProductModal";
import ProfileModal from "./components/ProfileModal";
import ToastContainer from "./components/ToastContainer";
import {
  INITIAL_CART,
  INITIAL_ORDERS,
  INITIAL_PRODUCTS,
  INITIAL_USERS,
  formatPrice,
  parsePrice,
} from "./data/initialData";
import CartPage from "./pages/CartPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

const STORAGE_VERSION = "texnobozor_v3_clean";

function ensureCleanStorageVersion() {
  try {
    if (localStorage.getItem("texnobozor_version") !== STORAGE_VERSION) {
      localStorage.removeItem("texnobozor_products");
      localStorage.removeItem("texnobozor_cart");
      localStorage.setItem("texnobozor_version", STORAGE_VERSION);
    }
  } catch {
    // ignore storage errors
  }
}

function loadFromStorage(key, fallback) {
  try {
    ensureCleanStorageVersion();
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function mergeWithInitialProducts(saved) {
  if (!Array.isArray(saved)) return INITIAL_PRODUCTS;

  const merged = saved.map((item) => {
    const initial = INITIAL_PRODUCTS.find((p) => p.id === item.id);
    if (!initial) return item;
    return {
      ...initial,
      ...item,
      image: initial.image,
      description: item.description || initial.description,
      warranty: item.warranty || initial.warranty,
      reviews:
        Array.isArray(item.reviews) && item.reviews.length > 0
          ? item.reviews
          : initial.reviews,
    };
  });

  const existingIds = new Set(merged.map((p) => p.id));
  const missingInitials = INITIAL_PRODUCTS.filter(
    (p) => !existingIds.has(p.id)
  );

  return [...merged, ...missingInitials];
}

function App() {
  const [products, setProducts] = useState(() =>
    mergeWithInitialProducts(
      loadFromStorage("texnobozor_products", INITIAL_PRODUCTS)
    )
  );
  const [cart, setCart] = useState(() =>
    loadFromStorage("texnobozor_cart", INITIAL_CART)
  );
  const [orders, setOrders] = useState(() =>
    loadFromStorage("texnobozor_orders", INITIAL_ORDERS)
  );
  const [users, setUsers] = useState(() =>
    loadFromStorage("texnobozor_users", INITIAL_USERS)
  );
  const [currentUser, setCurrentUser] = useState(() =>
    loadFromStorage("texnobozor_current_user", null)
  );
  const [theme, setTheme] = useState(() =>
    loadFromStorage("texnobozor_theme", "light")
  );

  const [activePage, setActivePage] = useState("home");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Hammasi");
  const [onlyLiked, setOnlyLiked] = useState(false);
  const [sortBy, setSortBy] = useState("default");
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = "success") => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    setToasts((prev) => [...prev.slice(-3), { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  }, []);

  const dismissToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  useEffect(() => {
    localStorage.setItem("texnobozor_products", JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem("texnobozor_cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("texnobozor_orders", JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem("texnobozor_users", JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(
        "texnobozor_current_user",
        JSON.stringify(currentUser)
      );
    } else {
      localStorage.removeItem("texnobozor_current_user");
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem("texnobozor_theme", JSON.stringify(theme));
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const likedCount = useMemo(
    () => products.filter((product) => product.liked).length,
    [products]
  );

  const selectedProduct = useMemo(
    () => products.find((p) => p.id === selectedProductId) || null,
    [products, selectedProductId]
  );

  const selectedProductCartQty = useMemo(() => {
    if (!selectedProductId) return 0;
    const found = cart.find((c) => c.productId === selectedProductId);
    return found ? found.quantity : 0;
  }, [cart, selectedProductId]);

  const filteredProducts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    const list = products.filter((product) => {
      const matchesCategory =
        selectedCategory === "Hammasi" ||
        product.category === selectedCategory;
      const matchesLike = !onlyLiked || product.liked;
      const matchesSearch =
        !q ||
        product.title.toLowerCase().includes(q) ||
        product.category.toLowerCase().includes(q) ||
        product.specs.toLowerCase().includes(q);

      return matchesCategory && matchesLike && matchesSearch;
    });

    if (sortBy === "price-asc") {
      return [...list].sort(
        (a, b) =>
          (a.priceValue || parsePrice(a.price)) -
          (b.priceValue || parsePrice(b.price))
      );
    }

    if (sortBy === "price-desc") {
      return [...list].sort(
        (a, b) =>
          (b.priceValue || parsePrice(b.price)) -
          (a.priceValue || parsePrice(a.price))
      );
    }

    return list;
  }, [products, selectedCategory, onlyLiked, searchQuery, sortBy]);

  const detailedCartItems = useMemo(() => {
    return cart
      .map((entry) => {
        const product = products.find((p) => p.id === entry.productId);
        if (!product) return null;
        const unitPriceVal = product.priceValue || parsePrice(product.price);
        const subtotalVal = unitPriceVal * entry.quantity;

        return {
          id: product.id,
          productId: product.id,
          name: product.title,
          category: product.category,
          specs: product.specs,
          unitPrice: formatPrice(unitPriceVal),
          priceValue: unitPriceVal,
          subtotal: formatPrice(subtotalVal),
          subtotalValue: subtotalVal,
          quantity: entry.quantity,
          stock: product.stock,
          icon: product.icon,
          image: product.image,
        };
      })
      .filter(Boolean);
  }, [cart, products]);

  const cartCount = useMemo(
    () => detailedCartItems.reduce((sum, item) => sum + item.quantity, 0),
    [detailedCartItems]
  );

  const cartSubtotal = useMemo(
    () => detailedCartItems.reduce((sum, item) => sum + item.subtotalValue, 0),
    [detailedCartItems]
  );

  function handleToggleTheme() {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    addToast(
      nextTheme === "dark" ? "Tungi rejim yoqildi" : "Kunduzgi rejim yoqildi",
      "info"
    );
  }

  function handleSearchChange(value) {
    setSearchQuery(value);
    if (activePage !== "home") {
      setActivePage("home");
    }
  }

  function handleToggleHeaderLikes() {
    if (activePage !== "home") {
      setActivePage("home");
      setOnlyLiked(true);
    } else {
      setOnlyLiked((prev) => !prev);
    }
  }

  function handleToggleLike(productId) {
    const target = products.find((p) => p.id === productId);
    setProducts((prev) =>
      prev.map((product) =>
        product.id === productId
          ? { ...product, liked: !product.liked }
          : product
      )
    );
    if (target) {
      addToast(
        !target.liked
          ? `«${target.title}» sevimlilarga qo‘shildi`
          : `«${target.title}» sevimlilardan olib tashlandi`,
        !target.liked ? "success" : "info"
      );
    }
  }

  function handleAddToCart(productId) {
    const targetProduct = products.find((p) => p.id === productId);
    if (!targetProduct || targetProduct.stock <= 0) return;

    const existing = cart.find((item) => item.productId === productId);
    if (existing && existing.quantity >= targetProduct.stock) {
      addToast(
        `Omborda faqat ${targetProduct.stock} dona «${targetProduct.title}» bor`,
        "warning"
      );
      return;
    }

    setCart((prev) => {
      const found = prev.find((item) => item.productId === productId);
      if (found) {
        if (found.quantity >= targetProduct.stock) return prev;
        return prev.map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { productId, quantity: 1 }];
    });

    addToast(`«${targetProduct.title}» savatga qo‘shildi`, "success");
  }

  function handleAddReview(productId, { author, rating, comment }) {
    const newReview = {
      id: `rev-${Date.now()}`,
      author,
      rating,
      date: "Bugun",
      comment,
    };

    setProducts((prev) =>
      prev.map((product) => {
        if (product.id !== productId) return product;
        const nextReviews = [newReview, ...(product.reviews || [])];
        const avg =
          nextReviews.reduce((acc, r) => acc + Number(r.rating || 5), 0) /
          nextReviews.length;

        return {
          ...product,
          reviews: nextReviews,
          rating: avg.toFixed(1),
        };
      })
    );

    addToast("Sharhingiz muvaffaqiyatli qo‘shildi!", "success");
  }

  function handleIncreaseCartQty(productId) {
    const targetProduct = products.find((p) => p.id === productId);
    if (!targetProduct) return;

    setCart((prev) =>
      prev.map((item) => {
        if (item.productId !== productId) return item;
        if (item.quantity >= targetProduct.stock) return item;
        return { ...item, quantity: item.quantity + 1 };
      })
    );
  }

  function handleDecreaseCartQty(productId) {
    const existing = cart.find((item) => item.productId === productId);
    const targetProduct = products.find((p) => p.id === productId);

    setCart((prev) =>
      prev
        .map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );

    if (existing && existing.quantity === 1 && targetProduct) {
      addToast(`«${targetProduct.title}» savatdan o‘chirildi`, "info");
    }
  }

  function handleRemoveFromCart(productId) {
    const targetProduct = products.find((p) => p.id === productId);
    setCart((prev) => prev.filter((item) => item.productId !== productId));
    if (targetProduct) {
      addToast(`«${targetProduct.title}» savatdan o‘chirildi`, "info");
    }
  }

  function handleClearCart() {
    setCart([]);
    addToast("Savat tozalandi", "info");
  }

  function handleNavigate(page, resetIfHome = false) {
    setActivePage(page);
    if (page === "home" && resetIfHome) {
      setOnlyLiked(false);
      setSelectedCategory("Hammasi");
      setSearchQuery("");
    }
  }

  function handleResetFilters() {
    setSearchQuery("");
    setSelectedCategory("Hammasi");
    setOnlyLiked(false);
    setSortBy("default");
  }

  function handleCheckout({ customerName, deliveryMethod, total }) {
    if (detailedCartItems.length === 0) return;

    const maxOrderNum = orders.reduce((max, order) => {
      const num = Number(String(order.id).replace(/[^\d]/g, "")) || 1020;
      return num > max ? num : max;
    }, 1024);

    const newOrderId = `#${maxOrderNum + 1}`;
    const orderedItems = detailedCartItems.map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
    }));

    const newOrder = {
      id: newOrderId,
      customer: customerName,
      itemsSummary: detailedCartItems
        .map((item) => `${item.name} (${item.quantity}x)`)
        .join(", "),
      items: orderedItems,
      delivery:
        deliveryMethod === "courier"
          ? "Kuryer orqali"
          : "Do‘kondan olib ketish",
      status: "Qabul qilindi",
      total: formatPrice(total),
    };

    setOrders((prev) => [newOrder, ...prev]);

    setProducts((prev) =>
      prev.map((product) => {
        const orderedItem = cart.find((c) => c.productId === product.id);
        if (!orderedItem) return product;
        return {
          ...product,
          stock: Math.max(0, product.stock - orderedItem.quantity),
        };
      })
    );

    setCart([]);
    setActivePage("home");
    addToast(
      `Buyurtma ${newOrderId} muvaffaqiyatli qabul qilindi!`,
      "success"
    );

    setTimeout(() => {
      document
        .getElementById("orders-section")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }

  function handleCancelOrder(orderId) {
    const targetOrder = orders.find((o) => o.id === orderId);
    if (!targetOrder || targetOrder.status === "Bekor qilindi") return;

    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status: "Bekor qilindi" } : order
      )
    );

    if (Array.isArray(targetOrder.items) && targetOrder.items.length > 0) {
      setProducts((prev) =>
        prev.map((product) => {
          const matched = targetOrder.items.find(
            (i) => i.productId === product.id
          );
          if (!matched) return product;
          return {
            ...product,
            stock: product.stock + matched.quantity,
          };
        })
      );
    }

    addToast(
      `Buyurtma ${orderId} bekor qilindi va mahsulotlar omborga qaytarildi`,
      "warning"
    );
  }

  function handleDeleteOrder(orderId) {
    setOrders((prev) => prev.filter((order) => order.id !== orderId));
    addToast(`Buyurtma ${orderId} ro‘yxatdan o‘chirildi`, "info");
  }

  function handleLogin({ email, password }) {
    const normalizedEmail = email.toLowerCase();
    const foundUser = users.find(
      (u) => u.email.toLowerCase() === normalizedEmail
    );

    if (!foundUser) {
      return {
        success: false,
        message:
          "Hisob topilmadi. Ro‘yxatdan o‘ting yoki azizbek@example.com (parol: 123456) bilan kiring.",
      };
    }

    const isDemoFallback =
      normalizedEmail === "azizbek@example.com" && password.length >= 4;

    if (foundUser.password !== password && !isDemoFallback) {
      return {
        success: false,
        message: "Kiritilgan parol noto‘g‘ri.",
      };
    }

    const safeUser = {
      id: foundUser.id,
      name: foundUser.name,
      email: foundUser.email,
      phone: foundUser.phone,
    };

    setCurrentUser(safeUser);
    setActivePage("home");
    addToast(`Xush kelibsiz, ${safeUser.name}!`, "success");
    return { success: true };
  }

  function handleRegister({ name, email, phone, password }) {
    const normalizedEmail = email.toLowerCase();
    const exists = users.some(
      (u) => u.email.toLowerCase() === normalizedEmail
    );

    if (exists) {
      return {
        success: false,
        message: "Ushbu elektron pochta allaqachon ro‘yxatdan o‘tgan.",
      };
    }

    const newUser = {
      id: Date.now(),
      name,
      email,
      phone,
      password,
    };

    setUsers((prev) => [...prev, newUser]);
    setCurrentUser({
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone,
    });
    setActivePage("home");
    addToast(`Hisob yaratildi! Xush kelibsiz, ${newUser.name}`, "success");
    return { success: true };
  }

  function handleSaveProfile({ name, email, phone, password }) {
    if (!currentUser) return { success: false };

    const normalizedEmail = email.toLowerCase();
    const duplicate = users.some(
      (u) =>
        u.id !== currentUser.id && u.email.toLowerCase() === normalizedEmail
    );

    if (duplicate) {
      return {
        success: false,
        message: "Bu elektron pochta boshqa foydalanuvchiga tegishli.",
      };
    }

    setUsers((prev) =>
      prev.map((u) => {
        if (u.id !== currentUser.id) return u;
        return {
          ...u,
          name,
          email,
          phone,
          password: password || u.password,
        };
      })
    );

    setCurrentUser((prev) => ({
      ...prev,
      name,
      email,
      phone,
    }));

    setIsProfileModalOpen(false);
    addToast("Profil ma’lumotlari muvaffaqiyatli saqlandi!", "success");
    return { success: true };
  }

  function handleGoOrders() {
    setActivePage("home");
    setTimeout(() => {
      document
        .getElementById("orders-section")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 80);
  }

  function handleGoLikes() {
    setActivePage("home");
    setOnlyLiked(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleLogout() {
    setCurrentUser(null);
    setIsProfileModalOpen(false);
    setActivePage("home");
    addToast("Hisobdan chiqdingiz", "info");
  }

  return (
    <div className="page-shell">
      <Header
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        likedCount={likedCount}
        onlyLiked={onlyLiked}
        onToggleLikes={handleToggleHeaderLikes}
        cartCount={cartCount}
        activePage={activePage}
        onNavigate={handleNavigate}
        currentUser={currentUser}
        ordersCount={orders.length}
        onOpenProfile={() => setIsProfileModalOpen(true)}
        onGoOrders={handleGoOrders}
        onGoLikes={handleGoLikes}
        onLogout={handleLogout}
        theme={theme}
        onToggleTheme={handleToggleTheme}
      />

      <main className="container main-content">
        {activePage === "home" && (
          <HomePage
            products={filteredProducts}
            totalProducts={products.length}
            cartItems={cart}
            orders={orders}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            onlyLiked={onlyLiked}
            onToggleOnlyLiked={() => setOnlyLiked((prev) => !prev)}
            sortBy={sortBy}
            onSortChange={setSortBy}
            searchQuery={searchQuery}
            onClearSearch={() => setSearchQuery("")}
            onToggleLike={handleToggleLike}
            onAddToCart={handleAddToCart}
            onResetFilters={handleResetFilters}
            onCancelOrder={handleCancelOrder}
            onDeleteOrder={handleDeleteOrder}
            onSelectProduct={setSelectedProductId}
            onNotify={addToast}
          />
        )}

        {activePage === "cart" && (
          <CartPage
            cartItems={detailedCartItems}
            subtotal={cartSubtotal}
            cartCount={cartCount}
            currentUser={currentUser}
            onIncrease={handleIncreaseCartQty}
            onDecrease={handleDecreaseCartQty}
            onRemove={handleRemoveFromCart}
            onClearCart={handleClearCart}
            onCheckout={handleCheckout}
            onNavigate={setActivePage}
            onNotify={addToast}
          />
        )}

        {activePage === "login" && (
          <section
            className="auth-section"
            aria-label="Hisobga kirish"
            style={{ maxWidth: "520px", margin: "0 auto" }}
          >
            <LoginPage onLogin={handleLogin} onNavigate={setActivePage} />
          </section>
        )}

        {activePage === "register" && (
          <section
            className="auth-section"
            aria-label="Ro'yxatdan o'tish"
            style={{ maxWidth: "560px", margin: "0 auto" }}
          >
            <RegisterPage
              onRegister={handleRegister}
              onNavigate={setActivePage}
            />
          </section>
        )}
      </main>

      {selectedProduct && (
        <ProductModal
          key={selectedProduct.id}
          product={selectedProduct}
          cartQuantity={selectedProductCartQty}
          currentUser={currentUser}
          onClose={() => setSelectedProductId(null)}
          onToggleLike={handleToggleLike}
          onAddToCart={handleAddToCart}
          onAddReview={handleAddReview}
        />
      )}

      {isProfileModalOpen && currentUser && (
        <ProfileModal
          key={currentUser.id}
          user={currentUser}
          ordersCount={orders.length}
          likedCount={likedCount}
          onClose={() => setIsProfileModalOpen(false)}
          onSaveProfile={handleSaveProfile}
        />
      )}

      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}

export default App;
