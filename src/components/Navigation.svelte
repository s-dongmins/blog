<script lang="ts">
  import { fly, blur } from "svelte/transition";

  import { router, hashs } from "@/assets/modules/Route";
  import { testAPI } from "@/testdata/APITest";

  let hash: boolean = false;
  let apiHashs: any;
  let query: string = "";
  $: {
    query = "/hashmap?tag=" + $hashs.map((elem) => elem.slice(1)).join(",");
    apiHashs = testAPI(query, "GET");
  }
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
    position: sticky;
    top: 0;
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
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0.7em;
    margin: 0.3em;
    box-shadow: 0 0 10px #171346;
    border-radius: 2em;
    .count {
      font-size: 0.5em;
    }
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
        {#each Object.keys(apiHashs) as h}
          <a class="tag" href={'#' + h} on:click|preventDefault={router}>
            <div>#{h}</div>
            <div class="count">{apiHashs[h]}</div>
          </a>
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
