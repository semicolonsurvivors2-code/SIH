import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loader from "../components/ui/Loader";
import EmptyState from "../components/ui/EmptyState";

export default function TrainerProfile() {
  const { id } = useParams();
  const [trainer, setTrainer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000/api";
    // If you have a trainer endpoint, use it; otherwise fallback to a dummy
    const endpoint = id ? `/trainers/${id}/` : "/trainers/1/";
    fetch(`${API_URL}${endpoint}`)
      .then((res) => {
        if (!res.ok) throw new Error("Trainer not found");
        return res.json();
      })
      .then((data) => setTrainer(data))
      .catch((err) => {
        console.error("Error loading trainer:", err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Loader />;
  if (error) return <EmptyState title="Error" description={error} />;
  if (!trainer) return <EmptyState title="No trainer found" />;

  return (
    <div className="container py-4">
      <div className="row">
        <div className="col-md-4 text-center">
          <img
            src={trainer.avatar || "https://via.placeholder.com/150"}
            alt={trainer.name}
            className="rounded-circle img-fluid"
            style={{ width: 150, height: 150, objectFit: "cover" }}
          />
          <h3 className="mt-3">{trainer.name}</h3>
          <p className="text-muted">{trainer.title || "Trainer"}</p>
        </div>
        <div className="col-md-8">
          <h5>About</h5>
          <p>{trainer.bio || "No bio available."}</p>
          <h5>Expertise</h5>
          <ul>{(trainer.expertise || []).map((skill, i) => <li key={i}>{skill}</li>)}</ul>
          <h5>Courses</h5>
          <ul>{(trainer.courses || []).map((c, i) => <li key={i}>{c}</li>)}</ul>
        </div>
      </div>
    </div>
  );
}
