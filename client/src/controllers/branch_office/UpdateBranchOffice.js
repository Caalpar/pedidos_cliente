
import {API} from '../../api/api_fetch.js'
import {SERVER} from '../../api/routes.js'


export const UpdateBranchOffice = async (_id,branch_office_id,user_id,email,name,address,phone,hours_days) =>{
    let res = await API.Put(SERVER+'branch_office',{user_id,_id,branch_office_id,email,name,address,phone,hours_days})
    return res
}