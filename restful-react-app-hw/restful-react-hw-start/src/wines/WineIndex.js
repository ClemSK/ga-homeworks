import React from 'react'
import { getAllWines } from '../lib/Api'

import WineCard from './WineCard' // This component pulls in other elements from WineCard and WineShow which end up in the App

const WineIndex = () => {
  const [state, setState] = React.useState({ wines: [] }) // setting state, the array to store and update the info

  const fetchDataFromApi = async () => { // getting the info from the Api
    try {
      const res = await getAllWines()
      setState({ wines: res.data })
    } catch (err) { // if unable to get the data we can catch the error and log a message for where the error occured
      console.log('There was an error in fetching the API data', err)
    }
  }

  React.useEffect(() => { // calling the Api
    fetchDataFromApi()
  }, [])

  console.log(state)

  // Here we are representing the info from the Api in the UI

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
            // <WineCard key={wine._id} {...wine} // This is an alternative way to get the same result, but less readable/>
          )}
        </div>
      </div>
    </section>
  )
}

export default WineIndex
