import React from 'react'
import SweetCard from './SweetCard'
import './SweetGrid.css'

const sweets = [
  {
    id: 1,
    name: 'Gulab Jamun',
    image: '/images/gulabjmum.jfif'
  },
  {
    id: 2,
    name: 'Jalebi',
    image: '/images/jalebi.jfif'
  },
  {
    id: 3,
    name: 'Kaju Barfi',
    image: '/images/kaju barfi.jfif'
  },
  {
    id: 4,
    name: 'Rasgulla',
    image: '/images/rasgulla.jfif'
  },
  {
    id: 5,
    name: 'Ladoo',
    image: '/images/ladoo.jfif'
  },
  {
    id: 6,
    name: 'Rasmalai',
    image: '/images/rasmalai.jfif'
  }
]

function SweetGrid() {
  return (
    <div className="sweet-grid">
      {sweets.map((sweet) => (
        <SweetCard key={sweet.id} sweet={sweet} />
      ))}
    </div>
  )
}

export default SweetGrid

