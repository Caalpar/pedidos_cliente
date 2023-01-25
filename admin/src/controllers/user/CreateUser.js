


import {API} from '../../api/api_fetch.js'
import {SERVER} from '../../api/routes.js'


export const CreateUser = async (user_id,email,first_name,last_name,branch_office_id,password,phone=0,rol='CUSTOMER',address='',neighborhood='',corner='',tuition='',vehicle='') =>{
    let res = await API.Post(SERVER+'user',{user_id,email,first_name,last_name,branch_office_id,password,phone,rol,address,neighborhood,corner,tuition,vehicle})
    return res
}

