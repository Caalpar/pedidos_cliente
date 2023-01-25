

import {API} from '../../api/api_fetch.js'
import {SERVER} from '../../api/routes.js'


export const UpdateCategory = async (branch_office_id,name,user_id,_id) =>{
    let res = await API.Put(SERVER+'category',{branch_office_id,name,user_id,_id})
    return res
}

