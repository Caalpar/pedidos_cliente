

import {API} from '../../api/api_fetch.js'
import {SERVER} from '../../api/routes.js'


export const CreateProduct = async (branch_office_id,category_id,user_id,price,imge,cost,title,description,availbility,front_page) =>{
    let res = await API.Post(SERVER+'product',{branch_office_id,category_id,user_id,price,imge,cost,title,description,availbility,front_page},{'Content-Type': 'application/json'},true)
    return res
}
