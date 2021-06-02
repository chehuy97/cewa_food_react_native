import axios, { AxiosResponse } from 'axios'
import { Store } from '../models/Store'

//const base_api:string = "https://cewa-food.herokuapp.com"
const base_api:string = "http://localhost:5000"
const getStore:string = base_api+"/api/stores"

type ResponeType =  {
    httpStatusCode:number,
    errorMessage:string,
    errorCode:string,
    data:Store[]
}

export const get_store = (search:string):Promise<AxiosResponse<ResponeType>> => {
    let url = getStore+"/"+search
    return axios.get(url, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    })
}
