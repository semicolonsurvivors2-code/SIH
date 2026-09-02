import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaLock, FaEnvelope } from "react-icons/fa";
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
    <div className="lms-login-page">
      <div className="lms-login-overlay" />

      <div className="container position-relative py-4 py-lg-5">
        <div className="row align-items-center justify-content-center g-4 g-lg-5 min-vh-100">
          {/* LMS introduction */}
          <div className="col-lg-5 text-white lms-intro">
            <div className="mb-4">
              <div className="lms-brand">
                <span className="lms-brand-icon">🎓</span>
                <span>LearnHub LMS</span>
              </div>
            </div>

            <h1 className="display-5 fw-bold mb-3">
              Welcome Back to
              <br />
              Your Learning Hub
            </h1>

            <p className="lead mb-4">
              Access your courses, assignments, progress and everything you need
              to keep learning and growing.
            </p>

            <div className="lms-divider" />

            <p className="small mb-0 opacity-75">
              Learn anywhere. Track your progress. Build your future.
            </p>
          </div>

          {/* Login card */}
          <div className="col-sm-10 col-md-8 col-lg-5">
            <div className="lms-login-card">
              <div className="text-center mb-4">
                <div className="lms-login-icon mx-auto mb-3">
                  <FaLock size={22} />
                </div>
                <h2 className="fw-bold mb-1">Login to LMS</h2>
                <p className="text-muted small mb-0">
                  Sign in to continue your learning journey
                </p>
              </div>

              {error && (
                <div className="alert alert-danger py-2 small rounded-3">
                  {error}
                </div>
              )}

              <div
                className="btn-group w-100 mb-4 lms-role-switch"
                role="group"
              >
                {["trainee", "trainer", "admin"].map((r) => (
                  <button
                    key={r}
                    type="button"
                    className={`btn ${
                      role === r ? "btn-primary" : "btn-outline-primary"
                    }`}
                    onClick={() => setRole(r)}
                  >
                    {r.charAt(0).toUpperCase() + r.slice(1)}
                  </button>
                ))}
              </div>

              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <label className="form-label small fw-semibold">
                    Email or Phone
                  </label>
                  <div className="lms-input-wrapper">
                    <FaEnvelope className="lms-input-icon" />
                    <input
                      type="text"
                      className="form-control lms-input"
                      placeholder="Enter your email or phone"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label small fw-semibold">
                    Password
                  </label>
                  <div className="lms-input-wrapper">
                    <FaLock className="lms-input-icon" />
                    <input
                      type="password"
                      className="form-control lms-input"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
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
                      Remember me
                    </label>
                  </div>
                  <Link
                    to="/forgot-password"
                    className="small text-decoration-none fw-semibold"
                  >
                    Forgot password?
                  </Link>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100 lms-login-button"
                  disabled={loading}
                >
                  {loading ? "Signing in..." : "Login"}
                </button>
              </form>

              <div className="d-flex align-items-center gap-3 my-4">
                <hr className="flex-grow-1 m-0" />
                <span className="small text-muted text-nowrap">
                  or continue with
                </span>
                <hr className="flex-grow-1 m-0" />
              </div>

              <p className="text-center mt-4 mb-0 small text-muted">
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
        .lms-login-page {
          min-height: 100vh;
          position: relative;
          overflow: hidden;
          background-image: url("https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=2200&q=85");
          background-size: cover;
          background-position: center;
          background-attachment: fixed;
        }

        .lms-login-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, rgba(4, 46, 105, 0.86), rgba(13, 92, 184, 0.58), rgba(255, 255, 255, 0.18));
          backdrop-filter: blur(1px);
        }

        .lms-intro {
          padding: 2rem 1rem;
          text-shadow: 0 2px 14px rgba(0, 0, 0, 0.25);
        }

        .lms-brand {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-size: 1.25rem;
          font-weight: 700;
        }

        .lms-brand-icon {
          width: 42px;
          height: 42px;
          display: grid;
          place-items: center;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.18);
          border: 1px solid rgba(255, 255, 255, 0.3);
          backdrop-filter: blur(8px);
        }

        .lms-divider {
          width: 55px;
          height: 4px;
          border-radius: 10px;
          background: #fff;
          margin: 1.5rem 0;
        }

        .lms-login-card {
          background: rgba(255, 255, 255, 0.97);
          border: 1px solid rgba(255, 255, 255, 0.8);
          border-radius: 24px;
          padding: 2rem;
          box-shadow: 0 25px 70px rgba(0, 31, 75, 0.32);
        }

        .lms-login-icon {
          width: 52px;
          height: 52px;
          display: grid;
          place-items: center;
          border-radius: 50%;
          color: #0d6efd;
          background: #eaf3ff;
        }

        .lms-role-switch .btn {
          font-size: 0.85rem;
          font-weight: 600;
          padding: 0.65rem 0.5rem;
        }

        .lms-input-wrapper {
          position: relative;
        }

        .lms-input-icon {
          position: absolute;
          left: 15px;
          top: 50%;
          transform: translateY(-50%);
          color: #7c8da6;
          z-index: 2;
          font-size: 0.9rem;
        }

        .lms-input {
          min-height: 50px;
          padding-left: 42px;
          border-radius: 10px;
          border-color: #d9e2ef;
          background: #fbfdff;
        }

        .lms-input:focus {
          border-color: #0d6efd;
          box-shadow: 0 0 0 0.2rem rgba(13, 110, 253, 0.12);
          background: #fff;
        }

        .lms-login-button {
          min-height: 52px;
          border-radius: 10px;
          font-weight: 700;
          box-shadow: 0 8px 18px rgba(13, 110, 253, 0.25);
        }

        .lms-social-button {
          min-height: 46px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          border-radius: 10px;
          font-weight: 600;
        }

        @media (max-width: 991.98px) {
          .lms-intro {
            text-align: center;
            padding-bottom: 0;
          }

          .lms-divider {
            margin: 1.25rem auto;
          }

          .lms-login-page {
            background-position: center;
          }

          .lms-login-overlay {
            background: linear-gradient(135deg, rgba(4, 46, 105, 0.86), rgba(13, 92, 184, 0.7));
          }
        }

        @media (max-width: 575.98px) {
          .lms-login-card {
            padding: 1.4rem;
            border-radius: 18px;
          }

          .lms-intro h1 {
            font-size: 2rem;
          }

          .lms-intro .lead {
            font-size: 0.95rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Login;
