import axios, { AxiosResponse } from 'axios'
import { INote, IUser } from '../reducers'
import { register_api, login_api } from '../utils/constants'
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

export const register = (user:IUser):Promise<AxiosResponse<ResponeType<any>>> => {
  console.log("register api: " + register_api);
  
  return axios({
    method: 'post',
    url: register_api,
    data:{
      email:user.email,
      password: user.password,
      name:user.name,
      address: user.address,
      gender: user.gender,
      birthday: user.birthday
    },
    headers:{
      'Content-Type': 'application/json'
    }
  })
}