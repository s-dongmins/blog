import { name, email, comment, randint } from './FakeData';
import type { Post } from './Post';


export interface Comment {
    key: string;
    id: string;
    password: string;
    reply: string;
    admin: boolean;
    datetime: number;
    mbti: string;
    name: string;
    email: string;
    ip: string;
    content: string;
}
const mbti: string[] = [
    'ESTJ',
    'ESFJ',
    'ENFJ',
    'ENTJ',
    'ESTP',
    'ESFP',
    'ENFP',
    'ENTP',
    'ISTP',
    'ISFP',
    'INFP',
    'INTP',
    'ISTJ',
    'ISFJ',
    'INFJ',
    'INTJ',
]


function idGen(): string {
    return Math.random().toString(36).substr(2, 6);
}
function passwordGen(): string {
    return Math.random().toString(36).substr(2, 10);
}
function datetimeGen(): number {
    return (new Date()).getTime() - randint(10000000000);
}
function mbtiGen(): string {
    return randint(3) ? '' : mbti[randint(16)];
}
function nameGen(): string {
    return randint(4) ? name[randint(name.length)] : 'anonym';
}
function emailGen(): string {
    return randint(10) ? '' : email[randint(email.length)];
}
function ipGen(): string {
    return `${randint(255)}.${randint(255)}.${randint(255)}.${randint(255)}`;
}
function contentGen(): string {
    return comment[randint(comment.length)];
}

export function CommentGenerator(num: number, posts: Post[]): Comment[] {
    let result: Comment[] = []
    for (let i = 0; i < num; i++) {
        let temp: Comment = {
            key: posts[randint(posts.length)].id,
            id: idGen(),
            password: passwordGen(),
            reply: randint(4) ? '' : result[randint(result.length)].id,
            admin: false,
            datetime: datetimeGen(),
            mbti: mbtiGen(),
            name: nameGen(),
            email: emailGen(),
            ip: ipGen(),
            content: contentGen()
        };
        result.push(temp);
    }
    return result;
}
