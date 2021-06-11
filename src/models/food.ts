import { IStore } from './store'

export interface IFood {
    id: string,
    name: string,
    price: string,
    image:string,
    store: IStore
}