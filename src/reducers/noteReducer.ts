import { ToastAndroid } from "react-native"
import { deleteNotification } from '../service/notification'
import { SuccessAction } from "./userReducer"

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
    ADD_REMINDER: 'NOTE_ADD_REMINDER',
    REMOVE_APPEARED_REMINDER: 'NOTE_REMOVE_APPEARED_REMINDER',
    REMOVE_REMINDER: 'REMOVE_REMINDER',
    UPDATE_REMINDER: 'UPDATE_REMINDER',
    NOTE_REMOVE_ALL: 'NOTE_REMOVE_ALL'
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

export type reminderList = {
    reminders:IReminder[]
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
export type noteAction = ActionSuccess<notePayload> | ActionSuccess<noteList> | 
                        ActionSuccess<noteDetail> | ActionSuccess<string> | 
                        ActionSuccess<reminderDetail> | ActionSuccess<reminderList> | ActionError

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
            return state
        case noteActionTypes.ADD_REMINDER:
            action = <ActionSuccess<reminderDetail>>action
            state.noteReminders.push(action.payload.reminder)
            return state 
        case noteActionTypes.REMOVE_APPEARED_REMINDER:
            action = <ActionSuccess<reminderList>>action
            state.noteReminders = action.payload.reminders
            return state    
        case noteActionTypes.UPDATE_REMINDER:
            action = <ActionSuccess<reminderDetail>>action
            let reminder = action.payload.reminder
            state.noteReminders.forEach( item => {
                if(item.reminder_id == reminder.reminder_id) {
                    item.time = reminder.time
                }
            })
            return state
        case noteActionTypes.REMOVE_REMINDER: 
            action = <SuccessAction<reminderDetail>>action
            let dReminder = action.payload.reminder
            let index = state.noteReminders.findIndex(obj => obj.reminder_id == dReminder.reminder_id)
            state.noteReminders.splice(index,1)
            return state
        case noteActionTypes.NOTE_REMOVE_ALL:
            state.noteReminders.forEach( item => {
                deleteNotification(item.reminder_id)
            })
            return defaultState
        default:
            return defaultState
    }
}

// const notePersistConfig = {
//     key:'note',
//     storage:AsyncStorage,
//     whitelist:['noteReminders']
// }

export default reducer