<script>
    import ModalContaner from "../modal-contaner.svelte";
    export let CloseFather
    
    // controllers
    import {UpdateBranchOffice} from '../../../../controllers/branch_office/UpdateBranchOffice.js'

    //store
    import {loginData} from '../../../../store/user/login.js'
    import {branch_officeAllData,currentDataBranchOffice} from '../../../../store/branch_office/branch_office.js'
    
    const Update = async () =>{

        let name = document.getElementById('name-branchoffice-update').value
        let email = document.getElementById('email-branchoffice-update').value
        let address = document.getElementById('address-branchoffice-update').value
        let phone = document.getElementById('phone-branchoffice-update').value


        console.log($currentDataBranchOffice)

        let update_branch_office = await UpdateBranchOffice($currentDataBranchOffice._id,$currentDataBranchOffice._id,$loginData._id,email,name,address,phone,$currentDataBranchOffice.hours_days)
        console.log('update_branch_office',update_branch_office)
        // let new_business = await CreateBusiness($loginData._id,name)

        let index_business = $branch_officeAllData.findIndex(b => b._id == $currentDataBranchOffice._id )

        if(index_business !==-1){
            $branch_officeAllData[index_business] = update_branch_office.data
            $branch_officeAllData = $branch_officeAllData
        }
        else{
            alert(update_branch_office.msg)
        }
        CloseFather()
    }

</script>


<ModalContaner title = "Actualizar Sucursal" {CloseFather}>
    <div >
        <input type="text" id="name-branchoffice-update" placeholder="nombre" value={$currentDataBranchOffice.name}>
    </div>
    <div >
        <input type="mail" id="email-branchoffice-update" placeholder="email" value={$currentDataBranchOffice.email}>
    </div>
    <div >
        <input type="text" id="address-branchoffice-update" placeholder="direccion" value={$currentDataBranchOffice.address}>
    </div>
    <div >
        <input type="tel" id="phone-branchoffice-update" placeholder="celular" value={$currentDataBranchOffice.phone}>
    </div>
    <div>
        <button on:click={()=>{Update()}}>Actualizar</button>
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