// UserContext.js
import { createContext, useReducer } from 'react';

export const UserContext = createContext();

export const userReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USERS':
      return {
        ...state,
        users: action.payload
      };
    case 'CREATE_USER':
      return {
        ...state,
        users: [action.payload, ...state.users]
      };
    case 'LOGIN':
    case 'REGISTER':
      return {
        ...state,
        sessionID: action.payload.sessionID,
        username: action.payload.username,
        userID: action.payload.userID
      };
    case 'LOGOUT':
      return {
        ...state,
        userID: null,
        sessionID: null,
        username: null
      };
    default:
      return state;
  }
};

export const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, {
    users: null,
    sessionID: null,
    username: null,
    userID: null // Make sure userID is initialized to null
  });

  return (
    <UserContext.Provider value={{ ...state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};
