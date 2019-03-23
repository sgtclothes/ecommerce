import { combineReducers } from 'redux';

import products from './products'
import orders from './orders'
import users from './users'

const appReducer = combineReducers({
  products,
  orders,
  users
});

export default appReducer;