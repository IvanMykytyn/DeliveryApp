import React, { useReducer, useContext } from 'react'
import axios from 'axios'

import reducer from './reducer'
import types from './actions'

const token = localStorage.getItem('token')
const user = localStorage.getItem('user')

const initialState = {
  isLoading: false,
  user: user ? JSON.parse(user) : null,
  token: token,
}

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const addUserToLocalStorage = ({ user, token }) => {
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('token', token)
  }

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  const setupUser = async ({ currentUser, endPoint, alertText }) => {
    dispatch({ type: types.SETUP_USER_BEGIN })
    try {
      const { data } = await axios.post(`/auth/${endPoint}`, currentUser)

      const { user, token, location } = data
      dispatch({
        type: types.SETUP_USER_SUCCESS,
        payload: { user, token, location, alertText },
      })
      addUserToLocalStorage({ user, token, location })
    } catch (error) {
      dispatch({
        type: types.SETUP_USER_FAILED,
        payload: { msg: error.response.data.msg },
      })
    }
  }

  const logoutUser = () => {
    dispatch({ type: types.LOGOUT_USER })
    removeUserFromLocalStorage()
  }

  return (
    <AppContext.Provider
    value={{
      ...state,
      setupUser,
      logoutUser,
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
