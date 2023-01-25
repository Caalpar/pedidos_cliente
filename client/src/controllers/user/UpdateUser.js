
import {API} from '../../api/api_fetch.js'
import {SERVER} from '../../api/routes.js'


export const UpdateUser = async (user_id,branch_office_id,_id,email,phone,first_name,last_name,address='',neighborhood='',corner='',tuition='',vehicle='') =>{
    let res = await API.Put(SERVER+'user',{user_id,branch_office_id,_id,email,phone,first_name,last_name,address,neighborhood,corner,tuition,vehicle})
    return res
}