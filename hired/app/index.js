import React from 'react';
import { Router, Switch, Route } from "wouter";
import { render } from "react-dom";

import { SocketProvider } from './components/socketmanager';
import { Homepage } from './pages/home/';
import { Gamepage } from './pages/game/';
import { Userpage } from './pages/user/';

const basePath = process.env.NODE_ENV === 'production' ? '/games/hired' : '';
const App = () => (
  <SocketProvider>
    <Router base={basePath}>
			<Switch>
				<Route path="/" component={Homepage} />
				<Route path="/game" component={Gamepage} />
				<Route path="/user" component={Userpage} />
			</Switch>
		</Router>
  </SocketProvider>
);

render(<App />, document.getElementById('root'));
