import React from "react";
import { FaStar, FaUsers, FaBookOpen, FaCertificate } from "react-icons/fa";
import { courses } from "../data/mockData";

export default function TrainerProfile() {
  const stats = [
    { label: "Courses", value: "", icon: <FaBookOpen /> },
    { label: "Learners", value: "", icon: <FaUsers /> },
    { label: "Rating", value: "", icon: <FaStar /> },
    { label: "Certifications", value: "", icon: <FaCertificate /> },
  ];

  return (
    <div>
      <div className="card p-4 mb-4">
        <div className="d-flex flex-column flex-md-row align-items-md-center gap-4">
          <img
            src=""
            alt="Trainer"
            className="rounded-circle"
            width="96"
            height="96"
          />
          <div className="flex-grow-1">
            <h4 className="fw-bold mb-1">Rahul Singh</h4>
            <p className="text-muted small mb-2">
              Senior Web Development Instructor
            </p>
            <p className="small text-muted mb-0" style={{ maxWidth: 500 }}>
              10+ years building and teaching full-stack web development, with a
              focus on practical, project-based learning.
            </p>
          </div>
          <button className="btn btn-primary align-self-start">Follow</button>
        </div>
      </div>

      <div className="row g-3 mb-4">
        {stats.map((s, i) => (
          <div key={i} className="col-6 col-md-3">
            <div className="card p-3 text-center">
              <div className="text-primary mb-1 d-flex justify-content-center">
                {s.icon}
              </div>
              <div className="fw-bold fs-5">{s.value}</div>
              <div className="small text-muted">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="row g-4">
        <div className="col-lg-8">
          <div className="card p-4">
            <h6 className="fw-bold mb-3">Courses by this Trainer</h6>
            <div className="row g-3">
              {courses.map((c) => (
                <div key={c.id} className="col-md-6">
                  <div className="card h-100">
                    <img
                      src={c.image}
                      className="course-card-img"
                      alt={c.title}
                    />
                    <div className="card-body">
                      <h6 className="fw-bold mb-1 small">{c.title}</h6>
                      <span className="small">
                        <FaStar className="text-warning" size={12} /> {c.rating}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="card p-4">
            <h6 className="fw-bold mb-3">Credentials</h6>
            <ul className="small text-muted ps-3 mb-0">
              <li className="mb-2">M.Sc. Computer Science, MIT</li>
              <li className="mb-2">AWS Certified Solutions Architect</li>
              <li>Google Certified Educator</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
