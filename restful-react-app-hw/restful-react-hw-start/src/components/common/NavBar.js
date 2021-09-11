import React from 'react'
import { Link } from 'react-router-dom'
import { isLoggedIn } from '../auth/Auth'

const NavBar = () => (
  <nav className="navbar is-dark">
    <div className="container">
      <div className="navbar-brand">
        <Link to="/" className="navbar-item">
          Home
        </Link>
        <Link to="/wines" className="navbar-item">
          Wine Index
        </Link>
        {isLoggedIn() ? (
          <Link to="/wines/new" className="navbar-item">
            Add a whine 😩🍷
          </Link>
        ) : (
          <>
            <Link to="/register" className="navbar-item">
              Register
            </Link>
            <Link to="/login" className="navbar-item">
              Login
            </Link>
          </>
        )}
      </div>
    </div>
  </nav>
)

export default NavBar
