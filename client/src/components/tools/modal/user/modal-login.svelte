
<script>

import { onMount } from 'svelte';
import ModalContaner from "../modal-contaner-all-screen.svelte";
import ModalSigin from './modal-sigin.svelte';

export let CloseFather
//store
import { loginActive,loginData } from '../../../../store/user/login.js';

// controllers
import {Login} from '../../../../controllers/user/Login.js'
import {LoginById} from '../../../../controllers/user/LoginById.js'

    

    onMount(async ()=>{

            $loginData = {}

            let localDataUser = window.localStorage.getItem('user_id')

            if(localDataUser)
            {
                let result = await LoginById(localDataUser)
               
                if(result.access)
                {               
                    $loginData = result.datos
                    $loginActive = result.access
                }

            }
    })





    const btnLogin = async () =>{

        let email = document.getElementById('input_email').value
        let password = document.getElementById('input_password').value
        let remember = document.getElementById('remember').checked

        let result = await Login(email,password)


        if(result.access)
        {               
            $loginData = result.datos
            $loginActive = result.access

            if(remember)
            {
                localStorage.setItem("user_id",result.datos._id)
            }
            else
            {
                localStorage.removeItem("user_id")
            }
            CloseFather()
        }
        else
        { 
            alert(result.msg)
        }


    } 


    let view_sigin = false

    const OpenModalSigin = () => {
        view_sigin = true
    }
    const CloseModalSigin = () => {
        view_sigin = false
        CloseFather()
    }


</script>



<ModalContaner title="" {CloseFather}>

    {#if view_sigin}
        <ModalSigin CloseFather ={CloseModalSigin}/>
    {/if}

    <form>
    <!-- <form action="" on:submit|preventDefault={btnLogin}> -->
    <div class="container-center">
        
    </div>
    <div class="inputs_grid">  
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"  width="2rem" height="2rem">
            <path fill-rule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clip-rule="evenodd" />
        </svg>
        <input id="input_email" class="input_email" type="text" placeholder="Email">
    </div>
    <div class="inputs_grid">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"  width="2rem" height="2rem">
            <path fill-rule="evenodd" d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z" clip-rule="evenodd" />
        </svg>  
        <input id="input_password"  class="input_password" type="password" placeholder="Contrase??a">
    </div>
    <div class="check_grid"> 
        <div class="check_grid2">
            <input type="checkbox" name="" id="remember" checked="true">
            <label for="remember"><b>Recordar</b></label>
        </div>
        <div class="reset_pass">
            <a href="http://">has olvidado tu contrase??a?</a>
        </div>
    </div>
    <div class="container-center">
        <button class="btn-sigin" on:click|preventDefault={OpenModalSigin}>Crear Cuenta</button>
        <button class="btn-login" on:click|preventDefault={btnLogin}>Iniciar Sesion</button>
        <!-- <input class="btn-login" type="submit"  value="Iniciar Sesion"> -->
    </div>
    </form>
</ModalContaner>
<style>

form{
    background-image: linear-gradient(to top right, #B066FE,#63E2FF);
    padding: 1rem 0;
    width: 30rem;
    border-radius: .5rem;
    margin: 2rem auto;
}

.container-center{
    display: grid;
    grid-template-columns: auto auto;
    justify-items: center;
    align-items: center;
}

.inputs_grid{
    display: grid;
    grid-template-columns: 3rem auto;
    align-items: center;
    margin: 1rem
    
}

.check_grid{
    display: grid;
    grid-template-columns: 5rem auto;
    align-items: center;
    margin: 1rem
}

.check_grid2{
    display: grid;
    grid-template-columns: 2rem auto;
    align-items: center;
    margin: 1rem 0
}

.reset_pass{
    justify-self: end;
}

.input_password,.input_email{
    height: 2rem;
    padding: .3rem;
    outline: none;
    border-radius: .2rem;
    border: none;
}

.btn-login{
    padding: 1rem 3rem;
    background-color: rgba(0, 0, 0, 0.418);
    color: white;
    border: none;
    cursor: pointer;
    border-radius: .2rem;
}
.btn-sigin{
    background-color: rgba(0, 0, 0, 0);
    color: white;
    border: none;
    cursor: pointer;
}
.btn-sigin:hover{

    color: #1e293b;

}


@media screen and (max-width:800px) {
    form{
        width: auto;
    }


}

</style>