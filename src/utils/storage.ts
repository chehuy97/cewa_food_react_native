import AsyncStorage from '@react-native-async-storage/async-storage';
import { appTheme } from './constants'
import colors from './constants/colors';

export const setAppTheme = async (color:string) => {
    await AsyncStorage.setItem(appTheme, color)
}

export const getAppTheme = ():string => {
    let theme = colors.yellow_theme
    AsyncStorage.getItem(appTheme).then(color => {
        if(color){
            theme = color
        }
    })
    return theme
}

