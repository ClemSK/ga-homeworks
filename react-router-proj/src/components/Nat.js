import React from 'react'
import './Nat.css'

const Nat = ({ author, text, handleUserClick }) => {
  return (
    <div className="nat">
      <p className="author" onClick={() => handleUserClick(author)}>
        @{author}
      </p>
      <p className="text">{text}</p>
    </div>
  )
}

export default Nat
