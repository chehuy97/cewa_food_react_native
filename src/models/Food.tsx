import { Store } from './Store'

export interface Food {
    _id: string,
    name: string,
    price: string,
    image:string,
    store:Store
}