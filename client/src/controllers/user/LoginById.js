
import {API} from '../../api/api_fetch.js'
import {SERVER} from '../../api/routes.js'


export const LoginById = async (id) =>{
    let res = await API.Get(SERVER+'user/'+id)
    return res
}