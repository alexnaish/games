import React, { useState, useContext, useCallback } from 'react';
import classNames from "classnames";

import './shell.scss';
import { SocketContext } from '../socketmanager';

export const Shell = ({ children }) => {
  const [expanded, setExpanded] = useState(false);
  const [socketContext] = useContext(SocketContext);
  const toggleSideBar = useCallback(() => setExpanded(expanded => !expanded), []);

  return (
    <div className="shell">
      <header className="shell__header">
        <button className="shell__toggle-button" onClick={toggleSideBar}></button>
        <div className="header">
          <a className="header__logo" href="/" aria-label="return home">FunEmployed</a>
          <div className="header__status" title="Connection Status"><span className={classNames('connection-status', { 'connection-status--connected': socketContext.connected })}></span></div>
        </div>
      </header>
      <main className="shell__content">
        {children}
      </main>
      <aside className={classNames('shell__sidebar', { 'shell__sidebar--expanded': expanded })}>
        <nav className="sidebar">
          <a className="sidebar__link" href="/" title="FunEmployed">
            <img className="sidebar__icon" src="https://img.icons8.com/cotton/64/000000/billing.png" />
            <span className="sidebar__text">FunEmployed</span>
          </a>
        </nav>
      </aside>
    </div>
  )
}
