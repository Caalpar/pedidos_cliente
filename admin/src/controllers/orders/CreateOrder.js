

import {API} from '../../api/api_fetch.js'
import {SERVER} from '../../api/routes.js'


export const CreateOrder= async (newOreder) =>{
    let res = await API.Post(SERVER+'order',{...newOreder})
    return res
}

