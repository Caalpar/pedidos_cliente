
import {API} from '../../api/api_fetch.js'
import {SERVER} from '../../api/routes.js'

export const SendMailAllUsers = async (branch_office_id,subject,text,htmlText) =>{
    let res = await API.Post(SERVER+'email',{branch_office_id,subject,text,htmlText}) 
    return res
}

    