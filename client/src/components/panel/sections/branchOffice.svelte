
<script>

    // components
    import ModalAddBranchOffice from "../../tools/modal/branchOffice/modal-add-branchOffice.svelte";
    import ModalDeleteBranchOffice from "../../tools/modal/branchOffice/modal-delete-branchOffice.svelte";
    import ModalEditBranchOffice from "../../tools/modal/branchOffice/modal-update-branchOffice.svelte";
    import ModalEditBranchOfficeWatch from "../../tools/modal/branchOffice/modal-update-watch-branchOffice.svelte";
    
    //controlers
    import { GetAllBranchOffices } from "../../../controllers/branch_office/GetAllBranchOffices.js"


    // Store
    import {loginData} from '../../../store/user/login.js'
    import {businessAllData,businessData} from '../../../store/business/businnes.js'
    import {branch_officeAllData,currentIdBranchOfficeId,currentDataBranchOffice,branch_officeData} from '../../../store/branch_office/branch_office.js'
    import {mobileView} from '../../../store/global/MobileView.js'

    import { onMount } from "svelte";

    let branch_officeArray = []

    onMount(async ()=>{
        let result = await GetAllBranchOffices($businessData._id,$loginData.branch_office_id,$loginData._id)
        console.log('all_branch_office',result)
        $branch_officeAllData = result.data
    })

    $:{
        branch_officeArray = $branch_officeAllData
    }

    // Mostrar modal para agregar sucursal
    let view_add = false

    const OpenModalAddBranchOffice = () =>{
        view_add = true
    }

    const CloseModalAddBranchOffice = () =>
    {
        view_add = false
    }

    // Mostrar modal para actualizar sucursal
    let view_update = false

    const OpenModalUpdateBranchOffice = (data) =>{
    
        $currentDataBranchOffice = data
        view_update = true
    }

    const CloseModalUpdateBranchOffice = () =>
    {
        view_update = false
    }

    // Mostrar modal para eliminar sucursal
    let view_delete = false

    const OpenModalDeleteBranchOffice = (id) =>{
        $currentIdBranchOfficeId = id
        view_delete = true
    }

    const CloseModalDeleteBranchOffice = () =>
    {
        view_delete = false
    }
    // Mostrar modal para actualizar reloj sucursal
    let view_update_watch = false

    const OpenModalUpdateWatchBranchOffice = (data) =>{
        $currentDataBranchOffice = data
        view_update_watch = true
    }

    const CloseModalUpdateWatchBranchOffice = () =>
    {
        view_update_watch = false
    }

</script>


{#if view_add}
    <ModalAddBranchOffice CloseFather = {CloseModalAddBranchOffice} />
{/if}

{#if view_delete}
    <ModalDeleteBranchOffice CloseFather = {CloseModalDeleteBranchOffice} />
{/if}

{#if view_update}
    <ModalEditBranchOffice CloseFather = {CloseModalUpdateBranchOffice} />
{/if}
{#if view_update_watch}
    <ModalEditBranchOfficeWatch CloseFather = {CloseModalUpdateWatchBranchOffice} />
{/if}
    


<div class="business-container">

    <div class="btn-contanier">
        <div>
            <button on:click={()=>{OpenModalAddBranchOffice()}}>
                +
            </button>
        </div>
    </div>


    {#if branch_officeArray.length>0}
    <div class="busines-table">
        {#each branch_officeArray as branch_office}
        {#if !$mobileView}
            <div>
                <div>
                    {branch_office.name}
                </div>
                <div>
                    {branch_office.address}
                </div>
            </div>
            <div>
                <div>
                    {branch_office.email}
                </div>
                <div>
                    {branch_office.phone}
                </div>
            </div>
            <div class="pointer" on:click={()=>{OpenModalUpdateWatchBranchOffice(branch_office)}} >
                <svg class="cube" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z" clip-rule="evenodd" />
                </svg>    
            </div>
            <div class="pointer" on:click={()=>{OpenModalUpdateBranchOffice(branch_office)}} >
                <svg class="cube" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
                    <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
                </svg>    
            </div>
            <div class="pointer" on:click={()=>{OpenModalDeleteBranchOffice(branch_office._id)}} >
                <svg  class="cube" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path fill-rule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" clip-rule="evenodd" />
                </svg>  
            </div>
        {:else}
             <div>
                 {branch_office?.name ? branch_office?.name : 'cargando...'}
             </div>
             <div>
                 {branch_office?.address ? branch_office?.address : 'cargando...'}
             </div>
             <div>
                 {branch_office?.email ? branch_office?.email : 'cargando...'}
             </div>
             <div>
                 {branch_office?.phone ? branch_office?.phone : 'cargando...'}
             </div>
             <div class="pointer" on:click={()=>{OpenModalUpdateWatchBranchOffice(branch_office)}} >
                 <svg class="cube" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                     <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z" clip-rule="evenodd" />
                 </svg>    
             </div>
             <div class="pointer" on:click={()=>{OpenModalUpdateBranchOffice(branch_office)}} >
                 <svg class="cube" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                     <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
                     <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
                 </svg>    
             </div>
             <div class="pointer" on:click={()=>{OpenModalDeleteBranchOffice(branch_office._id)}} >
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

    .cube{
        width: 1.2rem;
        height: 1.2rem;
    }
   
    .business-container{
        display: grid;
        justify-items: center;
        align-items: center;
    }

    .busines-table{
        display: grid;
        grid-template-columns: auto auto auto auto auto;
        grid-auto-rows: max-content;
        margin:0.2rem;
        height: 67vh;
        overflow-y: scroll;
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
        height: 2rem;
   
    }

    .pointer{
        cursor: pointer;
    }

    .busines-table > div:nth-child(10n+1),
    .busines-table > div:nth-child(10n+2),
    .busines-table > div:nth-child(10n+3),
    .busines-table > div:nth-child(10n+4),
    .busines-table > div:nth-child(10n+5) {
    background:rgba(0,0,0,0.5);
    color: white;
    }

    .busines-table > div:nth-child(10n+1)
    {
        border-radius: 5px 0 0 5px;
    }

    .busines-table > div:nth-child(10n+5) {
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
        .cube{
            width: 2rem;
            height: 2rem;
        }

        .btn-contanier{
            grid-template-columns: auto auto;
            width: 5rem;
        }
        .business-container{
            display: block;
        }
        .busines-table{
            grid-template-columns: auto auto auto auto 4rem 4rem 4rem;
            margin:0.2rem;
           
        }
        .busines-table > div{
            padding: 1rem;
            font-size: x-large;
            text-align: left;
    
        }

        button{ 
            padding: 1rem;
            margin: 0.2rem;
        }

        .busines-table > div:nth-child(10n+1),
        .busines-table > div:nth-child(10n+2),
        .busines-table > div:nth-child(10n+3),
        .busines-table > div:nth-child(10n+4),
        .busines-table > div:nth-child(10n+5) {
        background-color:var(--color-bg-2); ;
        color: var(--color-text);
        }

        
    .busines-table > div:nth-child(10n+1),
    .busines-table > div:nth-child(10n+5)
    {
        border-radius: 0;
    }


        .busines-table > div:nth-child(14n+1),
        .busines-table > div:nth-child(14n+2),
        .busines-table > div:nth-child(14n+3),
        .busines-table > div:nth-child(14n+4),
        .busines-table > div:nth-child(14n+5),
        .busines-table > div:nth-child(14n+6),
        .busines-table > div:nth-child(14n+7) {
        background:rgba(0,0,0,0.5);
        color: white;
        }

        .busines-table > div:nth-child(14n+1)
        {
            border-radius: 5px 0 0 5px;
        }

        .busines-table > div:nth-child(14n+7) {
            border-radius: 0 5px 5px 0;
        }
    }

</style>