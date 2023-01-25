
import {API} from '../../api/api_fetch.js'
import {SERVER} from '../../api/routes.js'


export const DeleteUser = async (id,user_id,branch_office_id) =>{
    let res = await API.Delete(SERVER+'user/'+id+'/'+user_id +"/"+branch_office_id)
    return res
}