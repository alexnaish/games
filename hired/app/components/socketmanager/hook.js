import { useState, useCallback, useContext, useEffect, useRef } from 'react';

import { SocketContext } from './';
import { TYPES } from './actions';

const NOOP = () => { };

export const useWebhook = ({ onOpen = NOOP, onClose = NOOP, onMessage = NOOP, onError = NOOP }) => {
  const [connectionUri, setConnectionUri] = useState('');
  const [connected, setConnected] = useState(false);
  const webSocket = useRef(null);
  const [_, dispatch] = useContext(SocketContext);

  const connect = useCallback((params = {}) => {
		const queryParams = Object.keys(params) ? `?${new URLSearchParams(params).toString()}` : '';
		const connectionUrl = process.env.WSS_HIRED_URL || 'ws://localhost:3001';
    setConnectionUri(`${connectionUrl}${queryParams}`);
  }, [])

  useEffect(() => {
		let mounted = true;
    if (!connectionUri) return;
    webSocket.current = new WebSocket(connectionUri);

    webSocket.current.onopen = () => {
      console.log('socket opened');
      setConnected(true);
      dispatch({ type: TYPES.OPEN });
      onOpen();
    }

    webSocket.current.onmessage = ({ data }) => {
      console.log('socket message', data);
      onMessage(JSON.parse(data));
    }

    webSocket.current.onerror = (error) => {
      console.error('socket error', error);
      onError(error);
    }

    webSocket.current.onclose = () => {
      console.log('socket closing');
			onClose();
			if (mounted) {
				dispatch({ type: TYPES.CLOSE });
				setConnected(false);
			}
    }

    return () => {
			mounted = false;
      setConnected(false);
      onClose();
      webSocket.current.close();
    };

  }, [connectionUri]);

  return {
    connect,
    connected,
    sendMessage: (message) => {
      webSocket.current.send(
        JSON.stringify(message)
      );
    }
  }

}
