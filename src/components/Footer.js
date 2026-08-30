import React from "react";
import { Link } from "react-router-dom";
import {
  FaGraduationCap,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-dark text-light pt-5 pb-3 mt-auto">
      <div className="container">
        <div className="row g-4 mb-4">
          <div className="col-md-3">
            <Link
              to="/"
              className="d-flex align-items-center gap-2 text-white text-decoration-none fw-bold fs-5 mb-3"
            >
              <FaGraduationCap size={22} />
              CAPACITY CONNECT
            </Link>
            <p className="small text-secondary">
              Empowering learners worldwide with quality education, expert
              instructors, and interactive learning experiences.
            </p>
          </div>

          <div className="col-md-3">
            <h6 className="text-white fw-bold mb-3">Quick Links</h6>
            <div className="d-flex flex-column gap-2">
              <Link to="/" className="text-secondary text-decoration-none small">
                Home
              </Link>
              <Link
                to="/courses"
                className="text-secondary text-decoration-none small"
              >
                Courses
              </Link>
              <Link
                to="/about"
                className="text-secondary text-decoration-none small"
              >
                About Us
              </Link>
              <Link
                to="/contact"
                className="text-secondary text-decoration-none small"
              >
                Contact
              </Link>
            </div>
          </div>

          <div className="col-md-3">
            <h6 className="text-white fw-bold mb-3">Support</h6>
            <div className="d-flex flex-column gap-2">
              <Link
                to="/help-center"
                className="text-secondary text-decoration-none small"
              >
                Help Center
              </Link>
              <Link
                to="/terms"
                className="text-secondary text-decoration-none small"
              >
                Terms of Service
              </Link>
              <Link
                to="/privacy"
                className="text-secondary text-decoration-none small"
              >
                Privacy Policy
              </Link>
              <Link
                to="/faqs"
                className="text-secondary text-decoration-none small"
              >
                FAQs
              </Link>
            </div>
          </div>

          <div className="col-md-3">
            <h6 className="text-white fw-bold mb-3">Contact</h6>
            <div className="d-flex flex-column gap-2 small">
              <span className="d-flex align-items-center gap-2">
                <FaEnvelope size={13} /> support@capacityconnect.com
              </span>
              <span className="d-flex align-items-center gap-2">
                <FaPhone size={13} /> +1 (555) 123-4567
              </span>
              <span className="d-flex align-items-center gap-2">
                <FaMapMarkerAlt size={13} /> 123 Education St, Tech City
              </span>
            </div>
            <div className="d-flex gap-3 mt-3">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="text-secondary">
                <FaFacebookF size={16} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-secondary">
                <FaTwitter size={16} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-secondary">
                <FaLinkedinIn size={16} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-secondary">
                <FaInstagram size={16} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-top border-secondary pt-3 text-center small text-secondary">
          © {new Date().getFullYear()} Capacity Connect. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
