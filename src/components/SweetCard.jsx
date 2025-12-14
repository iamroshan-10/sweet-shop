import React from 'react'
import './SweetCard.css'

function SweetCard({ sweet }) {
  const handleAddToCart = () => {
    // functionality here
  }

  return (
    <div className="sweet-card">
      <div className="sweet-image-container">
        <img src={sweet.image} alt={sweet.name} className="sweet-image" />
      </div>
      <div className="sweet-info">
        <h3 className="sweet-name">{sweet.name}</h3>
        <button className="add-to-cart-btn" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  )
}

export default SweetCard

