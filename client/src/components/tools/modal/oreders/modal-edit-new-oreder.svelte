<script>
    import { onMount } from "svelte";

    import ModalContaner from "../modal-contaner.svelte";
    export let CloseFather
    export let EditNewOrder

    export let description = ''
    export let price = 0

    //store
    import {OrderData} from '../../../../store/order/oreder.js'


    onMount(()=>{
        description = $OrderData.product_description
        price = $OrderData.product_price
    })
    
    const Edit = async () =>{
        
        EditNewOrder({id:$OrderData.id,description,price})
        
        CloseFather()
    }

</script>


<ModalContaner title = "Editar Pedido" {CloseFather}>
    <div >
        <input bind:value={description} type="text" placeholder="description">
    </div>
    <div >
        <input  bind:value={price} type="number" placeholder="price">
    </div>
    <div>
        <button on:click={()=>{Edit()}}>EDITAR</button>
    </div>    
</ModalContaner>

<style>
  
    input{
        height: 2rem;
        padding: .3rem;
        outline: none;
        border-radius: .2rem;
        border: none;
        margin-left: .5rem;
        margin-top: .5rem;
        width: 14.4rem;
    }

    button{
        padding: .3rem;
        width: 15rem;
        height: 2.7rem;
        background-color: rgba(0, 0, 0, 0.418);
        color: white;
        border: none;
        cursor: pointer;
        margin-left: .5rem;
        margin-top: .9rem;
        margin-bottom: .5rem;
        border-radius: .2rem;
    }

</style>