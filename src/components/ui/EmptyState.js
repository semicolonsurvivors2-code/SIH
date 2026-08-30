import React from "react";
import { FiInbox } from "react-icons/fi";

export default function EmptyState({
  icon,
  title = "Nothing here yet",
  description,
  action,
}) {
  return (
    <div className="text-center py-5">
      <div className="text-muted mb-3 d-flex justify-content-center">
        {icon || <FiInbox size={36} />}
      </div>
      <h6 className="fw-bold mb-1">{title}</h6>
      {description && <p className="text-muted small mb-3">{description}</p>}
      {action}
    </div>
  );
}
