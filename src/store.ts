import { createStore, applyMiddleware, compose } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage'
import thunk from 'redux-thunk'
import rootReducer from './reducers'

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist:['user']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)
const middlewares = [thunk]
const enhancers = [applyMiddleware(...middlewares)]
export const store = createStore(persistedReducer, compose(...enhancers))
export const persistor = persistStore(store)