import { useCallback, useState } from 'react';

import Head from 'next/head';
import Link from 'next/link';
import Header from '@components/Header';

export default function Home() {
	const [channel, setChannel] = useState('');
	const handleChannelChange = useCallback((e) => {
		setChannel(e.target.value);
	});
  return (
    <div className="container">
      <Head>
        <title>Hired!</title>
        <link rel="icon" type="image/png" href="data:image/png;base64,iVBORw0KGgo=" />
      </Head>

      <main>
        <Header title="Home Page!" />
        <Link href="/game/test">New Game</Link>
        <div>
					<div><input type="text" maxLength="4" onChange={handleChannelChange} /></div>
				</div>
				{ channel.length === 4 && <Link href={`/join/${channel}`}>Join Game</Link> }
      </main>

    </div>
  )
}
