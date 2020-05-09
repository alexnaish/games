import React from 'react';
import { Link } from 'wouter';

export const Homepage = ({ }) => {

  return (
    <div>
      <Link href="/game">
        <a className="link">New Game</a>
      </Link>
      <Link href="/user">
        <a className="link">Join Game</a>
      </Link>
    </div>
  )
}
