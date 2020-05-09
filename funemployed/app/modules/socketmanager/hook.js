import { useState, useCallback, useEffect, useRef } from 'react';

const NOOP = () => { };

export const useWebhook = ({ onOpen = NOOP, onClose = NOOP, onMessage = NOOP, onError = NOOP }) => {
  const [connectionUri, setConnectionUri] = useState('');
  const [connected, setConnected] = useState(false);
  const webSocket = useRef(null);

  const connect = useCallback((connectionString, params = {}) => {
    const queryParams = Object.keys(params) ? `?${new URLSearchParams(params).toString()}` : ''
    setConnectionUri(`${connectionString}${queryParams}`);
  }, [])

  useEffect(() => {
    if (!connectionUri) return;
    webSocket.current = new WebSocket(connectionUri);

    webSocket.current.onopen = () => {
      console.log('socket opened');
      setConnected(true);
      onOpen();
    }

    webSocket.current.onmessage = ({ data }) => {
      console.log('socket message', data);
      onMessage(JSON.parse(data));
    }

    webSocket.current.onerror = (error) => {
      logger.error('socket errored');
      onError(error);
    }

    webSocket.current.onclose = () => {
      console.log('socket closing');
      onClose();
      setConnected(false);
    }

    return () => {
      setReadyState(STATE.CLOSING);
      onClose();
      webSocket.current.close();
      setConnected(false);
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
