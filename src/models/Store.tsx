import { IFood } from "./Food";

export interface IStore {
    id: string,
    name: string,
    address: string,
    type: string,
    rating: number,
    image:string,
    foods: IFood[]
}

