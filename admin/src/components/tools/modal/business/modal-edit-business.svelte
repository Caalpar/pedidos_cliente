<script>
    import ModalContaner from "../modal-contaner.svelte";
    export let CloseFather
    import {UpdateBusiness} from '../../../../controllers/business/UpdateBusiness.js'
    import {loginData} from '../../../../store/user/login.js'
    import {businessAllData,currentDataBusiness} from '../../../../store/business/businnes.js'
    import {IMAGE_PATH} from '../../../../api/routes.js'
    
        // mostrar imagen
    let input
    let image
    let showImage = false;

    const Update = async () =>{

        let name = document.getElementById('name-business-create').value
        let new_business = await UpdateBusiness($currentDataBusiness._id,$loginData._id,name,input.files[0])

        console.log({new_business})
        let index_business = $businessAllData.findIndex(b => b._id == $currentDataBusiness._id )

        if(index_business !==-1){
            $businessAllData[index_business] = new_business.data
            $businessAllData = $businessAllData
        }

        CloseFather()
    }

    const onChange = () =>{
       
       const file = input.files[0];
       console.log(file)

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

</script>


<ModalContaner title = "Actualizar Empresa" {CloseFather}>
    <div >
        <input type="text" id="name-business-create" placeholder="nombre de la empresa" value={$currentDataBusiness.name}>
    </div>
    <div>
        <input name='imge' bind:this={input} on:change={onChange} type="file">
    </div>
    <div>        
        {#if showImage}
		    <img bind:this={image} src="" alt="Preview">
        {:else}
            <img src="{IMAGE_PATH + $currentDataBusiness.img}" alt="Preview">
        {/if}
    </div>
    <div>
        <button on:click={()=>{Update()}}>ACTUALIZAR</button>
    </div>    
</ModalContaner>

<style>

    img{
            width: 5rem;
            height: 5rem;
            object-fit: cover;
            margin-left: 1rem;
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