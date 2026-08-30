import React, { useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import Sidebar from "./Sidebar";
import { useAuth } from "../context/AuthContext";

export default function DashboardLayout() {
  const { user, loading } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (loading) return null;
  if (!user) return <Navigate to="/login" replace />;

  return (
    <div>
      <Sidebar
        user={user}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Mobile top bar with menu toggle — sidebar itself is hidden
          off-canvas below the lg breakpoint (see .sidebar in App.css) */}
      <div className="d-lg-none d-flex align-items-center gap-3 bg-white border-bottom p-3">
        <button
          type="button"
          className="btn btn-light"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open menu"
        >
          <FaBars />
        </button>
        <span className="fw-bold">Capacity Connect</span>
      </div>

      <div className="main-content">
        <Outlet />
      </div>
    </div>
  );
}
