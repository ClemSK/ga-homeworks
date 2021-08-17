import React, { useState } from "react";
import Buzzwords from "./sections/Buzzwords";
import Nats from "./sections/Nats";
import Profile from "./sections/Profile";
import Nav from "./sections/Nav";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
} from "react-router-dom";

// function Profiles() {
//   const { username } = useParams();
//   return <h3>ID: {username}</h3>;
// }

function App() {
  const [selectedUser, setSelectedUser] = useState("");
  let { username } = useParams();
  // return <h3> profile of: {username}</h3>;
  // React.useEffect(() => {

  // }, [selectedUser]);

  return (
    <div className="App">
      <Router>
        <header className="App-header">
          Natter
          <Nav />
        </header>
        <main>
          <Switch>
            <Route path="/buzzwords">
              <Buzzwords />
            </Route>
            <Route path="/nats">
              <Nats handleUserClick={setSelectedUser} />
            </Route>
            <Route path="/profile/:username">
              <Profile username={selectedUser} />
            </Route>
          </Switch>
        </main>
      </Router>
    </div>
  );
}

export default App;
