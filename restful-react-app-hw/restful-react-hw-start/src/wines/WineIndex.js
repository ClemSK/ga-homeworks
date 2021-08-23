import React from 'react'
import { getAllWines } from '../lib/Api'

import WineCard from './WineCard'

const WineIndex = () => {
  const [state, setState] = React.useState({ wines: [] })

  const fetchDataFromApi = async () => {
    try {
      const res = await getAllWines()
      setState({ wines: res.data })
    } catch (err) {
      console.log('There was an error in fetching the API data', err)
    }
  }

  React.useEffect(() => {
    fetchDataFromApi()
  }, [])

  console.log(state)

  return (
    <section className="section has-background-danger">
      <div className="container">
        <div className="columns is-multiline">
          {state.wines.map(
            (wine) => (
              <WineCard
                key={wine._id}
                _id={wine._id}
                name={wine.name}
                image={wine.image}
                origin={wine.origin}
                abv={wine.abv}
              />
            )
            // <WineCard key={wine._id} {...wine} />
          )}
        </div>
      </div>
    </section>
  )
}

export default WineIndex
