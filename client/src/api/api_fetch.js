
const apiFetch = async (url,method,data='',headers={'Content-Type': 'application/json'},file=false)=>{
  
  let raw = ''


 // if(headers['Content-Type'] == 'multipart/form-data')
  if(file)
  {

    raw  = new FormData();

    for(const name in data) {
      console.log('name',name,'data',data[name])

      raw.append(name, data[name]);
    } 

    if(method == 'POST' || method == 'PUT'){
      let result = await fetch(url, {
        method,
        body:raw,
      })  
      
      return result
    }


  }else{

    raw = JSON.stringify(data);



    if(method == 'POST' || method == 'PUT'){
      let result = await fetch(url, {
        headers,  
        method,
        body:raw,
        redirect: 'follow'
      })  
      
      return result
  }

    if(method == 'GET' || method == 'DELETE'){
      let result = await fetch(url, {
        headers,  
        method
      })  
      
      return result
    }
  }

}

const Get = async (url,req='') =>{
  const response = await apiFetch(url,'GET',req);
  const data = await response.json();
  return data
}

const Post = async (url,req ='',headers={'Content-Type': 'application/json'},file=false) =>{
  const response = await apiFetch(url,'POST',req,headers,file);
  const data = await response.json();
  return data
}

const Put = async (url,req = '',headers={'Content-Type': 'application/json'},file=false) =>{
  const response = await apiFetch(url,'PUT',req,headers,file);
  const data = await response.json();
  return data
}

const Delete = async (url,req = '') =>{
  const response = await apiFetch(url,'DELETE',req);
  const data = await response.json();
  return data
}

const Patch = async (url,req = '') =>{
  const response = await apiFetch(url,'PATCH',req);
  const data = await response.json();
  return data
}

export const API = {
  Get,
  Post,
  Put,
  Delete,
  Patch
}


