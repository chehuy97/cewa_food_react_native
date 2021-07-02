import { Alert } from 'react-native'
import { IFood } from '../reducers/foodReducer'
import { SuccessAction } from './userReducer'

export const storeActionTypes = {
    STORE_FETCH_REQUEST: "STORE_FETCH_REQUEST",
    STORE_FETCH_SUCESS: "STORE_FETCH_SUCCESS",
    STORE_FETCH_FAILURE: "STORE_FETCH_FAILURE",
    STORE_SHOW_FOODS_REQUEST: "STORE_SHOW_FOODS_REQUEST",
    STORE_SHOW_FOODS_SUCCESS: "STORE_SHOW_FOODS_SUCCESS",
    STORE_SHOW_FOODS_FAILURE: "STORE_SHOW_FOODS_FAILURE",
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

export type storeList = {
    stores: IStore[]
}
export type storeDetail = {
    storeDetail: IStore
}
export type storePayload = {
    stores: IStore[],
    storeDetail:IStore,
    erroMessage: string
}

export const defaultStoreState: storePayload = {
    stores: [],
    storeDetail: {
        id: '',
        name: '',
        address: '',
        type: '',
        rating: 0.0,
        image: '',
        foods: []
    },
    erroMessage: ''
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

export type storeAction = successStoreAction<storePayload> | successStoreAction<storeList> | successStoreAction<storeDetail> | successStoreAction<string> | errorStoreAction

const reducer = (state: storePayload = defaultStoreState, action: storeAction): storePayload => {
    switch (action.type) {
        case storeActionTypes.STORE_FETCH_SUCESS || storeActionTypes.STORE_SHOW_FAVORITE_SUCCESS:
            action = <SuccessAction<storeList>>action
            state = {...state, stores:[...action.payload.stores]}
            return state
        case storeActionTypes.STORE_SAVE_FAVORITE_SUCCESS:
            Alert.alert('','Saved favorite success')    
        default:
            return state
    }
}

export default reducer