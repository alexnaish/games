import React from 'react';
import { Link } from 'wouter';
import { Shell } from '../../components/Shell';

export const Homepage = ({ }) => {

  return (
    <Shell>
      <Link href="/game">
        <a className="link">New Game</a>
      </Link>
      <Link href="/user">
        <a className="link">Join Game</a>
      </Link>
    </Shell>
  )
}
