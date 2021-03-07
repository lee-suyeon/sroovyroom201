import React from 'react';
import { Route, Switch } from 'react-router-dom';

import LandingPage from './components/views/LandingPage/LandingPage';
import MenuPage from './components/views/MenuPage/MenuPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
import VisitorsPage from './components/views/VisitorsPage/VisitorsPage';
import './App.css';

import Auth from './hoc/auth';
function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path= "/" component={Auth(LandingPage, null)} />
        <Route exact path= "/menu" component={Auth(MenuPage, null)} />
        <Route exact path= "/login" component={Auth(LoginPage, false)} />
        <Route exact path= "/register" component={Auth(RegisterPage, false)} />
        <Route exact path= "/visitors" component={Auth(VisitorsPage, true)} />
      </Switch>
    </div>
  );
}

export default App;
