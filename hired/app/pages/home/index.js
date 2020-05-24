import React from 'react';
import { Shell } from '../../components/Shell';
import { Heading } from '../../components/Heading';
import { CallToAction } from '../../components/CallToAction';

export const Homepage = ({ }) => {
  return (
    <Shell>
			<Heading value="Hired!" />
			<CallToAction href="/game" text="New Game" />
			<CallToAction href="/user" text="Join Game" />
		</Shell>
	);
}
