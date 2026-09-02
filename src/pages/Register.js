import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  FiUser,
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiAlertCircle,
} from "react-icons/fi";

const dashboardPathFor = (role) =>
  role === "admin" ? "/admin" : role === "trainer" ? "/trainer" : "/dashboard";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "trainee",
    agree: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Full name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = "Invalid email format";
    if (!form.password) newErrors.password = "Password is required";
    else if (form.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    if (form.password !== form.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    if (!form.agree) newErrors.agree = "You must agree to the terms";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setError("");
    setLoading(true);
    const result = await register({
      name: form.name,
      email: form.email,
      password: form.password,
      role: form.role,
    });
    setLoading(false);
    if (result.success) navigate(dashboardPathFor(result.user.role));
    else setError(result.error || "Registration failed");
  };

  return (
    <div className="register-page">
      <div className="register-overlay" />
      <div className="container position-relative py-4">
        <div className="row justify-content-center align-items-center min-vh-100">
          <div className="col-sm-11 col-md-8 col-lg-6">
            <div className="register-card">
              <div className="text-center mb-4">
                <div className="register-icon mx-auto mb-3">🎓</div>
                <h2 className="fw-bold mb-1">Create Account</h2>
                <p className="text-muted small mb-0">
                  Join Capacity Connect and start learning today.
                </p>
              </div>

              {error && (
                <div className="alert alert-danger py-2 small d-flex align-items-center gap-2 rounded-3">
                  <FiAlertCircle size={16} /> {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label small fw-semibold">
                    Full Name
                  </label>
                  <div className="input-group register-input">
                    <span className="input-group-text">
                      <FiUser size={16} />
                    </span>
                    <input
                      type="text"
                      name="name"
                      className={`form-control ${errors.name ? "is-invalid" : ""}`}
                      placeholder="John Doe"
                      value={form.name}
                      onChange={handleChange}
                    />
                    {errors.name && (
                      <div className="invalid-feedback">{errors.name}</div>
                    )}
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label small fw-semibold">
                    Email Address
                  </label>
                  <div className="input-group register-input">
                    <span className="input-group-text">
                      <FiMail size={16} />
                    </span>
                    <input
                      type="email"
                      name="email"
                      className={`form-control ${errors.email ? "is-invalid" : ""}`}
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={handleChange}
                    />
                    {errors.email && (
                      <div className="invalid-feedback">{errors.email}</div>
                    )}
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label small fw-semibold">Role</label>
                  <select
                    name="role"
                    className="form-select register-input"
                    value={form.role}
                    onChange={handleChange}
                  >
                    <option value="trainee">Learner / Trainee</option>
                    <option value="trainer">Trainer / Instructor</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label small fw-semibold">
                    Password
                  </label>
                  <div className="input-group register-input">
                    <span className="input-group-text">
                      <FiLock size={16} />
                    </span>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      className={`form-control ${errors.password ? "is-invalid" : ""}`}
                      placeholder="••••••••"
                      value={form.password}
                      onChange={handleChange}
                    />
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() => setShowPassword(!showPassword)}
                      tabIndex={-1}
                    >
                      {showPassword ? (
                        <FiEyeOff size={16} />
                      ) : (
                        <FiEye size={16} />
                      )}
                    </button>
                    {errors.password && (
                      <div className="invalid-feedback">{errors.password}</div>
                    )}
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label small fw-semibold">
                    Confirm Password
                  </label>
                  <div className="input-group register-input">
                    <span className="input-group-text">
                      <FiLock size={16} />
                    </span>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="confirmPassword"
                      className={`form-control ${errors.confirmPassword ? "is-invalid" : ""}`}
                      placeholder="••••••••"
                      value={form.confirmPassword}
                      onChange={handleChange}
                    />
                    {errors.confirmPassword && (
                      <div className="invalid-feedback">
                        {errors.confirmPassword}
                      </div>
                    )}
                  </div>
                </div>

                <div className="mb-3 form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="agree"
                    name="agree"
                    checked={form.agree}
                    onChange={handleChange}
                  />
                  <label className="form-check-label small" htmlFor="agree">
                    I agree to the <Link to="/terms">Terms of Service</Link> and{" "}
                    <Link to="/privacy">Privacy Policy</Link>
                  </label>
                  {errors.agree && (
                    <div className="text-danger small mt-1">{errors.agree}</div>
                  )}
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-lg w-100 register-button"
                  disabled={loading}
                >
                  {loading ? "Creating account..." : "Create Account"}
                </button>
              </form>

              <p className="text-center mt-4 mb-0 small text-muted">
                Already have an account?{" "}
                <Link to="/login" className="fw-semibold text-decoration-none">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .register-page { min-height: 100vh; position: relative; overflow-x: hidden; background-image: url("https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=2200&q=85"); background-size: cover; background-position: center; background-attachment: fixed; }
        .register-overlay { position: absolute; inset: 0; background: linear-gradient(135deg, rgba(4,46,105,.86), rgba(13,92,184,.60), rgba(255,255,255,.15)); backdrop-filter: blur(1px); }
        .register-card { background: rgba(255,255,255,.97); border: 1px solid rgba(255,255,255,.85); border-radius: 24px; padding: 2rem; box-shadow: 0 25px 70px rgba(0,31,75,.35); }
        .register-icon { width: 54px; height: 54px; display: grid; place-items: center; border-radius: 50%; background: #eaf3ff; font-size: 25px; }
        .register-input .input-group-text { background: #fbfdff; border-color: #d9e2ef; color: #7c8da6; }
        .register-input .form-control, .register-input.form-select { min-height: 50px; border-color: #d9e2ef; background: #fbfdff; }
        .register-input .form-control:focus, .register-input.form-select:focus { border-color: #0d6efd; box-shadow: 0 0 0 .2rem rgba(13,110,253,.12); background: #fff; }
        .register-button { min-height: 52px; border-radius: 10px; font-weight: 700; box-shadow: 0 8px 18px rgba(13,110,253,.25); }
        .register-social { min-height: 46px; border-radius: 10px; font-weight: 600; display: flex; align-items: center; justify-content: center; gap: 8px; }
        @media (max-width: 575.98px) { .register-card { padding: 1.35rem; border-radius: 18px; } .register-page { background-attachment: scroll; } }
      `}</style>
    </div>
  );
}
