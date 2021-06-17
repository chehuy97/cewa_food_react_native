import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { userActionTypes, userPayload, SuccessAction, userAction, ErrorAction, userAuth, IUser } from '../reducers/userReducer'
import { goBack } from '../routes/rootNavigation'
import { login, register } from '../service/network'
import {ToastAndroid} from 'react-native'

export interface userLoginWithEmail {
    email: string,
    password: string
}

export const login_request = (user: userLoginWithEmail, callback: () => void):
    ThunkAction<Promise<void>, {}, {}, userAction> => {
    return (dispatch: ThunkDispatch<{}, {}, userAction>) => {
        return login(user).then(response => {
            let result = response.data
            
            let userAuth: userAuth = {
                id: result.data.user_id,
                email: user.email,
                accessToken: 'bearer '+result.data.access_token,
                refreshToken: result.data.refresh_token
            }
            dispatch(login_success(userAuth))
            callback()
        }).catch(err => {
            console.log("Error login fail");

            dispatch(login_failure(err))
        })
    }
}

export const login_success = (payload: userAuth): SuccessAction<userAuth> => {
    return {
        type: userActionTypes.LOGIN_SUCCESS,
        payload: payload
    }
}

export const login_failure = (err: any): ErrorAction => {
    console.log(err);

    return {
        type: userActionTypes.LOGIN_FAILURE,
        payload: {
            message: err.response.data.errorMessage
        }
    }
}

export const logout_request = (): SuccessAction<string> => {
    return {
        type: userActionTypes.LOGOUT_REQUEST,
        payload: "LOGOUT ACCOUNT"
    }
}

export const register_request = (user: IUser):ThunkAction<Promise<void>, {}, {}, userAction> => {
    return (dispatch: ThunkDispatch<{}, {}, userAction>) => {
        return register(user).then(res => {
            dispatch(register_success),
            goBack()
            ToastAndroid.show("Register successfully", ToastAndroid.SHORT);
        }).catch(err => {
            dispatch(err.response.data.errorMessage)
        })
    }
}

export const register_success = (): SuccessAction<string> => {
    return {
        type: userActionTypes.REGISTER_SUCCESS,
        payload: "Register success"
    }
}

export const register_failure = (msg: string): ErrorAction => {
    return {
        type: userActionTypes.REGISTER_FAILURE,
        payload: {
            message: "Register fail"
        }
    }
}

export const fetch_auth_request = (auth:userAuth):SuccessAction<userAuth> => {
    return {
        type: userActionTypes.FETCH_AUTH_REQUEST,
        payload: {
            id: auth.id,
            email: auth.email,
            accessToken: auth.accessToken,
            refreshToken: auth.refreshToken
        }
    }
}