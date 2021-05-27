import axios, { AxiosResponse } from 'axios'
import Store from '../models/Store'

const base_api:string = "http://localhost:5000"
const getStore:string = base_api+"/api/stores"

type ResponeType =  {
    httpStatusCode:number,
    errorMessage:string,
    errorCode:string,
    data:Store[]
}

export const get_store = (search:string):Promise<AxiosResponse<ResponeType>> => {
    var bodyFormData = new FormData()
    bodyFormData.append('search',search)
    
    return axios.get(getStore, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      params:{
          search:search
      }
    })
}
