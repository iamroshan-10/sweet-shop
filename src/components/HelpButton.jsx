import React from 'react'
import './HelpButton.css'

function HelpButton() {
  const handleHelpClick = () => {
    // functionality here
  }

  return (
    <button className="help-button" onClick={handleHelpClick}>
      <span className="help-icon">?</span>
      <span className="help-text">Help</span>
    </button>
  )
}

export default HelpButton

