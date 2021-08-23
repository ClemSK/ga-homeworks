import React from 'react'
import { useHistory } from 'react-router-dom'
import { registerUser } from '../../lib/Api'

const Register = () => {
  const history = useHistory()
  const [state, setState] = React.useState({
    formData: {
      username: '',
      email: '',
      password: '',
      passwordConfirmation: ''
    }
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await registerUser(state.formData)
      console.log('response from Api', res)
      if (res.status === 200) {
        // whent the http code is good, proceed to login page
        history.push('/login')
      }
    } catch (err) {
      console.error('there was an error registering the user', err)
    }
  }

  const handleChange = async (e) => {
    const formData = {
      ...state.formData,
      [e.target.name]: e.target.value
    }
    setState({ formData })
    console.log(e)
  }

  return (
    <section className="section is-fullheight-with-navbar has-background-danger">
      <div className="container">
        <div className="columns">
          <form
            onSubmit={handleSubmit}
            className="column is half is-offset-one-quarter box"
          >
            <div className="field">
              <label className="label">Username</label>
              <div className="control">
                <input
                  className="input"
                  placeholder="Username"
                  name="username"
                  value={state.formData.username}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="field">
              <label className="label">Email</label>
              <div className="control">
                <input
                  className="input"
                  placeholder="Email"
                  name="email"
                  value={state.formData.email}
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
                  type="password"
                  value={state.formData.password}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="field">
              <label className="label">Password Confirmation</label>
              <div className="control">
                <input
                  className="input"
                  placeholder="Password Confirmation"
                  name="passwordConfirmation"
                  type="password"
                  value={state.formData.passwordconfirmation}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="field">
              <input
                className="button is-full-width is-warning"
                type="submit"
                value="Register"
              ></input>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Register
