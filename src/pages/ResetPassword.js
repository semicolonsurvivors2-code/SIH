import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiLock, FiCheckCircle } from "react-icons/fi";
import { useToast } from "../context/ToastContext";

function strengthOf(pw) {
  let score = 0;
  if (pw.length >= 6) score++;
  if (pw.length >= 10) score++;
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) score++;
  if (/\d/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  return score; // 0-5
}

const LABELS = ["Very weak", "Weak", "Fair", "Good", "Strong", "Very strong"];
const COLORS = ["danger", "danger", "warning", "warning", "success", "success"];

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [errors, setErrors] = useState({});
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();
  const navigate = useNavigate();
  const score = strengthOf(password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!password) newErrors.password = "Password is required";
    else if (password.length < 6) newErrors.password = "Must be at least 6 characters";
    if (password !== confirm) newErrors.confirm = "Passwords do not match";
    setErrors(newErrors);
    if (Object.keys(newErrors).length) return;

    setLoading(true);
    // Frontend-only mock — connect to your backend's reset-confirm endpoint
    // (using the token from the reset link's query string) when available.
    await new Promise((r) => setTimeout(r, 700));
    setLoading(false);
    setDone(true);
    showToast("Password reset successfully.", "success");
    setTimeout(() => navigate("/login"), 1500);
  };

  return (
    <div className="d-flex align-items-center justify-content-center bg-light" style={{ minHeight: "calc(100vh - 64px)", padding: "2rem 1rem" }}>
      <div className="card shadow-sm" style={{ width: "100%", maxWidth: 420 }}>
        <div className="card-body p-4 p-md-5">
          {done ? (
            <div className="text-center py-3">
              <FiCheckCircle size={44} className="text-success mb-3" />
              <h5 className="fw-bold mb-2">Password Reset!</h5>
              <p className="text-muted small mb-0">Redirecting you to login...</p>
            </div>
          ) : (
            <>
              <h4 className="fw-bold mb-1">Set a New Password</h4>
              <p className="text-muted small mb-4">
                Choose a strong password you haven't used before.
              </p>
              <form onSubmit={handleSubmit}>
                <div className="mb-2">
                  <label className="form-label small fw-semibold">New Password</label>
                  <div className="input-group">
                    <span className="input-group-text bg-white"><FiLock size={16} /></span>
                    <input
                      type="password"
                      className={`form-control ${errors.password ? "is-invalid" : ""}`}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                    />
                    {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                  </div>
                </div>

                {password && (
                  <div className="mb-3">
                    <div className="progress" style={{ height: 6 }}>
                      <div
                        className={`progress-bar bg-${COLORS[score]}`}
                        style={{ width: `${(score / 5) * 100}%` }}
                      />
                    </div>
                    <div className={`small text-${COLORS[score]} mt-1`}>{LABELS[score]}</div>
                  </div>
                )}

                <div className="mb-3">
                  <label className="form-label small fw-semibold">Confirm Password</label>
                  <div className="input-group">
                    <span className="input-group-text bg-white"><FiLock size={16} /></span>
                    <input
                      type="password"
                      className={`form-control ${errors.confirm ? "is-invalid" : ""}`}
                      value={confirm}
                      onChange={(e) => setConfirm(e.target.value)}
                      placeholder="••••••••"
                    />
                    {errors.confirm && <div className="invalid-feedback">{errors.confirm}</div>}
                  </div>
                </div>

                <button type="submit" className="btn btn-primary w-100 btn-lg" disabled={loading}>
                  {loading ? "Resetting..." : "Reset Password"}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
