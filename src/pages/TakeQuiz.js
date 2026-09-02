import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Loader from '../components/ui/Loader';
import EmptyState from '../components/ui/EmptyState';

export default function TakeQuiz() {
  const { id } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!token) {
      setError('You must be logged in.');
      setLoading(false);
      return;
    }
    const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';
    fetch(`${API_URL}/quizzes/${id}/`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        if (!res.ok) throw new Error('Quiz not found');
        return res.json();
      })
      .then(data => {
        setQuiz(data);
        setAnswers(new Array(data.questions.length).fill(null));
      })
      .catch(err => {
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, [id, token]);

  const handleAnswer = (qIndex, optionIndex) => {
    const newAnswers = [...answers];
    newAnswers[qIndex] = optionIndex;
    setAnswers(newAnswers);
  };

  const handleSubmit = async () => {
    if (answers.some(a => a === null)) {
      alert('Please answer all questions.');
      return;
    }
    setSubmitting(true);
    try {
      const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';
      const res = await fetch(`${API_URL}/quizzes/${id}/submit/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ answers })
      });
      const result = await res.json();
      if (!res.ok) {
        alert(result.error || 'Submission failed');
        setSubmitting(false);
        return;
      }
      navigate(`/quiz/${id}/result`, { state: { result, quiz } });
    } catch (err) {
      alert(err.message);
      setSubmitting(false);
    }
  };

  if (loading) return <Loader />;
  if (error) return <EmptyState title="Error" description={error} />;
  if (!quiz) return <EmptyState title="No quiz" />;

  return (
    <div className="container py-4">
      <h4 className="fw-bold mb-3">{quiz.title}</h4>
      <p className="text-muted mb-4">{quiz.description}</p>
      <div className="d-flex flex-column gap-4">
        {quiz.questions.map((q, idx) => (
          <div key={q.id} className="card p-3">
            <p className="fw-semibold mb-2">{idx + 1}. {q.text}</p>
            <div className="d-flex flex-column gap-2">
              {['A', 'B', 'C', 'D'].map((letter, optIdx) => {
                const optionText = q[`option_${letter.toLowerCase()}`];
                return (
                  <label key={letter} className="d-flex align-items-center gap-2">
                    <input
                      type="radio"
                      name={`q${idx}`}
                      value={optIdx}
                      checked={answers[idx] === optIdx}
                      onChange={() => handleAnswer(idx, optIdx)}
                    />
                    <span>{letter}. {optionText}</span>
                  </label>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      <button
        className="btn btn-primary mt-4"
        onClick={handleSubmit}
        disabled={submitting}
      >
        {submitting ? 'Submitting...' : 'Submit Quiz'}
      </button>
    </div>
  );
}
