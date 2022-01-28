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
</style>

<div class="component">
  <div class="post">
    <h1>{post.title}</h1>
    <div>{timeCalc(post.datetime)}</div>
    <div>{post.hashs}</div>
    <div>{post.views}</div>
    <div>{post.content}</div>
  </div>
  {#each comments as comment}
    <div class="comment">
      <span>{timeCalc(comment.datetime)}</span>
      <span>{comment.mbti}</span>
      <span>{comment.name}</span>
      <span>{comment.email}</span>
      <span>{comment.ip}</span>
      <span>{comment.content}</span>
    </div>
  {/each}
</div>
