import { IFood } from "./food";

export interface IStore {
    id: string,
    name: string,
    address: string,
    type: string,
    rating: number,
    image:string,
    foods: IFood[]
}

