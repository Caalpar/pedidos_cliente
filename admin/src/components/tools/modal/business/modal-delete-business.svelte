<script>
    import ModalContaner from "../modal-contaner.svelte";
    export let CloseFather

    //controllers
    import {DeleteBusiness} from '../../../../controllers/business/DeleteBusiness.js'
    import {GetAllBranchOffices} from '../../../../controllers/branch_office/GetAllBranchOffices.js'
    
    //store
    import {loginData} from '../../../../store/user/login.js'
    import {businessAllData,currentIdBusiness,businessData} from '../../../../store/business/businnes.js'
    import {branch_officeAllData,branch_officeData} from '../../../../store/branch_office/branch_office.js'
    
    const Delete = async () =>{

        let new_business = await DeleteBusiness($currentIdBusiness,$loginData._id)

        let index_business = $businessAllData.findIndex(b => b._id == $currentIdBusiness)

        if(index_business !==-1){
            $businessAllData.splice(index_business,1)
             $businessAllData = $businessAllData
             ChangeBusiness($businessAllData[0])
        }else{
            alert(new_business.msg)
        }

        CloseFather()
    }


    //Cambiar de Empresa
    const ChangeBusiness = async (business) =>{
        let result = await GetAllBranchOffices(business._id,$loginData.branch_office_id,$loginData._id)
        console.log('all_branch_office',result)
        $branch_officeAllData = result.data
        $branch_officeData = result.data[0]
        $businessData = business
    }

</script>


<ModalContaner title = "Eliminar Empresa" {CloseFather}>

    <div style="padding: .5rem;text-align: center;">
        <p>
            Esta acción no solo borrará la empresa, también borrar las sucursales y productos asociados a ella
            <br>
            <b>¿Está seguro que desea eliminar la empresa?</b>
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