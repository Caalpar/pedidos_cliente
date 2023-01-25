<script>
	import { onMount } from "svelte";
    import {BRANCH_ID} from "../../global/global.js"

    //path
    import {IMAGE_PATH} from '../../api/routes.js'

    //componentes
    import Popup from './popup.svelte'
    

    //controllers
    import {GetAllProducts} from '../../controllers/products/GteProducts.js'
    
    // store
    import { loginData } from "../../store/user/login";
    import { ProductsData } from "../../store/products/products.js";
    import {OrdersAllData} from '../../store/order/oreder.js'

    let products = []
    let category = []
    let container
    let filterCategoryText = 'Todo'
    let textinput
    let showPopup = false

    onMount(async ()=>{
      //  let products_result = await GetAllProducts($loginData.branch_office_id)
        let products_result = await GetAllProducts(BRANCH_ID)

        if(products_result.data)
        {
            products = products_result.data.sort((a,b)=>{
                if(a.category_id.name>b.category_id.name)
                    return -1
                else if(a.category_id.name<b.category_id.name)
                    return 1
                else
                    return 0
            })
        }

        for (let index = 0; index < products.length; index++) {
            const product = products[index];
          

            if(index == 0)
            {
                category.push(product.category_id)
            }
            else
            {
                const lastProduct = products[index-1];
                if(product.category_id.name !== lastProduct.category_id.name){
                    category.push(product.category_id)
                }
            }


        }

        console.log($loginData)
        console.log(products_result)
        console.log(category)
    })

    const SearchCategories = (id,name) =>{

        filterCategoryText = name

        for (let index = 1; index < container.children.length; index++) {
            const child = container.children[index];
            const id_category = child.getAttribute('cat-id')

            if(id == id_category || id == 'all')
             child.classList.remove('display-none')
            else
             child.classList.add('display-none')
        }
    }
    const SearchWhitText = () =>{



        for (let index = 1; index < container.children.length; index++) {
            const child = container.children[index];


            if(child.innerHTML.toUpperCase().indexOf(textinput.toUpperCase())>-1)
             child.classList.remove('display-none')
            else
             child.classList.add('display-none')
        }

    }

    const AddProduct = (product) =>{
        $ProductsData = product
        $OrdersAllData.push(product)
        $OrdersAllData = $OrdersAllData
        showPopup = true
        setTimeout(() => {
            showPopup = false
        }, 3000);
    }


</script>



{#if showPopup}
     <Popup />
{/if}

<div class="filter">
    <div class="drop-categories">
    {#if products.length>0}
        {filterCategoryText}

        <div class="drop-container">
            <div on:click={()=>{SearchCategories('all','Todo')}}>
                Todo
            </div>
            {#each category as category}
                    <div on:click={()=>{SearchCategories(category._id,category.name)}}>
                        {category.name}
                    </div>
            {/each}
        </div>

    {:else} 
        cargando...
    {/if}
    </div>
    <input on:keyup={()=>{SearchWhitText()}} bind:value={textinput} type="text" name="" id="" placeholder="Buscar productos...">
</div>

<div bind:this={container} class="container">

    {#each products as product,index}
         
        {#if index == 0}
            <div class="cat-name" cat-id = {product.category_id._id}>
                {product.category_id.name}
            </div>
        {:else if  products[index].category_id.name != products[index-1].category_id.name}
            <div class="cat-name" cat-id = {product.category_id._id}>
                {product.category_id.name}
            </div>
        {/if}

        <div class="item" cat-id = {product.category_id._id} on:click={()=>{AddProduct(product)}}>
            <div>
                <div>
                   <b>{product.title}</b>
                </div>
                <div class="description">
                    {product.description}
                </div>
            </div>
            <div>
                <img src={IMAGE_PATH + product.img} alt="">
            </div>
            <div class="price">
                ${product.price}
            </div>
        </div>
    {/each}
</div>


<style>

    ::-webkit-scrollbar {
    height: 10px;
    width: 10px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px grey; 
    border-radius: 10px;
    }
    
    /* Handle */
    ::-webkit-scrollbar-thumb {
    background: rgba(128, 128, 128, 0.422); 
    border-radius: 10px;
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
    background: rgb(128, 128, 128);; 
    }


.container{
    display: grid;
    grid-template-columns: 50% 50%;
    width: 50vw;
    margin: 2vh auto;
    height: 70vh;
    overflow-y: scroll
}
.container>div
{
    margin: .5rem;
}
.filter
{
    display: grid;
    grid-template-columns: 30% 69.5%;
    gap: 1%;
    width: 50vw;
    margin: 1rem auto;
}
.filter > input{
    padding: 2%;
    width: 95%;
    border: none;
    border-radius: .2rem;
}

.cat-name{
    grid-column: 1 / 3;
    background-color: #1e293b;;
    color: white;
    padding: .2rem;
    padding-left: .5rem;
    font-size: x-large;
    border-radius: .2rem;
    font-weight: bolder;
}

.drop-categories{
    position: relative;
    padding: 1rem;
    background-color: #1e293b;;
    color: white;
    border-radius: .2rem;
    cursor: pointer;
}

.drop-categories:hover .drop-container{
    display: block;
}

.drop-container{
    margin: 1rem 0;
    position: absolute;
    top: 2.3rem;
    left: 0;
    background-color: #1e293b;;
    width: 100%;
    border-radius: .2rem;
    font-size: larger;
    display: none;
}
.drop-container>div
{
    padding: 1rem 2rem;
}
.drop-container>div:hover
{
    background-color: white;
    color: #1e293b;;
}

.item
{
    box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
    display: grid;
    grid-template-columns: auto 5rem;
    padding: 0.4rem;
    border-radius: .5rem;
    cursor: pointer;
}

.description{
    word-break:break-all;
    padding: .2rem;
}

.item:hover
{
    background-color: rgba(245, 191, 121, 0.116);
}

.item > div > img{
    width: 5rem;
    height: 5rem;
    object-fit: cover;
    border-radius: .2rem;
}

.price{
    grid-column: 1 / 3;
    font-weight: bolder;
}

@media screen and (max-width:800px) {

    .container{
        margin: 2vh 1vw;
        width: 97vw;
        height: 55vh;
    }
    .filter{
        margin: 2vh 1vw;
        width: 97vw;
       
    }

    .drop-container>div
    {
        padding: 1rem .9rem;
    }

    .item{
        grid-column: 1 / 3;
        margin: .5rem;
        box-shadow: rgba(0, 0, 0, 0.18) 0px 2px 4px;
    }

}

</style>
