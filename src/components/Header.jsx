import React from 'react'
import './Header.css'

function Header() {
  const handleAdminClick = () => {
    // functionality here
  }

  const handleSignInClick = () => {
    // functionality here
  }

  const handleSignUpClick = () => {
    // functionality here
  }

  return (
    <header className="header">
      <div className="header-left">
        <div className="logo">
          <div className="logo-icon">🍄</div>
          <span className="logo-text">Sweet Shop</span>
        </div>
      </div>
      <nav className="header-right">
        <a href="#" className="nav-link" onClick={handleAdminClick}>
          Admin
        </a>
        <a href="#" className="nav-link" onClick={handleSignInClick}>
          Sign In
        </a>
        <button className="sign-up-btn" onClick={handleSignUpClick}>
          Sign Up
        </button>
      </nav>
    </header>
  )
}

export default Header

