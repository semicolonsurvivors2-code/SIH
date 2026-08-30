import React from "react";
import { Link } from "react-router-dom";

export default function Breadcrumbs({ items }) {
  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb mb-0">
        {items.map((item, i) =>
          i === items.length - 1 ? (
            <li key={i} className="breadcrumb-item active" aria-current="page">
              {item.label}
            </li>
          ) : (
            <li key={i} className="breadcrumb-item">
              <Link to={item.to} className="text-decoration-none">
                {item.label}
              </Link>
            </li>
          ),
        )}
      </ol>
    </nav>
  );
}
