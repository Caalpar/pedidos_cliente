<script>
    import { onMount } from "svelte";
    import { BRANCH_ID } from "../../global/global.js";

    //path
    import {IMAGE_PATH} from '../../api/routes.js'

    // components
    import ModaStore from "../tools/modal/store/moda-store.svelte";
    import Popup2 from "./popup2.svelte";
    import ModalStateOrder from "../tools/modal/oreders/modal-state-order.svelte";
    import ModalLogin from "../tools/modal/user/modal-login.svelte";
    import ModalShowWatchBranchOffice from "../tools/modal/branchOffice/modal-show-watch-branchOffice.svelte";

    //controllers
    import { GetBusiness } from "../../controllers/business/GetBusiness.js";
    import { GetBranchOffice } from "../../controllers/branch_office/GetBranchOffice.js";
    import { LoginById } from "../../controllers/user/LoginById.js";

    // store
    import { loginData, loginActive } from "../../store/user/login";
    import { branch_officeData } from "../../store/branch_office/branch_office";
    import { businessData } from "../../store/business/businnes";
    import { OrdersAllData,CurrentOrdersAllData } from "../../store/order/oreder.js";

    import {CheckIsOpen} from '../tools/watch/CheckTime.js'


    let isOpen = false
    //let src = './images/paypa_logo.png'

    onMount(async () => {


        $loginData = {};

        let localDataUser = window.localStorage.getItem("user_id");

        if (localDataUser) {
            let result = await LoginById(localDataUser);

            if (result.access) {
                $loginData = result.datos;
                $loginActive = result.access;
            }
        }

        let result_branch_office = await GetBranchOffice(BRANCH_ID);
        $branch_officeData = result_branch_office.data;

        let currentDay = new Date()

        isOpen = CheckIsOpen(currentDay.getDay(),currentDay.getHours(),currentDay.getMinutes(),$branch_officeData.hours_days)

        let result_bussines = await GetBusiness(
            result_branch_office.data.business_id
        );
        $businessData = result_bussines.data;
    });

    setInterval(() => {
        let currentDay = new Date()
        isOpen = CheckIsOpen(currentDay.getDay(),currentDay.getHours(),currentDay.getMinutes(),$branch_officeData.hours_days)
    }, 1000);

    const Logout = () => {
        $loginActive = false;
        $loginData = {};
        localStorage.removeItem("user_id");
    };

    // mostrar el modal de la stoer
    let view_store = false;

    const OpenModalStore = () => {
        view_store = true;
    };
    const CloseModalStore = () => {
        view_store = false;
    };

    // mostrar el modal de stado de la compra
    let view_buy_state = false;

    const OpenModalBuyState = () => {
        view_buy_state = true;
    };
    const CloseModalBuyState = () => {
        view_buy_state = false;
    };

    // mostrar el modal de estado de la compra
    let view_login = false;

    const OpenModalLogin = () => {
        view_login = true;
    };
    const CloseModalLogin = () => {
        view_login = false;
    };
    
    // mostrar el modal de hora abierta
    let view_watch = false;

    const OpenModalWatch = () => {
        view_watch = true;
    };
    const CloseModalWatch = () => {
        view_watch = false;
    };

    //mostrar popup de compra realizada con exito
    let showPopup = false;

    const ShowNotification = () => {
        showPopup = true;
        setTimeout(() => {
            showPopup = false;
        }, 5000);
    };
    
</script>

{#if showPopup}
    <Popup2
        text_titel={"Hemos recibido su compra"}
        text_content={"puede ver el estado de su compra en el icono ticket 🎫"}
    />
{/if}

{#if view_store}
    <ModaStore CloseFather={CloseModalStore} Notification={ShowNotification} />
{/if}

{#if view_buy_state}
    <ModalStateOrder CloseFather={CloseModalBuyState} />
{/if}

{#if view_login}
    <ModalLogin CloseFather={CloseModalLogin} />
{/if}

{#if view_watch}
    <ModalShowWatchBranchOffice CloseFather={CloseModalWatch} />
{/if}

<div class="header-contariner">
    <div class="logo">
        <img src={IMAGE_PATH + $businessData.img} alt="" width="80px">
    </div>
    
    <h1 class="business-title">
        {$businessData.name}
    </h1>

 

    {#if $loginActive}
        
        {#if isOpen}
        <div class="open">
            Abierto
        </div>
        {:else}
            <div class="close">
                Cerrado
            </div>
        {/if}
        <div style="padding-right: 1rem;">
            {$loginData.first_name}
            {$loginData.last_name}
        </div>
        <div class="btnLogout" on:click={Logout}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                width="2rem"
                height="2rem"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                />
            </svg>
        </div>
    {:else}
        <div />

        {#if isOpen}
        <div class="open">
            Abierto
        </div>
        {:else}
            <div class="close">
                Cerrado
            </div>
        {/if}
            <div class="btnLogin" on:click={OpenModalLogin}>Iniciar Sesion</div>

        <div></div>
    {/if}
</div>

<div class="navar">
    <h2>
        {$branch_officeData?.name ? $branch_officeData?.name : "N/A"}
    </h2>
    <div class="shopping-car" on:click={OpenModalWatch}>
        <svg width="1.5rem" height="1.5rem" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z" clip-rule="evenodd" />
        </svg>
    </div>
    <div class="shopping-car" on:click={OpenModalBuyState}>
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            width="1.5rem"
            height="1.5rem"
        >
            <path
                fill-rule="evenodd"
                d="M1.5 6.375c0-1.036.84-1.875 1.875-1.875h17.25c1.035 0 1.875.84 1.875 1.875v3.026a.75.75 0 01-.375.65 2.249 2.249 0 000 3.898.75.75 0 01.375.65v3.026c0 1.035-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 17.625v-3.026a.75.75 0 01.374-.65 2.249 2.249 0 000-3.898.75.75 0 01-.374-.65V6.375zm15-1.125a.75.75 0 01.75.75v.75a.75.75 0 01-1.5 0V6a.75.75 0 01.75-.75zm.75 4.5a.75.75 0 00-1.5 0v.75a.75.75 0 001.5 0v-.75zm-.75 3a.75.75 0 01.75.75v.75a.75.75 0 01-1.5 0v-.75a.75.75 0 01.75-.75zm.75 4.5a.75.75 0 00-1.5 0V18a.75.75 0 001.5 0v-.75zM6 12a.75.75 0 01.75-.75H12a.75.75 0 010 1.5H6.75A.75.75 0 016 12zm.75 2.25a.75.75 0 000 1.5h3a.75.75 0 000-1.5h-3z"
                clip-rule="evenodd"
            />
        </svg>
        {#if $CurrentOrdersAllData.length > 0}
            <span class='notification-state'>!</span>
        {/if}
    </div>
    <div class="shopping-car" on:click={OpenModalStore}>
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            width="1.5rem"
            height="1.5rem"
        >
            <path
                d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z"
            />
        </svg>
        {#if $OrdersAllData.length > 0}
             <span class='notification'>{$OrdersAllData.length}</span>
        {/if}
    </div>

</div>

<style>

    .logo{
        display: grid;
        /* position: absolute; */
        z-index: -2;
        width: 100px;
        margin: auto;
        place-items: center;
    }

    h1 {
        justify-self: start;
        margin: 0;
    }
    
    .close{
        text-align: right;
        color: red;
        border: 2px solid red;
        border-radius: .5rem;
        padding: .1rem;
        font-weight: 700;
        width: max-content;
        margin-right: 1rem;
    }
    .open{
        text-align: right;
        color: rgb(45, 182, 45);
        border: 2px solid rgb(45, 182, 45);;
        border-radius: .5rem;
        padding: .1rem;
        font-weight: 700;
        width: max-content;
        margin-right: 1rem;
    }


    h2 {
        color: white;
        font-size: 2rem;
        padding: 0.4rem 1rem;
    }
    .shopping-car {
        position: relative;
        color: white;
        justify-self: end;
        align-self: flex-end;
        margin: 0 1.5rem 0.5rem 0;
        cursor: pointer;
    }
    .notification{
        position: absolute;
        width: 1rem;
        height: 1rem;
        font-size: small;
        top: -5px;
        right: -10px;
        text-align: center;
        border-radius: 50%;
        background-color: red;
        color: white;
        border: 1px solid white;
    }
    .notification-state{
        position: absolute;
        width: 1rem;
        height: 1rem;
        font-size: x-large;
        top: -14px;
        right: -10px;
        color: red;
        font-weight: 900;
        -webkit-text-stroke: 1px white;

    }
    .header-contariner {
        height: 10vh;
        display: grid;
        grid-template-columns: max-content auto auto max-content max-content;
        justify-items: end;
        align-items: center;
        margin: 0.5rem 0;
        z-index: 2;
    }
    .btnLogout {
        width: 2rem;
        cursor: pointer;
    }
    .btnLogin {
        padding: 1rem;
        cursor: pointer;
        border-radius: 0.5rem;
    }

    .btnLogin:hover {
        background-color: #1e293b;
        color: #fff;
    }
    .navar {
        display: grid;
        grid-template-columns: auto auto 3rem 3rem;
        color: #fff;
        height: 6vh;
        /* height: 3rem; */
        background-color: #1e293b;
    }

    @media screen and (max-width: 800px) {
        .navar {
            height: 8vh;
        }
        .business-title{
            display: none;
        }
        .open,.close {
            padding: .1rem;
            font-weight: 500;
            margin-right: 0;
        }
        .header-contariner {
            height: 14vh;
            grid-template-columns: max-content auto auto max-content;
        }
    }
</style>
