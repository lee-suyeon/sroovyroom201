import React from 'react';
import { Route, Switch } from 'react-router-dom';

import LandingPage from './components/views/LandingPage/LandingPage';
import DoorLock from './components/views/DoorLock/DoorLock';
import MenuPage from './components/views/MenuPage/MenuPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
import VisitorsPage from './components/views/VisitorsPage/VisitorsPage';
import NoticePage from './components/views/NoticePage/NoticePage';
import GalleryPage from './components/views/GalleryPage/GalleryPage';
import BookingPage from './components/views/BookingPage/BookingPage';
import Toast from 'utils/Toast';
import './App.css';

import Auth from './hoc/auth';
function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path= "/" component={Auth(LandingPage, null)} />
        <Route exact path= "/door-lock" component={Auth(DoorLock, null)} />
        <Route exact path= "/menu" component={Auth(MenuPage, null)} />
        <Route exact path= "/login" component={Auth(LoginPage, false)} />
        <Route exact path= "/register" component={Auth(RegisterPage, false)} />
        <Route exact path= "/notice" component={Auth(NoticePage, null)} />
        <Route exact path= "/gallery" component={Auth(GalleryPage, null)} />
        <Route exact path= "/booking" component={Auth(BookingPage, true)} />
        <Route exact path= "/visitors" component={Auth(VisitorsPage, null)} />
      </Switch>
      <Toast />
    </div>
  );
}

export default App;
