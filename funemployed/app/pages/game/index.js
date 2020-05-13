import React, { useEffect, useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { useWebhook } from '../../components/socketmanager/hook';
import { Shell } from '../../components/Shell';

export const Gamepage = ({ }) => {
  const [users, setUsers] = useState({});
  const [room, setRoom] = useState(null);

  const startGame = useCallback(() => {
    sendMessage({ action: 'start', data: { room } })
  }, [room]);

  const handleMessage = useCallback(({ event, payload }) => {
    switch (event) {
      case 'ROOM_CREATION':
        setRoom(payload);
        break;
      case 'ROOM_JOINED': {
        const { user } = payload;
        setUsers(users => ({
          ...users,
          [user.connectionId]: user.name
        }));
        break;
      }
    }
  }, []);

  const { connect, connected, sendMessage } = useWebhook({ onMessage: handleMessage, onError: console.error });
  useEffect(() => connect('ws://localhost:3001', { operation: 'creation' }), []);

  return (
    <Shell>
      Game Page ({connected ? 'Connected!' : 'Not Connected'})

      <fieldset>
        <h1>{room}</h1>
        <button onClick={startGame} disabled={!connected || Object.keys(users).length < 2}>Start Game</button>
      </fieldset>
      <pre>{JSON.stringify(users)}</pre>

      <AnimatePresence>
        {
          Object.entries(users).map(([id, userName]) => {
            return <motion.div
              key={id}
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 300, opacity: 0 }}
              transition={{ ease: "easeOut", duration: 0.3 }}
            >{userName}</motion.div>
          })
        }
      </AnimatePresence>
    </Shell>
  )
}
