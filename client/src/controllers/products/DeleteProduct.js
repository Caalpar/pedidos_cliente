

import {API} from '../../api/api_fetch.js'
import {SERVER} from '../../api/routes.js'


export const DeleteProduct = async (_id,user_id,branch_office_id) =>{
    let res = await API.Delete(SERVER+'product/'+_id+'/'+user_id+'/'+branch_office_id)
    return res
}
