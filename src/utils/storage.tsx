import AsyncStorage from '@react-native-async-storage/async-storage';
import { AccoutUserName, AccessToken } from './constants'


export const setAccountUsername = async (name:string) => {
    await AsyncStorage.setItem(AccoutUserName, name)
}

export const getAccoutUserName = async () => {
    let name = await AsyncStorage.getItem(AccoutUserName)
    return name
}

export const setAccessToken = async (token:string) => {
    await AsyncStorage.setItem(AccessToken, token)
}

export const getAccessToken = async () => {
    let token = await AsyncStorage.getItem(AccessToken)
    return token
}