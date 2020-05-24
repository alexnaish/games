import React from 'react';
import { Link } from 'wouter';

import './calltoaction.scss';

export const CallToAction = ({ href, text }) => {
	return (
		<Link href={href}>
			<a className="call-to-action">{text}</a>
		</Link>
	)
}
