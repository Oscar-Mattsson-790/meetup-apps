import { useState } from "react";
import "./MeetupFilter.css";

export default function MeetupFilter({ onApplyFilters }) {
  const [date, setDate] = useState("");
  const [city, setCity] = useState("");
  const [name, setName] = useState("");

  const handleApplyFilters = () => {
    onApplyFilters({ date, city, name });
  };

  return (
    <div className="filter-page">
      <div className="filter-container">
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="filter-input"
        />
        <input
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="filter-input"
        />
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="filter-input"
        />
        <button onClick={handleApplyFilters} className="filter-button">
          Apply Filters
        </button>
      </div>
    </div>
  );
}
