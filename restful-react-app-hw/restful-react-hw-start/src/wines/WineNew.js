import React from 'react'
import { useHistory } from 'react-router-dom'
import { createWine } from '../lib/Api'
import WineNameField from '../components/fields/WineNameField'
import ImageUrlField from '../components/fields/ImageUrlField'
import OriginField from '../components/fields/OriginField'
import TastingNotesField from '../components/fields/TastingNotes'

const WineNew = () => {
  const history = useHistory()
  const [state, setState] = React.useState({
    formData: {
      tastingNotes: '',
      origin: '',
      image: '',
      name: ''
    }
  })

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      console.log(state.formData)
      const result = await createWine(state.formData)
      console.log(result.data._id)
      history.push(`/wines/${result.data._id}`)
    } catch (err) {
      console.error('Error registering user', err)
    }
  }

  const handleChange = (e) => {
    const formData = {
      ...state.formData,
      [e.target.name]: e.target.value
    }

    setState({ formData })
  }

  return (
    <section>
      <div>
        <h2 className="title has text centered">Specify new wine</h2>
        <hr />

        <div className="columns">
          <form
            onSubmit={handleSubmit}
            className="column is-half is-offset-one-quarter box"
          >
            <WineNameField
              handleChange={handleChange}
              name={state.formData.name}
            />
            <TastingNotesField
              handleChange={handleChange}
              tastingNotes={state.formData.tastingNotes}
            />
            <OriginField
              handleChange={handleChange}
              origin={state.formData.origin}
            />
            <ImageUrlField
              handleChange={handleChange}
              image={state.formData.image}
            />
            <div className="field">
              <input
                className="button is-follwidth is-warning"
                type="submit"
                value={`Add ${state.formData.name || 'new wine'}`}
              />
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
export default WineNew
