
import {API} from '../../api/api_fetch.js'
import {SERVER} from '../../api/routes.js'


export const GetAllBusiness = async (unser_id) =>{
    let res = await API.Get(SERVER+'business/all/'+unser_id)
    return res
}