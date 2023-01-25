<script>
	import { loginActive } from './store/user/login.js';
	import Login from './components/login.svelte';
	import Panel from './components/panel.svelte';
	
	// import Modal from './components/tools/modal/modal-contaner.svelte';
	import './styles.css';
    import Events from './socket.io/events.svelte';
	
	
</script>

<div class="app">
	<!-- <Modal /> -->
	<Events />
	<div>
		{#if $loginActive}
			<Panel />
		{:else}
		    <Login />
		{/if}
	
	</div>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

</style>
