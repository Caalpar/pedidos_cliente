<script>
 
    import { onMount } from "svelte";
    import ModalContaner from "../../modal-contaner.svelte";
    export let CloseFather
    
    // controllers
    import {UpdateCategory} from '../../../../../controllers/caregory/UpdateCategory.js'

    //store
    import {loginData} from '../../../../../store/user/login.js'
    import {CategoryData,CategoryAllData} from '../../../../../store/products/category.js'
    import {branch_officeData} from '../../../../../store/branch_office/branch_office.js'
    
    let new_category_name 

    onMount(()=>{
        new_category_name = $CategoryData.name
    })

    const Update = async () =>{

        console.log('new_category_name',new_category_name)
        let update_category = await UpdateCategory($branch_officeData._id,new_category_name,$loginData._id,$CategoryData._id)
        console.log('update_category',update_category)
        // let new_business = await CreateBusiness($loginData._id,name)

        let index_category = $CategoryAllData.findIndex(b => b._id == update_category.data._id )

        if(index_category !==-1){
            $CategoryAllData[index_category] = update_category.data
            $CategoryAllData = $CategoryAllData
        }
        else{
            alert(update_category.msg)
        }
        CloseFather()
    }

</script>


<ModalContaner title = "Actualizar Categoria" {CloseFather} z_index={200}>
    <div >
        <input type="text"  bind:value={new_category_name}>
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