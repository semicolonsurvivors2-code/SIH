import React, { useState } from "react";
import { FiBell, FiBookOpen, FiClipboard, FiAward, FiInfo, FiCheck } from "react-icons/fi";
import EmptyState from "../components/ui/EmptyState";
import { notifications as initialNotifications } from "../data/notifications";

const ICONS = {
  course: <FiBookOpen className="text-primary" />,
  assessment: <FiClipboard className="text-warning" />,
  certificate: <FiAward className="text-success" />,
  system: <FiInfo className="text-secondary" />,
};

export default function Notifications() {
  const [items, setItems] = useState(initialNotifications);
  const unreadCount = items.filter((n) => !n.read).length;

  const markRead = (id) =>
    setItems((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));

  const markAllRead = () =>
    setItems((prev) => prev.map((n) => ({ ...n, read: true })));

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="fw-bold mb-0">
          Notifications {unreadCount > 0 && <span className="badge bg-danger ms-2">{unreadCount}</span>}
        </h4>
        {unreadCount > 0 && (
          <button className="btn btn-sm btn-outline-primary" onClick={markAllRead}>
            <FiCheck size={14} className="me-1" /> Mark all as read
          </button>
        )}
      </div>

      <div className="card">
        {items.length === 0 ? (
          <EmptyState
            icon={<FiBell size={36} />}
            title="No notifications"
            description="You're all caught up."
          />
        ) : (
          <div className="list-group list-group-flush">
            {items.map((n) => (
              <button
                key={n.id}
                type="button"
                onClick={() => markRead(n.id)}
                className={`list-group-item list-group-item-action d-flex gap-3 py-3 text-start ${!n.read ? "bg-primary bg-opacity-10" : ""}`}
              >
                <div className="fs-5">{ICONS[n.type] || ICONS.system}</div>
                <div className="flex-grow-1">
                  <div className="d-flex justify-content-between">
                    <span className="fw-semibold small">{n.title}</span>
                    <span className="text-muted small">{n.time}</span>
                  </div>
                  <p className="small text-muted mb-0">{n.message}</p>
                </div>
                {!n.read && <span className="badge bg-primary align-self-center" style={{ width: 8, height: 8, padding: 0, borderRadius: "50%" }} />}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
