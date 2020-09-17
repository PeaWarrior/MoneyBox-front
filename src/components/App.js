import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavigationBar from './NavigationBar';
import Login from './Login';
import Signup from './Signup';
import { autologin } from '../store/userActions';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.token) {
      dispatch(autologin());
    }
  }, [])

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
