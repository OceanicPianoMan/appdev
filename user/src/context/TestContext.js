import { createContext, useReducer } from 'react' 

export const TestContext = createContext()

//local state to stay up to date with database
export const testReducer = (state, action) => {
  switch (action.type) {
    case 'SET_TESTS':
      return {
        tests: action.payload
      }
    case 'CREATE_TEST':
      return {
        tests: [action.payload, ...state.tests]
      }
    case 'DELETE_TEST':
      return {
        tests: state.tests.filter((t) => t._id !== action.payload._id)
      }
    default:
      return state
  }
}

export const TestContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(testReducer, {
    tests: null  
  })


  return (
    <TestContext.Provider value={{...state, dispatch}}>
      { children }
    </TestContext.Provider>
  )
}