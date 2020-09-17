import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import './App.css';
import NavigationBar from './components/NavigationBar';
import Login from './components/Login';
import Signup from './components/Signup';

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
