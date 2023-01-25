

import {API} from '../../api/api_fetch.js'
import {SERVER} from '../../api/routes.js'


export const CreateCategory = async (branch_office_id,name,user_id) =>{
    let res = await API.Post(SERVER+'category',{branch_office_id,name,user_id})
    return res
}

