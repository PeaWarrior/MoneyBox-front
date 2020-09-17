import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavigationBar from './NavigationBar';
import Login from './Login';
import Signup from './Signup';

function App() {
  return (
    <Router>
      <NavigationBar />

      <Switch>
        <Route exact path="/login"> <Login /></Route>
        <Route exact path="/signup"><Signup /></Route>
      </Switch>

    </Router>
  );
}

export default App;
