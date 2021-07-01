import { combineReducers } from 'redux'
import { useSelector as useReduxSelector, TypedUseSelectorHook } from 'react-redux'
import userReducer, { userPayload } from './userReducer'
import themeReducer, { themePayload } from './themeReducer'
import noteReducer, { notePayload } from './noteReducer'
import reminderReducer, { reminderPayload } from './reminderReducer'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { Reducer } from 'react'

export * from './userReducer'
export * from './noteReducer'
export * from './reminderReducer'

export type AppState = {
    user: userPayload,
    reminder: reminderPayload,
    theme: themePayload,
    note: notePayload,
}


const rootReducer = combineReducers<AppState>({
    user: userReducer,
    reminder: reminderReducer,
    theme: themeReducer,
    note: noteReducer,
})

export const useSelector:TypedUseSelectorHook<ReturnType<typeof rootReducer>> = useReduxSelector

export default rootReducer