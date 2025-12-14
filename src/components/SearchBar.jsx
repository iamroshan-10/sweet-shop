import React, { useState } from 'react'
import './SearchBar.css'

function SearchBar({ onSearch, onFilterClick }) {
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearch = (e) => {
    const value = e.target.value
    setSearchTerm(value)
    if (onSearch) {
      onSearch(value)
    }
  }

  const handleFilterClick = () => {
    if (onFilterClick) {
      onFilterClick()
    }
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
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
    </div>
  )
}

export default SearchBar

