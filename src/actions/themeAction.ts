import AsyncStorage from '@react-native-async-storage/async-storage'
import {ThunkAction, ThunkDispatch} from 'redux-thunk'
import { themeActionTypes, ThemeActionSuccess } from '../reducers/themeReducer'
import colors from '../utils/constants/colors'
import { appTheme } from '../utils/constants/storage'
import { getAppTheme } from '../utils/storage'

// export const set_theme = (color:string):ThunkAction<Promise<void>, {}, {}, ThemeActionSuccess> => {
// return (dispatch: ThunkDispatch<{}, {}, ThemeActionSuccess>) => {
//         return getAppTheme().then(color => {
//             if(color){
//                 dispatch(theme_success(color))
//             }
//         }).catch(err => {
//             console.log(err);          
//         })
//     }
// }

export const set_theme = (color:string):ThemeActionSuccess => {
    return {
        type: themeActionTypes.THEME_SUCCESS,
        payload: {
            themeColor:color
        }
    }
}
