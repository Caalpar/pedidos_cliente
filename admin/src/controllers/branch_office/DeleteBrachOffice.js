
import {API} from '../../api/api_fetch.js'
import {SERVER} from '../../api/routes.js'


export const DeleteBranchOffice = async (id,user_id,branch_office_id) =>{
    let res = await API.Delete(SERVER+'branch_office/'+id+'/'+user_id+'/'+branch_office_id)
    return res
}