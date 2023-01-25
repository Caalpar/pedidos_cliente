
<script>

    // components
    import ModalAddUser from "../../tools/modal/user/Delivery/modal-add-user-delivery.svelte";
    import ModalDeleteUser from "../../tools/modal/user/Delivery/modal-delete-user-delivery.svelte";
    import ModalUpdateUser from "../../tools/modal/user/Delivery/modal-update-user-delivery.svelte";
    import ModalInfoUser from "../../tools/modal/user/Delivery/modal-info-user-delivery.svelte";
    
    //controlers
    import { GetAllUsers } from "../../../controllers/user/GetAllUsers.js"


    // Store
    import {businessAllData} from '../../../store/business/businnes.js'
    import {branch_officeData} from '../../../store/branch_office/branch_office.js'
    import {mobileView} from '../../../store/global/MobileView.js'
    import {currentIdUser,currentDatauser,userDeliveryAllData} from '../../../store/user/user.js'

    import { onMount } from "svelte";

    let branch_office_admin_Array = []

    onMount(async ()=>{
        if($branch_officeData){
            let result = await GetAllUsers("DELIVERY",$branch_officeData._id)

            if(result.success)
                $userDeliveryAllData = result.data 
            else
                alert(result.msg)
        }
    })

    $:{
        branch_office_admin_Array = $userDeliveryAllData
    }

    // Mostrar modal para agregar usuario
    let view_add = false

    const OpenModalAddUser = () =>{
        view_add = true
    }

    const CloseModalAddUser = () =>
    {
        view_add = false
    }

    // Mostrar modal para actualizar usuario
    let view_update = false

    const OpenModalUpdateUser = (data) =>{
    
        $currentDatauser = data
        view_update = true
    }

    const CloseModalUpdateUser = () =>
    {
        view_update = false
    }

    // Mostrar modal para eliminar ususario
    let view_delete = false

    const OpenModalDeleteUser = (id) =>{
        $currentIdUser = id
        view_delete = true
    }

    const CloseModalDeleteUser = () =>
    {
        view_delete = false
    }
    // Mostrar modal para informacion del usuario
    let view_info = false

    const OpenModalInfoUser = (data) =>{
        console.log('entra aca')
        $currentDatauser = data
        view_info = true
    }

    const CloseModalInfoUser = () =>
    {
        view_info = false
    }

    //Cambiar de sucursal
    const ChangeBranchOffice = async (branch_office) =>{

        console.log('branch_office',branch_office)
        let result = await GetAllUsers("DELIVERY",branch_office._id)
        $branch_officeData = branch_office
        if(result.data.length>0){

            $userDeliveryAllData = result.data
           

        }
        //console.log('branch_officeData',result)
    }

</script>


{#if view_add}
    <ModalAddUser CloseFather = {CloseModalAddUser}/>
{/if}

{#if view_delete}
    <ModalDeleteUser CloseFather = {CloseModalDeleteUser} />
{/if}

{#if view_update}
    <ModalUpdateUser CloseFather = {CloseModalUpdateUser} />
{/if}
{#if view_info}
    <ModalInfoUser CloseFather = {CloseModalInfoUser} />
{/if}
    


<div class="business-container">

    <div class="btn-contanier">
        <div>
            <button on:click={()=>{OpenModalAddUser()}}>
                +
            </button>
        </div>
    
    </div>


    {#if branch_office_admin_Array.length>0}
    <div class="busines-table">
        {#each branch_office_admin_Array as user}
        {#if !$mobileView}
            <div>
                <div>
                    {user.first_name} {user.last_name}
                </div>
                <div>
                    {user.address}
                </div>
            </div>
            <div>
                <div>
                    {user.email}
                </div>
                <div>
                    {user.phone}
                </div>
            </div>
            <div class="pointer" on:click={()=>{OpenModalInfoUser(user)}} >
                <svg class="cube" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z" clip-rule="evenodd" />
                  </svg>
             </div>
            <div class="pointer" on:click={()=>{OpenModalUpdateUser(user)}} >
                <svg class="cube" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
                    <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
                </svg>    
            </div>
            <div class="pointer" on:click={()=>{OpenModalDeleteUser(user._id)}} >
                <svg  class="cube" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path fill-rule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" clip-rule="evenodd" />
                </svg>  
            </div>
        {:else}
             <div>
                {user.first_name} {user.last_name}
             </div>
             <div>
                 {user.address}
             </div>
             <div>
                 {user.email}
             </div>
             <div>
                 {user.phone}
             </div>
             <div class="pointer" on:click={()=>{OpenModalInfoUser(user)}} >
                <svg  class="cube" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z" clip-rule="evenodd" />
                  </svg>
             </div>
             <div class="pointer" on:click={()=>{OpenModalUpdateUser(user)}} >
                 <svg class="cube" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                     <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
                     <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
                 </svg>    
             </div>
             <div class="pointer" on:click={()=>{OpenModalDeleteUser(user._id)}} >
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
    ::-webkit-scrollbar {
    height: 10px;
    width: 10px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px grey; 
    border-radius: 10px;
    }
    
    /* Handle */
    ::-webkit-scrollbar-thumb {
    background: rgba(128, 128, 128, 0.422); 
    border-radius: 10px;
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
    background: rgb(128, 128, 128);; 
    }

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
        margin: 1rem 0.2rem;
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
            width: 17rem;
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