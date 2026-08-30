import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaPlay, FaCheck } from "react-icons/fa";

const CourseDetails = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [completedModules, setCompletedModules] = useState([0]);

  const modules = [
    {
      title: "Module 1: Introduction",
      lessons: [
        "What is Data Analytics",
        "Types of Data",
        "Data Analytics Process",
      ],
    },
    {
      title: "Module 2: Data Collection",
      lessons: ["Data Sources", "Collection Methods", "Data Quality"],
    },
    {
      title: "Module 3: Data Analysis",
      lessons: ["Statistical Analysis", "Data Visualization", "Reporting"],
    },
    {
      title: "Module 4: Data Visualization",
      lessons: ["Chart Types", "Dashboard Design", "Tools Overview"],
    },
  ];

  const toggleModule = (idx) => {
    setCompletedModules((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx],
    );
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb mb-0">
            <li className="breadcrumb-item">
              <Link to="/" className="text-decoration-none">
                Home
              </Link>
            </li>
            <li className="breadcrumb-item">
              <Link to="/courses" className="text-decoration-none">
                Courses
              </Link>
            </li>
            <li className="breadcrumb-item active">
              Data Analytics Fundamentals
            </li>
          </ol>
        </nav>
        <button
          className="btn btn-success"
          onClick={() => alert("Marked as complete!")}
        >
          Mark as Complete
        </button>
      </div>

      <div className="row g-4">
        <div className="col-lg-8">
          <div className="video-container mb-4">
            <div className="text-center">
              <FaPlay size={48} className="opacity-75" />
              <h5 className="mt-3">What is Data Analytics</h5>
              <p className="small opacity-75">04:20 / 12:45</p>
            </div>
          </div>

          <div className="card">
            <div className="card-header bg-white border-0 pt-3">
              <ul className="nav nav-tabs border-0">
                {["overview", "resources", "notes", "discussion"].map((tab) => (
                  <li className="nav-item" key={tab}>
                    <button
                      className={`nav-link ${activeTab === tab ? "active fw-bold text-primary border-bottom border-primary border-2" : "text-muted"}`}
                      onClick={() => setActiveTab(tab)}
                      style={{ border: "none", background: "none" }}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="card-body">
              {activeTab === "overview" && (
                <div>
                  <h5 className="fw-bold">About this Course</h5>
                  <p className="text-muted">
                    In this video, you will learn about the basics of data
                    analytics, its importance, and real-world applications. This
                    course covers everything from data collection to
                    visualization.
                  </p>
                  <h6 className="fw-bold mt-4">What you'll learn</h6>
                  <ul className="text-muted">
                    <li>Understand core data analytics concepts</li>
                    <li>Master data collection and cleaning techniques</li>
                    <li>Create compelling visualizations and dashboards</li>
                    <li>Apply statistical methods to business problems</li>
                  </ul>
                </div>
              )}
              {activeTab === "resources" && (
                <p className="text-muted">
                  Downloadable resources will appear here.
                </p>
              )}
              {activeTab === "notes" && (
                <p className="text-muted">Your personal notes section.</p>
              )}
              {activeTab === "discussion" && (
                <p className="text-muted">Community discussion forum.</p>
              )}
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card">
            <div className="card-header bg-white fw-bold">Course Content</div>
            <div className="accordion" id="courseAccordion">
              {modules.map((mod, idx) => (
                <div className="accordion-item border-0" key={idx}>
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#mod${idx}`}
                    >
                      <span className="small fw-semibold">{mod.title}</span>
                    </button>
                  </h2>
                  <div
                    id={`mod${idx}`}
                    className="accordion-collapse collapse"
                    data-bs-parent="#courseAccordion"
                  >
                    <div className="accordion-body pt-0">
                      {mod.lessons.map((lesson, lidx) => (
                        <div
                          key={lidx}
                          className="d-flex align-items-center gap-2 py-2 border-bottom"
                        >
                          <button
                            className="btn btn-sm btn-link p-0 text-decoration-none"
                            onClick={() => toggleModule(idx)}
                          >
                            {completedModules.includes(idx) ? (
                              <FaCheck className="text-success" />
                            ) : (
                              <FaPlay className="text-primary" size={10} />
                            )}
                          </button>
                          <span className="small text-muted">{lesson}</span>
                        </div>
                      ))}
                    </div>
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

export default CourseDetails;
