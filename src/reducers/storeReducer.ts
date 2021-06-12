import { IFood } from '../reducers/foodReducer'
import { store } from '../store'
import { SuccessAction } from './userReducer'

export const storeActionTypes = {
    STORE_FETCH_REQUEST: "STORE_FETCH_REQUEST",
    STORE_FETCH_SUCESS: "STORE_FETCH_SUCCESS",
    STORE_FETCH_FAILURE: "STORE_FETCH_FAILURE",
    STORE_SAVE_FAVORITE_REQUEST: "STORE_SAVE_FAVORITE_REQUEST",
    STORE_SAVE_FAVORITE_SUCCESS: "STORE_SAVE_FAVORITE_SUCCESS",
    STORE_SAVE_FAVORITE_FAILURE: "STORE_SAVE_FAVORITE_FAILURE",
    STORE_SHOW_FAVORITE_REQUEST: "STORE_SHOW_FAVORITE_REQUEST",
    STORE_SHOW_FAVORITE_SUCCESS: "STORE_SHOW_FAVORITE_SUCCESS",
    STORE_SHOW_FAVORITE_FAILURE: "STORE_SHOW_FAVORITE_FAILURE"
}

export interface IStore {
    id: string,
    name: string,
    address: string,
    type: string,
    rating: number,
    image: string,
    foods: IFood[]
}

export type storePayload = {
    stores: IStore[]
}

export const defaultStoreState: storePayload = {
    stores: []
}

export interface successStoreAction<T> {
    type: string,
    payload: T
}

export interface errorStoreAction {
    type: string,
    payload: {
        message: string
    }
}

export type storeAction = successStoreAction<storePayload>| successStoreAction<string> | errorStoreAction

const reducer = (state: storePayload = defaultStoreState, action: storeAction): storePayload => {
    switch (action.type) {
        case storeActionTypes.STORE_FETCH_SUCESS || storeActionTypes.STORE_SHOW_FAVORITE_SUCCESS:
            action = <SuccessAction<storePayload>>action
            state = action.payload
            return state
        default:
            return state
    }
}

export default reducer