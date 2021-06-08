import AsyncStorage from '@react-native-async-storage/async-storage';
import { AccoutUserName, AccessToken, AccountUserID, RefreshToken } from './constants'


export const setAccountUsername = async (name:string) => {
    await AsyncStorage.setItem(AccoutUserName, name)
}

export const getAccoutUserName = async () => {
    let name = await AsyncStorage.getItem(AccoutUserName)
    return name
}

export const setAccountID = async (id:string) => {
    await AsyncStorage.setItem(AccountUserID, id)
}

export const getAccountID = async () => {
    let id = await AsyncStorage.getItem(AccountUserID)
    return id
}

export const setAccessToken = async (token:string) => {
    await AsyncStorage.setItem(AccessToken, token)
}

export const getAccessToken = async () => {
    let token = await AsyncStorage.getItem(AccessToken)
    return token
}    

export const setRefreshToken = async (token:string) => {
    await AsyncStorage.setItem(RefreshToken, token)
}

export const getRefreshToken = async () => {
    let token = await AsyncStorage.getItem(RefreshToken)
    return token
}  

