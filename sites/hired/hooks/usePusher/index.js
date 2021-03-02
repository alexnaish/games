import { useState, useEffect, useReducer } from 'react';
import Pusher from 'pusher-js';

import { reducer, defaultState, actions } from './reducer';

export default function usePusher({ id, authPrefix, onMessage = () => {} }) {
  const [state, dispatch] = useReducer(reducer, defaultState);

  useEffect(() => {
    if (!id) {
      return;
    }

    const client = new Pusher(process.env.PUSHER_KEY, {
      cluster: 'eu',
      authEndpoint: `/api/auth?prefix=${authPrefix}`
    });
    const connection = client.subscribe(id);

    connection.bind('message', onMessage);

    connection.bind('pusher:subscription_succeeded', ({ count, members, me }) => {
      const payload = { me: { id: me.id, ...me.info }, members: {} };

      Object.entries(members).forEach(([id, member]) => {
        if (id.includes('user')) {
          payload.members[id] = member;
        }
      });
      payload.count = Object.keys(payload.members).length;

      dispatch({
        type: actions.connect,
        payload
      });
    });

    connection.bind('pusher:member_added', (member) => {
      if (member.id.includes('user')) {
        dispatch({
          type: actions.join,
          payload: member
        });
      }
    });

    connection.bind('pusher:member_removed', (member) => {
      if (member.id.includes('user')) {
        dispatch({
          type: actions.leave,
          payload: member
        });
      }
    });

    return () => {
      client.unsubscribe(id);
    };
  }, [id]);

  return { ...state };
}
