import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiAlertCircle } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { FaMicrosoft } from "react-icons/fa";

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
  const { register, socialLogin } = useAuth();
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
    if (result.success) {
      navigate(dashboardPathFor(result.user.role));
    } else {
      setError(result.error || "Registration failed");
    }
  };

  const handleSocial = async (provider) => {
    setError("");
    setLoading(true);
    const result = await socialLogin(provider, "", "", form.role);
    setLoading(false);
    if (result.success) navigate(dashboardPathFor(result.user.role));
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center bg-light"
      style={{ minHeight: "calc(100vh - 64px)", padding: "2rem 1rem" }}
    >
      <div className="card shadow-sm" style={{ width: "100%", maxWidth: 480 }}>
        <div className="card-body p-4 p-md-5">
          <div className="text-center mb-4">
            <h3 className="fw-bold mb-1">Create Account</h3>
            <p className="text-muted small">
              Join Capacity Connect and start learning today.
            </p>
          </div>

          {error && (
            <div className="alert alert-danger py-2 small d-flex align-items-center gap-2">
              <FiAlertCircle size={16} /> {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label small fw-semibold">Full Name</label>
              <div className="input-group">
                <span className="input-group-text bg-white"><FiUser size={16} /></span>
                <input
                  type="text"
                  name="name"
                  className={`form-control ${errors.name ? "is-invalid" : ""}`}
                  placeholder="John Doe"
                  value={form.name}
                  onChange={handleChange}
                />
                {errors.name && <div className="invalid-feedback">{errors.name}</div>}
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label small fw-semibold">Email Address</label>
              <div className="input-group">
                <span className="input-group-text bg-white"><FiMail size={16} /></span>
                <input
                  type="email"
                  name="email"
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                />
                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label small fw-semibold">Role</label>
              <select
                name="role"
                className="form-select"
                value={form.role}
                onChange={handleChange}
              >
                <option value="trainee">Learner / Trainee</option>
                <option value="trainer">Trainer / Instructor</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label small fw-semibold">Password</label>
              <div className="input-group">
                <span className="input-group-text bg-white"><FiLock size={16} /></span>
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
                  {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                </button>
                {errors.password && <div className="invalid-feedback">{errors.password}</div>}
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label small fw-semibold">Confirm Password</label>
              <div className="input-group">
                <span className="input-group-text bg-white"><FiLock size={16} /></span>
                <input
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  className={`form-control ${errors.confirmPassword ? "is-invalid" : ""}`}
                  placeholder="••••••••"
                  value={form.confirmPassword}
                  onChange={handleChange}
                />
                {errors.confirmPassword && (
                  <div className="invalid-feedback">{errors.confirmPassword}</div>
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
                I agree to the{" "}
                <Link to="/terms">Terms of Service</Link> and{" "}
                <Link to="/privacy">Privacy Policy</Link>
              </label>
              {errors.agree && <div className="text-danger small mt-1">{errors.agree}</div>}
            </div>

            <button type="submit" className="btn btn-primary btn-lg w-100" disabled={loading}>
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </form>

          <div className="d-flex align-items-center gap-3 my-4">
            <hr className="flex-grow-1" />
            <span className="small text-muted">or sign up with</span>
            <hr className="flex-grow-1" />
          </div>

          <div className="d-flex gap-3">
            <button
              type="button"
              onClick={() => handleSocial("google")}
              className="btn btn-outline-secondary flex-grow-1 d-flex align-items-center justify-content-center gap-2"
              disabled={loading}
            >
              <FcGoogle size={20} /> Google
            </button>
            <button
              type="button"
              onClick={() => handleSocial("microsoft")}
              className="btn btn-outline-secondary flex-grow-1 d-flex align-items-center justify-content-center gap-2"
              disabled={loading}
            >
              <FaMicrosoft size={18} color="#00a4ef" /> Microsoft
            </button>
          </div>

          <p className="text-center mt-4 mb-0 small text-muted">
            Already have an account?{" "}
            <Link to="/login" className="fw-semibold text-decoration-none">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
