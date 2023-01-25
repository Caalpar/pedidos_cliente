<script>
    import ModalContaner from "../modal-contaner.svelte";
    export let CloseFather

    //store
    import {OrderReportData} from '../../../../store/reports/reports.js'

    console.log($OrderReportData)

</script>


<ModalContaner title = "Informacion del Usuario" {CloseFather}>
    
    <div class="text-withe">
        <b> DETALLES </b>
    </div>
    <div class="text-withe">
        {$OrderReportData.description}
    </div>
    {#if $OrderReportData.state[0] == 'CANCEL'}
        <div class="text-withe">
            <b> MOTIVO DE CANCELACION </b>
        </div>
        <div class="text-withe">
            {$OrderReportData.description_cancel}
        </div>
    {/if}
    <div class="container">

        <div> <b> Nombre</b></div>
        <div> <b> Costo</b></div>
        <div> <b> Precio</b></div>
        {#each $OrderReportData.order as ord}
            <div>
                <div>
                   {ord.porduct_name}
                </div>
                <div>
                    {ord.product_description}
                </div>
              
            </div>
            <div>
                ${ord.product_cost}
            </div>
            <div>
                ${ord.product_price}
            </div>
        {/each}
        <!-- <div >
           <b>email </b> :{$currentDatauser.email}
        </div>
        <div >
           <b>dir </b> :{$currentDatauser.address}
        </div>
        <div >
           <b>nombre </b> :{$currentDatauser.first_name}
        </div>
        <div >
           <b>esquina </b> :{$currentDatauser.corner}
        </div>
        <div >
            <b>apellido </b> :{$currentDatauser.last_name}
        </div>
        <div >
            <b>barrio </b> :{$currentDatauser.neighborhood}
        </div>
        <div >
            <b>vehiculo </b> :{$currentDatauser.vehicle}
        </div>
        <div >
           <b>matricula </b> :{$currentDatauser.tuition}
        </div>
        <div >
           <b>cel </b> :{$currentDatauser.phone}
        </div> -->

    </div>
   
</ModalContaner>

<style>
        .container{
        display: grid;
        grid-template-columns: auto auto auto;
        color: white;
    }

    .container>div{
        padding: .7rem;
    }
    .text-withe{
        color: white;
        padding: .7rem;
    }



</style>