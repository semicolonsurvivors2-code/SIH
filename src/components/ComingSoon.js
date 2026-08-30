import React from "react";
import { useLocation, Link } from "react-router-dom";
import { FaTools } from "react-icons/fa";

// Generic placeholder so unfinished nav/sidebar links render a real page
// instead of silently redirecting to "/". Swap each of these routes out
// for a real page as you build it.
const ComingSoon = () => {
  const location = useLocation();
  const label = location.pathname
    .split("/")
    .filter(Boolean)
    .pop()
    ?.replace(/-/g, " ") || "This page";

  return (
    <div className="d-flex flex-column align-items-center justify-content-center text-center py-5">
      <div className="bg-primary bg-opacity-10 text-primary p-4 rounded-circle mb-3">
        <FaTools size={28} />
      </div>
      <h4 className="fw-bold text-capitalize mb-2">{label}</h4>
      <p className="text-muted mb-4" style={{ maxWidth: 400 }}>
        This section is still being built. Check back soon.
      </p>
      <Link to="/" className="btn btn-primary">
        Back to Home
      </Link>
    </div>
  );
};

export default ComingSoon;
