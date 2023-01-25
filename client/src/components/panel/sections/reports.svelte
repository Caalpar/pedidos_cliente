
<script>
    import { onMount } from "svelte";

    //components
    import ModalRepots from "../../tools/modal/reports/modal-repots.svelte";

    //store 
    import {Sience,Until} from '../../../store/reports/reports.js'

    
    let since,unitl

    onMount(()=>{
        
        let now = new Date()
        let year = now.getFullYear()
        let month = now.getMonth() > 9? (now.getMonth()+1) : '0' + (now.getMonth()+1)
        let day = now.getDate() > 9? now.getDate() : '0' + now.getDate()
        let hours = now.getHours() > 9? now.getHours() : '0' + now.getHours()
        let munites = now.getMinutes() > 9? now.getMinutes() : '0' + now.getMinutes()
        let seconds = now.getSeconds() > 9? now.getSeconds() : '0' + now.getSeconds()

       since = `${year}-${month}-${day}T00:00:00`
       unitl = `${year}-${month}-${day}T${hours}:${munites}:${seconds}`

    })


    let view_report = false

    const CrearReporte = () =>{
        $Sience = new Date(since).getTime()
        $Until = new Date(unitl).getTime()
        view_report = true
    }

    const CloseModalReport = () =>{
        view_report = false
    } 





</script>

{#if view_report}
    <ModalRepots CloseFather={CloseModalReport}/> 
{/if}

<div class="container">
    <label for="">Desde:</label>
    <input bind:value={since} type="datetime-local" name="" id="">
    <label for="">Hasta:</label>
    <input bind:value={unitl} type="datetime-local" name="" id="">
    <button on:click={()=>{CrearReporte()}}>CREAR REPORTE</button>
</div>

<style>

    .container{
        display: grid;
        width: 100%;
        grid-template-columns: auto auto auto auto auto;
        align-items: center;
        justify-items: center;
    }

    label{
        font-size: larger;
    }

    input{
        padding: 1rem;
        border-radius: .7rem;
        border: none;
        margin: 1rem;
    }
    button{
        background-color: #04AA6D;
        padding: 1rem;
        color: white;
        border-radius: .7rem;
        cursor: pointer;
        border: none;
    }

    @media screen and (max-width:800px) {
        .container{
            display: grid;
            width: auto;
            grid-template-columns: auto;
        }

        input{
            display: block;
            margin: 1rem;
            width: 80%;
        }
        button{
            margin: 0 auto;
        }
        label{
            margin: 0 1rem;
        }
    }

</style>