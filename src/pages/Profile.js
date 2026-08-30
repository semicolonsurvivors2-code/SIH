import React, { useState } from "react";
import { FiEdit2, FiSave, FiX, FiAward, FiBriefcase, FiBook } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

export default function Profile() {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    bio: "Lifelong learner passionate about data and technology.",
    education: "B.Sc. Computer Science",
    skills: "Python, Excel, SQL, Communication",
    experience: "2 years as a Business Analyst",
  });
  const [draft, setDraft] = useState(form);
  const [errors, setErrors] = useState({});

  const startEdit = () => {
    setDraft(form);
    setErrors({});
    setEditing(true);
  };

  const handleSave = () => {
    const newErrors = {};
    if (!draft.bio.trim()) newErrors.bio = "Bio can't be empty";
    if (draft.bio.length > 300) newErrors.bio = "Keep your bio under 300 characters";
    setErrors(newErrors);
    if (Object.keys(newErrors).length) return;
    setForm(draft);
    setEditing(false);
    showToast("Profile updated successfully.", "success");
  };

  const initials = (user?.name || "U").split(" ").map((s) => s[0]).join("").slice(0, 2).toUpperCase();

  return (
    <div className="row g-4">
      <div className="col-lg-4">
        <div className="card p-4 text-center">
          <div
            className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center fw-bold fs-3 mx-auto mb-3"
            style={{ width: 96, height: 96 }}
          >
            {initials}
          </div>
          <h5 className="fw-bold mb-1">{user?.name || "Guest User"}</h5>
          <p className="text-muted small mb-2">{user?.email}</p>
          <span className="badge bg-primary bg-opacity-10 text-primary text-capitalize">
            {user?.role || "trainee"}
          </span>
        </div>
      </div>

      <div className="col-lg-8">
        <div className="card p-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h6 className="fw-bold mb-0">About</h6>
            {!editing ? (
              <button className="btn btn-sm btn-outline-primary" onClick={startEdit}>
                <FiEdit2 size={14} className="me-1" /> Edit Profile
              </button>
            ) : (
              <div className="d-flex gap-2">
                <button className="btn btn-sm btn-light" onClick={() => setEditing(false)}>
                  <FiX size={14} className="me-1" /> Cancel
                </button>
                <button className="btn btn-sm btn-primary" onClick={handleSave}>
                  <FiSave size={14} className="me-1" /> Save
                </button>
              </div>
            )}
          </div>

          {editing ? (
            <div className="d-flex flex-column gap-3">
              <div>
                <label className="form-label small fw-semibold">Bio</label>
                <textarea
                  className={`form-control ${errors.bio ? "is-invalid" : ""}`}
                  rows={3}
                  value={draft.bio}
                  onChange={(e) => setDraft({ ...draft, bio: e.target.value })}
                />
                {errors.bio && <div className="invalid-feedback">{errors.bio}</div>}
              </div>
              <div>
                <label className="form-label small fw-semibold">Education</label>
                <input
                  className="form-control"
                  value={draft.education}
                  onChange={(e) => setDraft({ ...draft, education: e.target.value })}
                />
              </div>
              <div>
                <label className="form-label small fw-semibold">Skills (comma-separated)</label>
                <input
                  className="form-control"
                  value={draft.skills}
                  onChange={(e) => setDraft({ ...draft, skills: e.target.value })}
                />
              </div>
              <div>
                <label className="form-label small fw-semibold">Experience</label>
                <input
                  className="form-control"
                  value={draft.experience}
                  onChange={(e) => setDraft({ ...draft, experience: e.target.value })}
                />
              </div>
            </div>
          ) : (
            <>
              <p className="text-muted small mb-4">{form.bio}</p>
              <div className="d-flex flex-column gap-3">
                <div className="d-flex align-items-center gap-3">
                  <div className="bg-primary bg-opacity-10 text-primary p-2 rounded-3"><FiBook size={16} /></div>
                  <div>
                    <div className="small text-muted">Education</div>
                    <div className="small fw-semibold">{form.education}</div>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-3">
                  <div className="bg-success bg-opacity-10 text-success p-2 rounded-3"><FiBriefcase size={16} /></div>
                  <div>
                    <div className="small text-muted">Experience</div>
                    <div className="small fw-semibold">{form.experience}</div>
                  </div>
                </div>
                <div className="d-flex align-items-start gap-3">
                  <div className="bg-warning bg-opacity-10 text-warning p-2 rounded-3"><FiAward size={16} /></div>
                  <div>
                    <div className="small text-muted mb-1">Skills</div>
                    <div className="d-flex flex-wrap gap-2">
                      {form.skills.split(",").map((s) => (
                        <span key={s} className="badge bg-light text-dark border">{s.trim()}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
