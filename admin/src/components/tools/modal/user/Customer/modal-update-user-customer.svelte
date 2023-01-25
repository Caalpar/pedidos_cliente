<script>
    import ModalContaner from "../../modal-contaner.svelte";
    export let CloseFather

    // controllers
    import {UpdateUser} from '../../../../../controllers/user/UpdateUser.js'

    //store
    import {loginData} from '../../../../../store/user/login.js'
    import {userCustomerAllData,currentDatauser} from '../../../../../store/user/user.js'
    import {branch_officeData} from '../../../../../store/branch_office/branch_office.js'

    let email = $currentDatauser.email
    let first_name = $currentDatauser.first_name
    let last_name = $currentDatauser.last_name
    let phone = $currentDatauser.phone
    let address = $currentDatauser.address
    let neighborhood = $currentDatauser.neighborhood
    let corner = $currentDatauser.corner
    let tuition = $currentDatauser.tuition
    let vehicle = $currentDatauser.vehicle

    
    const Update = async () =>{

        let new_user = await UpdateUser(
        $loginData._id,
        $branch_officeData._id,
        $currentDatauser._id,
        email,
        phone,
        first_name,
        last_name,
        address,
        neighborhood,
        corner,
        tuition,
        vehicle
        )
        
        console.log('new_user',new_user)
        if(new_user.update){

            let index_user = $userCustomerAllData.findIndex(b => b._id == new_user.data._id )

            if(index_user !==-1){
                $userCustomerAllData[index_user] = new_user.data
                $userCustomerAllData = $userCustomerAllData
            }else{
                alert(new_user.msg)          
            }
        }
        else{
            alert(new_user.msg)
        }
        CloseFather()
    }

</script>

<ModalContaner title="Actalizar Usuario" {CloseFather}>
    <div class="container-input">
        <div>
            <input bind:value={email} type="mail" placeholder="email" />
        </div>
        <div>
            <input bind:value={address} type="text" placeholder="direccion" />
        </div>
        <div>
            <input bind:value={first_name} type="text" placeholder="nombre" />
        </div>
        <div>
            <input bind:value={corner} type="text" placeholder="esquina" />
        </div>
        <div>
            <input bind:value={last_name} type="text" placeholder="apellido" />
        </div>
        <div>
            <input bind:value={neighborhood} type="text" placeholder="barrio" />
        </div>
        <div>
            <input bind:value={vehicle} type="text" placeholder="vehiculo" />
        </div>
        <div>
            <input bind:value={tuition} type="text" placeholder="matricula" />
        </div>
        <div>
            <input bind:value={phone} type="tel" placeholder="celular" />
        </div>
    </div>
    <div class="container-center">
        <button
            on:click={() => {
                Update();
            }}>ACTUALIZAR</button
        >
    </div>
</ModalContaner>

<style>
    .container-input {
        display: grid;
        grid-template-columns: auto auto;
    }

    .container-center {
        display: grid;
        justify-items: center;
        align-items: center;
    }

    input {
        height: 2rem;
        padding: 0.3rem;
        outline: none;
        border-radius: 0.2rem;
        border: none;
        margin: 0.5rem;
        width: auto;
    }

    button {
        padding: 0.3rem;
        width: 15rem;
        height: 2.7rem;
        background-color: rgba(0, 0, 0, 0.418);
        color: white;
        border: none;
        cursor: pointer;
        margin-left: 0.5rem;
        margin-top: 0.9rem;
        margin-bottom: 0.5rem;
        border-radius: 0.2rem;
    }

    @media screen and (max-width: 800px) {
        input {
            width: 9.5rem;
        }
    }
</style>
