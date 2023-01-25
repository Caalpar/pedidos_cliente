<script>
    import ModalContaner from "../modal-contaner.svelte";
    export let CloseFather
    import {DeleteBusiness} from '../../../../controllers/business/DeleteBusiness.js'
    import {loginData} from '../../../../store/user/login.js'
    import {businessAllData,currentIdBusiness} from '../../../../store/business/businnes.js'
    
    const Delete = async () =>{

        let new_business = await DeleteBusiness($currentIdBusiness,$loginData._id)

        let index_business = $businessAllData.findIndex(b => b._id == $currentIdBusiness)

        if(index_business !==-1){
            $businessAllData.splice(index_business,1)
             $businessAllData = $businessAllData
        }else{
            alert(new_business.msg)
        }

        CloseFather()
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