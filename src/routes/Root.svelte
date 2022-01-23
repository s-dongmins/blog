<script lang="ts">
  interface Guestbook {
    mbti: string;
    name: string;
    note: string;
    datetime: number;
    id: string;
  }

  let mbti: string;
  let name: string;
  let note: string;
  let guestbooks: Guestbook[] = [];
  guestbookGET();
  function handleSubmit() {
    name = name ?? "";
    if (name.length > 10) {
      alert("Name is limited to 10 characters or less.");
    } else if (!note) {
      alert("Please enter the content.");
    } else {
      guestbookPOST();
      mbti = "MBTI";
      name = "";
      note = "";
    }
  }
  async function guestbookPOST() {
    const headers = new Headers({
      "Content-Type": "application/json",
    });
    const raw = JSON.stringify({ mbti: mbti, name: name, note: note });
    const requestOptions: RequestInit = {
      method: "POST",
      headers: headers,
      body: raw,
      redirect: "follow",
    };
    const request = await fetch(
      "https://api.dongmini.net/guestbook",
      requestOptions
    );
    guestbooks = [await request.json(), ...guestbooks];
  }
  async function guestbookGET() {
    const response = await fetch("https://api.dongmini.net/guestbook");
    const json = await response.json();
    const items: Guestbook[] = json.Items.sort(
      (a: Guestbook, b: Guestbook) => b.datetime - a.datetime
    );
    guestbooks = items;
  }
  function timeCalc(timestamp: number) {
    const date = new Date(timestamp);
    return `${date.getFullYear() % 100}${
      date.getMonth() + 1
    }${date.getDate()} ${date
      .getHours()
      .toString()
      .padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;
  }
</script>

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
        #name {
          background: #06041a;
          border: none;
          color: #fff;
          font-family: inherit;
          width: 7em;
          padding-left: 0.5em;
        }
      }
      .field {
        display: flex;
        width: 100%;
        #note {
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
    .notes::-webkit-scrollbar {
      width: 6px;
    }
    .notes::-webkit-scrollbar-thumb {
      background: #3f043c;
      border-radius: 20px;
    }
    .notes {
      width: 80%;
      height: 10em;
      overflow-y: scroll;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      margin-bottom: 2em;
      .post {
        margin: 0.5em;
        .p_mbti {
          background: #06041a;
          padding: 0.5em;
          border-radius: 100em;
          font-size: 0.7em;
          color: #999;
        }
        .p_name {
          background: #06041a;
          padding: 0.5em;
          border-radius: 100em;
          font-size: 0.7em;
          color: #999;
        }
        .p_note {
          background: #06041a;
          padding: 0.5em;
          line-height: 2em;
        }
        .p_datetime {
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

<div class="component">
  <div class="card">
    <img class="profile" src="profile.jpg" alt="Profile" />
    <div class="text">
      <div class="name">Shin Dongmini</div>
      <div class="bio">Next time, I'll be the lead.</div>
      <ul class="sci">
        <li>
          <a
            href="https://facebook.com/people/%EC%8B%A0%EB%8F%99%EB%AF%BC/100004892382680/"><i
              class="fa-brands fa-facebook-f" /></a>
        </li>
        <li>
          <a href="https://github.com/s-dongmini"><i
              class="fa-brands fa-github" /></a>
        </li>
        <li>
          <a href="https://instagram.com/s.dongmini/"><i
              class="fa-brands fa-instagram" /></a>
        </li>
      </ul>
      <div class="email">dongmin.shin00@gmail.com</div>
    </div>
    <form class="guestbook" on:submit|preventDefault={handleSubmit}>
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
      </div>
      <div class="field">
        <input
          type="text"
          id="note"
          name="note"
          placeholder="Tell anything to me!"
          bind:value={note} />
        <input id="submit" type="submit" value="submit" />
      </div>
    </form>
  </div>

  <div class="notes">
    {#await guestbooks}
      <p>Waiting...</p>
    {:then guestbooks}
      {#each guestbooks as guestbook}
        <div class="post">
          {#if guestbook.mbti != 'MBTI'}
            <span class="p_mbti">{guestbook.mbti}</span>
          {/if}
          <span class="p_name">{guestbook.name}</span>
          <span class="p_note">{guestbook.note}</span>
          <span class="p_datetime">{timeCalc(guestbook.datetime)}</span>
        </div>
      {/each}
    {:catch}
      <p>error occurred :(</p>
    {/await}
  </div>
</div>
