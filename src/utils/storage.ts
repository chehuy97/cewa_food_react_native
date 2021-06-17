import AsyncStorage from '@react-native-async-storage/async-storage';
import { appTheme, accoutEmail, accessToken, accountUserID, refreshToken } from './constants'
import colors from './constants/colors';

export const setAppTheme = (color:string) => {
     AsyncStorage.setItem(appTheme, color)
}

export const getAppTheme = async () => {
    return await AsyncStorage.getItem(appTheme)
}

export const setAccountEmail = async (name:string) => {
    await AsyncStorage.setItem(accoutEmail, name)
}

export const getAccoutEmail = async () => {
    let name = await AsyncStorage.getItem(accoutEmail)
    return name
}

export const setAccountID = async (id:string) => {
    await AsyncStorage.setItem(accountUserID, id)
}

export const getAccountID = async () => {
    let id = await AsyncStorage.getItem(accountUserID)
    return id
}

export const setAccessToken = async (token:string) => {
    await AsyncStorage.setItem(accessToken, token)
}

export const getAccessToken = async () => {
    let token = await AsyncStorage.getItem(accessToken)
    return token
}    

export const setRefreshToken = async (token:string) => {
    await AsyncStorage.setItem(refreshToken, token)
}

export const getRefreshToken = async () => {
    let token = await AsyncStorage.getItem(refreshToken)
    return token
} 

export const removeAuthentication = async () => {
    await AsyncStorage.removeItem(accountUserID)
    await AsyncStorage.removeItem(accoutEmail)
    await AsyncStorage.removeItem(accessToken)
    await AsyncStorage.removeItem(refreshToken)
}

