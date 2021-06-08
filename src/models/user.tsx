import {IStore} from './store'

export interface IUser {
    id:string
    email:string,
    password:string,
    name:string,
    address:string,
    gender:string,
    birthday:string,
    favorite_store:IStore[]
}