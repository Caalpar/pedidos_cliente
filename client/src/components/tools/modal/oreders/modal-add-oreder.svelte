<script>
    
    import {onMount} from 'svelte'

    //path
    import {IMAGE_PATH} from '../../../../api/routes.js'

    //component
    import ModalContaner from "../modal-contaner-all-screen.svelte";
    import ModalEditNewOreder from './modal-edit-new-oreder.svelte';
    import ModalAddUserCustomer from '../user/Customer/modal-add-user-customer.svelte';
    import ModalAddUserOreder from './modal-add-user-oreder.svelte';
    
    export let CloseFather



    // controllers
    import {CreateOrder} from '../../../../controllers/orders/CreateOrder.js'
    import {GetAllProducts} from '../../../../controllers/products/GteProducts.js'

    //store
    import {loginData} from '../../../../store/user/login.js'
    import {businessData} from '../../../../store/business/businnes.js'
    import {ProductsAllData} from '../../../../store/products/products.js'
    import {branch_officeData} from '../../../../store/branch_office/branch_office.js'
    import {OrderData,OrdersAllData} from '../../../../store/order/oreder.js'


    let products
    let orders
    let categoriesPanel

    let categories = []
    let newOrders = []
    let total = 0
    let id_user = ''
    let user_name = ''
    let description = ''
    let viewDesktop = true
    let showOrder = false
    let showCategories = false

    $:react_categories = categories
    $:react_newOrders = newOrders

    onMount(async ()=>{
        let result = await GetAllProducts($branch_officeData._id)
        viewDesktop = window.matchMedia("(min-width: 800px)").matches

        if(!viewDesktop){
            console.log(orders)
            orders.classList.add('display-none')
            categoriesPanel.classList.add('display-none')
        }

     
        let sort_data = result.data.sort((a,b)=> {
            if(a.category_id.name > b.category_id.name)
                return 1
            if(a.category_id.name < b.category_id.name)
                return -1
            else
                return 0
            
        })


        for (let index = 0; index < sort_data.length; index++) {
            const product = sort_data[index];
            


            if(index == 0){
                categories.push(product.category_id)
            }else if(sort_data[index-1].category_id.name !== sort_data[index].category_id.name)
            {
                categories.push(product.category_id)
            }
            categories = categories
        }

        console.log('categories',categories)
        $ProductsAllData = sort_data
    })


    
    const Create = async () =>{

        if(id_user == ''){
            alert('Debe seleccionar un usuario para crear el pedido')
            return
        }

        if(newOrders.length == 0){
            alert('Debe seleccionar un producto para crear el pedido')
            return
        }

            let newOrder ={
                order:newOrders,
                branch_office_id:$branch_officeData._id,
                id_user,
                cashier_id:$loginData._id,
                description,
                business_id:$businessData._id
            }
    
            
            let result = await CreateOrder(newOrder)
            
            console.log('result',result)
            
            $OrdersAllData.push(result.data)
            $OrdersAllData = $OrdersAllData
    
            CloseFather()
        

    }



    const CatFilter = (id)=>{
        
            for (let index = 0; index < products.children.length; index++) {
                const product = products.children[index];
                let currnetCatId = product.getAttribute('cat_id')

                if(currnetCatId == id || id == 'all')
                    product.classList.remove('display-none')
                else
                    product.classList.add('display-none')
            }
    }

    const AddOrder = (product) =>{
        
    
        
        newOrders.push({
            id: new Date().getTime(),
            porduct_name: product.title +' '+product.description,
            product_price: product.price,
            product_cost: product.cost,
            product_description : '' 
        })

        CakculateTotal()

        console.log(newOrders)

        newOrders = newOrders
    }
    const EditOrder = (product) =>{
        
        let index = newOrders.findIndex(order => order.id == product.id)

        if(index !== -1){
            newOrders[index].product_description = product.description
            newOrders[index].product_price = product.price
        }

        CakculateTotal()

        newOrders = newOrders
    }

    const DeleteOrder = (product) =>{
        
    
        let index = newOrders.findIndex(order => order.id == product.id)

        if(index !== -1){
            newOrders.splice(index,1)
        }

        CakculateTotal()


        newOrders = newOrders
    }

    const CakculateTotal = () =>
    {
        let auxTotal = 0

        for (let index = 0; index < newOrders.length; index++) {
            const order = newOrders[index];
            auxTotal += order.product_price
        }

        total = auxTotal
    }

    const SelectUser = (user) =>
    {
        id_user = user._id
        console.log('id_user',id_user)
        user_name = user.first_name +' '+user.last_name
    }

    const ShowOrder = () =>{

        showOrder = !showOrder

        if(showOrder){
            console.log('mostrar')
            orders.classList.remove('display-none')
        }
        else{
            console.log('ocultar')
            orders.classList.add('display-none')
        }
    }
    const ShowCategories = () =>{

        showCategories = !showCategories

        if(showCategories){
            console.log('mostrar')
            categoriesPanel.classList.remove('display-none')
        }
        else{
            console.log('ocultar')
            categoriesPanel.classList.add('display-none')
        }
    }

    // abrir modal para editar pedido
    let view_edit_new_order = false

    const OpenModalEditNewOeder = (product) =>{
        view_edit_new_order = true
        $OrderData = product
    }

    const CloseModalEditNewOeder = () =>{
        view_edit_new_order = false
    }

    // abrir modal para crear usuario 
    let view_add_new_user = false

    const OpenModalAddNewUser = () =>{
        view_add_new_user = true
    }

    const CloseModalAddNewUser = () =>{
        view_add_new_user = false
    }

    // abrir modal para buscar usuario 
    let view_search_user = false

    const OpenModalSearchUser = () =>{
        view_search_user = true
    }

    const CloseModalSearchUser = () =>{
        view_search_user = false
    }

</script>



<ModalContaner title = "Crear Pedido" {CloseFather}>

    {#if view_edit_new_order}
    <ModalEditNewOreder CloseFather={CloseModalEditNewOeder} EditNewOrder={EditOrder} />
    {/if}
    {#if view_add_new_user}
    <ModalAddUserCustomer CloseFather={CloseModalAddNewUser}/>
    {/if}
    {#if view_search_user}
    <ModalAddUserOreder CloseFather={CloseModalSearchUser} SelectUserFather={SelectUser}/>
    {/if}



        <div class="btn-user search-user" on:click={()=>{OpenModalSearchUser()}}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="cube2">
                <path fill-rule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clip-rule="evenodd" />
            </svg>  
        </div>
        <div class="btn-user" on:click={()=>{OpenModalAddNewUser()}}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="cube2">
                <path d="M6.25 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM3.25 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM19.75 7.5a.75.75 0 00-1.5 0v2.25H16a.75.75 0 000 1.5h2.25v2.25a.75.75 0 001.5 0v-2.25H22a.75.75 0 000-1.5h-2.25V7.5z" />
            </svg>         
        </div>
        {#if !viewDesktop}
        <div class="btn-cat" on:click={()=>{ShowCategories()}}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="cube2">
                <path fill-rule="evenodd" d="M5.25 2.25a3 3 0 00-3 3v4.318a3 3 0 00.879 2.121l9.58 9.581c.92.92 2.39 1.186 3.548.428a18.849 18.849 0 005.441-5.44c.758-1.16.492-2.629-.428-3.548l-9.58-9.581a3 3 0 00-2.122-.879H5.25zM6.375 7.5a1.125 1.125 0 100-2.25 1.125 1.125 0 000 2.25z" clip-rule="evenodd" />
            </svg>         
        </div>
        {/if}
    <div class="contrainer">

        <div bind:this={categoriesPanel} class="category">
            <div class="cat-title">
                Categorias
            </div>
            <div class="btn-container">
                <div class="btn" on:click={()=>{CatFilter('all')}}>
                    Todas
                </div>
                {#each react_categories as caregory}
                <div class="btn" on:click={()=>{CatFilter(caregory._id)}}>
                    {caregory.name}
                </div>
                {/each}
            </div>
            {#if !viewDesktop}
            <button class="show-categories" on:click={()=>{ShowCategories()}}>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="cube2 ">
                       <path fill-rule="evenodd" d="M11.47 4.72a.75.75 0 011.06 0l7.5 7.5a.75.75 0 11-1.06 1.06L12 6.31l-6.97 6.97a.75.75 0 01-1.06-1.06l7.5-7.5zm.53 7.59l-6.97 6.97a.75.75 0 01-1.06-1.06l7.5-7.5a.75.75 0 011.06 0l7.5 7.5a.75.75 0 11-1.06 1.06L12 12.31z" clip-rule="evenodd" />
                     </svg>
                </div>
            </button>
            {/if}
        </div>
        <div bind:this={products} class="product">
            {#each $ProductsAllData as product}
                <div cat_id = {product.category_id._id} on:click={()=>{AddOrder(product)}}>
                    <div class="price">
                        ${product.price}
                    </div>
                    <div>
                        <img src={IMAGE_PATH + product.img} alt="">
                    </div>
                    <div>
                        {product.title}
                        {product.description}
                    </div>
                </div>
            {/each}
        </div>
        <div bind:this={orders} class="order">
            {#if !viewDesktop}
                 <div class="order-title" on:click={()=>{ShowOrder()}}>
                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="cube2">
                         <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 5.25l-7.5 7.5-7.5-7.5m15 6l-7.5 7.5-7.5-7.5" />
                       </svg>     
                 </div>
            {/if}
            <div class="order-title">
                Usuario: 
                {#if user_name == ''}
                    sin seleccionar
                {:else}
                     {user_name}
                {/if}
                <hr>
            </div> 
            <div class="order-title">
                Pedido
                <hr>
            </div>
            <div class="order-list">

         
            {#each react_newOrders as order}
                <div>
                    {order.porduct_name}
                </div>
                <div>
                    {order.product_description}
                </div>
                <div on:click={()=>{ OpenModalEditNewOeder(order)}}>
                    <svg class="cube" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
                        <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
                    </svg>
                </div>
                <div on:click={()=>{DeleteOrder(order)}}>
                    <svg  class="cube" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path fill-rule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" clip-rule="evenodd" />
                    </svg>  
                </div>
                <div>
                    ${order.product_price}
                </div>
                 <!-- content here -->
            {/each}
        </div>
            <div class="order-details">
                Detalle
                <hr>
                <textarea bind:value={description} cols="30" rows="10"></textarea>
                <hr>
            </div>
            <div class="total">Total</div>
            <div class="total"></div>
            <div class="total"></div>
            <div class="total"></div>
            <div class="total"><b>${total}</b></div>
         
        </div>
        <button class="btn-crate" on:click={()=>{Create()}}>Enviar Orden</button>
        {#if !viewDesktop}
             <button class="cube show-detaills" on:click={()=>{ShowOrder()}}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="cube2">
                    <path fill-rule="evenodd" d="M11.47 4.72a.75.75 0 011.06 0l7.5 7.5a.75.75 0 11-1.06 1.06L12 6.31l-6.97 6.97a.75.75 0 01-1.06-1.06l7.5-7.5zm.53 7.59l-6.97 6.97a.75.75 0 01-1.06-1.06l7.5-7.5a.75.75 0 011.06 0l7.5 7.5a.75.75 0 11-1.06 1.06L12 12.31z" clip-rule="evenodd" />
                  </svg>
                  
            </button>
        {/if}
    </div>
   
</ModalContaner>

<!-- {"_id":"63adddd8e6961a29e23fddee","price":100,"cost":90,"description":"2 lts","title":"Coca","img":"sin_foto.png","availbility":true,"front_page":true,"branch_office_id":"63a5f3fe17ee1f7cdf2fee3c","category_id":{"_id":"63a8b98eece483e8b9c5fedb","name":"Bebidas","branch_office_id":"63a5f3fe17ee1f7cdf2fee3c","__v":0},"__v":0} -->

<style>
        hr{
        border: 1px solid rgba(0, 0, 0, 0.094);
        margin: 1rem 0;
    }

    .show-detaills{
        position: absolute;
        bottom: 4rem;
        left: 44%;
        border: none;
        border-radius: 50%;
        color: white;
        padding: 0.9rem;
        background-color: rgba(0, 0, 0, 0.7);;
        display: grid;
        justify-content: center;
        align-content: center;
    }

    .show-categories{
        border: none;
        border-radius: 50%;
        padding: 0.9rem;
        display: grid;
        justify-items: center;
        align-items: center;
        width: 100%;
    }

    .cube{
        width: 1.2rem;
        height: 1.2rem;
        cursor: pointer;
    }
    .cube2{
        width: 1.3rem;
        height: 1.3rem;
        cursor: pointer;
    }

    .btn-user{
        position: absolute;
        right: 1rem;
        bottom: 2%;
        width: 1.8rem;
        height: 1.8rem;
        text-align: center;
        background-color: #04AA6D;
        color: white;
        border: none;
        cursor: pointer;
        border-radius: 50%;
        padding: 1rem;
        margin: 2rem;
        display: grid;
        justify-content: center;
        align-content: center;
        font-size: xx-large;
        z-index: 25;
    }
    .btn-cat{
        position: absolute;
        right: 2.3rem;
        top: -1rem;
        width: 0.2rem;
        height: 0.2rem;
        text-align: center;
        background-color: #04AA6D;
        color: white;
        border: none;
        cursor: pointer;
        border-radius: 50%;
        padding: 1rem;
        margin: 2rem;
        display: grid;
        justify-content: center;
        align-content: center;
        font-size: xx-large;
        z-index: 25;
    }

    .search-user{
        right: 6rem;
        }   

    ::-webkit-scrollbar{
        width: 5px;
    }
    ::-webkit-scrollbar-thumb {
        background: rgba(0, 0, 0, 0.151); 
        border-radius: 10px;
    }

    .contrainer{
        display: grid;
        grid-template-columns: 20% 55% 25%;
        /* grid-template-areas: 
        'category product product order order'
        'category product product order order'
        'category  product  product  order order'
        'category  product  product  order order'; */
        height: 80vh;
    }

    .cat-title{
        font-size: large;
        font-weight: bold;
        padding: 1rem;
    }

    .category{
        /* grid-area: category; */
        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
        border-radius: .7rem;
        margin: 1rem;
        padding: 1rem;
     
    }
    .btn-container{
        height: 65vh;
        overflow-y: scroll;
    }
    .category .btn{

        margin: .5rem;
        background-color: #04AA6D;
        padding: 1rem;
        color: white;
        border-radius: .2rem;
        cursor: pointer;
    }
    .category .btn:hover{
        background-color: white;
        color: #04AA6D;
        border: 1px solid #04AA6D;
    }

    .order-list{
        display: grid;
        grid-template-columns: 20% 20% 20% 20% 20%;
        grid-column: 1/6;
        height: 17.2vh;
        overflow-y: scroll;
    }

    .order{
        /* grid-area: order; */
        display: grid;
        grid-template-columns: 20% 20% 20% 20% 20%;
        grid-template-rows: 3rem;
        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
        text-align: center;
        margin: 1rem;
        padding: 1rem;


    }

    .order-title{
        grid-column: 1/6;
        text-align: center;
        font-weight: bolder;
        font-size: larger;

    }
    textarea{
        width: 90%;
        resize: none;
        border: none;
        border-radius: .7rem;
        padding: 1rem;
    }
    .order-details{
        grid-column: 1/6;
        text-align: center;
        font-weight: bolder;
        font-size: larger;
        align-self: flex-end;

    }

    .product{
        /* grid-area: product; */
        display: grid;
        grid-template-columns: 33% 33% 33%;
        height: 78vh;
        overflow-y: scroll;

    }

    .product > div{
        margin: 1rem;
        font-size: larger;
        font-weight: 900;
        text-align: center;
        /* background-color: rgba(0, 0, 0, 0.134); */
        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
        border-radius: 0.7rem;
        padding: 1rem;
        cursor: pointer;
        height: 15rem;
    }
    
    .product > div:hover{
        box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
    }

    .product > div > div{
        width: 15rem;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .product .price{
        text-align: right;
    }
    
    img{
            width: 10rem;
            height: 10rem;
            border-radius: .7rem;
            object-fit: cover;
        }

    .total{
        align-self: flex-end;
    }

    .btn-crate{
        grid-column: 1/6;
        margin: 1rem auto;
        width: 25vw;
        background-color: #04AA6D;
        padding: 1rem;
        color: white;
        border-radius: .7rem;
        cursor: pointer;
        border: none;
        height: 3rem;
        align-self: flex-end;
    }
    .btn-crate:hover{
        background-color: white;
        color: #04AA6D;
        border: 1px solid #04AA6D;
    }

    @media screen and (max-width:800px) {
        img{
        width: 4rem;
        height: 4rem;
        border-radius: .7rem;
        object-fit: cover;
    }
    .contrainer{
        height: 76vh;
        overflow: scroll;   
        display: block;        
    }

    .category{
        position: absolute;
        left: 0;
        top: 11vh;     
        background-image: radial-gradient(
			50% 50% at 50% 50%,
			rgba(255, 255, 255, 0.75) 0%,
			rgba(255, 255, 255, 0) 100%
		),
		linear-gradient(180deg, var(--color-bg-0) 0%, var(--color-bg-1) 15%, var(--color-bg-2) 50%);
        margin: 3%;
        padding: 3%;
        width: 88%;
    }

    .order{
        position: absolute;
        left: 0;
        top: 11vh;     
        background-image: radial-gradient(
			50% 50% at 50% 50%,
			rgba(255, 255, 255, 0.75) 0%,
			rgba(255, 255, 255, 0) 100%
		),
		linear-gradient(180deg, var(--color-bg-0) 0%, var(--color-bg-1) 15%, var(--color-bg-2) 50%);
        margin: 3%;
        padding: 3%;
        width: 88%;
        max-height: 70vh;
        overflow-x: scroll;
    }
    
    .product > div{
        margin: 0.2rem; 
        font-size: small; 
        font-weight: 900;
        text-align: left; 
        box-shadow: 0 4px 8px 0 rgb(0 0 0 / 20%);
        border-radius: 0.7rem;
        padding: 0.6rem; 
        cursor: pointer;
        height:auto;
    }
    
    .btn-user{
        margin: 0.2rem;
    }
    .product > div > div{
        width: auto;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .btn-crate{
        position: absolute;
        bottom: 0;
        width: 8rem;
        height: 3.6rem;
        left: 0;
        margin: 1.1rem;

    }

    }

</style>