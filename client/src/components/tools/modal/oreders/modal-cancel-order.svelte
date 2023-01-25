<script>
    import ModalContaner from "../modal-contaner.svelte";
    export let CloseFather
    export let Action

    let text 

    
    const Cancel = async () =>{
        Action(text)
        CloseFather()
    }

</script>



 <ModalContaner title = "Cancelar Pedido" {CloseFather}>
    <div>

        <div style="margin-left: 2.7rem;color:white">
           <b> Motivo </b>
        </div>
        <div class="container-center">
            <textarea bind:value={text} id="" cols="30" rows="10"></textarea>
        </div>

    </div>
    <div class="container-center">
        <button on:click={()=>{Cancel()}}>CANCELAR</button>
    </div>    
</ModalContaner>

<style>

    .container-center{
        display: grid;
        justify-items: center;
        align-items: center;
    }

    
    textarea{
        
        padding: .3rem;
        outline: none;
        border-radius: .2rem;
        border: none;
        margin: .5rem;
        width: auto;
        resize: none;
    }

    button{
        padding: .3rem;
        width: 15rem;
        height: 2.7rem;
        background-color: red;
        color: white;
        border: none;
        cursor: pointer;
        margin-left: .5rem;
        margin-top: .9rem;
        margin-bottom: .5rem;
        border-radius: .2rem;
    }


</style>