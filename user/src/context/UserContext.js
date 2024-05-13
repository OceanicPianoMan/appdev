import { createContext, useReducer } from 'react' 

export const UserContext = createContext()

//local state to stay up to date with database
export const userReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USERS':
      return {
        users: action.payload
      }
    case 'CREATE_USER':
      return {
        users: [action.payload, ...state.users]
      }
    case 'LOGIN':
      return {
        ...state,
        sessionID: action.payload.sessionID,
        username: action.payload.username,
        userID: action.payload.userID        
      }
    case 'REGISTER':
      return {
        ...state,
        sessionID: action.payload.sessionID,
        username: action.payload.username,
        userID: action.payload.userID
      }
    default:
      return state;
  }
}

export const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, {
    users: null,
    sessionID: null,
    username: null
  });


  return (
    <UserContext.Provider value={{...state, dispatch}}>
      { children }
    </UserContext.Provider>
  )
}