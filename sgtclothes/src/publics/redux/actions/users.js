import axios from "axios";
import {url} from '../../../../components/Server'

export const registerUser = (data) => {

    return {
        type: 'REGISTER',
        payload: axios.post(url+'register',data).catch((error)=>{
			console.log("Api call error")
			alert(error.message)
			}
		)        
    }
}

export const loginUser = (data) => {
    // axios.defaults.headers.common['Authorization'] = ''
     return {
          type: 'LOGIN',
          payload: axios.post(url+'login',data).catch((error)=>{
            console.log("Api call error")
            alert('login'+error.message)
              }
         )        
     }
}

export const getUser = (id,token) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    // alert(axios.defaults.headers.common['Authorization'])
    return {
         type: 'GET_USER',
         payload: axios.get(url+'user/'+id).catch((error)=>{
           console.log("Api call error")
           alert('getuser'+error.message)
             }
        )        
    }
}