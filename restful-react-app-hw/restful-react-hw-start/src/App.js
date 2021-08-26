import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Home from './components/common/Home'
import NavBar from './components/common/NavBar'
import WineIndex from './wines/WineIndex'
import WineShow from './wines/WineShow'

import Register from './components/auth/Register'
import Login from './components/auth/Login'
import WineNew from './wines/WineNew'
import WineEdit from './wines/WineEdit'


// where the components for the app are pulled together to create the app

const App = () => {
  return (
    <BrowserRouter> 
      <NavBar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/wines/new" component={WineNew}/>
        <Route path="/wines/:id/edit" component={WineEdit}/>
        <Route path="/wines/:id" component={WineShow} />
        <Route path="/wines" component={WineIndex} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
