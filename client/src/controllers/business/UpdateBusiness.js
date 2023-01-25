
import {API} from '../../api/api_fetch.js'
import {SERVER} from '../../api/routes.js'


export const UpdateBusiness = async (_id,user_id,name,imge) =>{
    let res = await API.Put(SERVER+'business',{user_id,_id,name,imge},{'Content-Type': 'application/json'},true)
    return res
}