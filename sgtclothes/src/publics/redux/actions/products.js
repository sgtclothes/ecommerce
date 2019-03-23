import axios from "axios";
import {url} from '../../../../components/Server'

export const getProducts = () => {
  return {
    type: 'GET_PRODUCTS',
    payload: axios.get(url+'products').catch((error)=>{
			console.log("Api call error")
			alert(error.message)
			}
		)
  }
}

export const getProduct = (id) => {
  return {
    type: 'GET_DETAIL',
    payload: axios.get(url+'product/'+id).catch((error)=>{
			console.log("Api call error")
			alert(error.message)
			}
		)
  }
}

export const addOrder = (item) => {

  return {
    type: 'ADD_ORDER',
    payload: axios.post(url+'orders',item).catch((error)=>{
			console.log("Api call error")
			alert(error.message)
			}
		)
  }
}

export const incBadge = (badge) => {
  return {
    type: 'INC_BADGE',
    payload: badge
  }
}
