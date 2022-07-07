import types from './actions'

const reducer = (state, action) => {
  switch (action.type) {
    case types.ACTION:
      return { ...state }

    default:
      return {
        ...state
      }
  }
  
}

export default reducer
