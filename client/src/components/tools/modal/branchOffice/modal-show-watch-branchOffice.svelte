<script>
    import { onMount } from "svelte";
    import ModalContaner from "../modal-contaner.svelte";
    export let CloseFather;

    //tools
    import {CheckIsOpenDayText,CheckIsOpenHoursText,CkeckIsOpenText} from '../../watch/CheckTime.js'

    //store
    import {
        branch_officeData
    } from "../../../../store/branch_office/branch_office.js";

    let textHours = undefined

    onMount(()=>{
       // console.log($branch_officeData)

       textHours = CkeckIsOpenText($branch_officeData.hours_days)
       console.log(textHours)
    })


</script>

<ModalContaner title={"Horarios"} {CloseFather}>

    <div class="container">
        {#if textHours}

        {#if textHours.morning.daysText == 'cerrado' && textHours.late.daysText == 'cerrado' && textHours.nigth.daysText == 'cerrado' && textHours.noon.daysText == 'cerrado'}
             Estamos cerrados por reformas para mejorar la calidad de nuestro servico
        {:else}
            {#if textHours.morning.daysText != 'cerrado'}
                 <h3>
                     MAÑANA
                 </h3>
                 <div>
                     {textHours.morning.daysText} de {textHours.morning.open} a {textHours.morning.close} 
                 </div>
            {/if}
            {#if textHours.late.daysText != 'cerrado'}
                <h3>
                    TARDE
                </h3>
                <div>
                    {textHours.late.daysText} de {textHours.late.open} a {textHours.late.close} 
                </div>
             {/if}
             {#if textHours.nigth.daysText != 'cerrado'}
                <h3>
                    NOCHE
                </h3>
                <div>
                    {textHours.nigth.daysText} de {textHours.nigth.open} a {textHours.nigth.close} 
                </div>
             {/if}
             {#if textHours.noon.daysText != 'cerrado'}
                <h3>
                    MADRUGADA
                </h3>
                <div>
                    {textHours.noon.daysText} de {textHours.noon.open} a {textHours.noon.close} 
                </div>
             {/if}
        {/if}
        {/if}
    </div>
</ModalContaner>

<style>
    .container{
        padding: 0.5rem;
    }

    h3{
        margin-top: 1rem;
    }

</style>