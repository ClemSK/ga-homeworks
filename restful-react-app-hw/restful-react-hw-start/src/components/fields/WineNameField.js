import React from 'react'

const WineNameField = ({ name, handleChange }) => {
  return (
    <div className="field">
      <label className="label">
        <span role="img" aria-label="wine">
          🍷
        </span>
        Name
      </label>
      <div>
        <input
          className="input"
          placeholder="Name"
          name="name"
          value={name}
          onChange={handleChange}
        />
      </div>
    </div>
  )
}

export default WineNameField
