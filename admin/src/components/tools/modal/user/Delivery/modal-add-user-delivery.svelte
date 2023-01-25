<script>
    import ModalContaner from "../../modal-contaner.svelte";
    export let CloseFather

    // controllers
    import {CreateUser} from '../../../../../controllers/user/CreateUser.js'

    //store
    import {userDeliveryAllData} from '../../../../../store/user/user.js'
    import {branch_officeData} from '../../../../../store/branch_office/branch_office.js'
    import {loginData} from '../../../../../store/user/login.js'


    let email 
    let first_name 
    let last_name 
    let password 
    let re_password 
    let phone 
    let address 
    let neighborhood 
    let corner 
    let tuition 
    let vehicle 
    
    const Create = async () =>{

        let new_user = await CreateUser($loginData._id,email,first_name,last_name,$branch_officeData._id,password,phone,'DELIVERY',address,neighborhood,corner,tuition,vehicle)

        if(new_user.create){
            $userDeliveryAllData.push(new_user.data)
            $userDeliveryAllData = $userDeliveryAllData
        }
        else{
            alert(`${new_user.msg}`)
        }
        CloseFather()
    }

</script>


<ModalContaner title = "Crear Usuario" {CloseFather}>
    <div class="container-input">

        <div >
            <input bind:value={email} type="email"  placeholder="email" >
        </div>
        <div >
            <input bind:value={address} type="text"  placeholder="direccion">
        </div>
        <div >
            <input bind:value={first_name} type="text"  placeholder="nombre">
        </div>
        <div >
            <input bind:value={corner} type="text"  placeholder="esquina">
        </div>
        <div >
            <input bind:value={last_name} type="text"  placeholder="apellido">
        </div>
        <div >
            <input bind:value={neighborhood} type="text"  placeholder="barrio">
        </div>
        <div >
            <input bind:value={password} type="password"  placeholder="contraseña">
        </div>
        <div >
            <input bind:value={vehicle} type="text"  placeholder="vehiculo">
        </div>
        <div >
            <input bind:value={re_password} type="password"  placeholder="re-contraseña">
        </div>
        <div >
            <input bind:value={tuition} type="text"  placeholder="matricula">
        </div>
        <div >
            <input bind:value={phone} type="tel"  placeholder="celular">
        </div>

    </div>
    <div class="container-center">
        <button on:click={()=>{Create()}}>CREAR</button>
    </div>    
</ModalContaner>

<style>
        .container-input{
        display: grid;
        grid-template-columns: auto auto;
    }

    .container-center{
        display: grid;
        justify-items: center;
        align-items: center;
    }

    
    input{
        height: 2rem;
        padding: .3rem;
        outline: none;
        border-radius: .2rem;
        border: none;
        margin: .5rem;
        width: auto;
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

    @media screen and (max-width:800px) {
        input{
            width: 9.5rem;
        }
    }

</style>