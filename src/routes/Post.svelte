<script lang="ts">
  import { testAPI } from "@/testdata/APITest";
  import type { Post } from "@/testdata/Post";
  import type { Comment } from "@/testdata/Comment";

  import { timeCalc } from "@/assets/modules/Utilities";
  import { path } from "@/assets/modules/Route";

  let postID: string = "";
  let post: Post;
  let comments: Comment[] = [];
  $: {
    postID = $path[0].slice(1);
    post = testAPI(`/post/${postID}`, "GET");
    comments = testAPI(`/comment/${postID}`, "GET");
  }

  let mbti: string;
  let name: string;
  let email: string;
  let content: string;
  function handleSubmit() {
    name = name ?? "";
    email = email ?? "";
    if (name.length > 10) {
      alert("Name is limited to 10 characters or less.");
    } else if (!content) {
      alert("Please enter the content.");
    } else {
      mbti = "MBTI";
      name = "";
      email = "";
      content = "";
    }
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
      .meta {
        margin-top: 1.5em;
        .datetime,
        .hashs,
        .views {
          background: #06041a;
          font-size: 0.8em;
          padding: 0.5em;
          border-radius: 100em;
          color: #999;
        }
      }
      .content {
        margin: 3em 0 3em 0;
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
    .comment-field {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 70%;
      .info {
        display: flex;
        #mbti {
          background: #06041a;
          appearance: none;
          border: none;
          border-radius: 100px;
          color: #fff;
          font-family: inherit;
          padding: 0.5em;
          margin-right: 0.5em;
          text-align: center;
        }
        #name {
          background: #06041a;
          border: none;
          color: #fff;
          font-family: inherit;
          width: 7em;
          padding-left: 0.5em;
          margin-right: 0.5em;
        }
        #email {
          background: #06041a;
          border: none;
          color: #fff;
          font-family: inherit;
          width: 14em;
          padding-left: 0.5em;
        }
      }
      .field {
        display: flex;
        width: 100%;
        #content {
          background: #06041a;
          border: none;
          color: #fff;
          font-family: inherit;
          width: 100%;
          padding: 0.5em;
          margin: 0.5em 0.5em 0 0;
        }
        #submit {
          background: #06041a;
          border: none;
          border-radius: 100em;
          color: #fff;
          font-family: inherit;
        }
      }
    }
  }
</style>

<div class="component">
  <div class="post">
    <h1 class="title">{post.title}</h1>
    <div class="meta">
      <span class="datetime">{timeCalc(post.datetime)}</span>
      <span class="hashs">
        {'#' + post.hashs.slice(0, -1).split(',').join(' #')}
      </span>
      <span class="views">View: {post.views}</span>
    </div>
    <div class="content">{post.content}</div>
    {#each comments as comment}
      <div class="comment">
        <span class="datetime">{timeCalc(comment.datetime)}</span>
        <span class="ip">{comment.ip}</span>
        <span class="name">{comment.name}</span>
        {#if comment.mbti !== 'MBTI'}
          <span class="mbti">{comment.mbti}</span>
        {/if}
        {#if comment.email}<span class="email">{comment.email}</span>{/if}
        <span class="content">{comment.content}</span>
      </div>
    {/each}
  </div>
  <form class="comment-field" on:submit|preventDefault={handleSubmit}>
    <div class="info">
      <select id="mbti" name="mbti" class="mbti" bind:value={mbti}>
        <option value="MBTI" selected>MBTI</option>
        <option value="ESTJ">ESTJ</option>
        <option value="ESFJ">ESFJ</option>
        <option value="ENFJ">ENFJ</option>
        <option value="ENTJ">ENTJ</option>
        <option value="ESTP">ESTP</option>
        <option value="ESFP">ESFP</option>
        <option value="ENFP">ENFP</option>
        <option value="ENTP">ENTP</option>
        <option value="ISTP">ISTP</option>
        <option value="ISFP">ISFP</option>
        <option value="INFP">INFP</option>
        <option value="INTP">INTP</option>
        <option value="ISTJ">ISTJ</option>
        <option value="ISFJ">ISFJ</option>
        <option value="INFJ">INFJ</option>
        <option value="INTJ">INTJ</option>
      </select>
      <input
        type="text"
        id="name"
        name="name"
        placeholder="name"
        bind:value={name} />
      <input
        type="email"
        id="email"
        name="email"
        placeholder="email"
        bind:value={email} />
    </div>
    <div class="field">
      <input
        type="text"
        id="content"
        name="content"
        placeholder="Tell anything to me!"
        bind:value={content} />
      <input id="submit" type="submit" value="submit" />
    </div>
  </form>
</div>
