import React from 'react'
import { useHistory } from 'react-router'
import { loginUser } from '../../lib/Api'
import { setToken } from './Auth'

const Login = () => {
  const history = useHistory()
  const [state, setState] = React.useState({
    formData: {
      email: '',
      password: ''
    }
  })

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await loginUser(state.formData)
      console.log('response from Api is res', res)
      if (res.status === 200) {
        setToken(res.data.token)
        history.push('/')
      }
    } catch (err) {
      console.error('there was an error logging in', err)
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
    <section className="section is-fullheight has-background-danger">
      <div className="container has-background-light box">
        <div className="container">
          <div className="columns">
            <form
              onSubmit={handleSubmit}
              className="column is-half is-offset-one-quarter"
            >
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
