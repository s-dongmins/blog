<script lang="ts">
  import { fly, scale } from "svelte/transition";
  import { flip } from "svelte/animate";

  import { router, hashs } from "@/assets/modules/Route";
  import { hashmapGET } from "@/assets/modules/Api";
  import type { HashCount } from "@/assets/modules/Api";
  import { testAPI } from "@/testdata/APITest";

  let hashFlag: boolean = false;
  let apiHashs: Promise<HashCount>;
  $: {
    apiHashs = hashmapGET($hashs.map((elem) => elem.slice(1)).join(","));
  }
  function hashOver() {
    hashFlag = true;
  }
  function hashOut() {
    hashFlag = false;
  }
</script>

<div class="nav">
  <a class="home" href="/" on:click|preventDefault={router}>Dongmini</a>
  <div class="hash" on:focus={hashOver} on:mouseover={hashOver}>
    # {#if hashFlag}
      {#await apiHashs then apiHashs}
        <ul
          class="tagList"
          in:fly={{ y: 50, duration: 1000 }}
          on:mouseleave={hashOut}
        >
          {#each Object.keys(apiHashs) as h (h)}
            <a
              class="tag"
              href={"#" + h}
              transition:scale
              animate:flip={{ duration: 1000 }}
              on:click|preventDefault={router}
            >
              <div>#{h}</div>
              <div class="count">{apiHashs[h]}</div>
            </a>
          {/each}
        </ul>
      {/await}
    {/if}
  </div>
  <div class="list">
    {#each $hashs as h}
      <a class="tag" href={h} on:click|preventDefault={router}>{h}</a>
    {/each}
  </div>
</div>

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
    .hash {
      font-size: 2em;
      .tagList {
        position: absolute;
        transform: translateX(-50%);
        display: flex;
        .tag {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          font-size: 1rem;
          padding: 0.7em;
          margin: 0.3em;
          background: rgba(#000, 0.2);
          box-shadow: 0 0 10px #171346;
          border-radius: 2em;
          backdrop-filter: blur(3px);
          .count {
            font-size: 0.5em;
          }
        }
      }
    }
    .list {
      position: absolute;
      display: flex;
      right: 2em;
    }
  }
</style>
