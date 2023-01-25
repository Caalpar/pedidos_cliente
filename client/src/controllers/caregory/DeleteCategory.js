
import {API} from '../../api/api_fetch.js'
import {SERVER} from '../../api/routes.js'


export const DeleteCategory = async (id,user_id,branch_office_id) =>{
    let res = await API.Delete(SERVER+'category/'+id+'/'+user_id +"/"+branch_office_id)
    return res
}