import { useEffect, useState } from "react";
import { BagIcon, CloseIcon, HeartIcon, UserIcon } from "./Icons";

function getInitials(name = "") {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "FO";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
}

function ProfileModal({
  user,
  ordersCount = 0,
  likedCount = 0,
  onClose,
  onSaveProfile,
}) {
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape") {
        onClose?.();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!user) return null;

  const initials = getInitials(name || user.name);

  function handleSubmit(e) {
    e.preventDefault();

    if (!name.trim()) {
      setError("Iltimos, to‘liq ismingizni kiriting.");
      return;
    }

    if (!email.trim() || !email.includes("@")) {
      setError("Iltimos, elektron pochtani to‘g‘ri kiriting.");
      return;
    }

    if (!phone.trim() || phone.trim().length < 7) {
      setError("Iltimos, telefon raqamingizni kiriting.");
      return;
    }

    if (password && password.length < 6) {
      setError("Yangi parol kamida 6 ta belgidan iborat bo‘lishi kerak.");
      return;
    }

    const result = onSaveProfile?.({
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      password: password || undefined,
    });

    if (result && !result.success) {
      setError(result.message || "Saqlashda xatolik yuz berdi.");
    }
  }

  return (
    <div
      className="modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose?.();
      }}
    >
      <div
        className="modal-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="profile-modal-title"
      >
        <div className="modal-header">
          <div className="modal-user-summary">
            <span className="profile-avatar-lg">{initials}</span>
            <div>
              <h3 id="profile-modal-title" className="modal-title">
                Shaxsiy profil
              </h3>
              <p className="modal-subtitle">
                Ma’lumotlaringizni ko‘rish va tahrirlash
              </p>
            </div>
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

        <div className="profile-stats-row">
          <div className="profile-stat-box">
            <BagIcon />
            <div>
              <span className="profile-stat-value">{ordersCount} ta</span>
              <span className="profile-stat-label">Buyurtmalar</span>
            </div>
          </div>

          <div className="profile-stat-box">
            <HeartIcon filled />
            <div>
              <span className="profile-stat-value">{likedCount} ta</span>
              <span className="profile-stat-label">Sevimlilar</span>
            </div>
          </div>

          <div className="profile-stat-box">
            <UserIcon />
            <div>
              <span className="profile-stat-value">Faol</span>
              <span className="profile-stat-label">Hisob holati</span>
            </div>
          </div>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-field-group">
            <label className="auth-label" htmlFor="profile-name">
              To‘liq ism
            </label>
            <input
              id="profile-name"
              type="text"
              className="auth-input"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (error) setError("");
              }}
              placeholder="Azizbek Karimov"
            />
          </div>

          <div className="auth-row-2">
            <div className="auth-field-group">
              <label className="auth-label" htmlFor="profile-email">
                Elektron pochta
              </label>
              <input
                id="profile-email"
                type="email"
                className="auth-input"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError("");
                }}
                placeholder="azizbek@example.com"
              />
            </div>

            <div className="auth-field-group">
              <label className="auth-label" htmlFor="profile-phone">
                Telefon raqam
              </label>
              <input
                id="profile-phone"
                type="tel"
                className="auth-input"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  if (error) setError("");
                }}
                placeholder="+998 90 123 45 67"
              />
            </div>
          </div>

          <div className="auth-field-group">
            <label className="auth-label" htmlFor="profile-password">
              Yangi parol (o‘zgartirish ixtiyoriy)
            </label>
            <input
              id="profile-password"
              type="password"
              className="auth-input"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (error) setError("");
              }}
              placeholder="O‘zgartirmaslik uchun bo‘sh qoldiring"
            />
          </div>

          {error && (
            <p
              style={{
                margin: 0,
                fontSize: "13px",
                fontWeight: 600,
                color: "var(--danger)",
              }}
            >
              {error}
            </p>
          )}

          <div className="modal-actions">
            <button
              type="button"
              className="modal-btn-secondary"
              onClick={onClose}
            >
              Bekor qilish
            </button>
            <button type="submit" className="auth-submit-btn modal-btn-save">
              O‘zgarishlarni saqlash
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProfileModal;
