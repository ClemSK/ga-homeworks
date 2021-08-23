import React from 'react'
import { Link } from 'react-router-dom'

const WineCard = ({ _id, name, origin, image, abv }) => {
  console.log({ _id, name, origin, image, abv })

  return (
    <div className="column is-one-quarter-desktop is-one-third-tablet is-half-mobile">
      <Link to={`/wines/${_id}`}>
        <div className="card has-background-dark">
          <div className="card-header">
            <h4 className="card-header-title has-text-light">{name}</h4>
          </div>

          <div className="card-image">
            <figure className="image square">
              <img
                src={image}
                alt={name}
                loading="lazy"
                width="255"
                height="500"
              />
            </figure>
          </div>

          <div className="card-content has-text-light">
            <h5>
              {origin}, ABV: {abv}
            </h5>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default WineCard
