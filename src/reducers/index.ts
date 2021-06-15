import { combineReducers } from 'redux'
import { useSelector as useReduxSelector, TypedUseSelectorHook } from 'react-redux'
import userReducer, { userPayload } from './userReducer'
import themeReducer, { themePayload } from './themeReducer'

export * from './userReducer'

export type AppState = {
    user: userPayload,
    theme: themePayload
}

const rootReducer = combineReducers<AppState>({
    user: userReducer,
    theme: themeReducer,
})

export const useSelector:TypedUseSelectorHook<ReturnType<typeof rootReducer>> = useReduxSelector

export default rootReducer