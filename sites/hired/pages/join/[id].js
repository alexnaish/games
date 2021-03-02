import { Fragment, useCallback } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router'
import Link from 'next/link';

import Title from '@components/Title';
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

	const startGame = useCallback(async () => {
		await fetch('/api/start', { method: 'POST', body: JSON.stringify({ channel: id }) });
	}, [id]);

	return (
		<div className="container">
			<Head>
				<title>Join Page!</title>
			</Head>

			<main className="content">
				<Title title={me.name} />
				<div>{me.name}</div>
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
