
import {API} from '../../api/api_fetch.js'
import {SERVER} from '../../api/routes.js'


export const GetBusiness = async (id) =>{
    let res = await API.Get(SERVER+'business/'+id)
    return res
}