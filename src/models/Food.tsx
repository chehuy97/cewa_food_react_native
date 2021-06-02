import { IStore } from './Store'

export interface IFood {
    id: string,
    name: string,
    price: string,
    image:string,
    store: IStore
}