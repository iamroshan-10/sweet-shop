import React, { useState, useEffect } from 'react'
import { sweetsAPI } from '../services/api'
import { useAuth } from '../context/AuthContext'
import SweetCard from './SweetCard'
import SearchBar from './SearchBar'
import './SweetGrid.css'

function SweetGrid() {
  const [sweets, setSweets] = useState([])
  const [filteredSweets, setFilteredSweets] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    loadSweets()
  }, [isAuthenticated])

  useEffect(() => {
    if (searchTerm) {
      handleSearch(searchTerm)
    } else {
      setFilteredSweets(sweets)
    }
  }, [searchTerm, sweets])

  const loadSweets = async () => {
    try {
      setLoading(true)
      setError('')
      const data = await sweetsAPI.getAll()
      setSweets(data)
      setFilteredSweets(data)
    } catch (err) {
      setError(err.message || 'Failed to load sweets')
      console.error('Error loading sweets:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = async (term) => {
    if (!term.trim()) {
      setFilteredSweets(sweets)
      return
    }

    try {
      const results = await sweetsAPI.search({ name: term })
      setFilteredSweets(results)
    } catch (err) {
      console.error('Search error:', err)
      // Fallback to client-side filtering
      const filtered = sweets.filter((sweet) =>
        sweet.name.toLowerCase().includes(term.toLowerCase())
      )
      setFilteredSweets(filtered)
    }
  }

  const handleFilterClick = () => {
    // functionality here - can add filter modal later
    alert('Filter functionality coming soon!')
  }

  if (loading) {
    return <div className="loading">Loading sweets...</div>
  }

  if (error && sweets.length === 0) {
    return (
      <div className="error-container">
        <p className="error-message">{error}</p>
        {!isAuthenticated && (
          <p className="auth-prompt">Please sign in to view sweets.</p>
        )}
      </div>
    )
  }

  return (
    <>
      <SearchBar onSearch={setSearchTerm} onFilterClick={handleFilterClick} />
      {error && <div className="error-banner">{error}</div>}
      <div className="sweet-grid">
        {filteredSweets.length === 0 ? (
          <div className="no-results">No sweets found. Try a different search term.</div>
        ) : (
          filteredSweets.map((sweet) => (
            <SweetCard key={sweet.id} sweet={sweet} onUpdate={loadSweets} />
          ))
        )}
      </div>
    </>
  )
}

export default SweetGrid

