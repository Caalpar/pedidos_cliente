
import {API} from '../../api/api_fetch.js'
import {SERVER} from '../../api/routes.js'


export const GetReport= async (user_id,sience,unitl) =>{
    let res = await API.Get(SERVER+'order/report/'+user_id+'/'+sience+'/'+unitl)
    return res
}

