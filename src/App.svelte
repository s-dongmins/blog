<script lang="ts">
	import { routerMap } from "@/Route";
	import { path } from "@/Route";
	import { hashs } from "@/Route";

	import Navigation from "./components/Navigation.svelte";
	import Posts from "./components/Posts.svelte";
	import Root from "./routes/Root.svelte";
	import Hash from "./routes/Hash.svelte";
	import Setting from "./routes/Setting.svelte";
	import NotFound from "./routes/NotFound.svelte";

	window.onpopstate = function (event) {
		$path = (event.state && event.state.path) ?? [routerMap.root];
		$hashs = window.location.hash
			.slice(1)
			.split("#")
			.map((elem) => "#" + elem)
			.filter((elem) => elem !== "#");
	};
	const DOMContentLoaded = "DOMContentLoaded";
	window.addEventListener(DOMContentLoaded, () => {
		$path = window.location.pathname
			.slice(1)
			.split("/")
			.map((elem) => "/" + elem);
		$hashs = window.location.hash
			.slice(1)
			.split("#")
			.map((elem) => "#" + elem)
			.filter((elem) => elem !== "#");
	});
</script>

<div class="color1" />
<div class="color2" />

<Navigation />
<div class="gap" />
{#if $path[0] === routerMap.root}
	<Root />
{:else if $path[0] === routerMap.hash}
	<Hash id={parseInt($path[1] && $path[1].slice(1)) || -1} />
{:else if $path[0] === routerMap.setting}
	<Setting />
{:else}
	<NotFound />
{/if}

<style lang="scss">
	.gap {
		height: 4em;
	}
	.color1 {
		position: fixed;
		filter: blur(500px);
		z-index: -1;
		top: -40%;
		left: 0;
		width: 1000px;
		height: 1000px;
		border-radius: 50%;
		background: #04154b;
	}
	.color2 {
		position: fixed;
		filter: blur(500px);
		z-index: -1;
		bottom: -40%;
		right: 0;
		width: 1000px;
		height: 1000px;
		border-radius: 50%;
		background: #3f043c;
	}
</style>
