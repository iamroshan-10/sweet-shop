import React from 'react'
import { AuthProvider } from './context/AuthContext'
import Header from './components/Header'
import SweetGrid from './components/SweetGrid'
import HelpButton from './components/HelpButton'
import Footer from './components/Footer'
import './App.css'

function App() {
  return (
    <AuthProvider>
      <div className="app">
        <Header />
        <div className="main-content">
          <SweetGrid />
        </div>
        <HelpButton />
        <Footer />
      </div>
    </AuthProvider>
  )
}

export default App

