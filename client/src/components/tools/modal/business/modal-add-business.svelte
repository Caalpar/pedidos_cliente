<script>
    import ModalContaner from "../modal-contaner.svelte";
    export let CloseFather

    //controllers
    import {CreateBusiness} from '../../../../controllers/business/CreateBusiness.js'

    //store
    import {loginData} from '../../../../store/user/login.js'
    import {businessAllData,businessData} from '../../../../store/business/businnes.js'
    
    const Create = async () =>{

        let name = document.getElementById('name-business-create').value
        let new_business = await CreateBusiness($loginData._id,name)
        $businessAllData.push(new_business.data)
        $businessAllData = $businessAllData
        $businessData = new_business.data
        //console.log('new_business',new_business)
        CloseFather()
    }

</script>


<ModalContaner title = "Crear Empresa" {CloseFather}>
    <div >
        <input type="text" id="name-business-create" placeholder="nombre de la empresa">
    </div>
    <div>
        <button on:click={()=>{Create()}}>CREAR</button>
    </div>    
</ModalContaner>

<style>


    
    input{
        height: 2rem;
        padding: .3rem;
        outline: none;
        border-radius: .2rem;
        border: none;
        margin-left: .5rem;
        margin-top: .5rem;
        width: 14.4rem;
    }

    button{
        padding: .3rem;
        width: 15rem;
        height: 2.7rem;
        background-color: rgba(0, 0, 0, 0.418);
        color: white;
        border: none;
        cursor: pointer;
        margin-left: .5rem;
        margin-top: .9rem;
        margin-bottom: .5rem;
        border-radius: .2rem;
    }

</style>