<script lang="ts">
  import { path, hashs } from "@/Route";
  import { testAPI } from "@/testdata/APITest";
  import type { Post } from "@/testdata/Post";

  let posts: Post[] = testAPI("/page", "GET");
</script>

<style lang="scss">
  .container {
    display: flex;
    grid-template-columns: repeat(6, 1fr);
    .post {
      display: flex;
      flex-direction: column;
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
  {#each posts as post}
    <div class="post">
      <div class="title">{post.title}</div>
      <div class="hashs">{post.hashs}</div>
      <div class="datetime">{post.datetime}</div>
    </div>
  {/each}
</div>
