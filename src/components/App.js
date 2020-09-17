import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import NavigationBar from './NavigationBar';
import Login from './user/Login';
import Signup from './user/Signup';
import PortfolioListings from './portfolio/PortfolioListings';
import { autologin } from './user/userActions';

function App() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector(state => state.user)

  useEffect(() => {
    if (localStorage.token) {
      dispatch(autologin());
    }
  }, [dispatch])

  return (
    <Router>
      <NavigationBar />

      <Switch>
        <Route exact path="/login">
          { currentUser ? <Redirect to='/portfolios'/> : <Login /> }
        </Route>
        <Route exact path="/signup">
          { currentUser ? <Redirect to='/portfolios'/> : <Signup /> }
        </Route>
        <Route exact path="/portfolios">
          { currentUser ? <PortfolioListings /> : <Redirect to='/login'/> }
        </Route>
      </Switch>

    </Router>
  );
}

export default App;
