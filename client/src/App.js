import React from 'react';
import { Route, Switch } from 'react-router-dom';

import LandingPage from './components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import NavMenu from './components/views/NavMenu/NavMenu';
import './App.css';

function App() {
  return (
    <div className="App">
      <NavMenu />

      <Switch>
        <Route exact path= "/" component={LandingPage} />
        <Route exact path= "/login" component={LoginPage} />
      </Switch>
    </div>
  );
}

export default App;
