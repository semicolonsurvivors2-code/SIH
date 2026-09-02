import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaGraduationCap } from "react-icons/fa";
import { FiSearch, FiBell, FiUser, FiSettings, FiLogOut } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import { notifications } from "../data/notifications";

const dashboardPathFor = (role) =>
  role === "admin" ? "/admin" : role === "trainer" ? "/trainer" : "/dashboard";

const Navbar = () => {
  const { user, logout } = useAuth();
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
    `nav-link${isActive ? " active fw-semibold text-primary" : ""}`;

  const initials = (user?.name || "U").split(" ").map((s) => s[0]).join("").slice(0, 2).toUpperCase();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
          <div className="bg-primary text-white p-2 rounded-3">
            <FaGraduationCap size={20} />
          </div>
          <span>CAPACITY CONNECT</span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#nav"
          aria-controls="nav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="nav">
          <ul className="navbar-nav mx-auto gap-lg-5 gap-2">
            <li className="nav-item">
              <NavLink className={navLinkClass} to="/" end>Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={navLinkClass} to="/courses">Courses</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={navLinkClass} to="/trainers">Trainers</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={navLinkClass} to="/about">About Us</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={navLinkClass} to="/contact">Contact</NavLink>
            </li>
          </ul>

          <form onSubmit={handleSearch} className="d-none d-lg-flex me-4" style={{ width: 220 }}>
            <div className="input-group input-group-sm">
              <span className="input-group-text bg-white"><FiSearch size={14} /></span>
              <input
                type="search"
                className="form-control"
                placeholder="Search courses..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </form>

          {user ? (
            <div className="d-flex align-items-center gap-2">
              <div className="dropdown">
                <button
                  className="btn btn-light position-relative"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  aria-label="Notifications"
                >
                  <FiBell size={16} />
                  {unreadCount > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: 9 }}>
                      {unreadCount}
                    </span>
                  )}
                </button>
                <ul className="dropdown-menu dropdown-menu-end shadow-sm" style={{ minWidth: 260 }}>
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
                  className="btn btn-light d-flex align-items-center gap-2"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <span
                    className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center fw-bold"
                    style={{ width: 28, height: 28, fontSize: 12 }}
                  >
                    {initials}
                  </span>
                  <span className="d-none d-md-inline small">{user.name}</span>
                </button>
                <ul className="dropdown-menu dropdown-menu-end shadow-sm">
                  <li>
                    <Link to={dashboardPathFor(user.role)} className="dropdown-item">Dashboard</Link>
                  </li>
                  <li>
                    <Link to="/profile" className="dropdown-item d-flex align-items-center gap-2">
                      <FiUser size={14} /> Profile
                    </Link>
                  </li>
                  <li>
                    <Link to="/settings" className="dropdown-item d-flex align-items-center gap-2">
                      <FiSettings size={14} /> Settings
                    </Link>
                  </li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <button className="dropdown-item d-flex align-items-center gap-2 text-danger" onClick={handleLogout}>
                      <FiLogOut size={14} /> Logout
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="d-flex gap-2">
              <Link to="/login" className="btn btn-outline-primary px-4">Login</Link>
              <Link to="/register" className="btn btn-primary px-4">Register</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
