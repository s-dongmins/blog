<script lang="ts">
  import { timeCalc } from "@/assets/modules/Utilities";
  import { path } from "@/assets/modules/Route";
  import {
    postGET,
    commentGET,
    commentPOST,
    commentDELETE,
  } from "@/assets/modules/Api";
  import type { Post, Comment } from "@/assets/modules/Api";

  let postID: string;
  let post: Promise<Post>;
  let comments: Promise<Comment[]>;
  $: {
    postID = $path[0].slice(1);
    post = postGET(postID);
    comments = commentGET(postID);
  }

  let mbti: string;
  let name: string;
  let email: string;
  let content: string;
  let password: string;
  let deleteTarget: string = "";
  let deletePassword: string = "";

  function handleSubmit() {
    name = name ?? "";
    email = email ?? "";
    password = password ?? "";
    if (!password) {
      alert("Please enter the password.");
    } else if (name.length > 10) {
      alert("Name is limited to 10 characters or less.");
    } else if (!content) {
      alert("Please enter the content.");
    } else {
      commentPOST(postID, content, mbti, name, email, password);
      setTimeout(() => {
        comments = commentGET(postID);
      }, 1000);
      mbti = "MBTI";
      name = "";
      email = "";
      content = "";
      password = "";
    }
  }
  async function handleDelete() {
    if (await commentDELETE(postID, deleteTarget, deletePassword)) {
      setTimeout(() => {
        comments = commentGET(postID);
      }, 1000);
      deletePassword = "";
      deleteTarget = "";
    } else {
      alert("Password is Wrong!");
    }
  }
  function targetSwitch(id: string) {
    deleteTarget = id;
    deletePassword = "";
  }
</script>

<div class="component">
  <div class="post">
    {#await post}
      <p>Waiting...</p>
    {:then post}
      <h1 class="title">{post.title}</h1>
      <div class="meta">
        <span class="datetime">{timeCalc(post.datetime)}</span>
        <span class="hashs">
          {"#" + post.hashs.slice(0, -1).split(",").join(" #")}
        </span>
        <span class="views">View: {post.views}</span>
      </div>
      <div class="content">{post.content}</div>
    {/await}
    {#await comments}
      <p>Waiting...</p>
    {:then comments}
      {#each comments as comment}
        <div class="comment">
          <span class="datetime">{timeCalc(comment.datetime)}</span>
          <span class="ip">{comment.ip}</span>
          {#if comment.admin}
            <span class="admin">{comment.name}</span>
          {:else}
            <span class="name">{comment.name}</span>
          {/if}
          {#if comment.mbti !== "MBTI"}
            <span class="mbti">{comment.mbti}</span>
          {/if}
          {#if comment.email}<span class="email">{comment.email}</span>{/if}
          <span class="content">{comment.content}</span>
          {#if deleteTarget === comment.id}
            <form class="delete-field" on:submit|preventDefault={handleDelete}>
              <input
                type="password"
                id="delete"
                name="delete"
                placeholder="please input password"
                bind:value={deletePassword}
              />
              <input id="delete-submit" type="submit" value="submit" />
            </form>
          {:else}
            <button
              class="delete-button"
              on:click={() => targetSwitch(comment.id)}>Delete</button
            >
          {/if}
        </div>
      {/each}
    {/await}
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
        bind:value={name}
      />
      <input
        type="email"
        id="email"
        name="email"
        placeholder="email"
        bind:value={email}
      />
      <input
        type="password"
        id="password"
        name="password"
        placeholder="password"
        bind:value={password}
      />
    </div>
    <div class="field">
      <input
        type="text"
        id="content"
        name="content"
        placeholder="Tell anything to me!"
        bind:value={content}
      />
      <input id="submit" type="submit" value="submit" />
    </div>
  </form>
</div>

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
        line-height: 2em;
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
        .admin {
          background: #5a0808;
          padding: 0.5em;
          border-radius: 100em;
          color: #999;
          font-size: 0.5em;
        }
        #delete {
          background: #06041a;
          border: none;
          color: #fff;
          font-family: inherit;
          width: 14em;
          padding-left: 0.5em;
          margin-right: 0.5em;
        }
        #delete-submit,
        .delete-button {
          background: #06041a;
          border: none;
          border-radius: 100em;
          color: #fff;
          font-family: inherit;
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
        #name,
        #password {
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
          margin-right: 0.5em;
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
