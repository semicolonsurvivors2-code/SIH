import React from "react";
import { Link } from "react-router-dom";
import { FaPlay, FaCheckCircle, FaLock, FaArrowLeft } from "react-icons/fa";

const LearningPlayer = () => {
  const content = [
    {
      title: "1. What is Data Analytics",
      duration: "04:20",
      completed: true,
      active: true,
    },
    {
      title: "2. Types of Data",
      duration: "06:15",
      completed: true,
      active: false,
    },
    {
      title: "3. Data Analytics Process",
      duration: "08:30",
      completed: false,
      active: false,
    },
    {
      title: "4. Data Collection Methods",
      duration: "10:45",
      completed: false,
      active: false,
      locked: true,
    },
    {
      title: "5. Data Quality Assessment",
      duration: "07:20",
      completed: false,
      active: false,
      locked: true,
    },
  ];

  return (
    <div>
      <Link
        to="/courses/1"
        className="btn btn-link text-decoration-none mb-3 ps-0"
      >
        <FaArrowLeft /> Back to Course
      </Link>

      <div className="row g-4">
        <div className="col-lg-8">
          <div className="video-container mb-3" style={{ aspectRatio: "16/9" }}>
            <div className="text-center">
              <FaPlay size={56} className="opacity-75" />
              <h4 className="mt-3 fw-bold">What is Data Analytics</h4>
              <p className="opacity-75">Module 1 • Lesson 1</p>
            </div>
          </div>
          <h5 className="fw-bold">What is Data Analytics</h5>
          <p className="text-muted">
            Learn the fundamentals of data analytics and how it drives business
            decisions.
          </p>
        </div>

        <div className="col-lg-4">
          <div className="card">
            <div className="card-header bg-white fw-bold">Course Content</div>
            <div className="list-group list-group-flush">
              {content.map((item, i) => (
                <div
                  key={i}
                  className={`list-group-item d-flex align-items-center gap-3 py-3 ${item.active ? "bg-primary bg-opacity-10" : ""}`}
                >
                  <div className="text-muted small">
                    {item.completed ? (
                      <FaCheckCircle className="text-success" />
                    ) : item.locked ? (
                      <FaLock />
                    ) : (
                      <FaPlay size={10} />
                    )}
                  </div>
                  <div className="flex-grow-1">
                    <p
                      className={`mb-0 small ${item.active ? "fw-bold text-primary" : "text-muted"}`}
                    >
                      {item.title}
                    </p>
                    <small className="text-muted">{item.duration}</small>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningPlayer;
