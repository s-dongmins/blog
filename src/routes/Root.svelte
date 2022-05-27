<script lang="ts">
  import { timeCalc } from "@/assets/modules/Utilities";
  import { commentGET, commentPOST } from "@/assets/modules/Api";
  import type { Comment } from "@/assets/modules/Api";

  let mbti: string;
  let name: string;
  let content: string;
  let password: string;
  let guestbooks: Promise<Comment[]> = commentGET("guestbook");
  function handleSubmit() {
    name = name ?? "";
    password = password ?? "";
    if (!password) {
      alert("Please enter the password");
    } else if (name.length > 10) {
      alert("Name is limited to 10 characters or less.");
    } else if (!content) {
      alert("Please enter the content.");
    } else {
      commentPOST("guestbook", content, mbti, name, "", password);
      setTimeout(() => {
        guestbooks = commentGET("guestbook");
      }, 1000);
      mbti = "MBTI";
      name = "";
      content = "";
      password = "";
    }
  }
</script>

<div class="component">
  <div class="card">
    <img class="profile" src="/profile.jpg" alt="Profile" />
    <div class="text">
      <div class="name">Shin Dongmini</div>
      <div class="bio">Next time, I'll be the lead.</div>
      <ul class="sci">
        <li>
          <a
            href="https://facebook.com/people/%EC%8B%A0%EB%8F%99%EB%AF%BC/100004892382680/"
            ><i class="fa-brands fa-facebook-f" /></a
          >
        </li>
        <li>
          <a href="https://github.com/s-dongmini"
            ><i class="fa-brands fa-github" /></a
          >
        </li>
        <li>
          <a href="https://instagram.com/s.dongmini/"
            ><i class="fa-brands fa-instagram" /></a
          >
        </li>
      </ul>
      <div class="email">dongmin.shin00@gmail.com</div>
    </div>
  </div>
  <form class="guestbook" on:submit|preventDefault={handleSubmit}>
    <div class="info">
      <select id="mbti" name="mbti" bind:value={mbti}>
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

  <div class="comments">
    {#await guestbooks}
      <p>Waiting...</p>
    {:then guestbooks}
      {#each guestbooks as guestbook}
        <div class="comment">
          {#if guestbook.mbti != "MBTI"}
            <span class="mbti">{guestbook.mbti}</span>
          {/if}
          {#if guestbook.admin}
            <span class="admin">{guestbook.name}</span>
          {:else}
            <span class="name">{guestbook.name}</span>
          {/if}
          <span class="content">{guestbook.content}</span>
          <span class="datetime">{timeCalc(guestbook.datetime)}</span>
        </div>
      {/each}
    {:catch}
      <p>error occurred :(</p>
    {/await}
  </div>
</div>

<style lang="scss">
  .component {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    .card {
      position: relative;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      cursor: default;
      .profile {
        padding: 1em;
        border-radius: 50%;
        width: 600px;
        height: 600px;
      }
      .text {
        position: absolute;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        bottom: 50%;
        text-shadow: 0 0 15px #fff;
        .name {
          text-align: center;
          font-size: 9vh;
          font-weight: 500;
        }
        .bio {
          padding-top: 1.5em;
          text-align: center;
          font-weight: 200;
        }
        .sci {
          display: flex;
          justify-content: space-between;
          width: 50%;
          margin-top: 50px;
          li {
            list-style: none;
            margin: 4px;
            a {
              width: 45px;
              height: 45px;
              display: flex;
              justify-content: center;
              align-items: center;
              border-radius: 50%;
              background: transparent;
              font-size: 1.25em;
              text-decoration: none;
              box-shadow: 0 0 15px rgba(#171346, 0.5);
              transition: all 0.3s ease-out;
            }
            a:hover {
              background: rgba(#3f043c, 0.6);
              transform: translateY(-10px);
              box-shadow: 0 10px 15px rgba(#afa9ec, 0.3);
            }
          }
        }
        .email {
          font-size: 0.7em;
          color: rgba(#fff, 0.5);
          font-weight: 200;
        }
      }
    }
    .guestbook {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 80%;
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
    .comments::-webkit-scrollbar {
      width: 6px;
    }
    .comments::-webkit-scrollbar-thumb {
      background: #3f043c;
      border-radius: 20px;
    }
    .comments {
      width: 80%;
      height: 10em;
      overflow-y: scroll;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      margin-bottom: 2em;
      .comment {
        margin: 0.5em;
        .mbti {
          background: #06041a;
          padding: 0.5em;
          border-radius: 100em;
          font-size: 0.7em;
          color: #999;
        }
        .admin {
          background: #5a0808;
          padding: 0.5em;
          border-radius: 100em;
          font-size: 0.7em;
          color: #999;
        }
        .name {
          background: #06041a;
          padding: 0.5em;
          border-radius: 100em;
          font-size: 0.7em;
          color: #999;
        }
        .content {
          background: #06041a;
          padding: 0.5em;
          line-height: 2em;
        }
        .datetime {
          background: #06041a;
          padding: 0.5em;
          border-radius: 100em;
          font-size: 0.7em;
          color: #999;
        }
      }
    }
  }
</style>
