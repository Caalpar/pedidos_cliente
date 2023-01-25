<script>
    import ModalContaner from "../../modal-contaner.svelte";
    export let CloseFather

    //store
    import {currentDatauser} from '../../../../../store/user/user.js'

    console.log($currentDatauser)

</script>


<ModalContaner title = "Informacion del Usuario" {CloseFather}>
    <div class="container">

        <div >
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
        </div>

    </div>
   
</ModalContaner>

<style>
        .container{
        display: grid;
        grid-template-columns: auto auto;
        color: white;
    }

    .container>div{
        padding: .7rem;
    }




</style>