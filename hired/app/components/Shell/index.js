import React, { useState, useContext, useCallback } from 'react';
import { Link } from 'wouter';
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
          <Link href="/">
          <a className="header__logo" aria-label="return home">Hired!</a>
          </Link>
          <div className="header__status" title="Connection Status"><span className={classNames('connection-status', { 'connection-status--connected': socketContext.connected })}></span></div>
        </div>
      </header>
      <main className="shell__content">
        <div className="shell_wrapper">
          {children}
        </div>
      </main>
      <aside className={classNames('shell__sidebar', { 'shell__sidebar--expanded': expanded })}>
        <nav className="sidebar">
          <a className="sidebar__link" href="/" title="Hired!">
            <img className="sidebar__icon" src="https://img.icons8.com/cotton/64/000000/billing.png" />
            <span className="sidebar__text">Hired!</span>
          </a>
        </nav>
      </aside>
    </div>
  )
}
