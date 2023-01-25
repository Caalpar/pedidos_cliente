
import {API} from '../../api/api_fetch.js'
import {SERVER} from '../../api/routes.js'


export const GetAllBranchOffices = async (business_id,branch_office_id,user_id) =>{
    let res = await API.Get(SERVER+'branch_office/all/'+user_id+'/'+business_id+'/'+branch_office_id)
    return res
}