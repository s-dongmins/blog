export interface Post {
    id: string;
    datetime: number;
    hashs: string;
    views: number;
}

let hashList: string[] = ['python', 'js', 'cpp', 'go', 'ps', 'tensorflow', 'react', 'svelte', 'aws', 'cv', 'java', 'android', 'linux'];

function idGen(): string {
    return Math.random().toString(36).substr(2, 6);
}
function datetimeGen(): number {
    return (new Date()).getTime() - Math.floor(Math.random() * 10000000);
}
function hashsGen(): string {
    hashList.sort(() => Math.random() - 0.5);
    let result: string = hashList.slice(0, Math.floor(Math.random() * 5) + 1).join(',') + ',';
    return result;
}
function viewsGen(): number {
    return Math.floor(Math.random() * 950 + 50);
}

export function PostGenerator(num: number): Post[] {
    let result: Post[] = []
    for (let i = 0; i < num; i++) {
        let temp: Post = {
            id: idGen(),
            datetime: datetimeGen(),
            hashs: hashsGen(),
            views: viewsGen()
        };
        result.push(temp);
    }
    return result;
}