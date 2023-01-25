<script>
    import ModalContaner from "../../modal-contaner.svelte";
    export let CloseFather

    
    //controllers
    import {DeleteCategory} from '../../../../../controllers/caregory/DeleteCategory.js'

    //store
    import {loginData} from '../../../../../store/user/login.js'
    import {branch_officeData} from '../../../../../store/branch_office/branch_office.js'
    import {CategoryData,CategoryAllData} from '../../../../../store/products/category.js'
    
    const Delete = async () =>{

        let deleteCategory = await DeleteCategory($CategoryData._id,$loginData._id,$branch_officeData._id)

        let index_category= $CategoryAllData.findIndex(b => b._id == $CategoryData._id)

        if(index_category !==-1){
            $CategoryAllData.splice(index_category,1)
             $CategoryAllData = $CategoryAllData
        }else{
            alert(deleteCategory.msg)
        }

        CloseFather()
   
    }

</script>


<ModalContaner title = "Eliminar Categoria" {CloseFather} z_index={200}>

    <div style="padding: .5rem;text-align: center;">
        <p>
            Esta acción borrará la categoria, y los productos asociados a ella
            <br>
            <b>¿Está seguro que desea eliminar la categoria?</b>
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