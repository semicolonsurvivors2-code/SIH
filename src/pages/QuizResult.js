import React from "react";
import { useLocation, useParams, Link, Navigate } from "react-router-dom";
import { FaCheckCircle, FaTimesCircle, FaRedo } from "react-icons/fa";

export default function QuizResult() {
  const { id } = useParams();
  const { state } = useLocation();

  if (!state) return <Navigate to="/assessments" replace />;

  const { score, total, answers, questions } = state;
  const pct = Math.round((score / total) * 100);
  const passed = pct >= 60;

  return (
    <div className="container py-4" style={{ maxWidth: 700 }}>
      <div className="card p-4 text-center mb-4">
        <div
          className={`mx-auto mb-3 rounded-circle d-flex align-items-center justify-content-center fw-bold fs-3 ${passed ? "bg-success bg-opacity-10 text-success" : "bg-danger bg-opacity-10 text-danger"}`}
          style={{ width: 96, height: 96 }}
        >
          {pct}%
        </div>
        <h5 className="fw-bold mb-1">{passed ? "Great job!" : "Keep practicing"}</h5>
        <p className="text-muted small mb-3">
          You scored {score} out of {total} ({pct}%)
        </p>
        <div className="d-flex gap-2 justify-content-center">
          <Link to={`/assessments/${id}`} className="btn btn-outline-primary d-flex align-items-center gap-2">
            <FaRedo size={14} /> Retake Quiz
          </Link>
          <Link to="/assessments" className="btn btn-primary">Back to Assessments</Link>
        </div>
      </div>

      <h6 className="fw-bold mb-3">Answer Review</h6>
      <div className="d-flex flex-column gap-3">
        {questions.map((q, i) => {
          const userAnswer = answers[i];
          const correct = userAnswer === q.correctIndex;
          return (
            <div key={q.id} className="card p-3">
              <div className="d-flex align-items-start gap-2 mb-2">
                {correct ? (
                  <FaCheckCircle className="text-success mt-1" />
                ) : (
                  <FaTimesCircle className="text-danger mt-1" />
                )}
                <span className="fw-semibold small">{i + 1}. {q.prompt}</span>
              </div>
              <div className="ps-4 small">
                <div className={correct ? "text-success" : "text-danger"}>
                  Your answer: {userAnswer !== undefined ? q.options[userAnswer] : "Not answered"}
                </div>
                {!correct && (
                  <div className="text-success">Correct answer: {q.options[q.correctIndex]}</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
