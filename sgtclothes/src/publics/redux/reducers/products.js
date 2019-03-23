const initialState = {
  data: [], detail: {},
  dcarts:[],
  isLoading: false,
  number: 100,
  badge:0
}

export default products = (state = initialState, action) => {
  switch (action.type) {
  

    case 'GET_PRODUCTS_PENDING': 
      return {
        ...state,
        isLoading: true
      }

    case 'GET_PRODUCTS_REJECTED': 
      return {
        ...state,
        isLoading: false
      }

    case 'GET_PRODUCTS_FULFILLED': 
      return {
        ...state,
        isLoading: false,
        data: action.payload.data
      }

    case 'GET_DETAIL_PENDING': 
      return {
        ...state,
        isLoading: true
      }

    case 'GET_DETAIL_REJECTED': 
      return {
        ...state,
        isLoading: false
      }

    case 'GET_DETAIL_FULFILLED': 
      return {
        ...state,
        isLoading: false,
        detail: action.payload.data
      }

    case 'INC_BADGE': 
      return {
        ...state,
        isLoading: true,
        badge: action.payload
      }

      case 'ADD_ORDER_PENDING': 
      return {
        ...state,
        isLoading: true
      }

    case 'ADD_ORDER_REJECTED': 
      return {
        ...state,
        isLoading: false
      }

    case 'ADD_ORDER_FULFILLED': 
      let index = state.data.findIndex((item) => {
        return item.id == action.payload.data.id
      })
      let cart
      if (index >= 0) {
        cart = [
          ...state.data.slice(0, index),
          {
            ...state.data[index],
            qty: action.payload.data.qty
          },
          ...state.data.slice(index+1)
        ]
      }
      else {
        cart = [...state.data, action.payload.data]
      }

      return {
        ...state,
        isLoading: false,
        data: cart
      }
  
    default:
      return state;
  }
}