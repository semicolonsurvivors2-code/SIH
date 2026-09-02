import React from "react";
import EmptyState from "../components/ui/EmptyState";
import { FiClipboard } from "react-icons/fi";

export default function QuizAttempt() {
  return (
    <div className="container py-4">
      <h4 className="fw-bold mb-4">Quiz Attempt</h4>
      <EmptyState
        icon={<FiClipboard size={36} />}
        title="Quiz not available"
        description="This feature will be available soon."
      />
    </div>
  );
}
