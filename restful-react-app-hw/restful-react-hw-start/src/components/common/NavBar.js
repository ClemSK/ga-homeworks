import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {
  return (
    <nav className="navbar is-dark">
      <div className="container">
        <div className="navbar-brand">
          <Link to="/" className="navbar-item">
            Home
          </Link>
        </div>
        <div className="navbar-brand">
          <Link to="./wines" className="navbar-item">
            Wine Index
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default NavBar
