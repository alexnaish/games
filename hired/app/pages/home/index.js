import React from 'react';
import { Link } from 'wouter';
import { Shell } from '../../components/Shell';
import { Heading } from '../../components/Heading';

export const Homepage = ({ }) => {

  return (
    <Shell>
			<Heading value="Hired!" />
				<Link href="/game">
						<a className="link-button">New Game</a>
				</Link>
				<Link href="/user">
					<a className="link-button">Join Game</a>
				</Link>
		</Shell>
	);
}
