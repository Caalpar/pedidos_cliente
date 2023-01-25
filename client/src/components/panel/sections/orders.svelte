<script>
   import { onMount } from "svelte";

   //tools
   import {PrintOrder} from '../../../tools/PrintOrder.js'

   //components
    import ModalAddOreder from "../../tools/modal/oreders/modal-add-oreder.svelte";
    import ModalUpdateOreder from "../../tools/modal/oreders/modal-update-oreder.svelte";
    import ModalAddDeliveryOreder from "../../tools/modal/oreders/modal-add-delivery-oreder.svelte";
    import ModalCancelOrder from "../../tools/modal/oreders/modal-cancel-order.svelte";
    import ModalAddUserDelivery from "../../tools/modal/user/Delivery/modal-add-user-delivery.svelte";

    //controllers
    import { GetAllOrders } from "../../../controllers/orders/GetAllOrders.js";
    import { UpdateOrder } from "../../../controllers/orders/UpdateOrder.js";

    //store
    import {loginData} from '../../../store/user/login.js'
    import {branch_officeData} from '../../../store/branch_office/branch_office.js'
    import {OrdersAllData,OrderDataEdit} from '../../../store/order/oreder.js'

   
   let content 
   let newSize = 0
   export let elemetCount = 3
   export let marginElement = 5


    let orders = []


    $:{
        orders = $OrdersAllData
    }
   
   onMount(async ()=>{




        let oreders = await GetAllOrders($branch_officeData._id)
        console.log('oreders',oreders)
        orders = oreders.data
        $OrdersAllData =  oreders.data

        setTimeout(()=>{
            if(window.matchMedia("(max-width: 800px)").matches)
        elemetCount = 1

        newSize =   content.offsetWidth / elemetCount 

        content.style.width = (newSize * content.children.length) + 'px'

        for (let index = 0; index < content.children.length; index++) {
            const child = content.children[index];
            child.style.width = newSize +'px'
            child.style.margin = marginElement.toString() + 'px' 
        }
        },500)


    })

    const CalTotal = (pedido) =>{
   
            let result = 0
            for (let index = 0; index < pedido.length; index++) {
                const ord = pedido[index];
                result +=ord.product_price
            }
            return result
        
    }

        // Mostrar modal para agregar orden
        let view_add = false

        const OpenModalAdd = () =>{

            view_add = true

                for (let index = 0; index < content.children.length; index++) {
                const child = content.children[index];
                child.style.width = newSize +'px'
                child.style.margin = marginElement.toString() + 'px' 
            }
        }

        const CloseModalAdd = () =>
        {
            view_add = false
        }

        // Mostrar modal para agregar orden
        let view_update = false

        const OpenModalUpdate = (Order) =>{
            $OrderDataEdit = Order
            view_update = true
        }

        const CloseModalUpdate = () =>
        {
            view_update = false
        }

        // Mostrar modal para agregar delivery a la pedido
        let view_add_delivery = false

        const OpenModalAddDelivery = (Order) =>{
            $OrderDataEdit = Order
            view_add_delivery = true
        }

        const CloseModalAddDelivery = () =>
        {
            view_add_delivery = false
        }

        // Mostrar modal para cancelar el pedido
        let view_cancel_order = false

        const OpenModalCancelOrder = (Order) =>{
            $OrderDataEdit = Order
            view_cancel_order = true
        }

        const CloseModalCancelOrder = () =>
        {
            view_cancel_order = false
        }
        // Mostrar modal para agregar delivery
        let view_add_new_delivery = false

        const OpenModalAddNewDelivery = () =>{
            view_add_new_delivery = true
        }

        const CloseModalAddNewDelivery = () =>
        {
            view_add_new_delivery = false
        }

        
        const Printorder = async (order) =>{


            let aux_cashier_id = $loginData._id

            if($OrderDataEdit && $OrderDataEdit.cashier_id && $OrderDataEdit.cashier_id._id)
                aux_cashier_id =  $OrderDataEdit.cashier_id._id

            console.log(order)

            let newOrder ={
                _id :  order._id,
                order: order.order,
                branch_office_id: order.branch_office_id._id,
                user_id: order.id_user._id,
                cashier_id: aux_cashier_id,
                description : order.description,
                state : 'PROCESS'
            }

            let result = await UpdateOrder(newOrder)


            if(result.create){
                let index_order = $OrdersAllData.findIndex(order => order._id == result.data._id)

                if(index_order != -1){
                    $OrdersAllData[index_order] = result.data
                    $OrdersAllData = $OrdersAllData
                }

            }else{
                alert(result.msg)
            }

            PrintOrder(order)

    }


    const SelectDelivery = async (delivery) =>{
        //$OrderDataEdit

       
        let newOrder ={
                _id :  $OrderDataEdit._id,
                order: $OrderDataEdit.order,
                branch_office_id: $OrderDataEdit.branch_office_id._id,
                user_id: $OrderDataEdit.id_user._id,
                cashier_id: $OrderDataEdit.cashier_id._id,
                id_delivery: delivery._id,
                description :  $OrderDataEdit.description,
                state : 'COMING'
            }

            let result = await UpdateOrder(newOrder)



            if(result.create){
                let index_order = $OrdersAllData.findIndex(order => order._id == result.data._id)

                if(index_order != -1){
                    $OrdersAllData[index_order] = result.data
                    $OrdersAllData = $OrdersAllData
                }

            }else{
                alert(result.msg)
            }
    }

    const DeliveredOrder = async (order) =>{
       
        let newOrder ={
                _id :  order._id,
                order: order.order,
                branch_office_id: order.branch_office_id._id,
                user_id: order.id_user._id,
                cashier_id: order.cashier_id._id,
                id_delivery: order?.id_delivery?._id ? order?.id_delivery?._id : '' ,
                description :  order.description,
                state : 'DELIVERED'
            }

            let result = await UpdateOrder(newOrder)

            if(result.create){
                let index_order = $OrdersAllData.findIndex(order => order._id == result.data._id)

                if(index_order != -1){
                    $OrdersAllData[index_order] = result.data
                    $OrdersAllData = $OrdersAllData
                }

            }else{
                alert(result.msg)
            }

    }
    const CancelOrder = async (detalils) =>{
       
        let newOrder ={
                _id :  $OrderDataEdit._id,
                order: $OrderDataEdit.order,
                branch_office_id: $OrderDataEdit.branch_office_id._id,
                user_id: $OrderDataEdit.id_user._id,
                cashier_id: $OrderDataEdit.cashier_id._id,
                id_delivery: $OrderDataEdit?.id_delivery?._id ? $OrderDataEdit?.id_delivery?._id : '',
                description :  $OrderDataEdit.description,
                description_cancel : detalils,
                state : 'CANCEL'
            }

            let result = await UpdateOrder(newOrder)



            if(result.create){
                let index_order = $OrdersAllData.findIndex(order => order._id == result.data._id)

                if(index_order != -1){
                    $OrdersAllData[index_order] = result.data
                    $OrdersAllData = $OrdersAllData
                }

            }else{
                alert(result.msg)
            }

    }


</script>

{#if view_add}
     <ModalAddOreder CloseFather={CloseModalAdd} />
{/if}

{#if view_update}
     <ModalUpdateOreder CloseFather={CloseModalUpdate} />
{/if}

{#if view_add_delivery}
     <ModalAddDeliveryOreder CloseFather={CloseModalAddDelivery} SelectUserFather={SelectDelivery} />
{/if}

{#if view_cancel_order}
     <ModalCancelOrder CloseFather={CloseModalCancelOrder} Action={CancelOrder} />
{/if}

{#if view_add_new_delivery}
     <ModalAddUserDelivery CloseFather={CloseModalAddNewDelivery}/>
{/if}

<div class="carrusel">
    <div class="btn-contanier">
        <div>
            <button on:click={()=>{OpenModalAdd()}}>
                +
            </button>
        </div>
        <div>
            <button style="margin-right: 4rem;" on:click={()=>{OpenModalAddNewDelivery()}}>
                <svg class="pointer" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="2rem" height="2rem">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                </svg> 
            </button>
        </div>
    
    </div>


    <div class="container" bind:this={content}  >
        {#each orders as order}
        <div class='elemtent'>
            {#if order?.state[0] == "RECEIVED"}
            <div class="title-state">
                    RECIBIDO
            </div>
                {/if}
            {#if order?.state[0] == "PROCESS"}
            <div class="title-state en-proceso">
                    EN PROCESO
            </div>
            {/if}
            {#if order?.state[0] == "COMING"}
            <div class="title-state en-reparto">
                    EN REPARTO
            </div>
            {/if}
            {#if order?.state[0] == "DELIVERED"}
            <div class="title-state entregado">
                    ENTREGADO
            </div>
            {/if}
            {#if order?.state[0] == "CANCEL"}
            <div class="title-state cancelado">
                    CANCELADO
            </div>
            {/if}
                 
       
             <hr>
            <div class="btn-action-container">
                <div on:click={Printorder(order)}>
                    <svg class="pointer" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="2rem" height="2rem">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z" />
                      </svg> 
                </div>
                <div on:click={()=>{OpenModalAddDelivery(order)}}>
                    <svg class="pointer" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="2rem" height="2rem">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                    </svg>  
                </div>
                <div on:click={OpenModalUpdate(order)}>
                    <svg class="pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="2rem" height="2rem">
                        <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
                        <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
                    </svg>          
                </div>
                <div on:click={DeliveredOrder(order)}>
                    <svg class="pointer" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="2rem" height="2rem" color="green">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>          
                </div>
                <div on:click={()=>{OpenModalCancelOrder(order)}}>
                    <svg class="pointer" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="2rem" height="2rem" color="red">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                    </svg>
                </div>
            </div>   
            <hr>        
            <div class="fecha">
                 {new Date(order.date).toLocaleString()}
                 <!-- 02/01/2023 24:00 -->
            </div>          
            <div class="letter">
                    CLIENTE: {order.id_user.first_name} {order.id_user.last_name}
            </div>          
            <div class="letter">
                    DIR: {order.id_user.address}
            </div>       
            <div class="letter">
                    TEL: {order.id_user.phone}
            </div> 
            <div class="letter">
                    DELIVERY: 
                    {#if order.id_delivery}
                        {order.id_delivery.first_name} {order.id_delivery.last_name}
                    {:else}
                         Sin delivery
                    {/if}
            </div>
           <hr>
           <div class="letter text-center">
                DETALLE
           </div>
           <hr>
           <div class="contrainer-detalle">
                {order.description}
           </div>
           <hr>
           <div class="letter text-center">
                PEDIDO {order.oreder_number>10 ? order.oreder_number: '0'+order.oreder_number }
           </div>
           <hr>
           <div class="conteiner-order">
            {#each order.order as ord}
                <div>
                    <div>
                        - {ord.porduct_name}
                    </div>
                    <div class="detalles">
                        {ord.product_description}
                    </div>
                </div>
                <div class="price">
                    $ {ord.product_price}
                </div>
            {/each}
           </div>
           <hr>
           <div class="conteiner-order">
            <div>
                TOTAL
            </div>
            <div class="price">
                ${CalTotal(order.order)}
            </div>
           </div>
          
        </div>
             <!-- content here -->
        {/each}
    </div>
</div>


<style>
    .contrainer-detalle{
        max-height: 10vh;;
        overflow-y: scroll; 
        padding: 1rem;
    }

    .fecha{
        text-align: center;
        padding: .5rem;
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

    .conteiner-order{
        display: grid;
        grid-template-columns: 50% 50%;
        max-height: 28vh;
        overflow-y: scroll;
    }

    .detalles{
        font-weight: 100;
        font-size: smaller;
        margin-left: .5rem;
    }

    .conteiner-order>div{
        padding: .5rem;
        font-size: large;
        font-weight: bold;
    }
    .conteiner-order .price{
        text-align: right;
    }

    .pointer{
        cursor: pointer;
    }
    .text-center{
        text-align: center;
    }



    hr{
        border: 1px solid rgba(0, 0, 0, 0.094);
    }

    .carrusel{
        width: 76vw;
        overflow-x: scroll;     
    }

    .btn-action-container{
        display: grid;
        grid-template-columns: auto auto auto auto auto;
        align-items: center;
        justify-items: center;
        padding: .5rem 0;
    }
    

    .letter{
        font-size: larger;
        padding: .5rem;
    }

    .title-state{
        text-align: center;
        font-size: larger;
        color: white;
        padding: .5rem 0;
        background-color: blueviolet;
        border-radius: .2rem .2rem 0 0;
    }

    .en-proceso{
        background-color:rgb(230, 126, 34);
    }
    .en-reparto{
        background-color: rgb(52, 152, 219);
    }
    .entregado{
        background-color: rgb(39, 174, 96);;
    }
    .cancelado{
        background-color: rgb(231, 76, 60);
    }

    .container{
        display: flex;
        flex-flow: row nowrap;
        justify-content: flex-start;
        align-items: flex-start;
        justify-items: center;

    }
    .elemtent{
        display: inline-block;
        /* border: 1px solid rgba(0, 0, 0, 0.275); */
        background-color: rgba(199, 250, 255, 0.144);
        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    }

    /* width */
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

    .conteiner-order::-webkit-scrollbar, .contrainer-detalle::-webkit-scrollbar {
        display: none;
    }


    @media screen and (max-width:800px) {
        .carrusel{
            width: 98vw;
        }
        .conteiner-order{
            max-height: 21vh;
        }
        .letter{
            font-size: smaller;
            padding: .2rem;
        }
        ::-webkit-scrollbar{
        display: none;
    }
    }
</style>