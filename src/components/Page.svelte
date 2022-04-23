<script lang="ts">
  import { path, hashs } from "@/assets/modules/Route";
  import { testAPI } from "@/testdata/APITest";
  import type { Post } from "@/testdata/Post";

  import { timeCalc } from "@/assets/modules/Utilities";
  import { router } from "@/assets/modules/Route";
  import { postSCAN, postLENGTH } from "@/assets/modules/Api";

  let page: number = 1;
  let posts: Promise<Post[]>;
  let length: Promise<number>;
  let pagebar: Promise<number[]>;
  $: {
    posts = postSCAN(page, $hashs.map((elem) => elem.slice(1)).join(","));
    length = postLENGTH($hashs.map((elem) => elem.slice(1)).join(","));
    pagebar = pagebarGen();
  }
  async function pagebarGen() {
    let temp = [page - 2, page - 1, page, page + 1, page + 2];
    const l = await length;
    temp = temp.filter((elem) => 0 < elem && elem <= Math.floor((l + 9) / 10));
    return temp;
  }

  function pageChange(num: number) {
    page = num;
  }
</script>

<div class="container">
  {#await length then length}
    <div class="result">{length === 0 ? "No result" : `result: ${length}`}</div>
  {/await}
  {#await posts}
    <p>Waiting...</p>
  {:then posts}
    {#each posts as post}
      <a
        class="post {post.id === $path[0].slice(1) ? 'selected' : ''}"
        href={"/" + post.id}
        on:click|preventDefault={router}
      >
        <div class="title">{post.title}</div>
        <div class="hashs">
          {"#" + post.hashs.slice(0, -1).split(",").join(" #")}
        </div>
        <div class="datetime">{timeCalc(post.datetime)}</div>
      </a>
    {/each}
  {/await}
  {#await pagebar then pagebar}
    <div class="page">
      {#each pagebar as num}
        {#if num == page}
          <span class="num location">{num}</span>
        {:else}
          <span class="num" on:click={() => pageChange(num)}>{num}</span>
        {/if}
      {/each}
    </div>
  {/await}
</div>

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
      cursor: pointer;
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
