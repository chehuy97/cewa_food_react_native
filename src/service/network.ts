import axios, { AxiosResponse } from 'axios'
import { INote } from '../reducers'
import { store_api, food_api, saved_store_api, login_api } from '../utils/constants'
import { userLoginWithEmail } from '../actions/userAction'

export type ResponeType<T> = {
  httpStatusCode: number,
  errorMessage: string,
  errorCode: string,
  data: T
}


export const login = (user:userLoginWithEmail):Promise<AxiosResponse<ResponeType<any>>> => {
  return axios({
    method: 'post',
    url: login_api,
    data:{
      email: user.email,
      password: user.password
    },
    headers:{
      'Content-Type': 'application/json'
    }
  })
}