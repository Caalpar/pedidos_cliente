<script>
    import {onMount} from 'svelte'

    import { ProductsData } from "../../store/products/products.js";

    onMount(()=>{
        console.log('popup')
    })
</script>


    <div class="popup">
        <div style="margin: .5rem 0;">
            <b> Se ha agregado:</b>
        </div> 
        <div>
            {$ProductsData.category_id.name} {$ProductsData.title}
        </div>
    </div>


<style>


    .popup{
        position: absolute;
        bottom: 0rem;
        right: 0;
        background-color: rgb(108, 72, 72);
        border-radius: .5rem 0 0 0;
        color: white;
        width: 13rem;
        height: min-content;
        animation-name: move;
        animation-duration: 3s;
        padding: 1rem;
        opacity: 0;
        z-index: 100;
    }

    .popup > div
    {
        word-wrap: break-word;
    }

    @keyframes move
    {
        0%   { opacity: 0;}
        25%   {opacity: 25;}
        50%   {opacity: 100;}
        75%   {opacity: 25;}
        100%   {opacity: 0;}
    }
</style>