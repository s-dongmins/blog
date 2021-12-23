<script lang="ts">
    import { hashs } from "@/Route";

    interface Post {
        title: string;
        hashs?: Array<string>;
        date: number;
    }
    let apiPosts: Array<Post> = [
        { title: "What is python?", hashs: ["#python"], date: 20210412 },
        {
            title: "What is javascript?",
            hashs: ["#javascript"],
            date: 20210411,
        },
        { title: "What is cpp?", hashs: ["#cpp"], date: 20210331 },
        { title: "python tips", hashs: ["#python"], date: 20210326 },
        {
            title: "How to install nodejs",
            hashs: ["#javascript"],
            date: 20210312,
        },
        { title: "cpp compiler", hashs: ["#cpp"], date: 20210224 },
        { title: "version of cpp", hashs: ["#cpp"], date: 20210212 },
        {
            title: "tensorflow machine learning",
            hashs: ["#python"],
            date: 20210211,
        },
    ];
</script>

<div class="container">
    {#each apiPosts as post}
        <div class="post">
            <div class="title">{post.title}</div>
            <div class="hashs">{post.hashs}</div>
            <div class="date">{post.date}</div>
        </div>
    {/each}
</div>

<style lang="scss">
    .container {
        display: grid;
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
