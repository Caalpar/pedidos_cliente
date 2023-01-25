<script>
    import ModalContaner from "../../modal-contaner.svelte";
    export let CloseFather
    
    //controllers
    import {DeleteUser} from '../../../../../controllers/user/DeleteUser.js'

    //store
    import {loginData} from '../../../../../store/user/login.js'
    import {currentIdUser,userCustomerAllData} from '../../../../../store/user/user.js'
    
    const Delete = async () =>{

        let delete_user = await DeleteUser($currentIdUser,$loginData._id,$loginData.branch_office_id)

        let indexuser = $userCustomerAllData.findIndex(b => b._id == $currentIdUser)

        if(indexuser !==-1){
            $userCustomerAllData.splice(indexuser,1)
            $userCustomerAllData =  $userCustomerAllData
        }else{
            alert(delete_user.msg)
        }

        CloseFather()
   
    }

</script>


<ModalContaner title = "Eliminar Usuario" {CloseFather}>

    <div style="padding: .5rem;text-align: center;">
        <p>
            Esta acción  borrará el usario
            <br>
            <b>¿Está seguro que desea eliminar la sucursal?</b>
        </p>
    </div>
    <div class="container-center">
        <button on:click={()=>{Delete()}}>ELIMINAR</button>
    </div>    
</ModalContaner>

<style>
        .container-center{
        display: grid;
        justify-items: center;
        align-items: center;
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