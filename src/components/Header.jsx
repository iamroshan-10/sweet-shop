import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import LoginModal from './LoginModal'
import RegisterModal from './RegisterModal'
import './Header.css'

function Header() {
  const { user, logout, isAdmin } = useAuth()
  const [showLogin, setShowLogin] = useState(false)
  const [showRegister, setShowRegister] = useState(false)

  const handleAdminClick = () => {
    // functionality here - can add admin dashboard later
    if (isAdmin) {
      alert('Admin dashboard coming soon!')
    } else {
      alert('Admin access required')
    }
  }

  const handleSignInClick = (e) => {
    e.preventDefault()
    setShowLogin(true)
  }

  const handleSignUpClick = (e) => {
    e.preventDefault()
    setShowRegister(true)
  }

  const handleLogout = () => {
    logout()
  }

  return (
    <>
      <header className="header">
        <div className="header-left">
          <div className="logo">
            <div className="logo-icon">🍄</div>
            <span className="logo-text">Sweet Shop</span>
          </div>
        </div>
        <nav className="header-right">
          {isAdmin && (
            <a href="#" className="nav-link" onClick={handleAdminClick}>
              Admin
            </a>
          )}
          {user ? (
            <>
              <span className="nav-link">Welcome, {user.username}</span>
              <button className="sign-up-btn" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <a href="#" className="nav-link" onClick={handleSignInClick}>
                Sign In
              </a>
              <button className="sign-up-btn" onClick={handleSignUpClick}>
                Sign Up
              </button>
            </>
          )}
        </nav>
      </header>
      <LoginModal
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
        onSwitchToRegister={() => {
          setShowLogin(false)
          setShowRegister(true)
        }}
      />
      <RegisterModal
        isOpen={showRegister}
        onClose={() => setShowRegister(false)}
        onSwitchToLogin={() => {
          setShowRegister(false)
          setShowLogin(true)
        }}
      />
    </>
  )
}

export default Header

