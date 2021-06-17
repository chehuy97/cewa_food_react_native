import { Alert } from "react-native"
import {
    setAccessToken,
    setAccountID,
    setAccountEmail,
    setRefreshToken,
    removeAuthentication
} from '../utils/storage'


export const userActionTypes = {
    LOGIN_REQUEST: 'LOGIN_REQUEST',
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    LOGIN_FAILURE: 'LOGIN_FAILURE',
    LOGOUT_REQUEST: 'LOGOUT_REQUEST',
    REGISTER_REQUEST: 'REGISTER_REQUEST',
    REGISTER_SUCCESS: 'REGISTER_SUCCESS',
    REGISTER_FAILURE: 'REGISTER_FAILURE',
    FETCH_AUTH_REQUEST: 'FETCH_AUTH_REQUEST'
}

export interface IUser {
    id: string
    email: string,
    password: string,
    name: string,
    address: string,
    gender: string,
    birthday: string,
}

export type userInfo = {
    id?: string,
    email?: string,
    name?: string,
    address?: string,
    gender?: 'male' | 'fermale',
    birthday?: string,
}

export type userAuth = {
    id: string,
    email: string,
    accessToken: string,
    refreshToken: string
}

export type userPayload = {
    auth: userAuth,
    userRequest?: IUser,
    message: string,
}

export interface IUser {
    id: string
    email: string,
    password: string,
    name: string,
    address: string,
    gender: string,
    birthday: string,
}

export interface SuccessAction<T> {
    type: string,
    payload: T
}

export interface ErrorAction {
    type: string,
    payload: {
        message: string
    }
}

export const defaultUserState: userPayload = {
    auth: {
        id: '',
        email: '',
        accessToken: '',
        refreshToken: ''
    },
    userRequest: {
        id: '',
        email: '',
        password: '',
        name: '',
        address: '',
        gender: '',
        birthday: '',
    },
    message: ''
}

export type userAction = SuccessAction<userPayload> | SuccessAction<userAuth> | SuccessAction<string> | ErrorAction

const setAuthentication = async (auth: userAuth) => {
    await setAccessToken(auth.accessToken)
    await setRefreshToken(auth.refreshToken)
    await setAccountID(auth.id)
    await setAccountEmail(auth.email)
}

const reducer = (state: userPayload = defaultUserState, action: userAction): userPayload => {
    switch (action.type) {
        case userActionTypes.LOGIN_REQUEST:
            console.log("LOGIN REQUEST CALLED");
            return state
        case userActionTypes.LOGIN_SUCCESS:
            console.log("LOGIN SUCCESS CALLED");
            action = <SuccessAction<userAuth>>action
            setAuthentication(action.payload)
            state = { ...state, auth: action.payload }
            return state
        case userActionTypes.LOGIN_FAILURE:
            console.log("LOGIN FAILURE CALLED");
            action = <ErrorAction>action
            state = { ...state, message: action.payload.message }
            Alert.alert('Error', action.payload.message)
            return state
        case userActionTypes.LOGOUT_REQUEST:
            console.log("LOGOUT REQUEST CALLED");
            removeAuthentication()
            return defaultUserState
        case userActionTypes.REGISTER_SUCCESS: {
            action = <SuccessAction<string>>action
            state = { ...state, message: action.payload }
        }
            return state
        case userActionTypes.REGISTER_FAILURE:
            action = <ErrorAction>action
            state = { ...state, message: action.payload.message }
            Alert.alert('Error', action.payload.message)
            return state
        case userActionTypes.FETCH_AUTH_REQUEST:
            action = <SuccessAction<userAuth>>action
            state.auth = action.payload
            return state    
        default:
            return state
    }
}

export default reducer