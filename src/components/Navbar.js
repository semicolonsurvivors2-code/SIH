import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaGraduationCap } from "react-icons/fa";
import { FiSearch, FiBell, FiMoon, FiSun, FiUser, FiSettings, FiLogOut } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { notifications } from "../data/notifications";

const dashboardPathFor = (role) =>
  role === "admin" ? "/admin" : role === "trainer" ? "/trainer" : "/dashboard";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) navigate(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  const navLinkClass = ({ isActive }) =>
    `cc-nav-link${isActive ? " active" : ""}`;

  const initials = (user?.name || "U")
    .split(" ")
    .map((s) => s[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <>
      <nav className="cc-navbar navbar navbar-expand-lg sticky-top">
        <div className="container-fluid cc-navbar-inner px-3 px-lg-4">
          <Link className="cc-brand" to="/" aria-label="Capacity Connect home">
            <span className="cc-brand-mark">
              <FaGraduationCap size={21} />
            </span>
            <span className="cc-brand-text">
              <strong>CAPACITY</strong>
              <small>CONNECT • LMS</small>
            </span>
          </Link>

          <button
            className="cc-toggler navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#nav"
            aria-controls="nav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="nav">
            <ul className="navbar-nav mx-auto cc-nav-list">
              <li className="nav-item"><NavLink className={navLinkClass} to="/" end>Home</NavLink></li>
              <li className="nav-item"><NavLink className={navLinkClass} to="/courses">Courses</NavLink></li>
              <li className="nav-item"><NavLink className={navLinkClass} to="/trainers">Trainers</NavLink></li>
              <li className="nav-item"><NavLink className={navLinkClass} to="/about">About Us</NavLink></li>
              <li className="nav-item"><NavLink className={navLinkClass} to="/contact">Contact</NavLink></li>
            </ul>

            <form onSubmit={handleSearch} className="cc-search cc-search-desktop">
              <FiSearch size={17} />
              <input
                type="search"
                placeholder="Search courses..."
                aria-label="Search courses"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </form>

            <form onSubmit={handleSearch} className="cc-search cc-search-mobile">
              <FiSearch size={17} />
              <input
                type="search"
                placeholder="Search courses..."
                aria-label="Search courses"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </form>

            <div className="cc-actions">
              <button
                type="button"
                className="cc-icon-btn"
                onClick={toggleTheme}
                aria-label="Toggle dark mode"
                title="Toggle dark mode"
              >
                {theme === "dark" ? <FiSun size={17} /> : <FiMoon size={17} />}
              </button>

              {user ? (
                <>
                  <div className="dropdown">
                    <button
                      className="cc-icon-btn position-relative"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      aria-label="Notifications"
                    >
                      <FiBell size={17} />
                      {unreadCount > 0 && (
                        <span className="cc-notification-badge">{unreadCount}</span>
                      )}
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end cc-dropdown shadow">
                      {notifications.slice(0, 3).map((n) => (
                        <li key={n.id} className="px-3 py-2 border-bottom small">
                          <div className="fw-semibold">{n.title}</div>
                          <div className="text-muted" style={{ fontSize: "0.75rem" }}>{n.message}</div>
                        </li>
                      ))}
                      <li>
                        <Link className="dropdown-item small text-primary text-center py-2" to="/notifications">
                          View all notifications
                        </Link>
                      </li>
                    </ul>
                  </div>

                  <div className="dropdown">
                    <button
                      className="cc-profile-btn"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <span className="cc-avatar">{initials}</span>
                      <span className="cc-user-name">{user.name}</span>
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end cc-dropdown shadow">
                      <li><Link to={dashboardPathFor(user.role)} className="dropdown-item">Dashboard</Link></li>
                      <li><Link to="/profile" className="dropdown-item d-flex align-items-center gap-2"><FiUser size={14} /> Profile</Link></li>
                      <li><Link to="/settings" className="dropdown-item d-flex align-items-center gap-2"><FiSettings size={14} /> Settings</Link></li>
                      <li><hr className="dropdown-divider" /></li>
                      <li><button className="dropdown-item d-flex align-items-center gap-2 text-danger" onClick={handleLogout}><FiLogOut size={14} /> Logout</button></li>
                    </ul>
                  </div>
                </>
              ) : (
                <div className="cc-auth-actions">
                  <Link to="/login" className="cc-login-btn">Login</Link>
                  <Link to="/register" className="cc-register-btn">Register</Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      <style>{`
        .cc-navbar {
          min-height: 72px;
          background: rgba(255, 255, 255, 0.97);
          border-bottom: 1px solid #e9eef5;
          box-shadow: 0 8px 30px rgba(15, 23, 42, 0.07);
          z-index: 1030;
        }
        .cc-navbar-inner {
          max-width: 1500px;
          min-height: 72px;
          margin: 0 auto;
        }
        .cc-brand {
          display: inline-flex;
          align-items: center;
          gap: 11px;
          color: #0f172a;
          text-decoration: none;
          flex-shrink: 0;
        }
        .cc-brand-mark {
          width: 44px;
          height: 44px;
          display: grid;
          place-items: center;
          color: #fff;
          border-radius: 14px;
          background: linear-gradient(135deg, #2563eb, #4f46e5);
          box-shadow: 0 7px 18px rgba(37, 99, 235, 0.28);
          transform: rotate(-2deg);
        }
        .cc-brand-text {
          display: flex;
          flex-direction: column;
          line-height: 1;
          letter-spacing: 0.04em;
        }
        .cc-brand-text strong { font-size: 0.98rem; font-weight: 800; }
        .cc-brand-text small {
          margin-top: 5px;
          color: #64748b;
          font-size: 0.58rem;
          font-weight: 700;
          letter-spacing: 0.16em;
        }
        .cc-nav-list { gap: 4px; }
        .cc-nav-link {
          position: relative;
          display: inline-flex;
          align-items: center;
          padding: 10px 13px !important;
          border-radius: 11px;
          color: #475569 !important;
          text-decoration: none;
          font-size: 0.9rem;
          font-weight: 600;
          transition: color .2s ease, background .2s ease, transform .2s ease;
        }
        .cc-nav-link:hover {
          color: #2563eb !important;
          background: #f1f6ff;
          transform: translateY(-1px);
        }
        .cc-nav-link.active {
          color: #2563eb !important;
          background: #eff6ff;
        }
        .cc-nav-link.active::after {
          content: "";
          position: absolute;
          left: 13px;
          right: 13px;
          bottom: 4px;
          height: 2px;
          border-radius: 5px;
          background: #2563eb;
        }
        .cc-search {
          display: flex;
          align-items: center;
          gap: 9px;
          height: 42px;
          padding: 0 13px;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          background: #f8fafc;
          color: #64748b;
          transition: border-color .2s ease, box-shadow .2s ease, background .2s ease;
        }
        .cc-search:focus-within {
          background: #fff;
          border-color: #93c5fd;
          box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.09);
        }
        .cc-search input {
          width: 100%;
          min-width: 0;
          border: 0;
          outline: 0;
          background: transparent;
          color: #0f172a;
          font-size: .86rem;
        }
        .cc-search input::placeholder { color: #94a3b8; }
        .cc-search-desktop { width: 245px; margin-left: 16px; }
        .cc-search-mobile { display: none; }
        .cc-actions {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-left: 12px;
        }
        .cc-icon-btn {
          width: 42px;
          height: 42px;
          padding: 0;
          display: grid;
          place-items: center;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          background: #fff;
          color: #475569;
          transition: all .2s ease;
        }
        .cc-icon-btn:hover {
          color: #2563eb;
          border-color: #bfdbfe;
          background: #eff6ff;
          transform: translateY(-1px);
        }
        .cc-notification-badge {
          position: absolute;
          top: -3px;
          right: -3px;
          min-width: 17px;
          height: 17px;
          padding: 0 4px;
          display: grid;
          place-items: center;
          border: 2px solid #fff;
          border-radius: 999px;
          background: #ef4444;
          color: #fff;
          font-size: 8px;
          font-weight: 800;
        }
        .cc-profile-btn {
          height: 42px;
          display: flex;
          align-items: center;
          gap: 9px;
          padding: 4px 10px 4px 5px;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          background: #fff;
          color: #334155;
          font-size: .84rem;
          font-weight: 600;
        }
        .cc-profile-btn:hover { border-color: #bfdbfe; background: #f8fbff; }
        .cc-avatar {
          width: 32px;
          height: 32px;
          display: grid;
          place-items: center;
          border-radius: 10px;
          background: linear-gradient(135deg, #2563eb, #4f46e5);
          color: #fff;
          font-size: 11px;
          font-weight: 800;
        }
        .cc-dropdown {
          margin-top: 9px !important;
          min-width: 220px;
          padding: 7px;
          border: 1px solid #e8edf4;
          border-radius: 14px;
        }
        .cc-dropdown .dropdown-item { border-radius: 9px; padding: 9px 10px; }
        .cc-dropdown .dropdown-item:hover { background: #f1f6ff; }
        .cc-auth-actions { display: flex; align-items: center; gap: 8px; }
        .cc-login-btn, .cc-register-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          height: 42px;
          padding: 0 17px;
          border-radius: 11px;
          text-decoration: none;
          font-size: .86rem;
          font-weight: 700;
          transition: all .2s ease;
        }
        .cc-login-btn { color: #2563eb; border: 1px solid #bfdbfe; background: #fff; }
        .cc-login-btn:hover { background: #eff6ff; transform: translateY(-1px); }
        .cc-register-btn { color: #fff; background: #2563eb; box-shadow: 0 6px 16px rgba(37, 99, 235, .22); }
        .cc-register-btn:hover { color: #fff; background: #1d4ed8; transform: translateY(-1px); }
        .cc-toggler { border: 0; padding: 8px; box-shadow: none !important; }

        @media (max-width: 1199.98px) {
          .cc-nav-list { gap: 0; }
          .cc-nav-link { padding-left: 9px !important; padding-right: 9px !important; }
          .cc-search-desktop { width: 210px; margin-left: 8px; }
        }
        @media (max-width: 991.98px) {
          .cc-navbar-inner { padding-top: 9px; padding-bottom: 9px; }
          .cc-toggler { margin-left: auto; }
          .cc-navbar .navbar-collapse {
            padding: 15px 2px 4px;
            margin-top: 9px;
            border-top: 1px solid #eef2f7;
          }
          .cc-nav-list { margin: 0 0 10px !important; gap: 3px; }
          .cc-nav-link { width: 100%; padding: 11px 12px !important; }
          .cc-nav-link.active::after { left: 12px; right: auto; width: 24px; bottom: 5px; }
          .cc-search-desktop { display: none; }
          .cc-search-mobile { display: flex; width: 100%; margin: 8px 0 12px; }
          .cc-actions { margin: 0; padding-top: 12px; border-top: 1px solid #eef2f7; flex-wrap: wrap; }
          .cc-auth-actions { flex: 1; }
          .cc-login-btn, .cc-register-btn { flex: 1; }
          .cc-user-name { display: inline; }
        }
        @media (max-width: 575.98px) {
          .cc-brand-mark { width: 40px; height: 40px; border-radius: 12px; }
          .cc-brand-text strong { font-size: .9rem; }
          .cc-brand-text small { font-size: .52rem; }
          .cc-actions { gap: 7px; }
          .cc-profile-btn { flex: 1; justify-content: flex-start; }
          .cc-icon-btn { width: 40px; height: 40px; }
        }
      `}</style>
    </>
  );
};

export default Navbar;
