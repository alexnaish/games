import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import Head from 'next/head';
import Title from '@components/Title';
import SlideFade from '@components/SlideFade';

export default function Home() {
  const [channel, setChannel] = useState('');
  const router = useRouter();
  const handleChannelChange = useCallback((e) => {
    setChannel(e.target.value.toUpperCase());
  });

  const startNewGame = useCallback(() => {
    const code = Math.random().toString(36).substr(2, 4).toUpperCase();
    router.push(`/game/${code}`);
  });
  const joinGame = useCallback(() => {
    router.push(`/join/${channel}`);
  });

  return (
    <div className="container">
      <Head>
        <title>Hired!</title>
      </Head>
      <main className="content">
        <Title />
        <SlideFade order={1}>
          <button onClick={startNewGame}>New Game</button>
        </SlideFade>
        <SlideFade order={2}>
          <input type="text" maxLength="4" placeholder="Join Code" onChange={handleChannelChange} />
        </SlideFade>
        <SlideFade order={3}>
          <button onClick={joinGame} disabled={channel.length !== 4}>
            Join Game
          </button>
        </SlideFade>
      </main>
    </div>
  );
}
