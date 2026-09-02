import React, { useState } from "react";
import { FiMail, FiPhone, FiMapPin, FiSend, FiCheckCircle } from "react-icons/fi";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = "Invalid email";
    if (!form.subject.trim()) newErrors.subject = "Subject is required";
    if (!form.message.trim()) newErrors.message = "Message is required";
    else if (form.message.length < 10) newErrors.message = "Message must be at least 10 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setForm({ name: "", email: "", subject: "", message: "" });
    }, 3000);
  };

  const contactItems = [
    { icon: <FiMail size={18} />, label: "Email", value: "support@capacityconnect.com", bg: "primary" },
    { icon: <FiPhone size={18} />, label: "Phone", value: "+1 (555) 123-4567", bg: "success" },
    { icon: <FiMapPin size={18} />, label: "Address", value: "123 Education Street, Tech City, TC 90210", bg: "warning" },
  ];

  return (
    <div>
      <div className="bg-primary text-white py-5 text-center">
        <div className="container">
          <h1 className="fw-bold">Contact Us</h1>
          <p className="lead mb-0" style={{ opacity: 0.9 }}>
            We'd love to hear from you. Reach out and we'll respond as soon as possible.
          </p>
        </div>
      </div>

      <section className="py-5">
        <div className="container">
          <div className="row g-5">
            <div className="col-lg-6">
              <h4 className="fw-bold mb-3">Get in Touch</h4>
              <p className="text-muted mb-4">
                Have questions about our courses, partnerships, or need
                technical support? Our team is here to help.
              </p>
              <div className="d-flex flex-column gap-4">
                {contactItems.map((c, i) => (
                  <div key={i} className="d-flex align-items-center gap-3">
                    <div className={`bg-${c.bg} bg-opacity-10 text-${c.bg} rounded-3 d-flex align-items-center justify-content-center`} style={{ width: 48, height: 48 }}>
                      {c.icon}
                    </div>
                    <div>
                      <div className="fw-semibold small">{c.label}</div>
                      <div className="small text-muted">{c.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="col-lg-6">
              <div className="card shadow-sm border-0">
                <div className="card-body p-4">
                  {submitted ? (
                    <div className="text-center py-4">
                      <FiCheckCircle size={48} className="text-success mb-3" />
                      <h5 className="fw-bold mb-2">Message Sent!</h5>
                      <p className="small text-muted mb-0">
                        Thank you for reaching out. We'll get back to you shortly.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit}>
                      <div className="mb-3">
                        <label className="form-label small fw-semibold">Name</label>
                        <input
                          type="text"
                          name="name"
                          className={`form-control ${errors.name ? "is-invalid" : ""}`}
                          placeholder="Your name"
                          value={form.name}
                          onChange={handleChange}
                        />
                        {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                      </div>
                      <div className="mb-3">
                        <label className="form-label small fw-semibold">Email</label>
                        <input
                          type="email"
                          name="email"
                          className={`form-control ${errors.email ? "is-invalid" : ""}`}
                          placeholder="you@example.com"
                          value={form.email}
                          onChange={handleChange}
                        />
                        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                      </div>
                      <div className="mb-3">
                        <label className="form-label small fw-semibold">Subject</label>
                        <input
                          type="text"
                          name="subject"
                          className={`form-control ${errors.subject ? "is-invalid" : ""}`}
                          placeholder="How can we help?"
                          value={form.subject}
                          onChange={handleChange}
                        />
                        {errors.subject && <div className="invalid-feedback">{errors.subject}</div>}
                      </div>
                      <div className="mb-3">
                        <label className="form-label small fw-semibold">Message</label>
                        <textarea
                          name="message"
                          rows={4}
                          className={`form-control ${errors.message ? "is-invalid" : ""}`}
                          placeholder="Tell us more..."
                          value={form.message}
                          onChange={handleChange}
                        />
                        {errors.message && <div className="invalid-feedback">{errors.message}</div>}
                      </div>
                      <button type="submit" className="btn btn-primary btn-lg w-100 d-flex align-items-center justify-content-center gap-2">
                        <FiSend size={16} /> Send Message
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
