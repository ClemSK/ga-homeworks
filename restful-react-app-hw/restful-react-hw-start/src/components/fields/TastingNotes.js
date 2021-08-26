import React from 'react'

const TastingNotesField = ({ tastingNotes, handleChange }) => {
  return (
    <div className="field">
      <label className="label">
        <span role="img" aria-label="plate">
          🍽
        </span>
        Tasting Notes
      </label>
      <div className="control">
        <textarea
          className="input"
          placeholder="Tasting Notes"
          name="tastingNotes"
          value={tastingNotes}
          onChange={handleChange}
        />
      </div>
    </div>
  )
}

export default TastingNotesField
