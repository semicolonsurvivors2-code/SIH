import React from "react";
import { FaStar, FaUsers, FaBookOpen } from "react-icons/fa";
import { trainers } from "../data/mockData";

export default function TrainerProfile() {
  return (
    <div>
      <h4 className="fw-bold mb-4">Our Trainers</h4>

      <div className="row g-4">
        {trainers.map((t) => (
          <div key={t.id} className="col-md-4 col-lg-3">
            <div className="card h-100">
              <img src={t.avatar} className="course-card-img" alt={t.name} />
              <div className="card-body">
                <h6 className="fw-bold mb-1">{t.name}</h6>
                <p className="small text-muted mb-2">{t.role}</p>
                <div className="d-flex justify-content-between align-items-center small text-muted">
                  <span className="d-flex align-items-center gap-1">
                    <FaStar className="text-warning" size={12} /> {t.rating}
                  </span>
                  <span className="d-flex align-items-center gap-1">
                    <FaUsers size={12} /> {t.students}
                  </span>
                  <span className="d-flex align-items-center gap-1">
                    <FaBookOpen size={12} /> {t.courses}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
