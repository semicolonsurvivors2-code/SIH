import React from "react";
import { Link } from "react-router-dom";
import {
  FaBookOpen,
  FaSpinner,
  FaCheckCircle,
  FaCertificate,
  FaClock,
  FaStar,
} from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

const LearnerDashboard = () => {
  const { user } = useAuth();
  const stats = [
    {
      label: "Enrolled Courses",
      value: 8,
      icon: <FaBookOpen />,
      color: "primary",
    },
    { label: "In Progress", value: 5, icon: <FaSpinner />, color: "warning" },
    { label: "Completed", value: 3, icon: <FaCheckCircle />, color: "success" },
    { label: "Certificates", value: 6, icon: <FaCertificate />, color: "info" },
  ];

  const recommended = [
    {
      title: "Project Management Basics",
      instructor: "Rahul Mehta",
      rating: 4.8,
      students: "4.5k",
      image:
        "https://img.freepik.com/free-photo/business-concept-with-team-close-up_23-2149151159.jpg",
    },
    {
      title: "Financial Management",
      instructor: "Sneha Rao",
      rating: 4.7,
      students: "3.2k",
      image:
        "https://img.freepik.com/free-photo/financial-business-chart_53876-104502.jpg",
    },
    {
      title: "Excel for Professionals",
      instructor: "Amit Kumar",
      rating: 4.9,
      students: "5.1k",
      image:
        "https://img.freepik.com/free-photo/person-using-laptop_23-2149216321.jpg",
    },
    {
      title: "Leadership Skills",
      instructor: "Priya Sharma",
      rating: 4.6,
      students: "2.8k",
      image:
        "https://img.freepik.com/free-photo/business-leader-concept_23-2149216322.jpg",
    },
  ];

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 className="fw-bold mb-1">Hello, {user?.name || "Ananya"} 👋</h4>
          <p className="text-muted mb-0">
            Welcome back! Keep learning and growing.
          </p>
        </div>
        <div className="d-flex gap-3">
          <button className="btn btn-light position-relative">
            <FaClock />{" "}
            <span
              className="position-absolute top-0 start-100 translate-middle badge bg-danger rounded-circle"
              style={{ fontSize: 8 }}
            >
              3
            </span>
          </button>
          <div className="d-flex align-items-center gap-2">
            <img
              src="https://i.pravatar.cc/150?img=5"
              alt="Profile"
              className="rounded-circle"
              width="36"
              height="36"
            />
            <span className="fw-semibold small">{user?.name || "Ananya"}</span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="row g-3 mb-4">
        {stats.map((s, i) => (
          <div key={i} className="col-md-3 col-sm-6">
            <div className="card p-3">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <p className="text-muted small mb-1">{s.label}</p>
                  <h3 className="fw-bold mb-0">{s.value}</h3>
                </div>
                <div
                  className={`bg-${s.color} bg-opacity-10 text-${s.color} p-2 rounded-3`}
                >
                  {s.icon}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="row g-4">
        {/* Continue Learning */}
        <div className="col-lg-8">
          <h5 className="fw-bold mb-3">Continue Learning</h5>
          <div className="card p-4">
            <div className="row g-3 align-items-center">
              <div className="col-md-3">
                <img
                  src="https://img.freepik.com/free-photo/data-analysis-business-chart_23-2149151157.jpg"
                  alt="Course"
                  className="img-fluid rounded-3"
                />
              </div>
              <div className="col-md-6">
                <h6 className="fw-bold mb-1">Data Analytics Fundamentals</h6>
                <div className="d-flex align-items-center gap-2 text-muted small mb-2">
                  <FaClock /> 2h 15m left
                </div>
                <div className="progress mb-1">
                  <div
                    className="progress-bar bg-success"
                    style={{ width: "79%" }}
                  ></div>
                </div>
                <small className="text-muted">79% Complete</small>
              </div>
              <div className="col-md-3 text-end">
                <Link to="/learn/1" className="btn btn-primary">
                  Continue
                </Link>
              </div>
            </div>
          </div>

          {/* Recommended */}
          <h5 className="fw-bold mb-3 mt-4">Recommended for You</h5>
          <div className="row g-3">
            {recommended.map((c, i) => (
              <div key={i} className="col-md-6">
                <div className="card h-100">
                  <img
                    src={c.image}
                    className="course-card-img"
                    alt={c.title}
                  />
                  <div className="card-body">
                    <h6 className="fw-bold mb-1">{c.title}</h6>
                    <p className="small text-muted mb-2">By {c.instructor}</p>
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="small">
                        <FaStar className="text-warning" /> {c.rating} (
                        {c.students})
                      </span>
                      <button className="btn btn-sm btn-outline-primary">
                        View
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Session */}
        <div className="col-lg-4">
          <h5 className="fw-bold mb-3">Upcoming Live Session</h5>
          <div className="card p-3">
            <div className="d-flex align-items-center gap-3 mb-3">
              <img
                src="https://i.pravatar.cc/150?img=9"
                alt="Trainer"
                className="rounded-circle"
                width="48"
                height="48"
              />
              <div>
                <h6 className="fw-bold mb-0">Effective Communication</h6>
                <p className="small text-muted mb-0">By Priya Sharma</p>
              </div>
            </div>
            <div className="bg-light rounded-3 p-3 mb-3">
              <p className="small mb-1">
                <strong>Date:</strong> 28 May 2025
              </p>
              <p className="small mb-0">
                <strong>Time:</strong> 11:00 AM
              </p>
            </div>
            <button className="btn btn-primary w-100">Join Session</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearnerDashboard;
