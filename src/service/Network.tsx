import axios, { AxiosResponse } from 'axios'
import { IFood, IStore } from '../models'
import { store_api, food_api, saved_store_api } from '../utils/constants'

type ResponeType<T> = {
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

export const save_favorite_store = (account_id:string):Promise<AxiosResponse<ResponeType<IStore>>> => {
  let url = saved_store_api+'/'+account_id
  return axios.get(url, {
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  })
}
