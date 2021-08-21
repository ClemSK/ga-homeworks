import React from 'react'
import { Link } from 'react-router-dom'

const WineCard = ({ _id, name, origin, image }) => {
  console.log({ _id, name, origin, image })
  return (
    <div className="column is one-quarter-desktop is-third-tablet is-half-mobile">
      <Link to={`./wines/${_id}`}></Link>
      <div className="card">
        <h4 className="card-header">{name}</h4>
      </div>

      <div className="card-name">
        <figure lassName="image is-1by1">
          <img src={image} alt={name} loading="lazy" width="300" height="300" />
        </figure>

        <div className="card-content"></div>
      </div>
    </div>
  )
}

export default WineCard
