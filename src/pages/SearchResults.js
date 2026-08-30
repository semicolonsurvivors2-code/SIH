import React, { useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { FaStar, FaUser } from "react-icons/fa";
import { courses } from "../data/mockData";
import EmptyState from "../components/ui/EmptyState";
import SearchBar from "../components/ui/SearchBar";
import { FiSearch } from "react-icons/fi";

export default function SearchResults() {
  const [params, setParams] = useSearchParams();
  const query = params.get("q") || "";

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return courses.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q) ||
        c.level.toLowerCase().includes(q),
    );
  }, [query]);

  return (
    <div className="container py-4">
      <div className="mb-4" style={{ maxWidth: 480 }}>
        <SearchBar
          value={query}
          onChange={(v) => setParams(v ? { q: v } : {})}
          placeholder="Search courses, categories..."
        />
      </div>

      <h5 className="fw-bold mb-4">
        {query ? `Results for "${query}"` : "Search Courses"}{" "}
        {query && <span className="text-muted fw-normal">({results.length})</span>}
      </h5>

      {!query ? (
        <EmptyState icon={<FiSearch size={36} />} title="Start typing to search" description="Search by course title, category, or level." />
      ) : results.length === 0 ? (
        <EmptyState title="No results found" description={`We couldn't find anything matching "${query}".`} />
      ) : (
        <div className="row g-4">
          {results.map((c) => (
            <div key={c.id} className="col-md-4">
              <Link to={`/courses/${c.id}`} className="text-decoration-none text-dark">
                <div className="card h-100">
                  <img src={c.image} className="course-card-img" alt={c.title} />
                  <div className="card-body">
                    <h6 className="fw-bold mb-1">{c.title}</h6>
                    <p className="small text-muted mb-2 d-flex align-items-center gap-1">
                      <FaUser size={12} /> {c.category}
                    </p>
                    <span className="small">
                      <FaStar className="text-warning" size={12} /> {c.rating}
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
