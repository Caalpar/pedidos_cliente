
import {API} from '../../api/api_fetch.js'
import {SERVER} from '../../api/routes.js'


export const GetAllUsers = async (role,branch_office_id) =>{
    let res = await API.Get(SERVER+'user/all/'+role+'/'+branch_office_id)
    return res
}