
import {API} from '../../api/api_fetch.js'
import {SERVER} from '../../api/routes.js'


export const GetAllOrders = async (branch_office_id) =>{
    let res = await API.Get(SERVER+'order/all/'+branch_office_id)
    return res
}

