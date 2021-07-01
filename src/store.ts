import { createStore, applyMiddleware, compose } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage'
import thunk from 'redux-thunk'
import logger from 'redux-logger';
import rootReducer from './reducers'

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist:['user', 'reminder']
}

// const persistedReducer = persistReducer(persistConfig, rootReducer)
// const middlewares = [thunk, logger]
// const enhancers = [applyMiddleware(...middlewares)]
// export const store = createStore(persistedReducer)
const pReducer = persistReducer(persistConfig, rootReducer);
const middleware = applyMiddleware(thunk, logger);
export const store = createStore(pReducer, middleware);
export const persistor = persistStore(store)