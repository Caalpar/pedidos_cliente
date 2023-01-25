
import {API} from '../../api/api_fetch.js'
import {SERVER} from '../../api/routes.js'


export const GetBranchOffice = async (id) =>{
    let res = await API.Get(SERVER+'branch_office/'+id)
  
    return res
}