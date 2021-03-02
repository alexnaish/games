import { useCallback, useReducer } from 'react';
import { reducer, defaultState, actions } from './reducer';

export default function useGame() {
  const [state, dispatch] = useReducer(reducer, defaultState);
  const handleEvent = useCallback(({ event, data }) => {
    switch (event) {
      case 'game-start':
        dispatch({ type: actions.start, payload: data });
        break;
      default:
        break;
    }
  });
  return { ...state, handleEvent };
}
