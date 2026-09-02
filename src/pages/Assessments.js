import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Loader from '../components/ui/Loader';
import EmptyState from '../components/ui/EmptyState';
import { FaClipboardList, FaClock } from 'react-icons/fa';

const Assessments = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }
    const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';
    fetch(`${API_URL}/quizzes/`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setQuizzes(data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [token]);

  if (loading) return <Loader />;
  if (quizzes.length === 0) {
    return <EmptyState title="No quizzes available" description="Check back later." />;
  }

  return (
    <div>
      <h4 className="fw-bold mb-4">Available Quizzes</h4>
      <div className="card">
        <div className="card-body">
          {quizzes.map((q) => (
            <div key={q.id} className="d-flex align-items-center justify-content-between p-3 border-bottom">
              <div className="d-flex align-items-center gap-3">
                <div className="bg-primary bg-opacity-10 text-primary p-3 rounded-3">
                  <FaClipboardList />
                </div>
                <div>
                  <h6 className="fw-bold mb-1">{q.title}</h6>
                  <p className="small text-muted mb-0">
                    <FaClock className="me-1" size={12} /> {q.question_count} Questions
                  </p>
                </div>
              </div>
              <Link to={`/quiz/${q.id}`} className="btn btn-primary">
                Start Quiz
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Assessments;
