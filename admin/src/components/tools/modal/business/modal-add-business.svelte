<script>
    import ModalContaner from "../modal-contaner.svelte";
    export let CloseFather

    //controllers
    import {CreateBusiness} from '../../../../controllers/business/CreateBusiness.js'

    //store
    import {loginData} from '../../../../store/user/login.js'
    import {businessAllData} from '../../../../store/business/businnes.js'
    
    // mostrar imagen
    let input
    let image
    let showImage = false;
    

    
    const onChange = () =>{

        const file = input.files[0];


        if(file){
            showImage = true
            const reader = new FileReader();
            reader.addEventListener("load", function () {
                image.setAttribute("src", reader.result);
            });
            reader.readAsDataURL(file);
			
			return;
        }
        showImage = false; 
    }

    const Create = async () =>{

        let name = document.getElementById('name-business-create').value
        let new_business = await CreateBusiness($loginData._id,name,input.files[0])

        if(new_business.create){
            $businessAllData.push(new_business.data)
            $businessAllData = $businessAllData
        }else{
            
            let errors = Object.entries(new_business.err.errors)

            let msg = ''

            for (let index = 0; index < errors.length; index++) {
                const {message} = errors[index][1];
                msg += message + '\n'
            }

            console.log(msg)
            alert(`${new_business.msg}:
${msg}`)
        }

//        $businessData = new_business.data

        //console.log('new_business',new_business)
        CloseFather()
    }

</script>


<ModalContaner title = "Crear Empresa" {CloseFather}>
    <div class="container">
        
        <div >
            <input type="text" id="name-business-create" placeholder="nombre de la empresa">
        </div>
        <div style="text-align: left;">
            LOGO        
        </div>
        <div >
            <input name='imge' bind:this={input} on:change={onChange} type="file">
        </div>
        <div>
            {#if showImage}
                <img bind:this={image} src="" alt="Preview">
            {:else}
                <span>Image Preview</span>
            {/if}
        </div>
        <div>
            <button on:click={()=>{Create()}}>CREAR</button>
        </div>    
    </div>
</ModalContaner>

<style>

    .container{
        display: grid;
        gap: 1rem;
        margin: 1rem;
        color: white;
        
    }


    img{
            width: 5rem;
            height: 5rem;
            object-fit: cover;
        }
    
    input{
        height: 2rem;
        padding: .3rem;
        outline: none;
        border-radius: .2rem;
        border: none;
        margin-left: .5rem;
        margin-top: .5rem;
        width: 14.4rem;
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

</style>