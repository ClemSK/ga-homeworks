import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { isLoggedIn } from '../../components/auth/Auth'

const SecureRoute = ({ component: Component, path, exact = false }) => {
  if (isLoggedIn()) {
    return <Route component={Component} path={path} exact={exact} />
  } else {
    return <Redirect to="/login" />
  }
}

export default SecureRoute
