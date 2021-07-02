import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { ErrorAction, SuccessAction } from '../reducers'
import { storeAction, storeActionTypes, storeList, storePayload, successStoreAction, IStore, storeDetail } from '../reducers/storeReducer'
import { get_store, save_favorite_store, show_favorite_store, get_foods_in_store } from '../service/network'
import { store } from '../store'

export const fetch_store = (search: string): ThunkAction<Promise<void>, {}, {}, storeAction> => {
    return (dispatch: ThunkDispatch<{}, {}, storeAction>) => {
        return get_store(search).then(res => {
            let stores: IStore[] = res.data.data
            dispatch(fetch_store_success(stores))
        }).catch(err => {
            dispatch(fetch_store_failure(err.response.data.errorMessage))
        })
    }
}

export const fetch_store_success = (stores: IStore[]): successStoreAction<storeList> => {
    return {
        type: storeActionTypes.STORE_FETCH_SUCESS,
        payload: {
            stores:stores
        }
    }
}

export const fetch_store_failure = (msg: string): ErrorAction => {
    return {
        type: storeActionTypes.STORE_FETCH_FAILURE,
        payload: {
            message: msg
        }
    }
}

export const fetch_foods_in_store = (store_id:string):ThunkAction<Promise<void>, {}, {}, storeAction> => {
    return (dispatch:ThunkDispatch<{}, {}, storeAction>) => {
        return get_foods_in_store(store_id).then(res => {
            let store:IStore = res.data.data
            dispatch(fetch_foods_in_store_success(store))
        }).catch(err => {
            dispatch(fetch_foods_in_store_failure(err.response.data.errorMessage))
        })
    }
}

export const fetch_foods_in_store_success = (store: IStore):SuccessAction<storeDetail> => {
    return {
        type: storeActionTypes.STORE_SHOW_FOODS_SUCCESS,
        payload: {
            storeDetail: store
        }
    }
}

export const fetch_foods_in_store_failure = (msg:string): ErrorAction => {
    return {
        type: storeActionTypes.STORE_SHOW_FOODS_FAILURE,
        payload: {
            message: msg
        }
    }
}

export const save_favorite_request = (account_id: string, store_id: string): ThunkAction<Promise<void>, {}, {}, storeAction> => {
    return (dispatch: ThunkDispatch<{}, {}, storeAction>) => {
        return save_favorite_store(account_id, store_id).then(res => {
            let msg = res.data.data.message
            dispatch(save_favorite_success(msg))
        }).catch(err => {
            dispatch(save_favorite_failure(err.response.data.errorMessage))
        })
    }
}


export const save_favorite_success = (msg: string): successStoreAction<string> => {
    return {
        type: storeActionTypes.STORE_SAVE_FAVORITE_SUCCESS,
        payload: msg
    }
}

export const save_favorite_failure = (msg: string): ErrorAction => {
    return {
        type: storeActionTypes.STORE_SAVE_FAVORITE_FAILURE,
        payload: {
            message: msg
        }
    }
}

export const show_favorite_request = (id: string): ThunkAction<Promise<void>, {}, {}, storeAction> => {
    return (dispatch: ThunkDispatch<{}, {}, storeAction>) => {
        return show_favorite_store(id).then(res => {
            let stores: IStore[] = res.data.data
            dispatch(show_favorite_success(stores))
        }).catch(err => {
            dispatch(show_favorite_failure(err.response.data.errorMessage))
        })
    }
}

export const show_favorite_success = (stores: IStore[]): successStoreAction<storeList> => {
    return {
        type: storeActionTypes.STORE_SHOW_FAVORITE_SUCCESS,
        payload: {
            stores:stores
        }
    }
}

export const show_favorite_failure = (msg: string): ErrorAction => {
    return {
        type: storeActionTypes.STORE_SAVE_FAVORITE_FAILURE,
        payload: {
            message: msg
        }
    }
}