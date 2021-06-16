import axios, { AxiosResponse } from 'axios'
import { INote, IUser, useSelector } from '../reducers'
import { register_api, login_api, note_api } from '../utils/constants'
import { userLoginWithEmail } from '../actions/userAction'


//const access_token = useSelector(state => state.user.auth.accessToken)

export type ResponeType<T> = {
  httpStatusCode: number,
  errorMessage: string,
  errorCode: string,
  data: T
}


export const login = (user: userLoginWithEmail): Promise<AxiosResponse<ResponeType<any>>> => {
  return axios({
    method: 'post',
    url: login_api,
    data: {
      email: user.email,
      password: user.password
    },
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export const register = (user: IUser): Promise<AxiosResponse<ResponeType<any>>> => {
  return axios({
    method: 'post',
    url: register_api,
    data: {
      email: user.email,
      password: user.password,
      name: user.name,
      address: user.address,
      gender: user.gender,
      birthday: user.birthday
    },
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export const get_all_notes = (account_id:string, token:string): Promise<AxiosResponse<ResponeType<INote[]>>> => {  
  let url = note_api + '/' + account_id
  return axios({
    method:'GET',
    url:url,
    headers: {
      'Content-Type': 'multipart/form-data',
      'access-token':token
    }
  })
}

export const add_new_note = (note:INote, token:string): Promise<AxiosResponse<ResponeType<INote[]>>> => {  
  return axios({
    method:'POST',
    url:note_api,
    headers: {
      'Content-Type': 'application/json',
      'access-token':token
    },
    data:{
      title: note.title,
      content: note.content,
      account_id: note.account_id
    }
  })
}

export const edit_note = (note:INote, token:string): Promise<AxiosResponse<ResponeType<INote[]>>> => { 
  console.log(note);
  return axios({
    method:'PUT',
    url:note_api,
    headers: {
      'Content-Type': 'application/json',
      'access-token':token
    },
    data:{
      id: note.id,
      title: note.title,
      content: note.content,
      account_id: note.account_id
    }
  })
}
export const remove_note = (note_id:string, token:string): Promise<AxiosResponse<ResponeType<INote[]>>> => {  
  return axios({
    method:'DELETE',
    url:note_api,
    headers: {
      'Content-Type': 'application/json',
      'access-token':token
    },
    data:{
      note_id: note_id
    }
  })
}