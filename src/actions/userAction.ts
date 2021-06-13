import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { userActionTypes, userPayload, SuccessAction, userAction, ErrorAction } from '../reducers/userReducer'
import { login } from '../service/network'

export interface userLoginWithEmail {
    email: string,
    password: string
}

export const login_request = (user: userLoginWithEmail, callback: () => void):
    ThunkAction<Promise<void>, {}, {}, userAction> => {
    return (dispatch: ThunkDispatch<{}, {}, userAction>) => {
        return login(user).then(response => {
            console.log("login ok");

            let result = response.data
            let userInfo: userPayload = {
                id: result.data.id,
                email: user.email,
                accessToken: result.data.access_token,
                refreshToken: result.data.refresh_token
            }
            dispatch(login_success(userInfo))
            callback()
        }).catch(err => {
            console.log("Error login fail");

            dispatch(login_failure(err))
        })
    }
}

export const login_success = (payload: userPayload): SuccessAction<userPayload> => {
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