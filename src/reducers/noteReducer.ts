import { ToastAndroid } from "react-native"
import { deleteNotification } from '../service/notification'
import colors from "../utils/constants/colors"
import { SuccessAction } from "./userReducer"
import{ scheduledLocalNotification }  from '../service/notification'

export const noteActionTypes = {
    NOTE_FAILURE: 'NOTE_FAILURE',
    NOTE_FETCH_REQUEST: 'NOTE_FETCH_REQUEST',
    NOTE_FETCH_SUCCESS: 'NOTE_FETCH_SUCCESS',
    NOTE_ADD_REQUEST: 'NOTE_ADD_REQUEST',
    NOTE_ADD_SUCCESS: 'NOTE_ADD_SUCCESS',
    NOTE_EDIT_REQUEST: 'NOTE_EDIT_REQUEST',
    NOTE_EDIT_SUCCESS: 'NOTE_EDIT_SUCCESS',
    NOTE_REMOVE_REQUEST: 'NOTE_REMOVE_REQUEST',
    NOTE_REMOVE_SUCCESS: 'NOTE_REMOVE_SUCCESS',
}

export interface INote {
    id: string,
    title: string,
    content: string,
    color:string,
    account_id: string
}

export type noteList = {
    notes: INote[]
}

export type noteDetail = {
    note: INote
}

export type notePayload = {
    notes: INote[],
    errorMessage: string
}

export interface ActionSuccess<T> {
    type: string,
    payload: T
}

export interface ActionError {
    type: string,
    payload: {
        message: string
    }
}
export type noteAction = ActionSuccess<notePayload> | ActionSuccess<noteList> | 
                        ActionSuccess<noteDetail> | ActionSuccess<string> | 
                         ActionError

export const defaultState: notePayload = {
    notes: [],
    errorMessage: ''
}

const reducer = (state = defaultState, action: noteAction): notePayload => {
    switch (action.type) {
        case noteActionTypes.NOTE_FETCH_SUCCESS:
            action = <ActionSuccess<noteList>>action
            state.notes = action.payload.notes
            return state
            // return { ...state, notes: action.payload.notes }
        case noteActionTypes.NOTE_EDIT_SUCCESS:
            return state
        case noteActionTypes.NOTE_ADD_SUCCESS:
            return state
        case noteActionTypes.NOTE_REMOVE_SUCCESS:
            return state
        case noteActionTypes.NOTE_FAILURE:
            action = <ActionError>action
            state = { ...state, errorMessage: action.payload.message }
            ToastAndroid.show(state.errorMessage, ToastAndroid.SHORT);
            return state
        default:
            return defaultState
    }
}

export default reducer