import React from 'react'
import { useHistory } from 'react-router'
import { loginUser } from '../../lib/Api'
import { setToken } from './Auth'

// The history library lets you easily manage session history anywhere JavaScript runs.
// A history object abstracts away the differences in various environments and provides a minimal API that lets you manage the history stack,
// navigate, and persist state between sessions.

const Login = () => {
  const history = useHistory()
  const [state, setState] = React.useState({
    formData: {
      email: '',
      password: ''
    }
  })

  const handleSubmit = async (e) => {
    // tells the user agent that if the event does not get explicitly handled, its default action should not be taken as it normally would be.
    e.preventDefault()
    try {
      // try + catch for error handling
      const res = await loginUser(state.formData)
      console.log('response from Api is res', res)
      if (res.status === 200) {
        setToken(res.data.token)
        history.push('/')
      }
    } catch (err) {
      console.error('there was an error logging in', err) // console.error for debugging
    }
  }

  const handleChange = (e) => {
    const formData = {
      ...state.formData, // iterate key-value pairs with spread syntax and state
      [e.target.name]: e.target.value // this is where the value gets updated
    }
    setState({ formData }) // this is where the value gets updated
  }

  return (
    // bulma styling in classnames
    <section className="section is-fullheight has-background-danger">
      <div className="container has-background-light box">
        <div className="container">
          <div className="columns">
            <form
              onSubmit={handleSubmit} // submitting the values input by the user
              className="column is-half is-offset-one-quarter"
            >
              <div className="field">
                <label className="label">Email</label>
                <div className="control">
                  <input // setting the form fields
                    className="input"
                    placeholder="Email"
                    name="email"
                    value={state.formData.email} // the value that is stored and verified
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="field">
                <label className="label">Password</label>
                <div className="control">
                  <input
                    className="input"
                    placeholder="Password"
                    name="password"
                    type="password" // important to add this to hide the password
                    value={state.formData.password}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="field">
                <input
                  type="submit"
                  value="Login"
                  className="button is-fullwidth is-warning"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Login
