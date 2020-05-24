import React, { useEffect, useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { useWebhook } from '../../components/socketmanager/hook';
import { Shell } from '../../components/Shell';
import { Heading } from '../../components/Heading';
import { Button, Input } from '../../components/Form';

export const Gamepage = ({ }) => {
  const [users, setUsers] = useState({});
  const [room, setRoom] = useState('');

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
  useEffect(() => connect({ operation: 'creation' }), []);

  return (
    <Shell>


      <Heading value="New Game" />
      <Input disabled={true} value={room} />
      <Button onClick={startGame} disabled={!connected || Object.keys(users).length < 2}>Start Game</Button>

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
