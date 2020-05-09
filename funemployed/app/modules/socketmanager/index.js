import React, { useReducer, createContext } from 'react';
import { TYPES } from './actions';

const initialState = {};
function reducer(state, action) {
  switch (action.type) {
    case TYPES.OPEN:
      return {
        ...state,
        socket: action.payload
      };
    case TYPES.CLOSE:
      return null;
    default:
      throw new Error(`Unknown action.type: ${action.type}`);
  }
}

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const reducerDetails = useReducer(reducer, initialState);
  return (
    <SocketContext.Provider value={reducerDetails}>
      {children}
    </SocketContext.Provider>
  );
};
