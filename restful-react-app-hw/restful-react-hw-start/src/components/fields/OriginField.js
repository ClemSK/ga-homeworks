import React from 'react'

const OriginField = ({ origin, handleChange }) => {
  return (
    <div className="field">
      <label className="label">
        <span role="img" aria-label="globe">
          🌎
        </span>
        Origin
      </label>
      <div className="control">
        <textarea
          className="input"
          placeHolder="Origin"
          name="origin"
          value={origin}
          onChange={handleChange}
        />
      </div>
    </div>
  )
}

export default OriginField
