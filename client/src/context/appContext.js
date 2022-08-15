import React, { useReducer, useContext } from 'react'
import axios from 'axios'

import reducer from './reducer'
import types from './actions'

const token = localStorage.getItem('token')
const user = localStorage.getItem('user')

const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: '',
  alertType: '',
  user: user ? JSON.parse(user) : null,
  token: token,
  shops: [],
  goods: [],
  currentShop: '',
  cart: [],
  amount: 0,
  total: 0,
  orderHistory: [],
}

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  // axios
  const authFetch = axios.create({
    baseURL: '',
  })
  
  // request
  authFetch.interceptors.request.use(
    (config) => {
      config.headers.common['Authorization'] = `Bearer ${state.token}`
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )

  // response
  authFetch.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      if (error.response.status === 401) {
        logoutUser()
      }
      return Promise.reject(error)
    }
  )
  
  const addUserToLocalStorage = ({ user, token }) => {
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('token', token)
  }

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('cart')
    localStorage.removeItem('shop')
  }

  const addCartToLocalStorage = ({ cart, amount, total, currentShop }) => {
    localStorage.setItem(
      'cart',
      JSON.stringify({ cart, amount, total, currentShop })
    )
  }
  const removeCartFromLocalStorage = () => {
    localStorage.removeItem('cart')
  }

  const displayAlert = (
    alertText = 'Please provide all values!',
    alertType = 'danger'
  ) => {
    dispatch({ type: types.DISPLAY_ALERT, payload: { alertText, alertType } })
    clearAlert()
  }

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: types.CLEAR_ALERT })
    }, 3000)
  }

  const clearCart = () => {
    localStorage.removeItem('cart')
    dispatch({
      type: types.CLEAR_CART,
    })
  }

  const setupUser = async ({ currentUser, endPoint, textAlert }) => {
    dispatch({ type: types.SETUP_USER_BEGIN })
    try {
      const { data } = await axios.post(`/auth/${endPoint}`, currentUser)

      const { user, token } = data
      dispatch({
        type: types.SETUP_USER_SUCCESS,
        payload: { user, token },
      })
      addUserToLocalStorage({ user, token })
      displayAlert(textAlert, 'success')
    } catch (error) {
      console.log(error);
      dispatch({
        type: types.SETUP_USER_FAILED,
        payload: { msg: error.response.data.message },
      })
      displayAlert(error.response.data.message, 'danger')

    }
  }

  const logoutUser = () => {
    dispatch({ type: types.LOGOUT_USER })
    removeUserFromLocalStorage()
  }

  const getShops = async () => {
    dispatch({ type: types.GET_SHOPS_BEGIN })
    try {
      const { data } = await authFetch.get('/shops')
      dispatch({
        type: types.GET_SHOPS_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: types.GET_SHOPS_FAILED,
      })
    }
  }
  const getGoods = async (shopId) => {
    dispatch({ type: types.GET_SHOP_GOODS_BEGIN })
    try {
      const { data } = await authFetch.get(`/goods/${shopId}`)
      dispatch({
        type: types.GET_SHOP_GOODS_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: types.GET_SHOP_GOODS_FAILED,
      })
    }
  }

  const setCurrentShop = (shopId) => {
    dispatch({ type: types.SET_CURRENT_SHOP, payload: shopId })
  }

  const addItem = (good) => {
    dispatch({ type: types.ADD_ITEM, payload: good })
  }

  const toggleAmount = (id, toggle) =>
    dispatch({
      type: types.TOGGLE_AMOUNT,
      payload: { id, toggle },
    })

  const getTotals = () =>
    dispatch({
      type: types.GET_TOTALS,
    })

  const removeItem = (id) =>
    dispatch({
      type: types.REMOVE_ITEM,
      payload: { id },
    })

  const makeAnOrder = async (currentUserId, userData, cart, amount, total) => {
    dispatch({ type: types.ORDER_BEGIN })
    try {
      const data = {
        user: {
          _id: currentUserId,
          name: userData.name,
          email: userData.email,
          phone: userData.phone,
          address: userData.address,
        },
        order: {
          total,
          amount,
          cart: cart.map((cartItem) => {
            return { _id: cartItem._id, amount: cartItem.amount }
          }),
        },
      }
      await authFetch.post('/order', data)

      dispatch({
        type: types.ORDER_SUCCESS,
      })
      localStorage.removeItem('cart')
    } catch (error) {
      dispatch({
        type: types.ORDER_FAILED,
      })
    }
    clearAlert()
  }

  const setCart = (newCart) => {
    dispatch({
      type: types.SET_CART,
      payload: newCart,
    })
  }


  const getOrderHistory = async () => {
    dispatch({ type: types.GET_ORDER_HISTORY_BEGIN })
    try {
      const { data } = await authFetch.get('/order')
      dispatch({
        type: types.GET_ORDER_HISTORY_SUCCESS,
        payload: data,
      })

    } catch (error) {
      dispatch({
        type: types.GET_ORDER_HISTORY_FAILED,
      })
    }
  }

  return (
    <AppContext.Provider
      value={{
        ...state,
        setupUser,
        logoutUser,
        getShops,
        getGoods,
        setCurrentShop,
        addItem,
        toggleAmount,
        getTotals,
        removeItem,
        makeAnOrder,
        displayAlert,
        clearAlert,
        clearCart,
        setCart,
        addCartToLocalStorage,
        removeCartFromLocalStorage,
        getOrderHistory,

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
