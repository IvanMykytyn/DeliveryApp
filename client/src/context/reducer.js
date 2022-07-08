import types from './actions'

import { initialState } from './appContext'

const reducer = (state, action) => {
  switch (action.type) {
    case types.SETUP_USER_BEGIN:
      return { ...state, isLoading: true }

    case types.SETUP_USER_SUCCESS:
      return {
        ...state,
        isLoading: true,
        token: action.payload.token,
        user: action.payload.user,
        // showAlert: true,
        // alertType: 'success',
        // alertText: action.payload.alertText,
      }

    case types.SETUP_USER_FAILED:
      return {
        ...state,
        isLoading: false,
        // showAlert: true,
        // alertType: 'danger',
        // alertText: action.payload.msg,
      }
    case types.LOGOUT_USER:
      return {
        ...initialState,
        user: null,
        token: null,
      }

    default:
      return {
        ...state,
      }
  }
}

export default reducer
