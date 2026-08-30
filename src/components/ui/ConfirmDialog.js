import React from "react";

export default function ConfirmDialog({
  open,
  title = "Are you sure?",
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  variant = "danger",
  onConfirm,
  onCancel,
}) {
  if (!open) return null;

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
      style={{ background: "rgba(0,0,0,0.5)", zIndex: 2100 }}
      onClick={onCancel}
    >
      <div
        className="bg-body rounded-4 shadow-lg p-4"
        style={{ width: "90%", maxWidth: 400 }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-dialog-title"
      >
        <h5 id="confirm-dialog-title" className="fw-bold mb-2">
          {title}
        </h5>
        {message && <p className="text-muted small mb-4">{message}</p>}
        <div className="d-flex gap-2 justify-content-end">
          <button type="button" className="btn btn-light" onClick={onCancel}>
            {cancelLabel}
          </button>
          <button
            type="button"
            className={`btn btn-${variant}`}
            onClick={onConfirm}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
