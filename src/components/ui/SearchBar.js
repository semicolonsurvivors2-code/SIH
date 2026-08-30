import React from "react";
import { FiSearch } from "react-icons/fi";

export default function SearchBar({ value, onChange, placeholder = "Search...", onSubmit }) {
  return (
    <form
      className="input-group"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit && onSubmit(value);
      }}
      role="search"
    >
      <span className="input-group-text bg-body border-end-0">
        <FiSearch className="text-muted" />
      </span>
      <input
        type="search"
        className="form-control border-start-0"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label={placeholder}
      />
    </form>
  );
}
