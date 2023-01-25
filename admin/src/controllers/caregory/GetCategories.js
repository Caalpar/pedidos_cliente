

import {API} from '../../api/api_fetch.js'
import {SERVER} from '../../api/routes.js'


export const GetCategories = async (branch_office_id) =>{
    let res = await API.Get(SERVER+'category/all/'+branch_office_id)
    return res
}

