import axios from "axios";
import {url} from '../../../../components/Server'

export const getOrders = () => {
  return {
    type: 'GET_ORDERS',
    payload: axios.get(url+'orders').catch((error)=>{
			console.log("Api call error")
			alert(error.message)
			}
		)
  }
}

export const deleteOrder = (id) => {
  return {
    type: 'DELETE_ORDER',
    payload: axios.delete(url+'order/'+id).catch((error)=>{
			console.log("Api call error")
			alert(error.message)
			}
		)
  }
}

export const updateQty = (id,qty) => {
  return {
    type: 'UPDATE_QTY',
    payload: axios.patch(url+'order/'+id,{qty}).catch((error)=>{
			console.log("Api call error")
			alert(error.message)
			}
		)
  }
}