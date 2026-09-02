import React from "react";
import {
  FaBookOpen,
  FaUsers,
  FaStar,
  FaChartLine,
  FaEdit,
  FaEye,
} from "react-icons/fa";

const TrainerDashboard = () => {
  const stats = [
    { label: "My Courses", value: "", icon: <FaBookOpen />, color: "primary" },
    {
      label: "Total Learners",
      value: "",
      icon: <FaUsers />,
      color: "success",
    },
    { label: "Courses", value: "", icon: <FaChartLine />, color: "warning" },
    { label: "Course Rating", value: "", icon: <FaStar />, color: "info" },
  ];

  const myCourses = [
    {
      title: "Data Analytics Fundamentals",
      enrolled: "",
      rating: "",
      status: "Published",
      image:
        "https://img.freepik.com/free-photo/data-analysis-chart_23-2149151162.jpg",
    },
    {
      title: "Excel for Professionals",
      enrolled: "",
      rating: "",
      status: "Published",
      image:
        "https://img.freepik.com/free-photo/person-using-laptop_23-2149216321.jpg",
    },
    {
      title: "SQL for Beginners",
      enrolled: "",
      rating: "",
      status: "Published",
      image:
        "https://img.freepik.com/free-photo/sql-database-concept_23-2149151165.jpg",
    },
  ];

  return (
    <div>
      <h4 className="fw-bold mb-4">Trainer Dashboard</h4>

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

      <div className="card">
        <div className="card-header bg-white d-flex justify-content-between align-items-center">
          <h5 className="fw-bold mb-0">My Courses</h5>
          <button className="btn btn-primary btn-sm">+ Add Course</button>
        </div>
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="bg-light">
              <tr>
                <th>Course</th>
                <th>Enrolled</th>
                <th>Rating</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {myCourses.map((c, i) => (
                <tr key={i}>
                  <td>
                    <div className="d-flex align-items-center gap-3">
                      <img
                        src={c.image}
                        alt=""
                        width="48"
                        height="48"
                        className="rounded-3"
                        style={{ objectFit: "cover" }}
                      />
                      <span className="fw-semibold small">{c.title}</span>
                    </div>
                  </td>
                  <td>{c.enrolled}</td>
                  <td>
                    <FaStar className="text-warning" /> {c.rating}
                  </td>
                  <td>
                    <span className="badge bg-success bg-opacity-10 text-success">
                      {c.status}
                    </span>
                  </td>
                  <td>
                    <button className="btn btn-sm btn-outline-primary me-1">
                      <FaEye />
                    </button>
                    <button className="btn btn-sm btn-outline-secondary">
                      <FaEdit />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TrainerDashboard;
