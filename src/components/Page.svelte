<script lang="ts">
  import { path, hashs } from "@/assets/modules/Route";
  import { testAPI } from "@/testdata/APITest";
  import type { Post } from "@/testdata/Post";

  import { timeCalc } from "@/assets/modules/Utilities";
  import { router } from "@/assets/modules/Route";

  let page: number = 1;
  let length: number = 0;
  let posts: Post[] = [];
  let query: string = "/page";
  let pagebar: number[] = [];
  $: {
    query =
      "?tag=" +
      $hashs.map((elem) => elem.slice(1)).join(",") +
      "&page=" +
      page.toString();
    posts = testAPI("/page" + query, "GET");
    length = testAPI("/length" + query, "GET");
    pagebar = [page - 2, page - 1, page, page + 1, page + 2].filter(
      (elem) => 0 < elem && elem <= Math.floor((length + 9) / 10)
    );
  }

  function pageChange(num: number) {
    page = num;
  }
</script>

<style lang="scss">
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    .result {
      font-size: 0.8em;
      margin: 2em;
    }
    .post {
      width: 70%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin: 1em;
      box-shadow: 2px 7px 5px #04031a;
      height: 100px;
      transition: all 0.3s ease-out;
      .title {
        text-align: center;
        font-size: 1.25em;
      }
      .hashs {
        font-size: 0.75em;
      }
      .datetime {
        font-size: 0.75em;
        font-weight: 200;
        margin-top: 1em;
      }
    }
    .post:hover {
      background: #1c041f;
      transform: translateY(-10px);
      box-shadow: 3px 10px 15px rgba(#afa9ec, 0.3);
    }
    .selected {
      background: #1c041f;
      border-radius: 2em;
      box-shadow: 3px 10px 15px rgba(#afa9ec, 0.3);
    }
    .page {
      margin: 4em;
      .num {
        padding: 1em;
        height: 2em;
        width: 2em;
        text-align: center;
      }
      .location {
        background: #06041a;
        border-radius: 100em;
      }
    }
  }
</style>

<div class="container">
  <div class="result">{length === 0 ? 'No result' : `result: ${length}`}</div>
  {#each posts as post}
    <a
      class="post {post.id === $path[0].slice(1) ? 'selected' : ''}"
      href={'/' + post.id}
      on:click|preventDefault={router}>
      <div class="title">{post.title}</div>
      <div class="hashs">
        {'#' + post.hashs.slice(0, -1).split(',').join(' #')}
      </div>
      <div class="datetime">{timeCalc(post.datetime)}</div>
    </a>
  {/each}
  <div class="page">
    {#each pagebar as num}
      {#if num == page}
        <span class="num location">{num}</span>
      {:else}
        <span class="num" on:click={() => pageChange(num)}>{num}</span>
      {/if}
    {/each}
  </div>
</div>
