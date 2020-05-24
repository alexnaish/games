import React, { useCallback, useState } from 'react';

import { useWebhook } from '../../components/socketmanager/hook';
import { Shell } from '../../components/Shell';
import { Heading } from '../../components/Heading';
import { Input, Button } from '../../components/Form';

export const Userpage = ({ }) => {

  const [state, setState] = useState({
    name: '',
    room: '',
    role: ''
  });

  const handleMessage = useCallback(({ event, payload }) => {
    switch (event) {
      case 'GAME_STARTING':
        setState(state => ({
          ...state,
          boss: payload.firstBoss,
          job: payload.job
        }));
        break;
    }
  }, []);

  const { connect, connected } = useWebhook({ onMessage: handleMessage, onError: console.error });

  const connectToGame = useCallback(() => {
    connect({ operation: 'connect', room: state.room, name: state.name })
  }, [state])

  return (
    <Shell>
      <div>
				<Heading value='New Game' />
				<Input placeholder="Name" value={state.name} onChange={({ value }) => setState({ ...state, name: value })} />
				<Input placeholder="Room Code" value={state.room} onChange={({ value }) => setState({ ...state, room: value })} />
				<Button onClick={connectToGame} disabled={connected}>Connect</Button>
      </div>
    </Shell>
  )
}
