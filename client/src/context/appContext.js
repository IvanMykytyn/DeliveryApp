import React, { useReducer, useContext } from 'react'

import reducer from './reducer'
import types from './actions'


const initialState = {
  isLoading: false,
}

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <AppContext.Provider
      value={{
        ...state,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}


const useAppContext = () => {
  return useContext(AppContext)
}

export { AppProvider, initialState, useAppContext }
