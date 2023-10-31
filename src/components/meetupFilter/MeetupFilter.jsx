import { useState } from "react";
import "./MeetupFilter.css";
import InputField from "../inputField/InputField";

export default function MeetupFilter({ onApplyFilters, isShowMeetupFilter }) {
  const [date, setDate] = useState("");
  const [city, setCity] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  
console.log(isShowMeetupFilter)

  function handleInputChange(event) {
    setSearchQuery(event.target.value);
    console.log(event.target.value)
  }

  const handleApplyFilters = () => {
    onApplyFilters({ date, city, name, category, searchQuery });
  };

  return (
    <div className="filter-page">
      {isShowMeetupFilter && 
        <div className="filter-container">
        <InputField
            value={searchQuery}
            onChange={(e) => handleInputChange(e)}
            placeholder="Search for meetups"
        />
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
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="filter-input"
        >
          <option value="">All Categories</option>
          <option value="Culture">Culture</option>
          <option value="Sport">Sport</option>
          <option value="Tech">Tech</option>
        </select>

        <button onClick={handleApplyFilters} className="filter-button">
          Apply Filters
        </button>
      </div>
      }
      
    </div>
  );
}
