
import {API} from '../../api/api_fetch.js'
import {SERVER} from '../../api/routes.js'


export const DeleteBusiness = async (id,user_id) =>{
    let res = await API.Delete(SERVER+'business/'+id+'/'+user_id)
    return res
}