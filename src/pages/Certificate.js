import React from "react";
import { useParams, Link } from "react-router-dom";
import { FaCertificate, FaDownload, FaArrowLeft } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

export default function Certificate() {
  const { id } = useParams();
  const { user } = useAuth();
  const { showToast } = useToast();

  const handleDownload = () => {
    // Real PDF export would go here (e.g. via a library like jsPDF) once
    // a backend/course-completion record exists to generate it from.
    showToast("Download isn't wired to a backend yet — this is a preview only.", "info");
  };

  return (
    <div className="container py-4">
      <Link to="/certificates" className="btn btn-link text-decoration-none ps-0 mb-3">
        <FaArrowLeft className="me-1" /> Back to Certificates
      </Link>

      <div
        className="mx-auto bg-white p-5 text-center position-relative"
        style={{ maxWidth: 700, border: "10px solid #eef2ff", borderRadius: 16 }}
      >
        <FaCertificate size={48} className="text-warning mb-3" />
        <p className="text-muted small text-uppercase mb-1" style={{ letterSpacing: 2 }}>
          Certificate of Completion
        </p>
        <h2 className="fw-bold mb-3">Capacity Connect</h2>
        <p className="text-muted mb-1">This certifies that</p>
        <h3 className="fw-bold text-primary mb-3">{user?.name || "Learner"}</h3>
        <p className="text-muted mb-1">has successfully completed the course</p>
        <h4 className="fw-bold mb-4">Course #{id}</h4>
        <p className="small text-muted mb-4">
          Issued on {new Date().toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })}
        </p>
        <button className="btn btn-primary" onClick={handleDownload}>
          <FaDownload className="me-2" /> Download PDF
        </button>
      </div>
    </div>
  );
}
