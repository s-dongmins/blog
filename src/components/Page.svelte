<script lang="ts">
  import { path, hashs } from "@/assets/modules/Route";
  import { testAPI } from "@/testdata/APITest";
  import type { Post } from "@/testdata/Post";

  let page: number = 1;
  let pagebar: number[] = [page - 2, page - 1, page, page + 1, page + 2].filter(
    (elem) => elem > 0
  );
  let posts: Post[] = [];
  let query: string = "/page";
  $: query =
    "/page?tag=" +
    $hashs.map((elem) => elem.slice(1)).join(",") +
    "&page=" +
    page.toString();
  console.log("testing");
  console.log(query);
  $: posts = testAPI(query, "GET");

  function test() {
    console.log(query);
    console.log($hashs);
  }
</script>

<style lang="scss">
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    .post {
      width: 90%;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 1em;
      border-radius: 2em;
      box-shadow: 0 0 10px #171346;
      height: 200px;
      .title {
        text-align: center;
        font-size: 1.25em;
      }
      .hashs {
      }
      .date {
        font-size: 0.75em;
        font-weight: 200;
        margin-top: 1em;
      }
    }
  }
</style>

<div class="container">
  <div on:click={test}><br /><br /><br /><br /><br /><br /><br />click me</div>
  {#each posts as post}
    <a class="post" href="#">
      <div class="title">{post.title}</div>
      <div class="hashs">{post.hashs}</div>
      <div class="datetime">{post.datetime}</div>
    </a>
  {/each}
  <div class="page">
    {#each pagebar as num}<span class="num">{num}</span>{/each}
  </div>
</div>
