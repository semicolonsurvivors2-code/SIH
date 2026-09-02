import React from "react";
import { Link } from "react-router-dom";
import { FiArrowRight, FiUsers, FiAward, FiBookOpen, FiPlayCircle } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import { courses } from "../data/mockData";

export default function Home() {
  const features = [
    { icon: <FiBookOpen size={24} />, title: "Expert-Led Courses", desc: "Learn from industry professionals with real-world experience." },
    { icon: <FiUsers size={24} />, title: "Collaborative Learning", desc: "Connect with peers and build your professional network." },
    { icon: <FiAward size={24} />, title: "Certified Programs", desc: "Earn recognized certificates to boost your career." },
    { icon: <FiPlayCircle size={24} />, title: "Self-Paced Learning", desc: "Study at your own pace with lifetime access to materials." },
  ];

  const stats = [
    { value: "15,000+", label: "Active Learners" },
    { value: "200+", label: "Expert Courses" },
    { value: "95%", label: "Satisfaction Rate" },
    { value: "50+", label: "Expert Instructors" },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="hero-section bg-primary text-white py-5">
        <div className="container text-center py-4">
          <h1 className="fw-bold display-5 mb-3">
            Unlock Your Potential with{" "}
            <span className="text-warning">Capacity Connect</span>
          </h1>
          <p className="lead mx-auto mb-4" style={{ maxWidth: 600, opacity: 0.9 }}>
            Access world-class courses, track your progress, and achieve your
            goals with our comprehensive learning platform.
          </p>
          <div className="d-flex gap-3 justify-content-center flex-wrap">
            <Link to="/courses" className="btn btn-light btn-lg d-flex align-items-center gap-2">
              Explore Courses <FiArrowRight />
            </Link>
            <Link to="/register" className="btn btn-outline-light btn-lg">
              Get Started Free
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white">
        <div className="container">
          <div className="stats-overlap bg-white p-4 mx-auto" style={{ maxWidth: 900 }}>
            <div className="row text-center g-4">
              {stats.map((stat, i) => (
                <div key={i} className="col-6 col-md-3">
                  <div className="fs-3 fw-bold text-primary">{stat.value}</div>
                  <div className="small text-muted">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section-spacious">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold">Why Choose Capacity Connect?</h2>
            <p className="text-muted">Everything you need to advance your skills and career.</p>
          </div>
          <div className="row g-4">
            {features.map((f, i) => (
              <div key={i} className="col-md-6 col-lg-3">
                <div className="card h-100 text-center p-4 border-0 shadow-sm">
                  <div className="text-primary d-flex justify-content-center mb-3">{f.icon}</div>
                  <h6 className="fw-bold mb-2">{f.title}</h6>
                  <p className="small text-muted mb-0">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="section-spacious bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold">Featured Courses</h2>
            <p className="text-muted">Start learning with our most popular programs.</p>
          </div>
          <div className="row g-4">
            {courses.slice(0, 3).map((course) => (
              <div key={course.id} className="col-md-4">
                <div className="card h-100 shadow-sm">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="course-card-img"
                    style={{ height: 180, objectFit: "cover" }}
                  />
                  <div className="card-body">
                    <div className="d-flex gap-2 mb-2">
                      <span className="badge bg-primary bg-opacity-10 text-primary">{course.category}</span>
                      <span className="badge bg-success bg-opacity-10 text-success">{course.level}</span>
                    </div>
                    <h6 className="fw-bold mb-2">{course.title}</h6>
                    <p
                      className="small text-muted mb-3"
                      style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}
                    >
                      {course.description}
                    </p>
                    <div className="d-flex justify-content-between align-items-center small text-muted mb-3">
                      <span>{course.duration}</span>
                      <span className="d-flex align-items-center gap-1">
                        <FaStar className="text-warning" size={12} /> {course.rating}
                      </span>
                    </div>
                    <Link to={`/courses/${course.id}`} className="btn btn-primary w-100">
                      View Course
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-5">
            <Link to="/courses" className="btn btn-outline-primary btn-lg">
              View All Courses
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-spacious">
        <div className="container">
          <div className="card bg-primary text-white text-center p-5 border-0">
            <h2 className="fw-bold mb-3">Ready to Start Learning?</h2>
            <p className="mx-auto mb-4" style={{ maxWidth: 500, opacity: 0.9 }}>
              Join thousands of learners and gain the skills you need to succeed
              in today's competitive world.
            </p>
            <div className="d-flex gap-3 justify-content-center flex-wrap">
              <Link to="/register" className="btn btn-light btn-lg">
                Create Free Account
              </Link>
              <Link to="/courses" className="btn btn-outline-light btn-lg">
                Browse Courses
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
