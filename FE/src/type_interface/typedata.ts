export interface notiPush {
    id : number;
    message : string,
    type : string,
    timeout ?:any
}


export type DataLogin  = {
    email : string;
    password: string;
}