<script>
    import ModalContaner from "../modal-contaner.svelte";
    export let CloseFather
    
    //controllers
    import {DeleteBranchOffice} from '../../../../controllers/branch_office/DeleteBrachOffice.js'

    //store
    import {loginData} from '../../../../store/user/login.js'
    import {currentIdBranchOfficeId,branch_officeAllData} from '../../../../store/branch_office/branch_office.js'
    
    const Delete = async () =>{

        let delete_branchOffice = await DeleteBranchOffice($currentIdBranchOfficeId,$loginData._id,$currentIdBranchOfficeId)

        let indexbranchOffice = $branch_officeAllData.findIndex(b => b._id == $currentIdBranchOfficeId)

        if(indexbranchOffice !==-1){
            $branch_officeAllData.splice(indexbranchOffice,1)
             $branch_officeAllData = $branch_officeAllData
        }else{
            alert(delete_branchOffice.msg)
        }

        CloseFather()
   
    }

</script>


<ModalContaner title = "Eliminar Sucursal" {CloseFather}>

    <div style="padding: .5rem;text-align: center;">
        <p>
            Esta acción no solo borrará la sucursal, los productos asociados a ella
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