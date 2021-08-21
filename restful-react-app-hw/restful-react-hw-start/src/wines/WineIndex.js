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
    <section>
      <div>
        <div>
          {state.wines.map((wine) => {
            <WineCard
              key={wine._id}
              _id={wine._id}
              origin={wine.origin}
              image={wine.image}
            />
          })}
        </div>
      </div>
    </section>
  )
}

export default WineIndex
