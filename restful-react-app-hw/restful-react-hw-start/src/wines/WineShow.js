import React from 'react'
import { Link, useParams, useHistory } from 'react-router-dom'
import { getSingleWine, deleteWine } from '../lib/Api'
import { getPayload } from '../components/auth/Auth'

// here we take the values that are brought back from the Api to display them

const WineShow = () => {
  const { id } = useParams()
  const history = useHistory()
  const [state, setState] = React.useState({ wine: null })

  const getSingleWineFromApi = async () => {
    // getting info from the Api
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
    // calling the function to recieve the data
    getSingleWineFromApi()
  }, []) // using the square brackets to limit the calls to the Api

  console.log('state is', state)

  if (state.wine === null) {
    return <p>Loading...</p> // if there are issues getting the info from the Api
  }

  const isOwner = getPayload().sub === state.wine.user._id
  console.log('is owner is', isOwner)

  const handleDelete = async () => {
    const wineIdToDelete = id
    try {
      await deleteWine(wineIdToDelete)
      history.push('/wines')
    } catch (err) {
      console.error(`failed to delete wine ${id}`, err)
    }
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
            <p>{state.wine.user.username}</p>
            <hr />
            {isOwner && (
              <>
                <Link to={`/wines/${id}/edit`} className="button is-warning">
                  Edit Wine
                </Link>
                <button className="button is-danger" onClick={handleDelete}>
                  Delete Wine
                </button>
              </>
            )}
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
