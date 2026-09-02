import React from "react";
import {
  FiTarget,
  FiEye,
  FiHeart,
  FiUsers,
  FiTrendingUp,
  FiShield,
} from "react-icons/fi";

export default function About() {
  const values = [
    {
      icon: <FiTarget size={22} />,
      title: "Mission-Driven",
      desc: "We exist to democratize education and make quality learning accessible to everyone, everywhere.",
    },
    {
      icon: <FiEye size={22} />,
      title: "Innovation",
      desc: "We continuously evolve our platform with cutting-edge technology to enhance the learning experience.",
    },
    {
      icon: <FiHeart size={22} />,
      title: "Student First",
      desc: "Every feature, course, and decision is made with our learners' success as the top priority.",
    },
    {
      icon: <FiUsers size={22} />,
      title: "Community",
      desc: "Learning is better together. We foster collaboration, mentorship, and peer support.",
    },
    {
      icon: <FiTrendingUp size={22} />,
      title: "Excellence",
      desc: "We partner with top instructors and institutions to deliver world-class educational content.",
    },
    {
      icon: <FiShield size={22} />,
      title: "Integrity",
      desc: "Trust and transparency guide everything we do, from data privacy to fair assessments.",
    },
  ];

  const team = [
    {
      name: "Unknown",
      role: "Founder & CEO",
      avatar:
        "https://ui-avatars.com/api/?name=Sarah+Williams&background=4f46e5&color=fff",
    },
    {
      name: "Unknown",
      role: "Head of Technology",
      avatar:
        "https://ui-avatars.com/api/?name=Michael+Chen&background=059669&color=fff",
    },
    {
      name: "Unknown",
      role: "Chief Learning Officer",
      avatar:
        "https://ui-avatars.com/api/?name=Emily+Rodriguez&background=dc2626&color=fff",
    },
    {
      name: "Unknown",
      role: "Head of Product",
      avatar:
        "https://ui-avatars.com/api/?name=David+Park&background=f59e0b&color=fff",
    },
  ];

  return (
    <div>
      <div className="bg-primary text-white py-5 text-center">
        <div className="container">
          <h1 className="fw-bold">About Capacity Connect</h1>
          <p className="lead mb-0" style={{ opacity: 0.9 }}>
            Empowering learners worldwide through accessible, quality education.
          </p>
        </div>
      </div>

      <section className="py-5">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <h2 className="fw-bold mb-3">Our Story</h2>
              <p className="text-muted">
                Founded in 2026, Capacity Connect began with a simple belief:
                that education should be accessible to everyone, regardless of
                location, background, or circumstances.
              </p>
              <p className="text-muted">
                What started as a small collection of online courses has grown
                into a comprehensive learning platform serving thousands of
                students across the globe.
              </p>
              <p className="text-muted mb-0">
                Today, we offer hundreds of courses across technology, business,
                design, and more — helping individuals and teams build the
                skills they need to succeed.
              </p>
            </div>
            <div className="col-lg-6">
              <div className="row g-3 text-center">
                <div className="col-6">
                  <div className="card p-4 border-0 shadow-sm">
                    <div className="fs-3 fw-bold text-primary">2026</div>
                    <div className="small text-muted">Founded</div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="card p-4 border-0 shadow-sm">
                    <div className="fs-3 fw-bold text-success">20+</div>
                    <div className="small text-muted">State</div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="card p-4 border-0 shadow-sm">
                    <div className="fs-3 fw-bold text-warning">20+</div>
                    <div className="small text-muted">Courses</div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="card p-4 border-0 shadow-sm">
                    <div className="fs-3 fw-bold text-danger">0K+</div>
                    <div className="small text-muted">Students</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5 bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold">Our Core Values</h2>
            <p className="text-muted">
              The principles that guide everything we do.
            </p>
          </div>
          <div className="row g-4">
            {values.map((v, i) => (
              <div key={i} className="col-md-6 col-lg-4">
                <div className="card h-100 p-4 border-0 shadow-sm">
                  <div className="text-primary mb-3">{v.icon}</div>
                  <h6 className="fw-bold mb-2">{v.title}</h6>
                  <p className="small text-muted mb-0">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold">Meet Our Team</h2>
            <p className="text-muted">
              Passionate educators and technologists dedicated to your success.
            </p>
          </div>
          <div className="row g-4">
            {team.map((member, i) => (
              <div key={i} className="col-6 col-md-3 text-center">
                <div className="card h-100 p-4 border-0 shadow-sm">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="rounded-circle mx-auto mb-3"
                    width="80"
                    height="80"
                  />
                  <h6 className="fw-bold mb-1">{member.name}</h6>
                  <p className="small text-muted mb-0">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
