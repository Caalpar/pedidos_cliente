<script>
    
    import { onMount } from "svelte";
    import ModalContaner from "../modal-contaner.svelte";
    import {IMAGE_PATH} from '../../../../api/routes.js'

    export let CloseFather
    



    // controllers
    import {UpdateProduct} from '../../../../controllers/products/UpdateProduct.js'
    import {GetCategories} from '../../../../controllers/caregory/GetCategories.js'

    //store
    import {loginData} from '../../../../store/user/login.js'
    import {CategoryAllData,CategoryData} from '../../../../store/products/category.js'
    import {ProductsAllData,ProductsData} from '../../../../store/products/products.js'
    import {branch_officeData} from '../../../../store/branch_office/branch_office.js'

    let price = $ProductsData.price
    let cost = $ProductsData.cost
    let title = $ProductsData.title
    let description = $ProductsData.description
    let availbility = $ProductsData.availbility
    let front_page = $ProductsData.front_page

    // mostrar imagen
    let input
    let image
    let showImage = false;
    

    onMount(async()=>{
        let categories = await GetCategories($branch_officeData._id)
        $CategoryAllData = categories.data

        //let index_cat = $CategoryAllData.findIndex(c => c._id == $ProductsData.category_id._id)

        $CategoryData = $ProductsData.category_id

      
    })


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

    const SelectCat = (cat) =>{
        $CategoryData = cat

    }


    const Update = async () =>{

         let update_product = await UpdateProduct($ProductsData._id,$branch_officeData._id,$CategoryData._id,$loginData._id,price,input.files[0],cost,title,description,availbility,front_page)

        console.log('update_product',update_product)

        if(update_product.create){
            let index_prod =  $ProductsAllData.findIndex(p => p._id == $ProductsData._id)

            if(index_prod != 0)
            {
                $ProductsAllData[index_prod] = update_product.data
                $ProductsAllData = $ProductsAllData
            }
        }
        else{
            alert(new_product.msg)
        }
        CloseFather()
    }

</script>


<ModalContaner title = "Actializar Producto" {CloseFather}>

    <div class="container-center">
        <input bind:value={title} type="text"  placeholder="titulo">
    </div>
    <div class="container-center drop">
        <div class="textColor-margin">
            Categorias
        </div>
        <div>
            <button>
                {$CategoryData.name}
            </button>
            <div class="container-cat">
                {#each $CategoryAllData as category}
                     <div on:click={()=>{SelectCat(category)}}>
                        {category.name}
                     </div>
                {/each}
            </div>
        </div>
    </div>

    <div class="container-center">
        <input name='imge' bind:this={input} on:change={onChange} type="file">
        {#if showImage}
		    <img bind:this={image} src="" alt="Preview">
        {:else}
            <img src="{IMAGE_PATH + $ProductsData.img}" alt="Preview">
        {/if}
    </div>
    <div class="container-center">
        <input bind:value={price} type="number"  placeholder="precio">
    </div>
    <div class="container-center">
        <input bind:value={cost} type="number"  placeholder="costo">
    </div>
    <div class="container-center">
        <input bind:value={description} type="text"  placeholder="descripcion">
    </div>
    <div class="container-center col-2">
        <label  class="textColor-margin" for="">disponible</label>
        <input type="checkbox" bind:checked={availbility} >
    </div>
    <div class="container-center col-2">
        <label  class="textColor-margin" for="">portada</label>
        <input type="checkbox" bind:checked={front_page}>
    </div>
    <div class="container-center margin-bottom-05">
        <button class="margin-top-09 " on:click={()=>{Update()}}>Actializar</button>
    </div>    
</ModalContaner>

<style>
        .container-center{
        display: grid;
        justify-items: center;
        align-items: center;
        
    }

    .drop{
        position: relative;
    }


    img{
        width: 5rem;
        height: 5rem;
        object-fit: cover;
    }
    .col-2{
        grid-template-columns: auto auto;
    }

    .container-cat{
        position: absolute;
        display: none;
        height: 25vh;
        overflow-y: scroll;
    }

    .container-cat::-webkit-scrollbar{
        display: none;
    }

    .drop:hover .container-cat{
        display: block;
    }
        .container-cat > div{
            text-align: center;
            font-size: larger;
            color: white;
            padding: 1rem 0;
            background-color: rgb(123, 123, 123);
            width: 15rem;
            margin-left: .5rem;
            cursor: pointer;
    }
    .container-cat > div:hover{
        color:  rgb(123, 123, 123);
        background-color: white;
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
    
    .textColor-margin{
        margin: .5rem;
        color: white;
        font-size: medium;
    }

    input[type="checkbox"]{
        width: 1rem;
        height: 1rem;
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
        

        border-radius: .2rem;
    }

    .margin-top-09{
        margin-top: .9rem;
    }

    .margin-bottom-05{
        margin-bottom: .5rem;
    }

    @media screen and (min-width:800px) {

        
    img{
        width: 10rem;
        height: 10rem;

    }
    }

</style>