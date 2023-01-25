<script>

	import Panel from './components/panel.svelte';
	import './styles.css';	
	import Events from './socket.io/events.svelte';
	
	
</script>

<div class="app">
	<Events />
	<div>
			<Panel />
	</div>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

</style>
