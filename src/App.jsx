import React from 'react'
import Header from './components/Header'
import SearchBar from './components/SearchBar'
import SweetGrid from './components/SweetGrid'
import HelpButton from './components/HelpButton'
import Footer from './components/Footer'
import './App.css'

function App() {
  return (
    <div className="app">
      <Header />
      <div className="main-content">
        <SearchBar />
        <SweetGrid />
      </div>
      <HelpButton />
      <Footer />
    </div>
  )
}

export default App

