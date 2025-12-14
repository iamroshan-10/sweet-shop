import React from 'react'
import './SearchBar.css'

function SearchBar() {
  const handleSearch = (e) => {
    // functionality here
  }

  const handleFilterClick = () => {
    // functionality here
  }

  return (
    <div className="search-section">
      <button className="filters-btn" onClick={handleFilterClick}>
        <span className="filters-text">Filters</span>
        <span className="filters-icon">▼</span>
      </button>
      <div className="search-container">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          className="search-input"
          placeholder="Search for your favorite sweets..."
          onChange={handleSearch}
        />
      </div>
    </div>
  )
}

export default SearchBar

