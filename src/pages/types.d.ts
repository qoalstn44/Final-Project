declare interface ItemType {
    children: { [key: string]: string }[];
    id: string;
    [key: string]: string | number;
}
declare interface CommentType {
    [key: string]: string | number;
    userId?: string;
}

declare module 'uuid'

