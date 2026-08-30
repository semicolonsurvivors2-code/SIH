import React from "react";
import { Link } from "react-router-dom";
import { FiHome } from "react-icons/fi";

export default function NotFound() {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center text-center py-5" style={{ minHeight: "60vh" }}>
      <div className="display-1 fw-bold text-primary mb-2">404</div>
      <h4 className="fw-bold mb-2">Page not found</h4>
      <p className="text-muted mb-4" style={{ maxWidth: 400 }}>
        The page you're looking for doesn't exist or may have been moved.
      </p>
      <Link to="/" className="btn btn-primary d-flex align-items-center gap-2">
        <FiHome size={16} /> Back to Home
      </Link>
    </div>
  );
}
