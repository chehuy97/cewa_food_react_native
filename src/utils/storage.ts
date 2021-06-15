import AsyncStorage from '@react-native-async-storage/async-storage';
import { appTheme } from './constants'
import colors from './constants/colors';

export const setAppTheme = (color:string) => {
     AsyncStorage.setItem(appTheme, color)
}

export const getAppTheme = async () => {
    return await AsyncStorage.getItem(appTheme)
}

