

import {API} from '../../api/api_fetch.js'
import {SERVER} from '../../api/routes.js'


export const GetAllProducts = async (branch_office_id) =>{
    let res = await API.Get(SERVER+'product/all/'+branch_office_id)
    return res
}


'/all/:branch_office_id'