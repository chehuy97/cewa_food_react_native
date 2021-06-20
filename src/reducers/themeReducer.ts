import colors from "../utils/constants/colors"

export const themeActionTypes = {
    THEME_REQUEST: 'THEME_REQUEST',
    THEME_SUCCESS: 'THEME_SUCCESS',
    THEME_ERROR: 'THEME_ERROR'
}



export type themePayload = {
    themeColor:string
}

export const defaultState:themePayload = {
    themeColor: colors.yellow_theme
}

export type ThemeActionSuccess =  {
    type:string,
    payload: themePayload
}


const reducer = (state = defaultState,action:ThemeActionSuccess):themePayload => {
    switch (action.type) {
        case themeActionTypes.THEME_SUCCESS:
            state = action.payload
            return state
        default:
            return state    
    }
}

export default reducer