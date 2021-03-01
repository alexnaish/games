import { Fragment, useCallback } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router'
import Link from 'next/link';

import Header from '@components/Header';
import Traits from '@components/Traits';
import usePusher from '@hooks/usePusher';
import useGame from '@hooks/useGame';

export default function Game() {
	const router = useRouter();
	const game = useGame();
	const { id } = router.query;
	const { me, count } = usePusher({
		id: id && `presence-hired-${id}`,
		authPrefix: 'user',
		onMessage: game.handleEvent
	});

	console.log('==================');
	console.log('game', game);
	console.log('==================');

	const startGame = useCallback(async () => {
		await fetch('/api/start', { method: 'POST', body: JSON.stringify({ channel: id }) });
	}, [id]);

	return (
		<div className="container">
			<Head>
				<title>Join Page!</title>
				<link rel="icon" type="image/png" href="data:image/png;base64,iVBORw0KGgo=" />
			</Head>

			<main className="content">
				<Header title={me.name}/>
				{ game.started && (
					<Fragment>
						{ game.boss === me.id && <div>You're the interviewer!</div>}
						<div>Job: {game.job}</div>
					</Fragment>
				)}
				{ count > 2 && !game.started && <button onClick={startGame}>Start Game</button> }
			</main>
			{ game.traits[me.id] && <Traits traits={game.traits[me.id]} />}
		</div>
	)
}
