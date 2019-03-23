const initialState = {
    data: [],
    isLoading: false,
    qty:1,
    total:0
  }
  
  export default orders = (state = initialState, action) => {
    switch (action.type) {
    
  
      case 'GET_ORDERS_PENDING': 
        return {
          ...state,
          isLoading: true
        }
  
      case 'GET_ORDERS_REJECTED': 
        return {
          ...state,
          isLoading: false
        }
  
      case 'GET_ORDERS_FULFILLED': 
        return {
          ...state,
          isLoading: false,
          data: action.payload.data
        }
      
      case 'DELETE_ORDER_PENDING': 
        return {
          ...state,
          isLoading: true
        }
      
      case 'DELETE_ORDER_REJECTED': 
        return {
          ...state,
          isLoading: false
        }
       
      case 'DELETE_ORDER_FULFILLED': 
        return {
          ...state,
          isLoading: false,
          data: state.data.filter((item)=>item.id!=action.payload.data.id)
        }  

      case 'UPDATE_QTY_PENDING': 
        return {
          ...state,
          isLoading: true
        }
        
      case 'UPDATE_QTY_REJECTED': 
        return {
          ...state,
          isLoading: false
        }
    
      case 'UPDATE_QTY_FULFILLED': 
        return {
          ...state,
          isLoading: false,
          qty: action.payload.data
        }  

      default:
        return state;
    }
  }