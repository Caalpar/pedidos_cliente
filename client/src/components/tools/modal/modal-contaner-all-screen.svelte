<script>
    export let title = "Agregar"
    export let CloseFather
    export let z_index = 100
    export let showSearch = false
    export let Action = undefined


    let z_index_curret = 'z-i-100'

    let text = ''

    if(z_index == 200){
        z_index_curret ='z-i-200'
    }

    const Close =()=>{
      //  console.log('aca')
        CloseFather()
    }

    const Search = () =>{
        if(showSearch && Action != undefined){
            Action(text)
        }
    }


</script>



<div class="modal {z_index_curret}">
    <div class="contenido">
        <div class="title-container">
            <h3>
                <div>
                    {title}
                </div>    
                {#if showSearch}
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" height=1.3rem width=1.3rem>
                        <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                </div>
                <input on:keyup={Search} bind:value={text} type="text" name="" id="">  
                {/if}
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
        display: grid;
        grid-template-columns: auto 4rem;
    }

    h3{
        margin: 0.5rem;
        font-size: 2rem;
        display: grid;
        grid-template-columns: 13rem 1.6rem auto;
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

    input{
        border: none;
        border-radius: .5rem;
        font-size: medium;
        font-weight: 100;
        padding: .5rem;
    }

    .z-i-100{
        z-index: 100;
    }
    .z-i-200{
        z-index: 200;
    }


    .contenido{
        background-image: radial-gradient(
			50% 50% at 50% 50%,
			rgba(255, 255, 255, 0.75) 0%,
			rgba(255, 255, 255, 0) 100%
		),
		linear-gradient(180deg, var(--color-bg-0) 0%, var(--color-bg-1) 15%, var(--color-bg-2) 50%);

        width: 96vw;
        height: 96vh;
        border-radius: .5rem;
        padding: 2vh 2vw;
    }



</style>
