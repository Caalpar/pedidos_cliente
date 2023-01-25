
import {API} from '../../api/api_fetch.js'
import {SERVER} from '../../api/routes.js'


export const CreateBusiness = async (user_id,name,imge) =>{
    let res = await API.Post(SERVER+'business',{user_id,name,imge},{'Content-Type': 'application/json'},true)
    return res
}