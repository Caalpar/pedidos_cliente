<script>
    import {onMount} from 'svelte'
    import {BRANCH_ID} from "../../../../global/global.js"
    
    export let CloseFather
    export let Notification
    
    //component
    import ModalContanerAllScreen from '../modal-contaner.svelte';


    //store 
    import {businessData} from '../../../../store/business/businnes.js'
    import {loginData} from '../../../../store/user/login.js'
    import {OrdersAllData} from '../../../../store/order/oreder.js'

    //controller
     import {CreateOrder} from '../../../../controllers/orders/CreateOrder.js'

   // total
   let total = 0
   let description


    onMount(()=>{
        console.log($OrdersAllData)

        if($OrdersAllData.length>0){
            for (let index = 0; index < $OrdersAllData.length; index++) {
                const order = $OrdersAllData[index];
                console.log(order)
                total += parseFloat(order.price.toString())
            }
        }
    })
    
    const DeleteOrder = (id) =>{
        let index = $OrdersAllData.findIndex(o => o._id == id)

        
        if(index != -1){
            $OrdersAllData.splice(index,1)
            $OrdersAllData = $OrdersAllData

            total = 0
        
            for (let index = 0; index < $OrdersAllData.length; index++) {
                const order = $OrdersAllData[index];
                total += parseFloat(order.price.toString())
            }
        }
    }

    const Create = async () =>{


        let newOrders = []

        


        if($loginData._id == ''){
            alert('Debe seleccionar un usuario para crear el pedido')
            return
        }

        if($OrdersAllData.length == 0){
            alert('No hay productos cargados')
            return
        }


        for (let index = 0; index < $OrdersAllData.length; index++) {
            const order = $OrdersAllData[index];
           
            newOrders.push({
                porduct_name: order.title +' '+order.description,
                product_price: order.price,
                product_cost: order.cost,
                product_description : '' 
            })
        }


        if(newOrders.length == 0){
            alert('No hay productos cargados')
            return
        }

        let newOrder ={
            order:newOrders,
           // branch_office_id:$loginData.branch_office_id,
            branch_office_id:BRANCH_ID,
            id_user:$loginData._id,
            description: description ?? '',
            business_id:$businessData._id
        }

        
        let result = await CreateOrder(newOrder)
        
        console.log('result',result)

        if(result.create)
        {
            $OrdersAllData = []
            Notification()
            CloseFather()
        }else
        {
            alert(`${result.msg}`)
        }

  

    }

</script>



<ModalContanerAllScreen title = "Pedido" {CloseFather}>
<div>
    <div>
        {#if $OrdersAllData.length>0}
            <div class="orders-container">
                {#each $OrdersAllData as order}
                    <div>
                         <div> <b>{order.title} </b></div>
                        <div>{order.description}</div>
                    </div>
                   <div style="cursor: pointer;" on:click={()=>{DeleteOrder(order._id)}}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" height=1rem width=1rem>
                        <path fill-rule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" clip-rule="evenodd" />
                      </svg>                  
                   </div>
                   <div>${order.price}</div>
                {/each}
            </div>
            <div class="total-container">    
                <hr>
                <div><b>Total:</b></div>
                <div></div>
                <div>${total}</div>
                <hr>
            </div>
        {:else}
        <div style="margin: .5rem;">
            No hay pedidos cargados
        </div>
        {/if}
    </div>
    <div class='detalles'>
        <div>
            <h3>
                Detalles del pedido
            </h3>
        </div>
        <div class="textarea-container">
            <textarea bind:value={description} name="" id=""></textarea>
        </div>
        <div>
            <button class="button-81" on:click={Create}>Hacer Pedido</button>
        </div>
    </div>
</div>

</ModalContanerAllScreen>

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
.orders-container{
    display: grid;
    grid-template-columns: 31% 31% 31%;
    gap: 3%;
    padding:4%;
    max-height: 44vh;
    overflow-y: scroll;
}  
.total-container{
    display: grid;
    grid-template-columns: 31% 31% 31%;
    gap: 1rem;
    padding:1rem;
}  
.detalles
{
    display: grid;  
    place-items: center;
    
}

hr{
    grid-column: 1/4;
    height: 1px;
}

.orders-container > div{
    word-break:break-all;
}
  
.textarea-container{
    width: 90%;
}

textarea{
    resize: none;
    border: none;
    border-radius: .5rem;
    height: 10rem;
    width: 90%;
    margin: 1rem;
    padding: 1rem;
}
h3{
        margin: 0.5rem;
        font-size: 1.3rem;
    }

/* CSS */
.button-81 {
  background-color: #fff;
  border: 0 solid #e2e8f0;
  border-radius: .5rem;
  box-sizing: border-box;
  color: #0d172a;
  margin: .5rem;
  cursor: pointer;
  display: inline-block;
  font-family: "Basier circle",-apple-system,system-ui,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
  font-size: 1.1rem;
  font-weight: 600;
  line-height: 1;
  padding: 1rem 1.6rem;
  text-align: center;
  text-decoration: none #0d172a solid;
  text-decoration-thickness: auto;
  transition: all .1s cubic-bezier(.4, 0, .2, 1);
  box-shadow: 0px 1px 2px rgba(166, 175, 195, 0.25);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}

.button-81:hover {
  background-color: #1e293b;
  color: #fff;
}

@media (min-width: 768px) {
  .button-81 {
    font-size: 1.125rem;
    padding: 1rem 2rem;
  }
}
</style>