import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import { motion } from 'framer-motion';

import Head from 'next/head';
import Title from '@components/Title';

const hiddenStyle = { opacity: 0, translateX: -100 };
const variants = {
	load(index) {
    return {
			opacity: 1,
      x: 100,
			transition: { delay: index * 0.3, duration: 0.4 }
    };
  }
}

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
				<motion.button variants={variants} custom={1} animate="load" style={hiddenStyle} onClick={startNewGame}>
					New Game
				</motion.button>
				<motion.input variants={variants} custom={2} animate="load" style={hiddenStyle} type="text" maxLength="4" placeholder="Join Code" onChange={handleChannelChange} />
				<motion.button variants={variants} custom={3} animate="load" style={hiddenStyle} onClick={joinGame} disabled={channel.length !== 4}>Join Game</motion.button>
      </main>
    </div>
  );
}
