<script>
    import ModalContaner from "../modal-contaner.svelte";
    export let CloseFather
    import {UpdateBusiness} from '../../../../controllers/business/UpdateBusiness.js'
    import {loginData} from '../../../../store/user/login.js'
    import {businessAllData,currentDataBusiness} from '../../../../store/business/businnes.js'
    
    const Update = async () =>{

        let name = document.getElementById('name-business-create').value
        let new_business = await UpdateBusiness($currentDataBusiness._id,$loginData._id,name)

        let index_business = $businessAllData.findIndex(b => b._id == $currentDataBusiness._id )

        if(index_business !==-1){
            $businessAllData[index_business] = new_business.data
            $businessAllData = $businessAllData
        }

        CloseFather()
    }

</script>


<ModalContaner title = "Actualizar Empresa" {CloseFather}>
    <div >
        <input type="text" id="name-business-create" placeholder="nombre de la empresa" value={$currentDataBusiness.name}>
    </div>
    <div>
        <button on:click={()=>{Update()}}>ACTUALIZAR</button>
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