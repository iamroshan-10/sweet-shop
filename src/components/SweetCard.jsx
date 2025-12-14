import React, { useState } from 'react'
import { sweetsAPI } from '../services/api'
import { useAuth } from '../context/AuthContext'
import './SweetCard.css'

function SweetCard({ sweet, onUpdate }) {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const { isAuthenticated } = useAuth()

  const handlePurchase = async () => {
    if (!isAuthenticated) {
      alert('Please sign in to purchase sweets')
      return
    }

    try {
      setLoading(true)
      setMessage('')
      await sweetsAPI.purchase(sweet.id, 1)
      setMessage('Purchase successful!')
      if (onUpdate) {
        onUpdate()
      }
      setTimeout(() => setMessage(''), 3000)
    } catch (err) {
      setMessage(err.message || 'Purchase failed')
      setTimeout(() => setMessage(''), 3000)
    } finally {
      setLoading(false)
    }
  }

  const imageUrl = sweet.image_url || `/images/${sweet.name.toLowerCase().replace(/\s+/g, '')}.jfif`

  return (
    <div className="sweet-card">
      <div className="sweet-image-container">
        <img src={imageUrl} alt={sweet.name} className="sweet-image" onError={(e) => {
          e.target.src = '/images/gulabjmum.jfif' // fallback image
        }} />
      </div>
      <div className="sweet-info">
        <h3 className="sweet-name">{sweet.name}</h3>
        <p className="sweet-category">{sweet.category}</p>
        <p className="sweet-price">₹{sweet.price}</p>
        <p className="sweet-quantity">Stock: {sweet.quantity}</p>
        {message && <p className={`message ${message.includes('successful') ? 'success' : 'error'}`}>{message}</p>}
        <button
          className="add-to-cart-btn"
          onClick={handlePurchase}
          disabled={sweet.quantity === 0 || loading || !isAuthenticated}
        >
          {loading ? 'Processing...' : sweet.quantity === 0 ? 'Out of Stock' : 'Purchase'}
        </button>
      </div>
    </div>
  )
}

export default SweetCard

