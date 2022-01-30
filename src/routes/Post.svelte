<script lang="ts">
  import { testAPI } from "@/testdata/APITest";
  import type { Post } from "@/testdata/Post";
  import type { Comment } from "@/testdata/Comment";

  import { timeCalc } from "@/assets/modules/Utilities";
  import { router, path } from "@/assets/modules/Route";

  let postID: string = "";
  let post: Post;
  let comments: Comment[] = [];
  $: {
    postID = $path[0].slice(1);
    post = testAPI(`/post/${postID}`, "GET");
    comments = testAPI(`/comment/${postID}`, "GET");
  }
</script>

<style lang="scss">
  .component {
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    .post {
      width: 70%;
      display: flex;
      flex-direction: column;
      margin: 2em;
      .title {
        font-size: 3em;
      }
      .datetime,
      .hashs,
      .views {
        background: #06041a;
        padding: 0.5em;
        border-radius: 100em;
        color: #999;
      }
      .comment {
        margin: 1em;
        .datetime,
        .ip,
        .name,
        .mbti,
        .email {
          background: #06041a;
          padding: 0.5em;
          border-radius: 100em;
          color: #999;
          font-size: 0.5em;
        }
      }
    }
  }
</style>

<div class="component">
  <div class="post">
    <h1 class="title">{post.title}</h1>
    <div class="datetime">{timeCalc(post.datetime)}</div>
    <div class="hashs">
      {'#' + post.hashs.slice(0, -1).split(',').join(' #')}
    </div>
    <div class="views">View: {post.views}</div>
    <div class="content">{post.content}</div>
    {#each comments as comment}
      <div class="comment">
        <span class="datetime">{timeCalc(comment.datetime)}</span>
        <span class="ip">{comment.ip}</span>
        <span class="name">{comment.name}</span>
        <span class="mbti">{comment.mbti}</span>
        <span class="email">{comment.email}</span>
        <span class="content">{comment.content}</span>
      </div>
    {/each}
  </div>
</div>
