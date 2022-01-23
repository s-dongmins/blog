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
    content: string;
    ip: string;
}

function keyGen(): string {
    return Math.random().toString(36).substr(2, 6);
}
function idGen(): string {
    return Math.random().toString(36).substr(2, 6);
}
function passwordGen(): string {
    return Math.random().toString(36).substr(2, 10);
}
function replyGen(): string {
    return Math.floor((Math.random() * 4)) ? '' : Math.random().toString(36).substr(2, 6);
}
function datetimeGen(): number {
    return (new Date()).getTime() - Math.floor(Math.random() * 10000000);
}
function mbtiGen(): string {
    return '';
}
function nameGen(): string {
    return 'steve';
}
function emailGen(): string {
    return 'steve@steve.com';
}
function contentGen(): string {
    return 'Lorem ipsum dolor sit amet';
}
function ipGen(): string {
    return `${Math.random() * 255}.${Math.random() * 255}.${Math.random() * 255}.${Math.random() * 255}`;
}

export function CommentGenerator(num: number): Comment[] {
    let result: Comment[] = []
    for (let i = 0; i < num; i++) {
        let temp: Comment = {
            key: keyGen(),
            id: idGen(),
            password: passwordGen(),
            reply: replyGen(),
            admin: false,
            datetime: datetimeGen(),
            mbti: mbtiGen(),
            name: nameGen(),
            email: emailGen(),
            content: contentGen(),
            ip: ipGen()
        };
        result.push(temp);
    }
    return result;
}