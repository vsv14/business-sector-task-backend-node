export interface ILoginUserDto{
    id?:string
    email?: string;
    pass?: string;
}

export interface IResultLoginDto {
    token?:string;
    id?:string;
    email?: string;
}

export interface ICreateUserDto{
    email: string;
    pass: string;
    name: string;
}

export interface IUpdateProfileDto{
    email?: string;
    name?: string;
    surname?: string;
    gender?: string;
}

export interface IProfileDto{
    id?: string;
    email?: string;
    pass?: string;
    name?: string;
    surname?: string;
    gender?: string;
    photo?: string;
    createdAt?:Date,
    updatedAt?:Date
}

export interface IProfilesDto {
    total?:number;
    profiles?: IProfileDto[];
}