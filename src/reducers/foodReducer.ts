import { IStore } from '../reducers/storeReducer'

export const foodActionTypes = {
    FOOD_FETCH_REQUEST: "FOOD_FETCH_REQUEST",
    FOOD_FETCH_SUCCESS: "FOOD_FETCH_SUCCESS",
    FOOD_FETCH_FAILURE: "FOOD_FETCH_FAILURE"
}

export interface IFood {
    id: string,
    name: string,
    price: string,
    image:string,
    store: IStore
}