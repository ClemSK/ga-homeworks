import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import NavBar from './components/common/NavBar'
import Home from './components/common/Home'
import WineIndex from './wines/WineIndex'


const App = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/wines" component={WineIndex} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
