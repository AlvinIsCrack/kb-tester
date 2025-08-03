<script lang="ts">
	import Footer from '$lib/ui/components/Footer.svelte';
	import Header from '$lib/ui/components/Header.svelte';
	import '../app.css';

	let { children } = $props();
</script>

{@render children()}
<Header />
<Footer />
