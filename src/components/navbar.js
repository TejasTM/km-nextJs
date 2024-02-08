import React from 'react'
import './Navbar.css';
import Link from 'next/link'

function Navbar() {
  return (
    <nav className="navbar">
    <div className="container">
      <div className="navbar-container">
        <div className="brand">Kuremara</div>
        <div className="nav-links">
          <a href="/" className="nav-link">Home</a>
          <Link href="/dashboard" className="nav-link">Dashboard</Link>
          <Link href="/login" className="nav-link">Login</Link>
        </div>
      </div>
    </div>
  </nav>
  )
}

export default Navbar