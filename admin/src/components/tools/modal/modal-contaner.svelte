<script>
    export let title = "Agregar"
    export let CloseFather
    export let z_index = 100

    let z_index_curret = 'z-i-100'

    if(z_index == 200){
        z_index_curret ='z-i-200'
    }

    const Close =()=>{
      //  console.log('aca')
        CloseFather()
    }


</script>



<div class="modal {z_index_curret}">
    <div class="contenido">
        <div class="title-container">
            <h3>
                {title}
            </h3>          
            <div class="close" on:click={()=>{Close()}}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="2rem" height="2rem">
                    <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z" clip-rule="evenodd" />
                  </svg>
            </div>
        </div>
        <slot />
    </div>
</div>


<style>

    .title-container{
        color: white;
        display: grid;
        grid-template-columns: auto 4rem;
    }

    h3{
        margin: 0.5rem;
        font-size: 2rem;
    }

    .close{
        justify-self: end;
        margin-top: 0.3rem;
        margin-right: 0.3rem;
        cursor: pointer;
    }

    .modal{
        position: fixed;
        left: 0;
        top: 0;
        width: 100vw;
        height: 100vh;
        background-color: rgba(54, 54, 54, 0.521);
        display: grid;
        align-items: center;
        justify-items: center;
    }

    .z-i-100{
        z-index: 100;
    }
    .z-i-200{
        z-index: 200;
    }


    .contenido{
        background-image: linear-gradient(to top right, #B066FE,#63E2FF);

        width: 100vw;
        border-radius: .5rem;
        margin: 2rem auto;
    }

    @media screen and (min-width:800px) {

        .contenido{
            width: auto;
            top: 0;
        }
    }


</style>
