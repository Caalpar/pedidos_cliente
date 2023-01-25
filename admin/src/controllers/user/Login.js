
import {API} from '../../api/api_fetch.js'
import {paths,SERVER} from '../../api/routes.js'


export const Login = async (email,password) =>{
    let res = await API.Post(SERVER+paths.user_login,{email,password})




    return res
}