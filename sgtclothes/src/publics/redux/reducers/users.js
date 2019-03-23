const initialState = {
    data: [],
    isLoading: false,
    profile:{},
    user:{}
  }
  
  export default users = (state = initialState, action) => {
    switch (action.type) {
    
  
      case 'REGISTER_PENDING': 
        return {
          ...state,
          isLoading: true
        }
  
      case 'REGISTER_REJECTED': 
        return {
          ...state,
          isLoading: false
        }
  
      case 'REGISTER_FULFILLED': 
        return {
          ...state,
          isLoading: false,
          data: action.payload.data
        }

      case 'LOGIN_PENDING': 
        return {
          ...state,
          isLoading: true
        }
  
      case 'LOGIN_REJECTED': 
        return {
          ...state,
          isLoading: false
        }
  
      case 'LOGIN_FULFILLED': 
        return {
          ...state,
          isLoading: false,
          profile: action.payload.data
        }

      case 'GET_USER_PENDING': 
        return {
          ...state,
          isLoading: true
        }
  
      case 'GET_USER_REJECTED': 
        return {
          ...state,
          isLoading: false
        }
  
      case 'GET_USER_FULFILLED': 
        return {
          ...state,
          isLoading: false,
          user: action.payload.data
        }
      
      default:
        return state;
    }
  }