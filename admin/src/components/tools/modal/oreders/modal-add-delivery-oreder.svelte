<script>
    import { onMount } from "svelte";

    //components
    import ModalContaner from "../modal-contaner.svelte";

    export let CloseFather
    export let SelectUserFather
    
    let users = []

    // controllers
    import {GetAllUsers} from '../../../../controllers/user/GetAllUsers.js'

    //store
    import {userDeliveryAllData} from '../../../../store/user/user.js'
    import {branch_officeData} from '../../../../store/branch_office/branch_office.js'

    let name

    onMount(async()=>{
        if($branch_officeData){
            let result = await GetAllUsers("DELIVERY",$branch_officeData._id)
            $userDeliveryAllData = result.data
            console.log('aca')
        }

    })

    $:{
        users = $userDeliveryAllData
    }

    const SelectUser = async (user) =>{

        SelectUserFather(user)
        CloseFather()
    }


</script>




<ModalContaner title = "Deliveries" {CloseFather}>

    <div class="user-table">
        {#each users as user}
            <div on:click={()=>{SelectUser(user)}}>
                {user.first_name} {user.last_name}
            </div>
        {/each}
    </div>

    <div>
        
    </div>    
</ModalContaner>

<style>

    .user-table{
        margin: 1rem 0.2rem;
        color: white;
        height: 25vh;
        overflow-y: scroll;
    }

    .user-table::-webkit-scrollbar{
        display: none;
    }

    .user-table > div{
        padding: 1rem;
        font-size: x-large;
        cursor: pointer;
   
    }
    
</style>