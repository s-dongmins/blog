<script lang="ts">
  import { router, hashs } from "@/assets/modules/Route";
  import { fly, blur } from "svelte/transition";

  let hash: boolean = false;
  let apiHashs: string[] = [
    "#python",
    "#js",
    "#cpp",
    "#go",
    "#ps",
    "#tensorflow",
    "#react",
    "#svelte",
    "#aws",
    "#cv",
    "#java",
    "#android",
    "#linux",
  ];
  function hashOver() {
    hash = true;
  }
  function hashOut() {
    hash = false;
  }
</script>

<style lang="scss">
  .nav {
    display: flex;
    position: fixed;
    justify-content: center;
    align-items: center;
    padding: 1em 2em;
    width: 100%;
    font-weight: 200;
    z-index: 1;
    a {
      text-decoration: none;
    }
    .home {
      position: absolute;
      left: 2em;
    }
    .list {
      position: absolute;
      right: 2em;
    }
    .hash {
      .button {
        font-size: 2em;
        cursor: pointer;
      }
      .tagList {
        position: absolute;
        transform: translateX(-50%);
        display: flex;
      }
    }
  }
  .tag {
    padding: 0.7em;
    margin: 0.3em;
    box-shadow: 0 0 10px #171346;
    border-radius: 2em;
  }
</style>

<div class="nav">
  <a class="home" href="/" on:click|preventDefault={router}>Dongmini</a>
  <div class="hash" on:focus={hashOver} on:mouseover={hashOver}>
    <a class="button" href="/about" on:click|preventDefault={router}>#</a>
    {#if hash}
      <ul
        class="tagList"
        in:fly={{ y: 50, duration: 1000 }}
        out:blur={{ duration: 1000 }}
        on:mouseleave={hashOut}>
        {#each apiHashs.filter((elem) => !$hashs.includes(elem)) as h}
          <a class="tag" href={h} on:click|preventDefault={router}>{h}</a>
        {/each}
      </ul>
    {/if}
  </div>
  <div class="list">
    {#each $hashs as h}
      <a class="tag" href={h} on:click|preventDefault={router}>{h}</a>
    {/each}
  </div>
</div>
