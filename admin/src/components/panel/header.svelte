<script>
    
    import { onMount } from "svelte";
        

    //controllers
    import { GetBusiness } from "../../controllers/business/GetBusiness.js";
	import { GetBranchOffice } from "../../controllers/branch_office/GetBranchOffice.js";
    import { GetAllBranchOffices } from "../../controllers/branch_office/GetAllBranchOffices.js"
    import { GetAllUsers } from "../../controllers/user/GetAllUsers.js"
    
    // store
	import { loginData,loginActive } from "../../store/user/login";
	import { branch_officeData,branch_officeAllData } from "../../store/branch_office/branch_office";
	import { businessData,businessAllData } from "../../store/business/businnes";
	import { titlePanel } from "../../store/global/TitlePanel.js";
    import {userBranchOfficeAllData} from '../../store/user/user.js'


    onMount( async()=>{

        let result_branch_office = await GetBranchOffice($loginData.branch_office_id)
        $branch_officeData = result_branch_office.data

        let result_bussines = await GetBusiness(result_branch_office.data.business_id)
        $businessData = result_bussines.data
     
        if($businessData){

            let result = await GetAllBranchOffices($businessData._id,$loginData.branch_office_id,$loginData._id)

            console.log('result',result)

           // if(result.create){

                $branch_officeAllData = result.data
                console.log('all_branch_office',result)
                if($branch_officeData){
                    
                    let result2 = await GetAllUsers("BRANCH_OFFICE_ADMIN",$branch_officeData._id)
                    
                    console.log('rol',result2)

                $userBranchOfficeAllData = result2.data
                
            }

           // }
        }

    })



    console.log($loginData)
    const Logout = () =>{

        $loginActive = false
        localStorage.removeItem("user_id")
    }   
    
        //Cambiar de sucursal
        const ChangeBranchOffice = async (branch_office) =>{

        console.log('branch_office',branch_office)
        let result = await GetAllUsers("BRANCH_OFFICE_ADMIN",branch_office._id)
        $branch_officeData = branch_office
        if(result.data.length>0)
            $userBranchOfficeAllData = result.data
        }

            //Cambiar de Empresa
        const ChangeBusiness = async (business) =>{
            let result = await GetAllBranchOffices(business._id,$loginData.branch_office_id,$loginData._id)
            console.log('all_branch_office',result)
            $branch_officeAllData = result.data
            $branch_officeData = result.data[0]
            $businessData = business
        }
        //console.log('branch_officeData',result)


</script>

<div class="header-contariner">
    <h1 class="drop-business">
                
        {$businessData.name}
      
        {#if  $loginData.roles[0] === "ADMIN" }
                 
            <div class="drop-business-container">
                {#each $businessAllData as business}
                     <div on:click={()=>{ChangeBusiness(business)}}>{business.name}</div>
                {/each}
            </div>
       
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"  width="1rem" height="1rem">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
        {/if}
       
    </h1>
    <div>
        {$loginData.first_name} {$loginData.last_name}
    </div>
    <div class="btnLogout" on:click={Logout}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="2rem" height="2rem">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
        </svg>
    </div>
 
</div>

<div class="navar drop-business">
    <h2>
        {#if $branch_officeData}
            {$branch_officeData?.name}
        {:else}
            Sin Sucursal
        {/if}
        {#if  $loginData.roles[0] === "ADMIN" || ($loginData.roles[0] === "BUSINESS_ADMIN") }
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"  width="1rem" height="1rem">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>  
            <div class="drop-business-container">
                {#if $branch_officeAllData.length > 0}
                     {#each $branch_officeAllData as branchOffice}
                          <div on:click={()=>{ChangeBranchOffice(branchOffice)}}>{branchOffice?.name ? branchOffice?.name : 'cargando...' }</div>
                     {/each}
                {/if}
            </div>
        {/if}
    </h2>
    <h6>{$titlePanel}</h6>
</div>


<style>

    .drop-business{
        cursor: pointer;
    }

    .drop-business:hover .drop-business-container{
            display: block;
    }

    .drop-business-container{
     
     display: none;
     position: absolute;
     z-index: 1;
     left: 0;
     background-color: #ffffff;
     color: rgb(0, 0, 0);
     border: none;
     cursor: pointer;
     padding: 0;
     width: auto;
     margin-top: .2rem;
    }

    .drop-business-container>div{
        padding: .6rem 3rem;
    }

    .drop-business-container>div:hover{
        color: white;
        background-color: rgba(0,0,0,0.5);

    }

    h1{
        justify-self: start;
        margin: 0;
    }
    h2{
        color: white;
        font-size: 2rem;
        padding:  .4rem 1rem;
        
    }
    h6{
        color: white;
        justify-self: end;
        align-self:flex-end ;       
        margin: 1rem; 
    }
    .header-contariner{
        display: grid;
        grid-template-columns: auto auto 3rem;
        justify-items: end;
        align-items: center;
        margin: 0.5rem 1rem;
        z-index: 2;
    }
    .btnLogout{
        width: 2rem;
    }
    .navar{
        display: grid;
        grid-template-columns: auto auto;

        height: 3rem;
        background-color: rgb(34, 34, 34);
    }
</style>