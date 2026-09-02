import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaLock, FaMicrosoft } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "../context/AuthContext";

const dashboardPathFor = (role) =>
  role === "admin" ? "/admin" : role === "trainer" ? "/trainer" : "/dashboard";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login, socialLogin } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const result = await login(username, password);
    setLoading(false);
    if (result.success) {
      navigate(dashboardPathFor(result.user.role));
    } else {
      setError(result.error || "Login failed. Please try again.");
    }
  };

  const handleSocial = async (provider) => {
    setError("");
    setLoading(true);
    const result = await socialLogin(provider, "", "", "trainee"); // default role for social
    setLoading(false);
    if (result.success) navigate(dashboardPathFor(result.user.role));
  };

  return (
    <div className="min-vh-100 d-flex align-items-center bg-light">
      <div className="container">
        <div className="row justify-content-center align-items-center g-5">
          <div className="col-md-5">
            <div className="card shadow-lg p-4 p-md-5">
              <h3 className="fw-bold mb-1">Welcome Back!</h3>
              <p className="text-muted mb-4">
                Login to continue your learning journey
              </p>

              {error && (
                <div className="alert alert-danger py-2 small">{error}</div>
              )}

              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <label className="form-label small fw-semibold">
                    Username
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label small fw-semibold">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control form-control-lg"
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
                  <Link to="/forgot-password" className="small text-decoration-none">
                    Forgot password?
                  </Link>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary w-100 btn-lg"
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
          <div className="col-md-6 d-none d-md-block text-center">
            <div className="position-relative d-inline-block">
              <div className="bg-primary bg-opacity-10 rounded-4 p-5">
                <img
                  src="https://img.freepik.com/free-vector/computer-login-concept-illustration_114360-7892.jpg"
                  alt="Login"
                  className="img-fluid rounded-4"
                  style={{ maxHeight: 400 }}
                />
              </div>
              <div className="position-absolute top-0 end-0 bg-white p-3 rounded-circle shadow-sm">
                <FaLock className="text-primary" size={24} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
