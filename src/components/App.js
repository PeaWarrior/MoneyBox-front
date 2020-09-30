import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import './App.css';
import NavigationBar from './NavigationBar';
import Signup from './user/Signup';
import PortfolioListings from './portfolio/PortfolioListings';
import PortfolioPage from './portfolio/PortfolioPage';
import StockPage from './stock/StockPage';
import { autologin } from './user/userActions';
import LandingPage from './user/LandingPage';

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
      { currentUser ? 
        <NavigationBar /> 
        :
        null 
      }

      <Switch>
        <Route exact path="/signup">
          { currentUser ? <Redirect to='/'/> : <Signup /> }
        </Route>
        <Route exact path="/portfolio">
          { currentUser ? <PortfolioPage /> : <Redirect to='/'/> }
        </Route>
        <Route exact path="/search">
          { currentUser ? <StockPage /> : <Redirect to='/'/> }
        </Route>
        <Route exact path ="/">
          { currentUser ? <PortfolioListings /> : <LandingPage /> }
        </Route>
      </Switch>

    </Router>
  );
}

export default App;
