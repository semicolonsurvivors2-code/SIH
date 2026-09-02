import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaFilter, FaStar, FaUser } from "react-icons/fa";

const ExploreCourses = () => {
  const [activeCat, setActiveCat] = useState("All");
  const categories = [
    "All",
    "IT & Software",
    "Business",
    "Leadership",
    "Personal Development",
    "Communication",
  ];

  const courses = [
    {
      id: 1,
      title: "Python for Beginners",
      instructor: "Sarvesh Kumar",
      rating: "",
      students: "",
      price: "Free",
      category: "IT & Software",
      image:
        "https://img.freepik.com/free-photo/programming-background-concept_23-2149151158.jpg",
    },
    {
      id: 2,
      title: "Digital Marketing",
      instructor: "Neha Verma",
      rating: "",
      students: "",
      price: "Free",
      category: "Business",
      image:
        "https://img.freepik.com/free-photo/digital-marketing-concept_23-2149151160.jpg",
    },
    {
      id: 3,
      title: "Web Development",
      instructor: "Rahul Singh",
      rating: "",
      students: "",
      price: "Free",
      category: "IT & Software",
      image:
        "https://img.freepik.com/free-photo/web-development-programming_23-2149151161.jpg",
    },
    {
      id: 4,
      title: "Data Analytics",
      instructor: "Sarah Khan",
      rating: "",
      students: "",
      price: "Free",
      category: "IT & Software",
      image:
        "https://img.freepik.com/free-photo/data-analysis-chart_23-2149151162.jpg",
    },
    {
      id: 5,
      title: "UI/UX Design",
      instructor: "Amit Patel",
      rating: "",
      students: "",
      price: "Free",
      category: "IT & Software",
      image:
        "https://img.freepik.com/free-photo/ui-ux-design-concept_23-2149151163.jpg",
    },
    {
      id: 6,
      title: "Public Speaking",
      instructor: "Priya Sharma",
      rating: "",
      students: "",
      price: "Free",
      category: "Communication",
      image:
        "https://img.freepik.com/free-photo/public-speaking-concept_23-2149151164.jpg",
    },
  ];

  const filtered =
    activeCat === "All"
      ? courses
      : courses.filter((c) => c.category === activeCat);

  return (
    <div>
      <h4 className="fw-bold mb-4">Explore Courses</h4>

      <div className="card p-3 mb-4">
        <div className="row g-3 align-items-center">
          <div className="col-md-8">
            <div className="input-group">
              <span className="input-group-text bg-white border-end-0">
                <FaSearch className="text-muted" />
              </span>
              <input
                type="text"
                className="form-control border-start-0"
                placeholder="Search for courses..."
              />
            </div>
          </div>
          <div className="col-md-4 text-end">
            <button className="btn btn-outline-secondary">
              <FaFilter /> Filters
            </button>
          </div>
        </div>
      </div>

      <div className="d-flex gap-2 mb-4 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`btn ${activeCat === cat ? "btn-primary" : "btn-outline-secondary"} rounded-pill`}
            onClick={() => setActiveCat(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="row g-4">
        {filtered.map((c) => (
          <div key={c.id} className="col-md-4 col-lg-3">
            <Link
              to={`/courses/${c.id}`}
              className="text-decoration-none text-dark"
            >
              <div className="card h-100">
                <img src={c.image} className="course-card-img" alt={c.title} />
                <div className="card-body">
                  <h6 className="fw-bold mb-1">{c.title}</h6>
                  <p className="small text-muted mb-2">
                    <FaUser className="me-1" size={12} /> {c.instructor}
                  </p>
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="small">
                      <FaStar className="text-warning" /> {c.rating} (
                      {c.students})
                    </span>
                    <span className="badge bg-success bg-opacity-10 text-success">
                      {c.price}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExploreCourses;
