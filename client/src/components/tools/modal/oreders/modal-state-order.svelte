<script>
    import { onMount } from "svelte";

    import ModalContaner from "../modal-contaner.svelte";
    export let CloseFather
    
    //controllers
    import {GetOrderByUser} from '../../../../controllers/orders/GetOrderByUser.js'


    //store
    import {loginData} from '../../../../store/user/login.js'
    import {CurrentOrdersAllData} from '../../../../store/order/oreder.js'


    let orders = []

    onMount(async ()=>{
        let result = await GetOrderByUser($loginData._id)

        console.log('result',result)

        if(result.data)
        {
            $CurrentOrdersAllData = result.data
        }
    })

    $:{
        orders = $CurrentOrdersAllData
    }
    
    const CalTotal = (pedido) =>{
   
        let result = 0
        for (let index = 0; index < pedido.length; index++) {
            const ord = pedido[index];
            result +=ord.product_price
        }
        return result

    }

</script>


<ModalContaner title = "Mis Pedido" {CloseFather}>

<div class="carrusel">  
    <div class="container">
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
            <hr>        
            <div class="fecha">
                 {new Date(order.date).toLocaleString()}
                 <!-- 02/01/2023 24:00 -->
            </div>          
            <div class="letter">
                    DELIVERY: 
                    {#if order.id_delivery}
                        {order.id_delivery.first_name} {order.id_delivery.last_name}
                    {:else}
                         Sin delivery
                    {/if}
                </div>
                <div class="letter">
                    TEL: 
                    {#if order.id_delivery}
                        {order.id_delivery.phone}
                    {:else}
                         0
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


</ModalContaner>

<style>
  
    .contrainer-detalle{
        max-height: 10vh;;
        overflow-y: scroll; 
        padding: 1rem;
        word-break: break-all;
    }

    .fecha{
        text-align: center;
        padding: .5rem;
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


    .text-center{
        text-align: center;
    }



    hr{
        border: 1px solid rgba(0, 0, 0, 0.094);
    }

    .carrusel{
        width: 28rem;
        overflow-x: scroll;     
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
        width: max-content;
        display: flex;
        gap: 1rem;
        margin: 1rem;
        /* flex-flow: row nowrap; */
        /* justify-content: flex-start;
        align-items: flex-start;
        justify-items: center; */

    }
    .elemtent{
        width: 25rem;
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
        .elemtent{
            width: 20rem;
        }
        .container{
            margin: 1rem;
        }
    }

</style>