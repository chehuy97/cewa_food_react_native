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

export const get_store = ():Promise<AxiosResponse<ResponeType>> => {
    return axios.get<ResponeType>(getStore,{
        headers:{
            'Content-Type': 'application/json'
        },
        timeout:10000
    })
}
