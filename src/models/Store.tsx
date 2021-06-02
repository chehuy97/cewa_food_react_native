import { Food } from "./Food";

export interface Store {
    _id: string,
    name: string,
    address: string,
    type: string,
    rating: number,
    image:string,
}