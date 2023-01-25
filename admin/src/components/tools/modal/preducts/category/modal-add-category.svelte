<script>
    import { onMount } from "svelte";

    //components
    import ModalContaner from "../../modal-contaner.svelte";
    import ModalUpdateCategory from "./modal-update-category.svelte";
    import ModalDeleteCategory from "./modal-delete-category.svelte";


    export let CloseFather
    

    let categories = []

    // controllers
    import {CreateCategory} from '../../../../../controllers/caregory/CreateCategory.js'
    import {GetCategories} from '../../../../../controllers/caregory/GetCategories.js'

    //store
    import {loginData} from '../../../../../store/user/login.js'
    import {CategoryAllData,CategoryData} from '../../../../../store/products/category.js'
    import {branch_officeData} from '../../../../../store/branch_office/branch_office.js'

    let name

    onMount(async()=>{
        let categories = await GetCategories($branch_officeData._id)
        console.log('categories',categories)
        $CategoryAllData = categories.data

    })

    $:{
        categories = $CategoryAllData
    }

    const Create = async () =>{


        let new_category = await CreateCategory($branch_officeData._id,name,$loginData._id)
        console.log('new_category',new_category)
        // let new_business = await CreateBusiness($loginData._id,name)
        if(new_category.create){
            $CategoryAllData.push(new_category.data)
            $CategoryAllData = $CategoryAllData
            $CategoryData = new_category.data
        }
        else{

            let errors = Object.entries(new_category.err.errors)

            let msg = ''

            for (let index = 0; index < errors.length; index++) {
                const {message} = errors[index][1];
                msg += message + '\n'
            }

            console.log(msg)
            alert(`${new_category.msg}:
${msg}`)
        }

    }

      // Mostrar modal para actualizar la categoria
      let view_update = false

        const OpenModalUpdateCategory = (data) =>{
            $CategoryData = data
            view_update = true
        }

        const CloseModalUpdateCategory = () =>
        {
            view_update = false
        }
      // Mostrar modal para eliminar categoria
      let view_delete = false

        const OpenModalDeleteCategory = (data) =>{
            $CategoryData = data
            view_delete = true
        }

        const CloseModalDeleteCategory = () =>
        {
            view_delete = false
        }




</script>


{#if view_update}
    <ModalUpdateCategory CloseFather = {CloseModalUpdateCategory} />
{/if}
{#if view_delete}
    <ModalDeleteCategory CloseFather = {CloseModalDeleteCategory}/>
{/if}

<ModalContaner title = "Categorias" {CloseFather}>
    <div >
        <input bind:value={name} type="text" placeholder="nombre">
        <button on:click={()=>{Create()}}>CREAR</button>
    </div>



    <div class="categories-table">
        {#each categories as category}
            <div>
                {category.name}
            </div>
            <div on:click={()=>{OpenModalUpdateCategory(category)}}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="2rem" height="2rem">
                    <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
                    <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
                </svg>    
            </div>
            <div on:click={()=>{OpenModalDeleteCategory(category)}}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="2rem" height="2rem">
                    <path fill-rule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" clip-rule="evenodd" />
                </svg>  
            </div>
        {/each}
    </div>

    <div>
        
    </div>    
</ModalContaner>

<style>

    .categories-table{
        display: grid;
        grid-template-columns: auto 4rem 4rem;
        margin: 1rem 0.2rem;
        color: white;
        height: 25vh;
        overflow-y: scroll;
    }

    .categories-table::-webkit-scrollbar{
        display: none;
    }

    .categories-table > div{
        padding: 1rem;
        font-size: x-large;
        cursor: pointer;
   
    }
    
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