import React from "react";
import { FaUsers, FaSignal, FaBookOpen, FaGraduationCap } from "react-icons/fa";

const AdminDashboard = () => {
  const stats = [
    {
      label: "Total Users",
      value: "2,450",
      icon: <FaUsers />,
      color: "primary",
    },
    {
      label: "Active Now",
      value: "1,280",
      icon: <FaSignal />,
      color: "success",
    },
    { label: "Courses", value: "320", icon: <FaBookOpen />, color: "warning" },
    {
      label: "Enrollments",
      value: "5,760",
      icon: <FaGraduationCap />,
      color: "info",
    },
  ];

  // Simple SVG Line Chart
  const LineChart = () => (
    <svg viewBox="0 0 300 100" className="w-100" style={{ height: 200 }}>
      <defs>
        <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M0,80 Q50,70 75,50 T150,40 T225,30 T300,20 L300,100 L0,100 Z"
        fill="url(#grad)"
      />
      <path
        d="M0,80 Q50,70 75,50 T150,40 T225,30 T300,20"
        fill="none"
        stroke="#2563eb"
        strokeWidth="2"
      />
      <circle cx="75" cy="50" r="3" fill="#2563eb" />
      <circle cx="150" cy="40" r="3" fill="#2563eb" />
      <circle cx="225" cy="30" r="3" fill="#2563eb" />
    </svg>
  );

  // Simple SVG Donut Chart
  const DonutChart = () => {
    const data = [
      { label: "IT & Software", value: 35, color: "#2563eb" },
      { label: "Business", value: 25, color: "#10b981" },
      { label: "Leadership", value: 20, color: "#f59e0b" },
      { label: "Personal Dev", value: 15, color: "#ef4444" },
      { label: "Communication", value: 5, color: "#8b5cf6" },
    ];
    let cumulative = 0;
    const total = data.reduce((a, b) => a + b.value, 0);

    return (
      <div className="d-flex align-items-center gap-4">
        <svg viewBox="0 0 100 100" style={{ width: 180, height: 180 }}>
          {data.map((d, i) => {
            const start = (cumulative / total) * 360;
            const end = ((cumulative + d.value) / total) * 360;
            cumulative += d.value;
            const largeArc = end - start > 180 ? 1 : 0;
            const startRad = ((start - 90) * Math.PI) / 180;
            const endRad = ((end - 90) * Math.PI) / 180;
            const x1 = 50 + 40 * Math.cos(startRad);
            const y1 = 50 + 40 * Math.sin(startRad);
            const x2 = 50 + 40 * Math.cos(endRad);
            const y2 = 50 + 40 * Math.sin(endRad);
            return (
              <path
                key={i}
                d={`M50,50 L${x1},${y1} A40,40 0 ${largeArc},1 ${x2},${y2} Z`}
                fill={d.color}
              />
            );
          })}
          <circle cx="50" cy="50" r="25" fill="white" />
        </svg>
        <div>
          {data.map((d, i) => (
            <div key={i} className="d-flex align-items-center gap-2 mb-1">
              <div
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: 3,
                  background: d.color,
                }}
              ></div>
              <small className="text-muted">
                {d.label} ({d.value}%)
              </small>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div>
      <h4 className="fw-bold mb-4">Admin Dashboard</h4>

      <div className="row g-3 mb-4">
        {stats.map((s, i) => (
          <div key={i} className="col-md-3 col-sm-6">
            <div className="card p-3">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <p className="text-muted small mb-1">{s.label}</p>
                  <h3 className="fw-bold mb-0">{s.value}</h3>
                </div>
                <div
                  className={`bg-${s.color} bg-opacity-10 text-${s.color} p-2 rounded-3`}
                >
                  {s.icon}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="row g-4">
        <div className="col-lg-8">
          <div className="card p-4">
            <h5 className="fw-bold mb-3">User Growth</h5>
            <LineChart />
          </div>
        </div>
        <div className="col-lg-4">
          <div className="card p-4">
            <h5 className="fw-bold mb-3">Enrollments by Category</h5>
            <DonutChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
