import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaLock } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

const dashboardPathFor = (role) =>
  role === "admin" ? "/admin" : role === "trainer" ? "/trainer" : "/dashboard";

const Login = () => {
  const [role, setRole] = useState("trainee");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const result = await login(email, password, role);
    setLoading(false);
    if (result.success) {
      navigate(dashboardPathFor(result.user.role));
    } else {
      setError(result.error || "Login failed. Please try again.");
    }
  };

  return (
    <div className="register-page d-flex align-items-center">
      <div className="register-overlay"></div>

      <div className="container position-relative" style={{ zIndex: 1 }}>
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <div className="register-card">
              <div className="d-flex align-items-center gap-3 mb-3">
                <div className="register-icon">
                  <FaLock className="text-primary" size={22} />
                </div>
                <div>
                  <h3 className="fw-bold mb-0">Welcome Back!</h3>
                  <p className="text-muted small mb-0">
                    Login to continue your learning journey
                  </p>
                </div>
              </div>

              {error && (
                <div className="alert alert-danger py-2 small">{error}</div>
              )}

              <div className="btn-group w-100 mb-4">
                {["trainee", "trainer", "admin"].map((r) => (
                  <button
                    key={r}
                    type="button"
                    className={`btn ${role === r ? "btn-primary" : "btn-outline-primary"}`}
                    onClick={() => setRole(r)}
                  >
                    {r.charAt(0).toUpperCase() + r.slice(1)}
                  </button>
                ))}
              </div>

              <form onSubmit={handleLogin}>
                <div className="mb-3 register-input">
                  <label className="form-label small fw-semibold">
                    Email or Phone
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter your email or phone"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3 register-input">
                  <label className="form-label small fw-semibold">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="remember"
                    />
                    <label
                      className="form-check-label small"
                      htmlFor="remember"
                    >
                      Remember Me
                    </label>
                  </div>
                  <Link
                    to="/forgot-password"
                    className="small text-decoration-none"
                  >
                    Forgot password?
                  </Link>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary w-100 register-button"
                  disabled={loading}
                >
                  {loading ? "Signing in..." : "Login"}
                </button>
              </form>

              <div className="d-flex align-items-center gap-3 my-4">
                <hr className="flex-grow-1" />
                <span className="small text-muted">or continue with</span>
                <hr className="flex-grow-1" />
              </div>

              <p className="text-center mb-0 small text-muted">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="text-primary text-decoration-none fw-semibold"
                >
                  Register
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
};

export default Login;
