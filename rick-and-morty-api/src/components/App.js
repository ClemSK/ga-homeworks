import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./Header";
import RickAndMortyCharacterCards from "./RickAndMortyCharacterCards";

import "../styles/App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/characters">
            <RickAndMortyCharacterCards />
          </Route>

          <Route path="/">
            <div className="home">
              <h2>Hello SEI-Flex-21!</h2>
            </div>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
