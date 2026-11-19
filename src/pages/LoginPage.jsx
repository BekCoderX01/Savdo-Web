import { useState } from "react";
import { ArrowLeftIcon } from "../components/Icons";

function LoginPage({ onLogin, onNavigate }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!email.trim()) {
      setError("Iltimos, elektron pochtangizni kiriting.");
      return;
    }

    if (!password) {
      setError("Iltimos, parolingizni kiriting.");
      return;
    }

    const result = onLogin?.({
      email: email.trim(),
      password,
      rememberMe,
    });

    if (result && !result.success) {
      setError(result.message || "Email yoki parol noto‘g‘ri.");
    } else {
      setError("");
    }
  }

  return (
    <div className="auth-card">
      <div className="auth-card-top">
        <span className="auth-badge">Kirish</span>
        <button
          type="button"
          className="auth-back-btn"
          onClick={() => onNavigate?.("home")}
        >
          <ArrowLeftIcon />
          <span>Do‘konga qaytish</span>
        </button>
      </div>

      <h3 className="auth-title">Hisobga kirish</h3>
      <p className="auth-desc">
        Buyurtmalar tarixi va savatingizni ko‘rish uchun hisobingizga kiring.
      </p>

      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="auth-field-group">
          <label className="auth-label" htmlFor="login-email">
            Elektron pochta
          </label>
          <input
            id="login-email"
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
          <label className="auth-label" htmlFor="login-password">
            Parol
          </label>
          <input
            id="login-password"
            type="password"
            className="auth-input"
            placeholder="Parolingizni kiriting (demo: 123456)"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (error) setError("");
            }}
          />
        </div>

        <label className="auth-checkbox-row">
          <input
            type="checkbox"
            className="auth-checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          <span>Meni eslab qol</span>
        </label>

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
          Kirish
        </button>
      </form>

      <p className="auth-switch">
        Hali hisobingiz yo‘qmi?{" "}
        <button
          type="button"
          className="auth-switch-link"
          onClick={() => onNavigate?.("register")}
        >
          Ro‘yxatdan o‘tish
        </button>
      </p>
    </div>
  );
}

export default LoginPage;
