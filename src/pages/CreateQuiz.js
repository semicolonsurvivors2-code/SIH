import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Loader from '../components/ui/Loader';
import { FiPlus, FiTrash2 } from 'react-icons/fi';

export default function CreateQuiz() {
  const { token, user } = useAuth();
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Quiz form state
  const [quiz, setQuiz] = useState({
    title: '',
    description: '',
    course: '',
  });

  const [questions, setQuestions] = useState([
    { text: '', option_a: '', option_b: '', option_c: '', option_d: '', correct_option: 'A' }
  ]);

  useEffect(() => {
    const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';
    fetch(`${API_URL}/courses/`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setCourses(data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [token]);

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { text: '', option_a: '', option_b: '', option_c: '', option_d: '', correct_option: 'A' }
    ]);
  };

  const removeQuestion = (index) => {
    if (questions.length <= 1) return;
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const handleQuestionChange = (index, field, value) => {
    const updated = [...questions];
    updated[index][field] = value;
    setQuestions(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    // Validate quiz fields
    if (!quiz.title.trim()) {
      setError('Quiz title is required');
      setSubmitting(false);
      return;
    }
    if (!quiz.course) {
      setError('Please select a course');
      setSubmitting(false);
      return;
    }
    // Validate each question
    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      if (!q.text.trim()) {
        setError(`Question ${i+1} text is required`);
        setSubmitting(false);
        return;
      }
      if (!q.option_a.trim() || !q.option_b.trim() || !q.option_c.trim() || !q.option_d.trim()) {
        setError(`All options for question ${i+1} must be filled`);
        setSubmitting(false);
        return;
      }
    }

    const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';
    try {
      // Send the quiz with nested questions
      const payload = {
        title: quiz.title,
        description: quiz.description,
        course: parseInt(quiz.course),
        questions: questions
      };

      const res = await fetch(`${API_URL}/quizzes/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Failed to create quiz');
        setSubmitting(false);
        return;
      }
      // Success – navigate to assessments
      navigate('/assessments');
    } catch (err) {
      setError(err.message);
      setSubmitting(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="container py-4">
      <h4 className="fw-bold mb-4">Create New Quiz</h4>
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="card p-4 mb-4">
          <div className="mb-3">
            <label className="form-label fw-semibold">Quiz Title</label>
            <input
              type="text"
              className="form-control"
              value={quiz.title}
              onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label fw-semibold">Description</label>
            <textarea
              className="form-control"
              rows="2"
              value={quiz.description}
              onChange={(e) => setQuiz({ ...quiz, description: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label className="form-label fw-semibold">Course</label>
            <select
              className="form-select"
              value={quiz.course}
              onChange={(e) => setQuiz({ ...quiz, course: e.target.value })}
              required
            >
              <option value="">Select a course</option>
              {courses.map(c => (
                <option key={c.id} value={c.id}>{c.title}</option>
              ))}
            </select>
          </div>
        </div>

        <h5 className="fw-bold mb-3">Questions</h5>
        {questions.map((q, idx) => (
          <div key={idx} className="card p-4 mb-3">
            <div className="d-flex justify-content-between align-items-start">
              <h6 className="fw-semibold">Question {idx + 1}</h6>
              <button
                type="button"
                className="btn btn-sm btn-outline-danger"
                onClick={() => removeQuestion(idx)}
                disabled={questions.length <= 1}
              >
                <FiTrash2 />
              </button>
            </div>
            <div className="mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Question text"
                value={q.text}
                onChange={(e) => handleQuestionChange(idx, 'text', e.target.value)}
                required
              />
            </div>
            <div className="row g-2">
              {['option_a', 'option_b', 'option_c', 'option_d'].map((opt, oi) => (
                <div key={opt} className="col-md-6">
                  <div className="input-group">
                    <span className="input-group-text">{String.fromCharCode(65 + oi)}.</span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder={`Option ${String.fromCharCode(65 + oi)}`}
                      value={q[opt]}
                      onChange={(e) => handleQuestionChange(idx, opt, e.target.value)}
                      required
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-2">
              <label className="form-label small">Correct Option</label>
              <select
                className="form-select"
                value={q.correct_option}
                onChange={(e) => handleQuestionChange(idx, 'correct_option', e.target.value)}
              >
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
              </select>
            </div>
          </div>
        ))}

        <button type="button" className="btn btn-outline-primary mb-4" onClick={addQuestion}>
          <FiPlus /> Add Question
        </button>

        <div className="d-flex gap-2">
          <button type="submit" className="btn btn-primary" disabled={submitting}>
            {submitting ? 'Creating...' : 'Create Quiz'}
          </button>
          <button type="button" className="btn btn-light" onClick={() => navigate('/trainer')}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
