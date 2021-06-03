import axios, { AxiosResponse } from 'axios'
import { IFood, IStore } from '../models'

const base_api:string = "https://cewa-food.herokuapp.com"
//const base_api: string = "http://localhost:5000"
const store_api: string = base_api + "/api/stores"
const food_api:string = base_api + '/api/foods'

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
