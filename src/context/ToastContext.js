import React, { createContext, useCallback, useContext, useState } from "react";
import { FiCheckCircle, FiAlertCircle, FiInfo, FiX } from "react-icons/fi";

const ToastContext = createContext(null);

const ICONS = {
  success: <FiCheckCircle className="text-success" size={18} />,
  error: <FiAlertCircle className="text-danger" size={18} />,
  info: <FiInfo className="text-primary" size={18} />,
};

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const dismiss = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(
    (message, type = "info", duration = 3500) => {
      const id = crypto.randomUUID();
      setToasts((prev) => [...prev, { id, message, type }]);
      if (duration) setTimeout(() => dismiss(id), duration);
      return id;
    },
    [dismiss],
  );

  return (
    <ToastContext.Provider value={{ showToast, dismiss }}>
      {children}
      <div
        className="position-fixed d-flex flex-column gap-2"
        style={{ bottom: "1.25rem", right: "1.25rem", zIndex: 2000, maxWidth: 340 }}
      >
        {toasts.map((t) => (
          <div
            key={t.id}
            className="d-flex align-items-start gap-2 bg-white shadow rounded-3 p-3"
            role="alert"
          >
            {ICONS[t.type] || ICONS.info}
            <div className="small flex-grow-1">{t.message}</div>
            <button
              type="button"
              className="btn btn-sm btn-link p-0 text-muted"
              onClick={() => dismiss(t.id)}
              aria-label="Dismiss notification"
            >
              <FiX size={16} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within a ToastProvider");
  return ctx;
}
