
<script>

    //path
    import {IMAGE_PATH} from '../../../api/routes.js'

    // components
    //modal-category
    import ModalAddCategory from "../../tools/modal/preducts/category/modal-add-category.svelte";


    // modal- product
    import ModalAddProduct from "../../tools/modal/preducts/modal-add-preduct.svelte";
    import ModalDeleteProduct from "../../tools/modal/preducts/modal-delete-preduct.svelte";
    import ModalEditproduct from "../../tools/modal/preducts/modal-update-preduct.svelte";
    
    //controlers
    import { GetAllProducts } from "../../../controllers/products/GteProducts.js"


    // Store
    import {businessAllData} from '../../../store/business/businnes.js'
    import {ProductsAllData,ProductsData} from '../../../store/products/products.js'
    import {branch_officeData} from '../../../store/branch_office/branch_office.js'
    import {mobileView} from '../../../store/global/MobileView.js'

    import { onMount } from "svelte";

    let productAllData = []

    onMount(async ()=>{
        let result = await GetAllProducts($branch_officeData._id)

        let sort_data = result.data.sort((a,b)=> {
            if(a.category_id.name > b.category_id.name)
                return 1
            if(a.category_id.name < b.category_id.name)
                return -1
            else
                return 0
            
        })

        $ProductsAllData = sort_data
        console.log('result',result)
    })

    $:{
        productAllData = $ProductsAllData
      //  productAllData.sort((a,b)=> a.category_id.name > b.category_id.name)
    }

    // Mostrar modal para agregar categorya
    let view_add_category = false

    const OpenModalAddCategory = () =>{
        view_add_category= true
    }

    const CloseModalAddCategory = () =>
    {
        view_add_category = false
    }

    // Mostrar modal para agregar producto
    let view_add = false

    const OpenModalAddProduct = () =>{
        view_add = true
    }

    const CloseModalAddProduct = () =>
    {
        view_add = false
    }

    // Mostrar modal para actualizar producto
    let view_update = false

    const OpenModalUpdateProduct = (data) =>{
    
        $ProductsData = data
        view_update = true
    }

    const CloseModalUpdateProduct = () =>
    {
        view_update = false
    }

    // Mostrar modal para eliminar producto
    let view_delete = false

    const OpenModalDeleteProduct = (product) =>{
        $ProductsData = product
        view_delete = true
    }

    const CloseModalDeleteProduct = () =>
    {
        view_delete = false
    }



</script>


{#if view_add_category}
    <ModalAddCategory CloseFather = {CloseModalAddCategory} />
{/if}
{#if view_add}
    <ModalAddProduct CloseFather = {CloseModalAddProduct} />
{/if}

{#if view_delete}
    <ModalDeleteProduct CloseFather = {CloseModalDeleteProduct} />
{/if}

{#if view_update}
    <ModalEditproduct CloseFather = {CloseModalUpdateProduct} />
{/if}

    


<div class="business-container">

    <div class="btn-contanier">
        <div>
            <button class="cat-btn-add" on:click={()=>{OpenModalAddCategory()}}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="cube">
                    <path fill-rule="evenodd" d="M5.25 2.25a3 3 0 00-3 3v4.318a3 3 0 00.879 2.121l9.58 9.581c.92.92 2.39 1.186 3.548.428a18.849 18.849 0 005.441-5.44c.758-1.16.492-2.629-.428-3.548l-9.58-9.581a3 3 0 00-2.122-.879H5.25zM6.375 7.5a1.125 1.125 0 100-2.25 1.125 1.125 0 000 2.25z" clip-rule="evenodd" />
                  </svg>
                  
            </button>
            <button on:click={()=>{OpenModalAddProduct()}}>
                +
            </button>
        </div>
       
    </div>


    {#if productAllData.length>0}
    <div class="busines-table">
        {#each productAllData as preduct,index}

        {#if index == 0}
            <div class="category-title">
                {preduct.category_id.name}
            </div>
        {:else if  productAllData[index-1].category_id.name !== productAllData[index].category_id.name}
            <div class="category-title">
                {preduct.category_id.name}
            </div>
        {/if}

        {#if !$mobileView}
            <div>
                <img src={IMAGE_PATH + preduct.img} alt="">
            </div>
            <div>
                {preduct.title}
            </div>
            <div>
                <div>
                    $ {preduct.price}
                </div>
                <div>
                    $ {preduct.cost}
                </div>
            </div>
            <div>
                {preduct.description}
            </div>
            <div>
                    
                {#if preduct.availbility}
                <svg class="cube green" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" >
                    <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clip-rule="evenodd" />
                </svg>
                  
                {:else}
                     <svg  class="cube red" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z" clip-rule="evenodd" />
                  </svg>
                  
                {/if}
            </div>
            <div class="pointer" on:click={()=>{OpenModalUpdateProduct(preduct)}} >
                <svg class="cube" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
                    <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
                </svg>    
            </div>
            <div class="pointer" on:click={()=>{OpenModalDeleteProduct(preduct)}} >
                <svg  class="cube" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path fill-rule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" clip-rule="evenodd" />
                </svg>  
            </div>
        {:else}
            <div>
                <img src={IMAGE_PATH + preduct.img} alt="">
            </div>
             <div>
                 {preduct.title}
             </div>
             <div>
               precio : ${preduct.price}
             </div>
             <div>
               consto : ${preduct.cost}
             </div>
             <div>
                 {preduct.description}
             </div>
             <div>
                {#if preduct.availbility}
                <svg class="cube green" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" >
                    <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clip-rule="evenodd" />
                </svg>
                  
                {:else}
                     <svg  class="cube red" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z" clip-rule="evenodd" />
                  </svg>
                  
                {/if}
             </div>
             <div class="pointer" on:click={()=>{OpenModalUpdateProduct(preduct)}} >
                 <svg class="cube" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                     <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
                     <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
                 </svg>    
             </div>
             <div class="pointer" on:click={()=>{OpenModalDeleteProduct(preduct)}} >
                 <svg  class="cube" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                     <path fill-rule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" clip-rule="evenodd" />
                 </svg>  
             </div>
        {/if}
        {/each}
    </div>
    {/if}

</div>

<style>


    ::-webkit-scrollbar{
        width: 5px;
    }
    ::-webkit-scrollbar-thumb {
        background: rgba(0, 0, 0, 0.151); 
        border-radius: 10px;
    }
    .category-title{
        grid-column: 1 / 8;
        background:rgba(0,0,0,0.5);
        color: white;
        border-radius: .2rem;
    }

    .cube{
        width: 1.2rem;
        height: 1.2rem;
    }
   
    .business-container{
        display: grid;
        justify-items: center;
        align-items: center;
        height: 67vh;
        overflow-y: scroll;
    }

    .red{
        color: red;
    }

    .green{
        color: green;
    }

    .busines-table{
        display: grid;
        grid-template-columns: auto auto auto auto auto auto auto;
        grid-auto-rows: max-content;
        margin: 0.2rem 0.2rem;
        width: 96vw;
   
    }

    .btn-contanier{
        display: grid;
        grid-template-columns: auto auto;
    }

    .busines-table > div{
        padding: 0.5rem;
        font-size: small; 
        text-align: center;
        overflow: hidden;
        text-overflow: ellipsis; 
   
    }

    .pointer{
        cursor: pointer;
    }



    button{
        position: absolute;
        right: 1rem;
        bottom: 2%;
        width: 3rem;
        height: 3rem;
        text-align: center;
        background-color: #04AA6D;
        color: white;
        border: none;
        cursor: pointer;
        border-radius: 50%;
        padding: 1rem;
        margin: 0.2rem;
        display: grid;
        justify-content: center;
        align-content: center;
        font-size: xx-large;
        z-index: 25;
        
    }

    .cat-btn-add{
        right: 5rem;
    }

    img{
            width: 2rem;
            height: 2rem;
            border-radius: .2rem;
            object-fit: cover;
        }

    
    @media screen and (min-width:800px) {
        .cube{
            width: 2rem;
            height: 2rem;
        }

        .category-title{
        grid-column: 1 / 9;
    }
 
        .btn-contanier{
            grid-template-columns: auto auto;
            /* width: 5rem; */
        }


        .business-container{
            display: block;
        }
        .busines-table{
            grid-template-columns: auto auto auto auto auto 4rem 4rem 4rem;
            margin:0.2rem;
            width: auto;
           
        }
        .busines-table > div{
            padding: .5rem;
            font-size: x-large;
            text-align: left;
    
        }

        button{ 
            margin: 0.2rem;
        }

        img{
            width: 4rem;
            height: 4rem;
        }

    }

</style>