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
        textAlert: action.payload.textAlert,
        orderUser: {
          ...state.orderUser,
          name: action.payload.user.name,
          email: action.payload.user.email,
        },
      }

    case types.SETUP_USER_FAILED:
      return {
        ...state,
        isLoading: false,
        textAlert: action.payload.msg,
        showAlert: true,
      }

    case types.DISPLAY_ALERT:
      return {
        ...state,
        showAlert: true,
        alertType: action.payload.alertType,
        alertText: action.payload.alertText,
      }

    case types.CLEAR_ALERT:
      return {
        ...state,
        showAlert: false,
        alertType: '',
        alertText: '',
      }

    case types.LOGOUT_USER:
      return {
        ...initialState,
        user: null,
        token: null,
      }

    case types.GET_SHOPS_BEGIN:
      return { ...state, isLoading: true }

    case types.GET_SHOPS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        shops: action.payload,
      }

    case types.GET_SHOPS_FAILED:
      return {
        ...state,
        isLoading: false,
      }

    case types.GET_SHOP_GOODS_BEGIN:
      return { ...state, isLoading: true }

    case types.GET_SHOP_GOODS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        goods: action.payload,
      }

    case types.GET_SHOP_GOODS_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    case types.SET_CURRENT_SHOP:
      return {
        ...state,
        currentShop: action.payload,
      }

    case types.ADD_ITEM:
      if (!state.cart.some((item) => item._id === action.payload._id)) {
        let good = action.payload
        good.amount = 1
        return {
          ...state,
          cart: [...state.cart, good],
        }
      }
      return {
        ...state,
      }

    case types.TOGGLE_AMOUNT:
      const { id, toggle } = action.payload
      return {
        ...state,
        cart: state.cart.map((cartItem) => {
          if (id === cartItem._id) {
            if (toggle === 'inc') {
              return (cartItem = { ...cartItem, amount: cartItem.amount + 1 })
            }
            if (toggle === 'dec') {
              return (cartItem = { ...cartItem, amount: cartItem.amount - 1 })
            }
          }
          return cartItem
        }),
      }

    case types.GET_TOTALS:
      let { amount, total } = state.cart.reduce(
        (cartTotal, cartItem) => {
          cartTotal.amount += cartItem.amount
          cartTotal.total += cartItem.amount * cartItem.price

          return cartTotal
        },
        {
          amount: 0,
          total: 0,
        }
      )
      total = parseFloat(total.toFixed(2))
      return {
        ...state,
        amount,
        total,
      }

    case types.CLEAR_CART:
      return { ...state, cart: [] }

    case types.REMOVE_ITEM:
      if (state.cart?.length === 1) {
        localStorage.removeItem('cart')
      }
      return {
        ...state,
        cart: state.cart.filter(
          (cartItem) => cartItem._id !== action.payload.id
        ),
      }

    case types.ORDER_BEGIN:
      return { ...state, isLoading: true }

    case types.ORDER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        currentShop: '',
        cart: [],
        amount: 0,
        total: 0,
        showAlert: true,
        alertType: 'success',
        alertText: 'Successfully ordered',
      }

    case types.ORDER_FAILED:
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: 'danger',
        alertText: 'Order failed. Try again later...',
      }

    case types.SET_ORDER_USER:
      return {
        ...state,
        orderUser: {
          ...state.orderUser,
          [action.payload.target.name]: action.payload.target.value,
        },
      }
    case types.SET_CART:
      return {
        ...state,
        cart: action.payload,
      }
    case types.GET_ORDER_HISTORY_BEGIN:
      return { ...state, isLoading: true }

    case types.GET_ORDER_HISTORY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        orderHistory: action.payload,
      }

    case types.GET_ORDER_HISTORY_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    default:
      return {
        ...state,
      }
  }
}

export default reducer
