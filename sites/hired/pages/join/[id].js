import { Fragment, useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

import Title from '@components/Title';
import Traits from '@components/Traits';
import usePusher from '@hooks/usePusher';
import useGame from '@hooks/useGame';
import ErrorSection from '@components/ErrorSection';

export default function JoinGame() {
  const [error, setError] = useState(null);
  const router = useRouter();
  const game = useGame();
  const { id } = router.query;
  const { me, count } = usePusher({
    id: id && `presence-hired-${id}`,
    authPrefix: 'user',
    onMessage: game.handleEvent,
    onError: setError
  });

  const startGame = useCallback(async () => {
    setError(null);
    const res = await fetch(`/api/start?game=hired&code=${id}`, {
      method: 'POST',
      body: JSON.stringify({ channel: id })
    });
    if (res.status !== 200) setError('Unable to start game.');
  }, [id]);

  return (
    <div className="container">
      <Head>
        <title>Join Page!</title>
      </Head>

      <main className="content">
        <Title />
        {error && <ErrorSection message={error} />}
        {me.name && <div>Name: {me.name}</div>}
        {game.started && (
          <Fragment>
            {game.boss === me.id && <div>You're the interviewer!</div>}
            <div>Job: {game.job}</div>
            {game.traits[me.id] && <Traits traits={game.traits[me.id]} />}
          </Fragment>
        )}
        {count > 2 && !game.started && <button onClick={startGame}>Start Game</button>}
      </main>
    </div>
  );
}
