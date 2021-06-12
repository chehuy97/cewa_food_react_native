import { combineReducers } from 'redux'
import { useSelector as useReduxSelector, TypedUseSelectorHook } from 'react-redux'
import userReducer, { userPayload } from './userReducer'
import storeReducer, { storePayload } from './storeReducer'

export * from './foodReducer'
export * from './storeReducer'
export * from './userReducer'

export type AppState = {
    user: userPayload,
    store: storePayload,
}

const rootReducer = combineReducers<AppState>({
    user: userReducer,
    store: storeReducer,
})

export const useSelector:TypedUseSelectorHook<ReturnType<typeof rootReducer>> = useReduxSelector

export default rootReducer