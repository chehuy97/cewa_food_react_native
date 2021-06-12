import { Alert } from "react-native"
import { IStore } from '../models'


export const userActionTypes = {
    LOGIN_REQUEST: 'LOGIN_REQUEST',
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    LOGIN_FAILURE: 'LOGIN_FAILURE',
    LOGOUT_REQUEST: 'LOGOUT_REQUEST',
    LOGOUT_SUCCESS: 'LOGOUT_SUCCESS',
    LOGOUT_FAILURE: 'LOGOUT_FAILURE'
}

export type userInfo = {
    id?:string,
    email?:string,
    name?: string,
    address?:string,
    gender?: 'male' | 'fermale',
    birthday?:string,
}

export type userPayload = {
    id?:string,
    email?:string,
    accessToken?:string,
    refreshToken?:string
}

export interface IUser {
    id: string
    email: string,
    password: string,
    name: string,
    address: string,
    gender: string,
    birthday: string,
    favorite_store: IStore[]
}

export interface SuccessAction<T> {
    type:string,
    payload:T
}

export interface ErrorAction {
    type:string,
    payload: {
        message: string
    }
}

export const defaultUserState:userPayload = {
    id:'',
    email:'',
    accessToken:'',
    refreshToken:''
}

export type userAction = SuccessAction<userPayload> | ErrorAction

const reducer = (state:userPayload = defaultUserState, action:userAction):userPayload => {
    switch(action.type) {
        case userActionTypes.LOGIN_REQUEST:
            console.log("LOGIN REQUEST CALLED");
            return state            
        case userActionTypes.LOGIN_SUCCESS:
            console.log("LOGIN SUCCESS CALLED");
            action = <SuccessAction<userPayload>>action
            state = action.payload
            return state
        case userActionTypes.LOGIN_FAILURE:
            console.log("LOGIN FAILURE CALLED");
            action = <ErrorAction>action
            Alert.alert('Error', action.payload.message)
            return state
        case userActionTypes.LOGOUT_REQUEST:
            console.log("LOGOUT REQUEST CALLED");
            return defaultUserState                
        default:
            return state    
    }
}

export default reducer