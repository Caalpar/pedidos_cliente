<script>
    import {onMount} from 'svelte'
    export let CloseFather
    
    //component
    import ModalContanerAllScreen from '../modal-contaner-all-screen.svelte';
    import ModalInfoReports from './modal-info-reports.svelte';

    //store 
    import {Sience,Until,OrderReportData} from '../../../../store/reports/reports.js'
    import {loginData} from '../../../../store/user/login.js'

    //controller
    import {GetReport} from '../../../../controllers/orders/GetReports.js'

    //tools
    import {PrintReport} from '../../../../tools/PrintReport.js'

    let reportData
    let report = []
    let reportFilter = []
    let reports
    let total=0, totalCost=0, totalProfit = 0

    onMount( async ()=>{
            let result = await GetReport($loginData._id,$Sience,$Until)
            console.log('result',result)
            reportFilter = result.data
            report = result.data
    })

    let latOrder = ''

    const  calcTotal = (order,state) =>{
       


        let return_const = 0,return_total = 0,return_profit = 0

        let currentId = ''

        for (let index = 0; index < order.length; index++) {
            const ord = order[index];
            return_const += ord.product_cost
            return_total += ord.product_price
            currentId = ord._id
        }
        return_profit = return_total - return_const

        if(latOrder != currentId && state != 'CANCEL')
        {
            totalCost+=return_const
            total+=return_total
            totalProfit += return_profit
            latOrder = currentId
        }
        return {return_const,return_total,return_profit}

    }   

    const FilterData = (text) =>{

        let cost_sum = 0,total_sum = 0,profit_sum = 0

        for (let index = 0; index < reports.children.length; index++) {

            const child = reports.children[index];

            if(child.innerHTML.toUpperCase().indexOf(text.toUpperCase())>-1){
                child.classList.remove('display-none')
           
                const  state = child.children[6].children[0].innerHTML

                if(state != 'CANCELADO'){
                    cost_sum += parseFloat(child.children[8].innerHTML.replace('$',''))
                    total_sum += parseFloat(child.children[9].innerHTML.replace('$',''))
                    profit_sum += parseFloat(child.children[10].innerHTML.replace('$',''))
                }

            }else{
                child.classList.add('display-none')
            }

               
        }

        totalCost = cost_sum
        total = total_sum
        totalProfit =  profit_sum

    }

    //Mostrar modal RepoInfo

    let view_report = false

    const OpenModalInfoReport = (order) =>{
        view_report = true
        $OrderReportData = order
    }

    const CloseModalInfoReport = () =>{
        view_report = false
    }

    const PrintReportBtn = () =>{

        PrintReport(reportData)
    }


</script>



<ModalContanerAllScreen title = "Reporte" {CloseFather} showSearch={true}, Action={FilterData}>

    {#if view_report}
        <ModalInfoReports CloseFather={CloseModalInfoReport} />
    {/if}

    <div class="print" on:click={()=>{PrintReportBtn()}}>
        <svg class="pointer" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="1.5rem" height="1.5rem">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z" />
        </svg> 
    </div>
    <div bind:this={reportData} class="scroll">
        <div class="title-report">
            <div>
                Pedido
            </div>
            <div>
                Empresa
            </div>
            <div>
                Sucursal
            </div>
            <div>
                Cajero
            </div>
            <div>
                Cliente
            </div>
            <div>
                Delivery
            </div>
            <div>
                Estado
            </div>
            <div>
                Info
            </div>
            <div>
                Costo
            </div>
            <div>
                Total
            </div>
            <div>
                Ganancia
            </div>
        </div>
        <div>
            <div  bind:this={reports} class="container-scroll"> 
        {#each reportFilter as data}
            
              <div class="container">

      
          
            <div>
                <div class="date">
                   Nº{data.oreder_number>10?data.oreder_number:'0'+data.oreder_number}

                </div>
                <div class="date">
                    {new Date(data.date).toLocaleString()}

                </div>

            </div>
            <div>
                    {#if data.business_id}
                        {data.business_id.name}
                        {:else}
                        sin identificar
                    {/if}
            </div>
            <div>
                {data?.branch_office_id?.name ? data?.branch_office_id?.name : 'sin definir'}
            </div>
            <div>
                {data?.cashier_id?.first_name ? data?.cashier_id?.first_name : 'sin definir'} {data?.cashier_id?.last_name ? data?.cashier_id?.last_name : 'sin definir'}
            </div>
            <div>
                {data?.id_user?.first_name ? data?.id_user?.first_name : 'sin definir' } {data?.id_user?.last_name ? data?.id_user?.last_name : 'sin definir'}
            </div>
            <div>
                {#if data.id_delivery}
                    {data?.id_delivery?.first_name ? data?.id_delivery?.first_name : 'sin definir' } {data?.id_delivery?.last_name ?  data?.id_delivery?.last_name : 'sin definir'}
                {:else}
                    sin delivery
                {/if}
            </div>
            <div>
            {#if data?.state[0] == "RECEIVED"}
                <div class="state recibido">
                        RECIBIDO
                </div>
                {/if}
                {#if data?.state[0] == "PROCESS"}
                <div class="state en-proceso">
                        EN PROCESO
                </div>
                {/if}
                {#if data?.state[0] == "COMING"}
                <div class="state en-reparto">
                        EN REPARTO
                </div>
                {/if}
                {#if data?.state[0] == "DELIVERED"}
                <div class="state entregado">
                        ENTREGADO
                </div>
                {/if}
                {#if data?.state[0] == "CANCEL"}
                <div class="state cancelado">
                        CANCELADO
                </div>
            {/if}
            </div>
            <div style="cursor:pointer;" on:click={OpenModalInfoReport(data)}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="1.5rem" height="1.5rem">
                    <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z" clip-rule="evenodd" />
                  </svg>
            </div>
            {#if data?.state[0] == "CANCEL"}
                <div style="text-decoration: line-through;">
                    ${calcTotal(data.order,data?.state[0]).return_const}
                </div>
                <div style="text-decoration: line-through;">
                    ${calcTotal(data.order,data?.state[0]).return_total}
                </div>
                <div style="text-decoration: line-through;">
                    ${calcTotal(data.order,data?.state[0]).return_profit}
                </div>
            {:else}
                <div>
                    ${calcTotal(data.order,data?.state[0]).return_const}
                </div>
                <div>
                    ${calcTotal(data.order,data?.state[0]).return_total}
                </div>
                <div>
                    ${calcTotal(data.order,data?.state[0]).return_profit}
                </div>
            {/if}
        </div> 
            {/each}
        </div>
        </div>
        <div class="footer-report">
            <div>
                Total Costo ${totalCost}
            </div>
            <div>
                Total Bruto  ${total}
            </div>
            <div>
                Total Ganancia  ${totalProfit}
            </div>
        </div>
</div>
</ModalContanerAllScreen>

<style>

    .print{
        margin: .5rem 1rem;
        cursor: pointer;
    }

    .date{
        text-align: center; padding: .3rem;
    }
    .footer-report{
        display: grid;
        grid-template-columns: auto auto auto;
        text-align: center;
        background-color: rgb(77, 77, 119);
        color: white;
        padding: 1rem;
    }
    .title-report{
        display: grid;
        grid-template-columns: 9% 9% 9% 9% 9% 9% 9% 9% 9% 9% 9%;
        margin: 1rem;
        align-items: center;
        justify-items: center;
        text-align: center;
        background-color: #04AA6D;
        color: white;
        padding: 1rem;
    }
    .container{
        display: grid;
        grid-template-columns: 9% 9% 9% 9% 9% 9% 9% 9% 9% 9% 9%;
        margin: 1rem;
        text-align: center;

    }

    .container-scroll{
        overflow-y: scroll;
        max-height: 50vh;
    }

    .container > div{

       border-bottom: 1px solid rgba(0, 0, 0, 0.116);
    }

    .scroll{
        overflow-y: scroll;
        max-height: 90vh;
    }

    .recibido{
        background-color: blueviolet;
    }

    .state{
        color: white;
        font-weight: bold;
        padding: .3rem;
        border-radius: .7rem;
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

</style>