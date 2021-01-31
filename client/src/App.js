import React from 'react';
import { Route, Switch } from 'react-router-dom';

import LandingPage from './components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
import NavMenu from './components/views/NavMenu/NavMenu';
import './App.css';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path= "/" component={LandingPage} />
        <Route exact path= "/login" component={LoginPage} />
        <Route exact path= "/register" component={RegisterPage} />
      </Switch>
    </div>
  );
}

export default App;
