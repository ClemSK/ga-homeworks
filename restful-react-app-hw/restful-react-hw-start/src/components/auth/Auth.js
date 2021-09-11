// token to recognise a user when they login once they have registered
export const setToken = (token) => {
  window.localStorage.setItem('token', token)
}

// to validate the user is able to make changes, get the token created by the API
export const getToken = () => {
  return window.localStorage.getItem('token')
}

export const getPayload = () => {
  const token = getToken()
  if (!token) {
    return false
  }
  const parts = token.split('.')

  if (parts.length < 3) {
    return false
  }

  return JSON.parse(window.atob(parts[1]))
}

export const isLoggedIn = () => {
  const token = getToken()
  if (!token) {
    return false
  }

  const parts = token.split('.')

  if (parts.length < 3) {
    return false
  }

  return JSON.parse(window.atob(parts[1]))
}
