import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaEye, FaDownload, FaCertificate } from "react-icons/fa";
import { useToast } from "../context/ToastContext";

const Certificates = () => {
  const [tab, setTab] = useState("course");
  const { showToast } = useToast();

  const certs = {
    course: [
      {
        id: 1,
        title: "Data Analytics Fundamentals",
        date: "28 May 2025",
        image:
          "https://img.freepik.com/free-vector/certificate-template-with-modern-design_23-2147896338.jpg",
      },
      {
        id: 2,
        title: "Excel for Professionals",
        date: "20 May 2025",
        image:
          "https://img.freepik.com/free-vector/modern-certificate-template_23-2147896339.jpg",
      },
    ],
    skill: [
      {
        id: 3,
        title: "Python Programming",
        date: "15 April 2025",
        image:
          "https://img.freepik.com/free-vector/elegant-certificate-template_23-2147896340.jpg",
      },
    ],
    completion: [
      {
        id: 4,
        title: "Full Stack Development",
        date: "10 March 2025",
        image:
          "https://img.freepik.com/free-vector/professional-certificate-template_23-2147896341.jpg",
      },
    ],
  };

  return (
    <div>
      <h4 className="fw-bold mb-4">My Certificates</h4>

      <ul className="nav nav-tabs border-0 mb-4">
        {[
          { k: "course", l: "Course Certificates" },
          { k: "skill", l: "Skill Certificates" },
          { k: "completion", l: "Completion Certificates" },
        ].map((t) => (
          <li className="nav-item" key={t.k}>
            <button
              className={`nav-link ${tab === t.k ? "active fw-bold text-primary border-bottom border-primary border-2" : "text-muted"}`}
              onClick={() => setTab(t.k)}
              style={{ border: "none", background: "none" }}
            >
              {t.l}
            </button>
          </li>
        ))}
      </ul>

      <div className="row g-4">
        {certs[tab].map((c, i) => (
          <div key={i} className="col-md-6 col-lg-4">
            <div className="certificate-card">
              <div className="bg-light rounded-3 p-3 mb-3">
                <img
                  src={c.image}
                  alt="Certificate"
                  className="img-fluid rounded-2"
                />
              </div>
              <FaCertificate className="text-warning mb-2" size={28} />
              <h6 className="fw-bold mb-1">{c.title}</h6>
              <p className="small text-muted mb-3">Issued on {c.date}</p>
              <div className="d-flex gap-2">
                <Link to={`/certificate/${c.id}`} className="btn btn-outline-primary btn-sm flex-grow-1">
                  <FaEye /> View
                </Link>
                <button
                  className="btn btn-primary btn-sm flex-grow-1"
                  onClick={() => showToast("Download isn't wired to a backend yet.", "info")}
                >
                  <FaDownload /> Download
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Certificates;
