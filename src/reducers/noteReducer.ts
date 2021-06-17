import { ToastAndroid } from "react-native"

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
    NOTE_ADD_REMINDER: 'NOTE_ADD_REMINDER'
}

export interface INote {
    id: string,
    title: string,
    content: string,
    account_id: string
}

export interface IReminder {
    reminder_id:number
    note:INote,
    time:Date
}

export type noteList = {
    notes: INote[]
}

export type noteDetail = {
    note: INote
}

export type reminderDetail = {
    reminder:IReminder
}

export type notePayload = {
    notes: INote[],
    noteUpdate: INote,
    noteReminders: IReminder[],
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
export type noteAction = ActionSuccess<notePayload> | ActionSuccess<noteList> | ActionSuccess<noteDetail> | ActionSuccess<string> | ActionSuccess<reminderDetail> | ActionError

export const defaultState: notePayload = {
    notes: [],
    noteUpdate: {
        id: '',
        title: '',
        content: '',
        account_id: ''
    },
    noteReminders: [],
    errorMessage: ''
}

const reducer = (state = defaultState, action: noteAction): notePayload => {
    switch (action.type) {
        case noteActionTypes.NOTE_FETCH_SUCCESS:
            action = <ActionSuccess<noteList>>action
            state = { ...state, notes: action.payload.notes }
            return state
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
        case noteActionTypes.NOTE_ADD_REMINDER: {
            action = <ActionSuccess<reminderDetail>>action
            state.noteReminders.push(action.payload.reminder)
            return state
        }    
        default:
            return state
    }
}

export default reducer