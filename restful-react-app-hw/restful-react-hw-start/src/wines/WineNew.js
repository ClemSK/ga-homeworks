import React from 'react'
import { useHistory } from 'react-router-dom'
import { createWine } from '../lib/Api'
import WineNameField from '../components/fields/WineNameField'
import ImageUrlField from '../components/fields/ImageUrlField'
import OriginField from '../components/fields/OriginField'
import TastingNotesField from '../components/fields/TastingNotes'

// when adding in a new wine we call in the components and update the fields.
// the fields are separated to reduce the length of code in 1 file and improve readability

const WineNew = () => {
  const history = useHistory() // like registering a new user, recycling the history component
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
      [e.target.name]: e.target.value // using state to handle change in the forms
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
            <WineNameField // calling in the different fields
              handleChange={handleChange}
              name={state.formData.name} // taking the form values
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
                value={`Add ${state.formData.name || 'new wine'}`} // updating the button text based on the name of the new wine, switching out the default
              />
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
export default WineNew
