import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { useToast } from "../context/ToastContext";
import ConfirmDialog from "../components/ui/ConfirmDialog";
import { useNavigate } from "react-router-dom";

export default function Settings() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [name, setName] = useState(user?.name || "");
  const [pw, setPw] = useState({ current: "", next: "", confirm: "" });
  const [pwErrors, setPwErrors] = useState({});
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [confirmingDelete, setConfirmingDelete] = useState(false);

  const saveAccount = (e) => {
    e.preventDefault();
    showToast("Account details saved.", "success");
  };

  const changePassword = (e) => {
    e.preventDefault();
    const errors = {};
    if (!pw.current) errors.current = "Current password is required";
    if (!pw.next || pw.next.length < 6) errors.next = "New password must be at least 6 characters";
    if (pw.next !== pw.confirm) errors.confirm = "Passwords do not match";
    setPwErrors(errors);
    if (Object.keys(errors).length) return;
    setPw({ current: "", next: "", confirm: "" });
    showToast("Password changed successfully.", "success");
  };

  const handleDeleteAccount = () => {
    setConfirmingDelete(false);
    logout();
    showToast("Account deleted.", "info");
    navigate("/");
  };

  return (
    <div className="row g-4">
      <div className="col-lg-8">
        <div className="card p-4 mb-4">
          <h6 className="fw-bold mb-3">Account Settings</h6>
          <form onSubmit={saveAccount} className="d-flex flex-column gap-3">
            <div>
              <label className="form-label small fw-semibold">Full Name</label>
              <input className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
              <label className="form-label small fw-semibold">Email</label>
              <input className="form-control" value={user?.email || ""} disabled />
            </div>
            <button type="submit" className="btn btn-primary align-self-start">Save Changes</button>
          </form>
        </div>

        <div className="card p-4 mb-4">
          <h6 className="fw-bold mb-3">Change Password</h6>
          <form onSubmit={changePassword} className="d-flex flex-column gap-3">
            <div>
              <label className="form-label small fw-semibold">Current Password</label>
              <input
                type="password"
                className={`form-control ${pwErrors.current ? "is-invalid" : ""}`}
                value={pw.current}
                onChange={(e) => setPw({ ...pw, current: e.target.value })}
              />
              {pwErrors.current && <div className="invalid-feedback">{pwErrors.current}</div>}
            </div>
            <div>
              <label className="form-label small fw-semibold">New Password</label>
              <input
                type="password"
                className={`form-control ${pwErrors.next ? "is-invalid" : ""}`}
                value={pw.next}
                onChange={(e) => setPw({ ...pw, next: e.target.value })}
              />
              {pwErrors.next && <div className="invalid-feedback">{pwErrors.next}</div>}
            </div>
            <div>
              <label className="form-label small fw-semibold">Confirm New Password</label>
              <input
                type="password"
                className={`form-control ${pwErrors.confirm ? "is-invalid" : ""}`}
                value={pw.confirm}
                onChange={(e) => setPw({ ...pw, confirm: e.target.value })}
              />
              {pwErrors.confirm && <div className="invalid-feedback">{pwErrors.confirm}</div>}
            </div>
            <button type="submit" className="btn btn-primary align-self-start">Update Password</button>
          </form>
        </div>

        <div className="card p-4 border-danger">
          <h6 className="fw-bold mb-2 text-danger">Danger Zone</h6>
          <p className="small text-muted mb-3">
            Deleting your account is permanent and cannot be undone.
          </p>
          <button className="btn btn-outline-danger align-self-start" onClick={() => setConfirmingDelete(true)}>
            Delete Account
          </button>
        </div>
      </div>

      <div className="col-lg-4">
        <div className="card p-4 mb-4">
          <h6 className="fw-bold mb-3">Appearance</h6>
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              role="switch"
              id="darkModeSwitch"
              checked={theme === "dark"}
              onChange={toggleTheme}
            />
            <label className="form-check-label small" htmlFor="darkModeSwitch">
              Dark Mode
            </label>
          </div>
        </div>

        <div className="card p-4">
          <h6 className="fw-bold mb-3">Notifications</h6>
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              role="switch"
              id="emailNotifSwitch"
              checked={emailNotifs}
              onChange={() => setEmailNotifs((v) => !v)}
            />
            <label className="form-check-label small" htmlFor="emailNotifSwitch">
              Email me about course updates
            </label>
          </div>
        </div>
      </div>

      <ConfirmDialog
        open={confirmingDelete}
        title="Delete your account?"
        message="This will permanently remove your account and all associated data. This action cannot be undone."
        confirmLabel="Delete Account"
        variant="danger"
        onConfirm={handleDeleteAccount}
        onCancel={() => setConfirmingDelete(false)}
      />
    </div>
  );
}
