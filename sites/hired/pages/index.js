import { useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

import Head from 'next/head';
import Link from 'next/link';
import Title from '@components/Title';

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
  const handleChannelChange = useCallback((e) => {
    setChannel(e.target.value);
  });

  return (
    <div className="container">
      <Head>
        <title>Hired!</title>
      </Head>
      <main className="content">
        <Title />
				<motion.div variants={variants} custom={1} animate="load" style={{ opacity: 0, translateX: -100 }}>
					<Link href="/game/test">New Game</Link>
				</motion.div>
				<motion.div variants={variants} custom={2} animate="load" style={{ opacity: 0, translateX: -100 }}>
					<input type="text" maxLength="4" placeholder="Join Code" onChange={handleChannelChange} />
				</motion.div>
				<motion.div variants={variants} custom={3} animate="load" style={{ opacity: 0, translateX: -100 }}>
					<Link href={channel.length === 4 ? `/join/${channel.toUpperCase()}` : '/#'}>
						<a disabled={channel.length !== 4}>Join Game</a>
					</Link>
				</motion.div>
      </main>
    </div>
  );
}
