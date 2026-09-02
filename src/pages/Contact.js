import React from "react";
import { FiPhone, FiMail } from "react-icons/fi";
import { FaWhatsapp, FaLinkedinIn } from "react-icons/fa";

export default function Contact() {
  const contactItems = [
    {
      icon: <FiPhone size={20} />,
      label: "Phone",
      value: "+1 (555) 123-4567",
      href: "tel:+15551234567",
      bg: "primary",
    },
    {
      icon: <FaWhatsapp size={20} />,
      label: "WhatsApp",
      value: "Chat with us",
      href: "https://wa.me/15551234567",
      bg: "success",
    },
    {
      icon: <FaLinkedinIn size={20} />,
      label: "LinkedIn",
      value: "Capacity Connect",
      href: "https://linkedin.com/company/capacity-connect",
      bg: "info",
    },
    {
      icon: <FiMail size={20} />,
      label: "Gmail",
      value: "support@capacityconnect.com",
      href: "mailto:support@capacityconnect.com",
      bg: "danger",
    },
  ];

  return (
    <div>
      <div className="bg-primary text-white py-5 text-center">
        <div className="container">
          <h1 className="fw-bold">Contact Us</h1>
          <p className="lead mb-0" style={{ opacity: 0.9 }}>
            We'd love to hear from you. Reach out through any of the channels below.
          </p>
        </div>
      </div>

      <section className="py-5">
        <div className="container">
          <div className="text-center mb-5 mx-auto" style={{ maxWidth: 560 }}>
            <h4 className="fw-bold mb-2">Get in Touch</h4>
            <p className="text-muted mb-0">
              Have questions about our courses, partnerships, or need technical
              support? Reach out directly — we typically respond within a day.
            </p>
          </div>

          <div className="row g-4 justify-content-center">
            {contactItems.map((c, i) => (
              <div key={i} className="col-6 col-md-3">
                <a
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel={c.href.startsWith("http") ? "noreferrer" : undefined}
                  className="card h-100 text-decoration-none text-dark p-4 text-center d-block"
                >
                  <div
                    className={`bg-${c.bg} bg-opacity-10 text-${c.bg} rounded-3 d-flex align-items-center justify-content-center mx-auto mb-3`}
                    style={{ width: 56, height: 56 }}
                  >
                    {c.icon}
                  </div>
                  <div className="fw-semibold small mb-1">{c.label}</div>
                  <div className="small text-muted">{c.value}</div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
