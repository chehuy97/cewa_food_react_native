import { combineReducers } from 'redux'
import { useSelector as useReduxSelector, TypedUseSelectorHook } from 'react-redux'
import userReducer, { userPayload } from './userReducer'
import themeReducer, { themePayload } from './themeReducer'
import noteReducer, { notePayload } from './noteReducer'

export * from './userReducer'
export * from './noteReducer'

export type AppState = {
    user: userPayload,
    theme: themePayload,
    note: notePayload
}

const rootReducer = combineReducers<AppState>({
    user: userReducer,
    theme: themeReducer,
    note: noteReducer
})

export const useSelector:TypedUseSelectorHook<ReturnType<typeof rootReducer>> = useReduxSelector

export default rootReducer