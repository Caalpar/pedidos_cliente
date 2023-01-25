

import {API} from '../../api/api_fetch.js'
import {SERVER} from '../../api/routes.js'


export const UpdateOrder= async (updateOreder) =>{
    let res = await API.Put(SERVER+'order',{...updateOreder})
    return res
}

