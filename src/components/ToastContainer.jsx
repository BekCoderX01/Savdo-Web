import { AlertCircleIcon, CheckCircleIcon, CloseIcon } from "./Icons";

function ToastContainer({ toasts = [], onDismiss }) {
  if (toasts.length === 0) return null;

  return (
    <div className="toast-container" aria-live="polite">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`toast-item toast-item--${toast.type || "success"}`}
        >
          <span className="toast-icon">
            {toast.type === "danger" || toast.type === "warning" ? (
              <AlertCircleIcon />
            ) : (
              <CheckCircleIcon />
            )}
          </span>
          <span className="toast-message">{toast.message}</span>
          <button
            type="button"
            className="toast-close"
            onClick={() => onDismiss?.(toast.id)}
            aria-label="Yopish"
          >
            <CloseIcon />
          </button>
        </div>
      ))}
    </div>
  );
}

export default ToastContainer;
