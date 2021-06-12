import axios, { AxiosResponse } from 'axios'
import { IFood, IStore } from '../reducers'
import { store_api, food_api, saved_store_api, login_api } from '../utils/constants'
import { userLoginWithEmail } from '../actions/userAction'

export type ResponeType<T> = {
  httpStatusCode: number,
  errorMessage: string,
  errorCode: string,
  data: T
}

export const get_store = (search: string): Promise<AxiosResponse<ResponeType<IStore[]>>> => {
  let url = store_api + "/" + search
  return axios.get(url, {
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  })
}

export const get_foods_in_store = (store_id: string): Promise<AxiosResponse<ResponeType<IStore>>> => {
  let url = food_api + "/" + store_id
  return axios.get(url, {
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  })
}

export const save_favorite_store = (account_id:string, store_id:string):Promise<AxiosResponse<ResponeType<any>>> => {
  return axios({
    method: 'post',
    url: saved_store_api,
    headers:{
      'Content-Type': 'application/json'
    },
    data:{
      account_id: account_id,
      store_api: store_id
    }
  })
}

export const show_favorite_store = (account_id:string):Promise<AxiosResponse<ResponeType<IStore[]>>> => {
  let url = saved_store_api+'/'+account_id
  return axios.get(url, {
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  })
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