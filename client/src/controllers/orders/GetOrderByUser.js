
import {API} from '../../api/api_fetch.js'
import {SERVER} from '../../api/routes.js'


export const GetOrderByUser= async (user_id) =>{
    let res = await API.Get(SERVER+'order/client/'+user_id)
    return res
}

