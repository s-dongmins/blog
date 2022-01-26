import { writable, Writable } from "svelte/store";


export const routerMap = {
    root: "/",
    aboutme: "/aboutme",
    hash: "/hash",
    setting: "/setting",
};

export const path = writable(["/"]);
let pathSub: Array<string> = ["/"];
const pathUnsubscriber = path.subscribe(path => {
    pathSub = path;
})

export const hashs: Writable<string[]> = writable([]);
let hashsSub: Array<string> = [];
const hashsUnsubscriber = hashs.subscribe(hashs => {
    hashsSub = hashs;
})


export function router(this: HTMLAnchorElement) {
    if (this.hash) {
        hashRouter.bind(this)();
    } else {
        if (pathSub.join("") === this.pathname) {
            return;
        }
        pathRouter.bind(this)();
    }
    history.pushState({ path: pathSub }, "", pathSub.join("") + hashsSub.join(""));
}

function pathRouter(this: HTMLAnchorElement) {
    path.set(this.pathname.slice(1).split('/').map((elem) => '/' + elem));
}

function hashRouter(this: HTMLAnchorElement) {
    let tempHashsSub = hashsSub;
    if (hashsSub.includes(this.hash)) {
        tempHashsSub.splice(tempHashsSub.indexOf(this.hash), 1);
    } else {
        if (tempHashsSub.length === 0 && tempHashsSub[0] === "#") {
            tempHashsSub = [this.hash];
        } else {
            tempHashsSub.push(this.hash);
        }
    }
    hashs.set(tempHashsSub);
}