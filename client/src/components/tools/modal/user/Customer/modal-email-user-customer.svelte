<script>
    import ModalContaner from "../../modal-contaner.svelte";
    export let CloseFather

    // controllers
    import {SendMailAllUsers} from '../../../../../controllers/user/SendMailAllUsers.js'

    //store
    import {userCustomerAllData} from '../../../../../store/user/user.js'
    import {loginData} from '../../../../../store/user/login.js'


    let subject 
    let text 

    
    const Send = async () =>{


        console.log(subject,text)
        // let new_email = await SendMailAllUsers($loginData.branch_office_id,subject,text,text)

        // if(new_user.create){
        //     $userCustomerAllData.push(new_user.data)
        //     $userCustomerAllData = $userCustomerAllData
        // }
        // else{
        //     alert(new_user.msg)
        // }
        CloseFather()
    }

</script>



 <ModalContaner title = "Eviar Email" {CloseFather}>
    <div>

        <div >
            <input bind:value={subject} type="text"  placeholder="asunto" >
        </div>
        <div >
            <textarea bind:value={text} id="" cols="30" rows="10"></textarea>
        </div>

    </div>
    <div class="container-center">
        <button on:click={()=>{Send()}}>ENVIAR</button>
    </div>    
</ModalContaner>

<style>

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