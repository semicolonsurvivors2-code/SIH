import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaClipboardList, FaClock } from "react-icons/fa";

const Assessments = () => {
  const [tab, setTab] = useState("upcoming");

  // ids 1 and 2 have real quiz content wired up in src/data/mockData.js
  // (quizQuestions); the rest are placeholders until more are authored.
  const assessments = {
    upcoming: [
      {
        id: 1,
        title: "Data Analytics Quiz",
        date: "20 May 2025, 11:59 PM",
        questions: 5,
        status: "upcoming",
      },
      {
        id: 3,
        title: "Excel Basics Assessment",
        date: "02 June 2025, 11:59 PM",
        questions: 15,
        status: "upcoming",
      },
      {
        id: 4,
        title: "SQL Fundamentals Test",
        date: "05 June 2025, 11:59 PM",
        questions: 20,
        status: "upcoming",
      },
    ],
    inprogress: [
      {
        id: 2,
        title: "Python Basics Quiz",
        date: "Started 18 May 2025",
        questions: 3,
        status: "inprogress",
        progress: 60,
      },
    ],
    completed: [
      {
        id: 5,
        title: "Communication Skills",
        date: "Completed 15 May 2025",
        score: "85%",
        status: "completed",
      },
    ],
  };

  return (
    <div>
      <h4 className="fw-bold mb-4">Assessments</h4>

      <div className="card">
        <div className="card-header bg-white border-0 pt-3">
          <ul className="nav nav-tabs border-0">
            {["upcoming", "inprogress", "completed"].map((t) => (
              <li className="nav-item" key={t}>
                <button
                  className={`nav-link ${tab === t ? "active fw-bold text-primary border-bottom border-primary border-2" : "text-muted"}`}
                  onClick={() => setTab(t)}
                  style={{ border: "none", background: "none" }}
                >
                  {t === "inprogress"
                    ? "In Progress"
                    : t.charAt(0).toUpperCase() + t.slice(1)}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="card-body">
          {assessments[tab].map((a, i) => (
            <div
              key={i}
              className="d-flex align-items-center justify-content-between p-3 border-bottom"
            >
              <div className="d-flex align-items-center gap-3">
                <div className="bg-primary bg-opacity-10 text-primary p-3 rounded-3">
                  <FaClipboardList />
                </div>
                <div>
                  <h6 className="fw-bold mb-1">{a.title}</h6>
                  <p className="small text-muted mb-0">
                    <FaClock className="me-1" size={12} /> {a.date} •{" "}
                    {a.questions} Questions
                  </p>
                  {a.progress && (
                    <div
                      className="progress mt-2"
                      style={{ width: 200, height: 6 }}
                    >
                      <div
                        className="progress-bar"
                        style={{ width: a.progress + "%" }}
                      ></div>
                    </div>
                  )}
                </div>
              </div>
              <div>
                {tab === "upcoming" && (
                  <Link to={`/assessments/${a.id}`} className="btn btn-primary">
                    Start Quiz
                  </Link>
                )}
                {tab === "inprogress" && (
                  <Link to={`/assessments/${a.id}`} className="btn btn-warning text-white">
                    Resume
                  </Link>
                )}
                {tab === "completed" && (
                  <span className="badge bg-success bg-opacity-10 text-success px-3 py-2">
                    {a.score}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Assessments;
