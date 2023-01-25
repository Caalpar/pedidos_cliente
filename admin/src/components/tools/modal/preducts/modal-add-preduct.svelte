<script>
    
    import { onMount } from "svelte";
    import ModalContaner from "../modal-contaner.svelte";
    export let CloseFather
    



    // controllers
    import {CreateProduct} from '../../../../controllers/products/CreateProduct.js'
    import {GetCategories} from '../../../../controllers/caregory/GetCategories.js'

    //store
    import {loginData} from '../../../../store/user/login.js'
    import {CategoryAllData,CategoryData} from '../../../../store/products/category.js'
    import {ProductsAllData,ProductsData} from '../../../../store/products/products.js'
    import {branch_officeData} from '../../../../store/branch_office/branch_office.js'

    let price 
    let cost 
    let title = ''
    let description = ''
    let availbility = true
    let front_page = false

    // mostrar imagen
    let input
    let image
    let showImage = false;
    

    onMount(async()=>{
        let categories = await GetCategories($branch_officeData._id)
        console.log('categories',categories)
        $CategoryAllData = categories.data
        $CategoryData = categories.data[0]

    })


    const onChange = () =>{
        console.log(input)
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

    const SelectCat = (cat) =>{
        $CategoryData = cat

    }


    const Create = async () =>{


         let new_product = await CreateProduct($branch_officeData._id,$CategoryData._id,$loginData._id,price,input.files[0],cost,title,description,availbility,front_page)

        console.log('new_product',new_product)

        // let new_business = await CreateBusiness($loginData._id,name)
        if(new_product.create){
            $ProductsAllData.push(new_product.data)

            $ProductsAllData.sort((a,b)=> {
            if(a.category_id.name > b.category_id.name)
                return 1
            if(a.category_id.name < b.category_id.name)
                return -1
            else
                return 0
            
            })


            $ProductsAllData = $ProductsAllData
            $ProductsData = new_product.data
        }
        else{

            let errors = Object.entries(new_product.err.errors)

            let msg = ''

            for (let index = 0; index < errors.length; index++) {
                const {message} = errors[index][1];
                msg += message + '\n'
            }

            console.log(msg)
            alert(`${new_product.msg}:
${msg}`)
        }
        CloseFather()
    }

</script>

<!-- price:,
    cost
description: String,
title: ,
img: String,
availbility: Boolean,
front_page: Boolean,
branch_office_id:,
category_id:, -->


<ModalContaner title = "Crear Producto" {CloseFather}>

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
            <span>Image Preview</span>
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
        <button class="margin-top-09 " on:click={()=>{Create()}}>CREAR</button>
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