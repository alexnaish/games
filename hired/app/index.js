console.log('entering into index.js');

import React from 'react';
import { Switch, Route } from "wouter";
import { render } from "react-dom";

import { SocketProvider } from './components/socketmanager';
import { Homepage } from './pages/home/';
import { Gamepage } from './pages/game/';
import { Userpage } from './pages/user/';

const App = () => (
  <SocketProvider>
    <Switch>
      <Route path="/" component={Homepage} />
      <Route path="/game" component={Gamepage} />
      <Route path="/user" component={Userpage} />
    </Switch>
  </SocketProvider>
);
console.log('am i here?');

render(<App />, document.getElementById('root'));
