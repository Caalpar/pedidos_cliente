
import {API} from '../../api/api_fetch.js'
import {SERVER} from '../../api/routes.js'


export const UpdateProduct = async (_id,branch_office_id,category_id,user_id,price,imge,cost,title,description,availbility,front_page) =>{
    console.log(imge)
    let res = await API.Put(SERVER+'product',{_id,branch_office_id,category_id,user_id,price,imge,cost,title,description,availbility,front_page},{'Content-Type': 'application/json'},true)
    return res
}
