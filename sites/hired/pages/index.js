import { useCallback, useState } from 'react';

import Head from 'next/head';
import Link from 'next/link';
import Title from '@components/Title';

export default function Home() {
	const [channel, setChannel] = useState('');
	const handleChannelChange = useCallback((e) => {
		setChannel(e.target.value);
	});
  return (
    <div className="container">
      <Head>
        <title>Hired!</title>
      </Head>
      <main className="content">
        <Title/>
        <Link href="/game/test">New Game</Link>
        <div>
					<input type="text" maxLength="4" placeholder="Join Code" onChange={handleChannelChange} />
					{ channel.length === 4 && <Link href={`/join/${channel.toUpperCase()}`}>Join Game</Link> }
				</div>
      </main>

    </div>
  )
}
