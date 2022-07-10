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
  orderUser: {
    name: user ? JSON.parse(user).name : '',
    email: user ? JSON.parse(user).email : '',
    phone: '',
    address: '',
  },
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
    localStorage.setItem('cart', []);
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

  const getShops = async () => {
    dispatch({ type: types.GET_SHOPS_BEGIN })
    try {
      const { data } = await axios.get('/shops')
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
      const { data } = await axios.get(`/goods/${shopId}`)
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
      await axios.post('/order', data)

      dispatch({
        type: types.ORDER_SUCCESS,
      })
      localStorage.setItem('cart', []);
    } catch (error) {
      dispatch({
        type: types.ORDER_FAILED,
      })
    }
    clearAlert()
  }

  const setOrderUser = (e) => {
    dispatch({
      type: types.SET_ORDER_USER,
      payload: e,
    })
  }
  const setCart = (newCart) => {
    dispatch({
      type: types.SET_CART,
      payload: newCart,
    })
  }

  const handleCartLocalStorage = ({ currentShop, cart, amount, total }) => {
    localStorage.setItem(
      'cart',
      JSON.stringify({ currentShop, cart, amount, total })
    )
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
        setOrderUser,
        displayAlert,
        clearAlert,
        clearCart,
        setCart,
        addCartToLocalStorage,
        removeCartFromLocalStorage,
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
