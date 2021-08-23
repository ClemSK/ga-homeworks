import React from 'react'
import { useParams } from 'react-router-dom'
import { getSingleWine } from '../lib/Api'

const WineShow = () => {
  const { id } = useParams()
  const [state, setState] = React.useState({ wine: null })

  const getSingleWineFromApi = async () => {
    try {
      const res = await getSingleWine(id)
      setState({ wine: res.data })
    } catch (err) {
      console.error(
        `There was an error in getting the data from the Api ${id}`,
        err
      )
    }
  }

  React.useEffect(() => {
    getSingleWineFromApi()
  }, [])

  console.log('state is wine', state)

  if (state.wine === null) {
    return <p>Loading...</p>
  }

  return (
    <section className="section">
      <div className="container">
        <h2 className="title has-text-centered">{state.wine.name}</h2>
        <hr />

        <div className="columns">
          <div className="column is-half has-background-danger">
            <h4 className="title is-4">
              <span role="image" aria-label="wine">
                🍷
              </span>{' '}
              Tasting Notes
            </h4>
            <hr />

            <p>{state.wine.tastingNotes}</p>
            <hr />

            <h4 className="title is-4">
              <span role="img" aria-label="globe">
                🌏
              </span>{' '}
              Origin
            </h4>
            <p>{state.wine.origin}</p>
            <hr />

            <h4 className="title is-4">
              <span role="img" aria-label="wave">
                👋
              </span>{' '}
              Added By
            </h4>
            <p>{state.wine.origin}</p>
            <hr />
          </div>

          <div className="column is-half">
            <figure className="img">
              <img src={state.wine.image} alt={state.wine.name} />
            </figure>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WineShow
