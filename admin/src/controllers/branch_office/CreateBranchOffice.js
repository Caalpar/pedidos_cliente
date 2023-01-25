


import {API} from '../../api/api_fetch.js'
import {SERVER} from '../../api/routes.js'


export const CreateBranchOffice = async (email,name,address,phone,hours_days,business_id,user_id,branch_office_id) =>{
    let res = await API.Post(SERVER+'branch_office',{email,name,address,phone,hours_days,business_id,user_id,branch_office_id})
    return res
}