import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FaBookOpen, FaChevronRight, FaPython, FaJava } from "react-icons/fa";

// Sample notes data — swap this for an API call once your backend is ready.
const COURSE_NOTES = {
  python: {
    title: "Python Fundamentals",
    icon: FaPython,
    color: "#3776AB",
    topics: [
      {
        heading: "1. Introduction to Python",
        content:
          "Python is a high-level, interpreted language known for readable syntax. It supports procedural, object-oriented, and functional programming styles.",
      },
      {
        heading: "2. Variables & Data Types",
        content:
          "Python is dynamically typed. Common types: int, float, str, bool, list, tuple, dict, and set. Example: x = 10, name = 'Claude', is_active = True.",
      },
      {
        heading: "3. Control Flow",
        content:
          "if / elif / else handle conditionals. for and while loops handle iteration. Indentation defines blocks — there are no curly braces.",
      },
      {
        heading: "4. Functions",
        content:
          "Defined with def. Example: def add(a, b): return a + b. Functions can have default args, *args, and **kwargs.",
      },
      {
        heading: "5. OOP in Python",
        content:
          "Classes are defined with class Keyword. Objects are instances. Supports inheritance, encapsulation, and polymorphism like other OOP languages.",
      },
    ],
  },
  java: {
    title: "Java Fundamentals",
    icon: FaJava,
    color: "#E76F00",
    topics: [
      {
        heading: "1. Introduction to Java",
        content:
          "Java is a statically typed, class-based, object-oriented language. Code runs on the JVM, making it platform-independent.",
      },
      {
        heading: "2. Variables & Data Types",
        content:
          'Java requires explicit types: int, double, boolean, char, String. Example: int age = 25; String name = "Claude";',
      },
      {
        heading: "3. Control Flow",
        content:
          "if / else if / else, switch, for, while, and do-while are all supported. Blocks are defined with curly braces {}.",
      },
      {
        heading: "4. Methods",
        content:
          "Defined inside a class with a return type. Example: public int add(int a, int b) { return a + b; }",
      },
      {
        heading: "5. OOP in Java",
        content:
          "Everything lives inside a class. Java supports inheritance (extends), interfaces (implements), encapsulation, and polymorphism.",
      },
    ],
  },
};

const CourseNotes = () => {
  const { id } = useParams(); // e.g. /courses/python/notes -> id = "python"
  const course = COURSE_NOTES[id] || COURSE_NOTES.python;
  const [activeTopic, setActiveTopic] = useState(0);
  const Icon = course.icon;

  return (
    <div className="course-notes-page">
      <div className="container py-5">
        <div className="d-flex align-items-center gap-3 mb-4">
          <div
            className="notes-icon"
            style={{ background: `${course.color}1A`, color: course.color }}
          >
            <Icon size={22} />
          </div>
          <div>
            <h3 className="fw-bold mb-0">{course.title}</h3>
            <p className="text-muted small mb-0">
              <FaBookOpen className="me-1" /> Course Notes
            </p>
          </div>
        </div>

        <div className="row g-4">
          {/* Sidebar: topic list */}
          <div className="col-md-4">
            <div className="notes-sidebar">
              {course.topics.map((topic, idx) => (
                <button
                  key={idx}
                  className={`notes-topic-btn ${
                    activeTopic === idx ? "active" : ""
                  }`}
                  onClick={() => setActiveTopic(idx)}
                >
                  <span>{topic.heading}</span>
                  <FaChevronRight size={12} />
                </button>
              ))}
            </div>
          </div>

          {/* Main content */}
          <div className="col-md-8">
            <div className="notes-content-card">
              <h5 className="fw-bold mb-3">
                {course.topics[activeTopic].heading}
              </h5>
              <p className="text-secondary mb-0">
                {course.topics[activeTopic].content}
              </p>
            </div>

            <div className="d-flex justify-content-between mt-3">
              <button
                className="btn btn-outline-primary btn-sm"
                disabled={activeTopic === 0}
                onClick={() => setActiveTopic((p) => p - 1)}
              >
                Previous
              </button>
              <button
                className="btn btn-primary btn-sm"
                disabled={activeTopic === course.topics.length - 1}
                onClick={() => setActiveTopic((p) => p + 1)}
              >
                Next
              </button>
            </div>

            <Link to={`/courses/${id}`} className="d-inline-block mt-4 small">
              ← Back to course details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseNotes;
