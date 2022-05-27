<script lang="ts">
  import { routerMap } from "@/assets/modules/Route";
  import { path } from "@/assets/modules/Route";
  import { hashs } from "@/assets/modules/Route";

  import Navigation from "./components/Navigation.svelte";
  import Root from "./routes/Root.svelte";
  import Page from "./components/Page.svelte";
  import About from "./routes/About.svelte";
  import Post from "./routes/Post.svelte";

  window.onpopstate = function (event: any) {
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

{#if $path[0] === routerMap.root}
  {#if $hashs.length === 0}
    <Root />
  {/if}
{:else if $path[0] === routerMap.about}
  <About />
{:else}
  <Post />
{/if}

<Page />

<style lang="scss">
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
