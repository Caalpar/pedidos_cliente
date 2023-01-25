<script>
	import { onMount } from "svelte";

    //componentes
    import Business from "./sections/business.svelte";
	import BranchOffice from "./sections/branchOffice.svelte";
    import AdminBusiness from "./sections/adminBusiness.svelte";
    import AdminBranchOffice from "./sections/adminBranchOffice.svelte";
    import Cashier from "./sections/cashier.svelte";
    import Delivery from "./sections/delivery.svelte";
    import Customer from "./sections/customer.svelte";
    import Prdouct from "./sections/preducts.svelte";
    import Orders from "./sections/orders.svelte";
    import Reports from "./sections/reports.svelte";

    
    // store
    import { loginData } from "../../store/user/login";
    import { mobileView } from "../../store/global/MobileView.js";
    import { titlePanel } from "../../store/global/TitlePanel.js";
    import { branch_officeData } from "../../store/branch_office/branch_office.js";
	
        

    let showBtns = true
    let showPanels = true
    let viewDesktop = true
    let currentView = 'BUSINESS'

    onMount(()=>{
        viewDesktop = window.matchMedia("(min-width: 800px)").matches

        $mobileView = viewDesktop

        if(!viewDesktop)
        {
            showPanels = false

            
        }

    })


    const CurrentView = (view) =>{

        currentView = view

        switch (view) {
            case "BUSINESS":
                $titlePanel = "EMPRESAS"
                break;
            case "BRANCH_OFFICE":
                $titlePanel = "SUCURSALES"
                break;
            case "ORDERS":
                $titlePanel = "PEDIDOS"
                break;
            case "BUSINESS_ADMIN":
                $titlePanel = "ADMIN. EMPRESAS"
                break;
            case "ADMIN_BRANCH_OFFICE":
                $titlePanel = "ADMIN. SUCURSALES"
                break;
            case "CASHIER":
                $titlePanel = "CAJEROS"
                break;
            case "CLIENTS":
                $titlePanel = "CLIENTES"
                break;
            case "DELIVERIES":
                $titlePanel = "DELIVERY"
                break;
            case "PRODUCTS":
                $titlePanel = "PRODUCTOS"
                break;
            case "REPORTS":
                $titlePanel = "REPORTES"
                break;
        
            default:
                break;
        }


        if(!viewDesktop){
            showBtns = false
            showPanels = true
        }
    } 

    const BackToMenu = () =>{
        if(!viewDesktop){
            showBtns = true
            showPanels = false
        }
    }

</script>

<div class="container">
    {#if showBtns}
        <div class="margin-1rem">
            {#if $loginData.roles[0] === "ADMIN"}
                <button on:click={()=>{CurrentView("BUSINESS")}}>
                    EMPRESAS
                </button>
                <button on:click={()=>{CurrentView("BUSINESS_ADMIN")}}>
                    ADMIN. EMPRESAS
                </button>
            {/if}
            {#if $loginData.roles[0] === "ADMIN" || $loginData.roles[0] === "BUSINESS_ADMIN"}
                <button on:click={()=>{CurrentView("BRANCH_OFFICE")}}>
                    SUCURSALES
                </button>
                <!-- ['ADMIN','BUSINESS_ADMIN','BRANCH_OFFICE_ADMIN','CASHIER', 'DELIVERY','CUSTOMER'] -->
                <button on:click={()=>{CurrentView("ADMIN_BRANCH_OFFICE")}}>
                    ADMIN. SUCURSALES
                </button>
            {/if}
            {#if ($loginData.roles[0] === "ADMIN" || ($loginData.roles[0] === "BUSINESS_ADMIN"))  || ($loginData.roles[0] === "BRANCH_OFFICE_ADMIN" && $loginData.branch_office_id == $branch_officeData._id)}

                <button on:click={()=>{CurrentView("CASHIER")}}>
                    CAJEROS
                </button>
                <button on:click={()=>{CurrentView("DELIVERIES")}}>
                    DELIVERY
                </button>
                <button on:click={()=>{CurrentView("PRODUCTS")}}>
                    PRODUCTOS
                </button>
            {/if}
            <button on:click={()=>{CurrentView("CLIENTS")}}>
                CLIENTES
            </button>
            <button on:click={()=>{CurrentView("ORDERS")}}>
                PEDIDOS
            </button>
            <button on:click={()=>{CurrentView("REPORTS")}}>
                REPORTES
            </button>
        </div>
    {/if}
    {#if showPanels}
        <div class="panel">
            {#if !viewDesktop}
                <div on:click={()=>{BackToMenu()}} class="arrow-back">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="2rem" height="2rem">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>  
                </div>
            {/if}
            {#if $loginData.roles[0] === "ADMIN" }
                {#if currentView == "BUSINESS"}
                    <div>
                        <Business />
                    </div>
                {/if}
                {#if currentView == "BUSINESS_ADMIN"}
                    <div>
                        <AdminBusiness />
                    </div>
                {/if}    
            {/if}
            {#if $loginData.roles[0] === "ADMIN" || $loginData.roles[0] === "BUSINESS_ADMIN"}
                {#if currentView == "BRANCH_OFFICE"}
                    <div>
                        <BranchOffice />
                    </div>
                {/if}
                {#if currentView == "ADMIN_BRANCH_OFFICE"}
                    <div>
                        <AdminBranchOffice />
                    </div>
                {/if}    
            {/if}
         
            {#if ($loginData.roles[0] === "ADMIN" || ($loginData.roles[0] === "BUSINESS_ADMIN"))  || ($loginData.roles[0] === "BRANCH_OFFICE_ADMIN" && $loginData.branch_office_id == $branch_officeData._id)}

                {#if currentView == "CASHIER"}
                    <div>
                        <Cashier />
                    </div>
                {/if}
                {#if currentView == "DELIVERIES"}
                    <div>
                        <Delivery />
                    </div>
                {/if}
                {#if currentView == "PRODUCTS"}
                    <div>
                        <Prdouct />
                    </div>
                {/if}
            {/if}
            {#if currentView == "CLIENTS"}
                <div>
                    <Customer />
                </div>
            {/if}
            {#if currentView == "ORDERS"}
                    <Orders />
            {/if}
            {#if currentView == "REPORTS"}
                <div>
                    <Reports />
                </div>
            {/if}
        </div>
    {/if}
</div>


<style>

    .container{
        display: grid;
        grid-template-columns: auto;
       
    }
    

    .margin-1rem{
        margin: 1rem;
    }   

    .arrow-back{
        width: 2rem;
    }

    button{
        padding: 1rem;
        background-color: rgba(0, 0, 0, 0.418);
        color: white;
        border: none;
        cursor: pointer;
        width: 92vw;
        margin: 1vw 0;
        border-radius: .2rem;
    }

    button:hover{
        background-color: white !important;
        color: black !important;
    }


    @media screen and (min-width:800px) {

        .container{
            grid-template-columns: 17rem auto;
            margin: 1rem;
        }

        .panel{
            margin: 1rem;
        }

        button{
            width: 15rem;
            text-align: center;  
            padding: 1rem 0;
            margin: .2rem 0;
        }
    }


</style>
