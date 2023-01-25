<script>
    import ModalContaner from "../modal-contaner.svelte";
    export let CloseFather
    
    // controllers
    import {CreateBranchOffice} from '../../../../controllers/branch_office/CreateBranchOffice.js'

    //store
    import {loginData} from '../../../../store/user/login.js'
    import {businessAllData,businessData} from '../../../../store/business/businnes.js'
    import {branch_officeAllData,branch_officeData} from '../../../../store/branch_office/branch_office.js'
    
    const Create = async () =>{

        let name = document.getElementById('name-branchoffice-create').value
        let email = document.getElementById('email-branchoffice-create').value
        let address = document.getElementById('address-branchoffice-create').value
        let phone = document.getElementById('phone-branchoffice-create').value
        let new_branch_office = await CreateBranchOffice(email,name,address,phone,undefined,$businessData._id,$loginData._id,$loginData.branch_office_id)
        console.log('new_branch_office',new_branch_office)

        if(new_branch_office.create){
            $branch_officeAllData.push(new_branch_office.data)
            $branch_officeAllData = $branch_officeAllData
            $branch_officeData = new_branch_office.data
        }
        else{
            alert(new_branch_office.msg)
        }
        CloseFather()
    }

</script>


<ModalContaner title = "Crear Sucursal" {CloseFather}>
    <div >
        <input type="text" id="name-branchoffice-create" placeholder="nombre">
    </div>
    <div >
        <input type="mail" id="email-branchoffice-create" placeholder="email">
    </div>
    <div >
        <input type="text" id="address-branchoffice-create" placeholder="direccion">
    </div>
    <div >
        <input type="tel" id="phone-branchoffice-create" placeholder="celular">
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