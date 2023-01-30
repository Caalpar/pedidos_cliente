<script>
    import {onMount} from 'svelte'
    export let text_content = ''
    export let text_titel = ''


    onMount(()=>{
        console.log('popup')
    })
</script>


    <div class="popup">
        <div style="margin: .5rem 0;">
            <b>{text_titel}</b>
        </div> 
        <div>
            {text_content}
        </div>
    </div>


<style>


    .popup{
        position: absolute;
        bottom: 0rem;
        right: 0;
        background-color: rgb(108, 72, 72);
        border-radius: .5rem 0 0 0;
        color: white;
        width: 15rem;
        height: min-content;
        animation-name: move;
        animation-duration: 5s;
        padding: 1rem;
        opacity: 0;
        z-index: 100;
    }

    .popup > div
    {
        word-wrap: break-word;
    }

    @keyframes move
    {
        0%   { opacity: 0;}
        25%   {opacity: 25;}
        50%   {opacity: 100;}
        75%   {opacity: 25;}
        100%   {opacity: 0;}
    }
</style>