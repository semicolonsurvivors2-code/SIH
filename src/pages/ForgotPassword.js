import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiMail, FiCheckCircle, FiArrowLeft } from "react-icons/fi";
import { useToast } from "../context/ToastContext";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const { showToast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return setError("Email is required");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return setError("Enter a valid email address");
    setError("");
    setLoading(true);
    // Frontend-only mock — wire this up to your backend's password reset
    // endpoint when one exists. No email is actually sent.
    await new Promise((r) => setTimeout(r, 700));
    setLoading(false);
    setSent(true);
    showToast("If that email exists, a reset link has been sent.", "success");
  };

  return (
    <div className="d-flex align-items-center justify-content-center bg-light" style={{ minHeight: "calc(100vh - 64px)", padding: "2rem 1rem" }}>
      <div className="card shadow-sm" style={{ width: "100%", maxWidth: 420 }}>
        <div className="card-body p-4 p-md-5">
          <Link to="/login" className="d-inline-flex align-items-center gap-1 text-decoration-none small text-muted mb-3">
            <FiArrowLeft size={14} /> Back to login
          </Link>

          {sent ? (
            <div className="text-center py-3">
              <FiCheckCircle size={44} className="text-success mb-3" />
              <h5 className="fw-bold mb-2">Check your email</h5>
              <p className="text-muted small mb-0">
                We've sent password reset instructions to <strong>{email}</strong> if
                an account with that address exists.
              </p>
            </div>
          ) : (
            <>
              <h4 className="fw-bold mb-1">Forgot Password?</h4>
              <p className="text-muted small mb-4">
                Enter your email and we'll send you a link to reset your password.
              </p>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label small fw-semibold">Email</label>
                  <div className="input-group">
                    <span className="input-group-text bg-white"><FiMail size={16} /></span>
                    <input
                      type="email"
                      className={`form-control ${error ? "is-invalid" : ""}`}
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => { setEmail(e.target.value); setError(""); }}
                    />
                    {error && <div className="invalid-feedback">{error}</div>}
                  </div>
                </div>
                <button type="submit" className="btn btn-primary w-100 btn-lg" disabled={loading}>
                  {loading ? "Sending..." : "Send Reset Link"}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
