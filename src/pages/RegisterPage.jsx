import { useState } from "react";
import { ArrowLeftIcon } from "../components/Icons";

function RegisterPage({ onRegister, onNavigate }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!name.trim()) {
      setError("Iltimos, to‘liq ismingizni kiriting.");
      return;
    }

    if (!email.trim() || !email.includes("@")) {
      setError("Iltimos, elektron pochtangizni to‘g‘ri kiriting.");
      return;
    }

    if (!phone.trim() || phone.trim().length < 7) {
      setError("Iltimos, telefon raqamingizni kiriting.");
      return;
    }

    if (password.length < 6) {
      setError("Parol kamida 6 ta belgidan iborat bo‘lishi kerak.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Kiritilgan parollar bir-biriga mos kelmadi.");
      return;
    }

    const result = onRegister?.({
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      password,
    });

    if (result && !result.success) {
      setError(result.message || "Ro‘yxatdan o‘tishda xatolik yuz berdi.");
    } else {
      setError("");
    }
  }

  return (
    <div className="auth-card">
      <div className="auth-card-top">
        <span className="auth-badge">Ro‘yxatdan o‘tish</span>
        <button
          type="button"
          className="auth-back-btn"
          onClick={() => onNavigate?.("home")}
        >
          <ArrowLeftIcon />
          <span>Do‘konga qaytish</span>
        </button>
      </div>

      <h3 className="auth-title">Yangi hisob yaratish</h3>
      <p className="auth-desc">
        Tezkor buyurtma berish va sevimlilarni saqlash uchun ro‘yxatdan o‘ting.
      </p>

      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="auth-field-group">
          <label className="auth-label" htmlFor="register-name">
            To‘liq ism
          </label>
          <input
            id="register-name"
            type="text"
            className="auth-input"
            placeholder="Azizbek Karimov"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (error) setError("");
            }}
          />
        </div>

        <div className="auth-row-2">
          <div className="auth-field-group">
            <label className="auth-label" htmlFor="register-email">
              Elektron pochta
            </label>
            <input
              id="register-email"
              type="email"
              className="auth-input"
              placeholder="azizbek@example.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError("");
              }}
            />
          </div>

          <div className="auth-field-group">
            <label className="auth-label" htmlFor="register-phone">
              Telefon raqam
            </label>
            <input
              id="register-phone"
              type="tel"
              className="auth-input"
              placeholder="+998 90 123 45 67"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                if (error) setError("");
              }}
            />
          </div>
        </div>

        <div className="auth-row-2">
          <div className="auth-field-group">
            <label className="auth-label" htmlFor="register-password">
              Parol
            </label>
            <input
              id="register-password"
              type="password"
              className="auth-input"
              placeholder="Kamida 6 ta belgi"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (error) setError("");
              }}
            />
          </div>

          <div className="auth-field-group">
            <label className="auth-label" htmlFor="register-confirm">
              Parolni tasdiqlang
            </label>
            <input
              id="register-confirm"
              type="password"
              className="auth-input"
              placeholder="Parolni qayta kiriting"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                if (error) setError("");
              }}
            />
          </div>
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

        <button type="submit" className="auth-submit-btn">
          Ro‘yxatdan o‘tish
        </button>
      </form>

      <p className="auth-switch">
        Allaqachon hisobingiz bormi?{" "}
        <button
          type="button"
          className="auth-switch-link"
          onClick={() => onNavigate?.("login")}
        >
          Kirish
        </button>
      </p>
    </div>
  );
}

export default RegisterPage;
