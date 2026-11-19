import {
  CartIcon,
  HeartIcon,
  MoonIcon,
  SearchIcon,
  SunIcon,
  UserIcon,
} from "./Icons";
import ProfileDropdown from "./ProfileDropdown";

function Header({
  searchQuery = "",
  onSearchChange,
  likedCount = 0,
  onlyLiked = false,
  onToggleLikes,
  cartCount = 0,
  activePage = "home",
  onNavigate,
  currentUser = null,
  ordersCount = 0,
  onOpenProfile,
  onGoOrders,
  onGoLikes,
  onLogout,
  theme = "light",
  onToggleTheme,
}) {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <div
          className="brand"
          onClick={() => onNavigate?.("home")}
          style={{ cursor: "pointer" }}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              onNavigate?.("home");
            }
          }}
        >
          <div className="brand-mark">TB</div>
          <div>
            <p className="brand-title">TexnoBozor</p>
            <p className="brand-subtitle">Zamonaviy texnika do‘koni</p>
          </div>
        </div>

        <div className="header-search">
          <span className="header-search-icon">
            <SearchIcon />
          </span>
          <input
            type="text"
            className="header-search-input"
            placeholder="Mahsulot nomi bo‘yicha qidirish..."
            value={searchQuery}
            onChange={(e) => onSearchChange?.(e.target.value)}
          />
        </div>

        <div className="header-actions">
          <button
            type="button"
            className="header-pill theme-toggle-btn"
            onClick={onToggleTheme}
            title={theme === "dark" ? "Kunduzgi rejim" : "Tungi rejim"}
            aria-label={theme === "dark" ? "Kunduzgi rejim" : "Tungi rejim"}
          >
            {theme === "dark" ? <SunIcon /> : <MoonIcon />}
          </button>

          <button
            type="button"
            className={`header-pill ${
              onlyLiked && activePage === "home" ? "header-pill--brand" : ""
            }`}
            onClick={onToggleLikes}
          >
            <HeartIcon filled />
            <span>Sevimlilar</span>
            <span className="pill-count">{likedCount}</span>
          </button>

          <button
            type="button"
            className="header-pill header-pill--dark"
            onClick={() => onNavigate?.("cart")}
          >
            <CartIcon />
            <span>Savat</span>
            <span className="pill-count">{cartCount}</span>
          </button>

          <div className="header-divider" aria-hidden="true" />

          {currentUser ? (
            <ProfileDropdown
              user={currentUser}
              ordersCount={ordersCount}
              likedCount={likedCount}
              onGoProfile={onOpenProfile}
              onGoOrders={onGoOrders}
              onGoLikes={onGoLikes}
              onLogout={onLogout}
            />
          ) : (
            <>
              <button
                type="button"
                className="header-pill"
                onClick={() => onNavigate?.("login")}
              >
                <UserIcon />
                <span>Kirish</span>
              </button>

              <button
                type="button"
                className="header-pill header-pill--brand"
                onClick={() => onNavigate?.("register")}
              >
                <span>Ro‘yxatdan o‘tish</span>
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
