<script>
    import ModalContaner from "../modal-contaner.svelte";
    export let CloseFather
    
    //controllers
    import {DeleteProduct} from '../../../../controllers/products/DeleteProduct.js'

    //store
    import {loginData} from '../../../../store/user/login.js'
    import {ProductsAllData,ProductsData} from '../../../../store/products/products.js'
    import {branch_officeData} from '../../../../store/branch_office/branch_office.js'
    
    const Delete = async () =>{

        //console.log({$currentDataBranchOffice,$currentIdBranchOfficeId,$branch_officeData,$branch_officeData})

        let delete_product = await DeleteProduct($ProductsData._id,$loginData._id,$branch_officeData._id)

        let indexProdcut = $ProductsAllData.findIndex(b => b._id == $ProductsData._id)

        if(indexProdcut !==-1){
            $ProductsAllData.splice(indexProdcut,1)
             $ProductsAllData = $ProductsAllData
        }else{
            alert(delete_product.msg)
        }

        CloseFather()
   
    }

</script>


<ModalContaner title = "Eliminar Producto" {CloseFather}>

    <div style="padding: .5rem;text-align: center;">
        <p>
            Esta acción no solo borrará el producto
            <br>
            <b>¿Está seguro que desea eliminar el producto?</b>
        </p>
    </div>
    <div class="container-center">
        <button on:click={()=>{Delete()}}>ELIMINAR</button>
    </div>    
</ModalContaner>

<style>
        .container-center{
        display: grid;
        justify-items: center;
        align-items: center;
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