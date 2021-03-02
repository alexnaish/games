import { Fragment } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';

import Title from '@components/Title';
import MemberList from '@components/MemberList';
import usePusher from '@hooks/usePusher/';
import useGame from '@hooks/useGame/';

export default function Game() {
  const router = useRouter();
  const game = useGame();
  const { id } = router.query;

  const { members, me, count } = usePusher({
    id: id && `presence-hired-${id}`,
    authPrefix: 'game',
    onMessage: game.handleEvent
  });

  return (
    <div className="container">
      <Head>
        <title>Game Page!</title>
      </Head>
      <main className="content">
        <Title />
        <div>Game Code: {id}</div>
        {game.boss && (
          <Fragment>
            <div>Job: {game.job}</div>
            {members[game.boss] && <div>Boss: {members[game.boss].name}</div>}
          </Fragment>
        )}
      </main>
      {me && <MemberList members={members} />}
    </div>
  );
}
