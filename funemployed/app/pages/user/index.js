import React, { useCallback, useState } from 'react';
import { useWebhook } from '../../modules/socketmanager/hook';

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
    connect('ws://localhost:3001', { operation: 'connect', room: state.room, name: state.name })
  }, [state])

  return (
    <div>
      Status: {connected ? 'Connected' : 'Not Connected'}
      Role: {state.role}
      State: {JSON.stringify(state)}
      <div>
        <fieldset>
          <div>
            <label htmlFor="name">Name:</label>
            <input type="text" name="name" value={state.name} onChange={(event) => setState({ ...state, name: event.target.value })} />
          </div>
          <div>
            <label htmlFor="name">Room:</label>
            <input type="text" name="room" value={state.room} onChange={(event) => setState({ ...state, room: event.target.value })} />
          </div>
          <button onClick={connectToGame} disabled={connected}>Connect</button>
        </fieldset>
      </div>
    </div >
  )
}
