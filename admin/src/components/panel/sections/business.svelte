
<script>
    
    //path
    import {IMAGE_PATH} from '../../../api/routes.js'

    // components
    import ModalAddBusiness from "../../tools/modal/business/modal-add-business.svelte";
    import ModalDeleteBusiness from "../../tools/modal/business/modal-delete-business.svelte";
    import ModalEditBusiness from "../../tools/modal/business/modal-edit-business.svelte";
    
    //controlers
    import { GetAllBusiness } from "../../../controllers/business/GetAllBusiness.js"

    // Store
    import {loginData} from '../../../store/user/login.js'
    import {businessAllData,currentDataBusiness,currentIdBusiness} from '../../../store/business/businnes.js'

    import { onMount } from "svelte";

    let businessArray = []

    onMount(async ()=>{
        let result = await GetAllBusiness($loginData._id)
        $businessAllData = result.data
        console.log('all_business',$businessAllData)
    })

    $:{
        businessArray = $businessAllData
    }

    // Mostrar modal para agregar empresa
    let view_add_buisness = false

    const OpenModalAddBusinnes = () =>{
        view_add_buisness = true
    }

    const CloseModalAddBusinnes = () =>
    {
        view_add_buisness = false
    }

    // Mostrar modal para actualizar empresa
    let view_update_buisness = false

    const OpenModalUpdateBusinnes = (data) =>{
    
        $currentDataBusiness = data
        view_update_buisness = true
    }

    const CloseModalUpdateBusinnes = () =>
    {
        view_update_buisness = false
    }
    // Mostrar modal para eliminar empresa
    let view_delete_buisness = false

    const OpenModalDeleteBusinnes = (id) =>{
        $currentIdBusiness = id
        view_delete_buisness = true
    }

    const CloseModalDeleteBusinnes = () =>
    {
        view_delete_buisness = false
    }

</script>


{#if view_add_buisness}
    <ModalAddBusiness CloseFather = {CloseModalAddBusinnes} />
{/if}

{#if view_delete_buisness}
    <ModalDeleteBusiness CloseFather = {CloseModalDeleteBusinnes} />
{/if}

{#if view_update_buisness}
    <ModalEditBusiness CloseFather = {CloseModalUpdateBusinnes} />
{/if}
    


<div class="business-container">
    <button on:click={()=>{OpenModalAddBusinnes()}}>
        <div>
            +
        </div>
    </button>

    {#if $businessAllData.length>0}
    <div class="busines-table">
        {#each businessArray as business}
            <div>
                <img src={IMAGE_PATH + business.img} alt="">
            </div>
            <div>
                {business.name}
            </div>
            <div class="pointer" on:click={()=>{OpenModalUpdateBusinnes(business)}} >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="2rem" height="2rem">
                    <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
                    <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
                </svg>    
            </div>
            <div class="pointer" on:click={()=>{OpenModalDeleteBusinnes(business._id)}} >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="2rem" height="2rem">
                    <path fill-rule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" clip-rule="evenodd" />
                </svg>  
            </div>
        {/each}
    </div>
    {/if}

</div>

<style>
   
    .business-container{
        display: grid;
        justify-items: center;
        align-items: center;
    }

    .busines-table{
        display: grid;
        grid-template-columns: max-content auto 4rem 4rem;
        grid-auto-rows: max-content;
        margin:0.2rem;
        height: 67vh;
        overflow-y: scroll;
    }

    .busines-table > div{
        padding: 1rem;
        font-size: x-large;
        height: 2rem;
   
    }

    
    img{
            width: 2rem;
            height: 2rem;
            border-radius: .2rem;
            object-fit: cover;
        }

    .pointer{
        cursor: pointer;
    }

    .busines-table > div:nth-child(8n+1),
    .busines-table > div:nth-child(8n+2),
    .busines-table > div:nth-child(8n+3) {
    background:rgba(0,0,0,0.5);
    color: white;
    }

    .busines-table > div:nth-child(8n+1)
    {
        border-radius: 5px 0 0 5px;
    }

    .busines-table > div:nth-child(8n+3) {
        border-radius: 0 5px 5px 0;
    }

    button{
        position: absolute;
        right: 2%;
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

    
    @media screen and (min-width:800px) {

        .business-container{
            display: block;
        }

        button{ 
            padding: 1rem;
            margin: 0.2rem;
        }
    }

</style>