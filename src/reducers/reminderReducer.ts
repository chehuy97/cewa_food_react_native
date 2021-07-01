import { deleteNotification } from '../service/notification'
import { INote } from './index'

export const reminderActionTypes = {
    ADD_REMINDER: 'NOTE_ADD_REMINDER',
    REMOVE_APPEARED_REMINDER: 'NOTE_REMOVE_APPEARED_REMINDER',
    REMOVE_REMINDER: 'REMOVE_REMINDER',
    UPDATE_REMINDER: 'UPDATE_REMINDER',
    REMINDER_REMOVE_ALL: 'REMINDER_REMOVE_ALL'
}
export interface IReminder {
    reminder_id:number
    note:INote,
    time:Date
}

export interface ActionReminderSuccess<T> {
    type: string,
    payload: T
}

export type reminderDetail = {
    reminder:IReminder
}

export type reminderList = {
    reminders:IReminder[]
}

export interface ActionReminderError {
    type: string,
    payload: {
        message: string
    }
}

export type reminderAction = ActionReminderSuccess<reminderList> | ActionReminderSuccess<reminderDetail> | ActionReminderError

export type reminderPayload = {
    reminders:IReminder[]
}

const defaultState:reminderPayload = {
    reminders:[]
} 

const reducer = (state = defaultState, action: reminderAction): reminderPayload => {
    switch(action.type){
        case reminderActionTypes.ADD_REMINDER:
            action = <ActionReminderSuccess<reminderDetail>>action
            return  {...state, reminders: [...state.reminders, action.payload.reminder]}
        case reminderActionTypes.REMOVE_APPEARED_REMINDER:
            action = <ActionReminderSuccess<reminderList>>action
            //state.reminders = action.payload.reminders
            return state = {...state, reminders: action.payload.reminders}   
        case reminderActionTypes.UPDATE_REMINDER:
            action = <ActionReminderSuccess<reminderDetail>>action
            let newReminder = action.payload.reminder

            // state.reminders.forEach( item => {
            //     if(item.reminder_id == reminder.reminder_id) {
            //         item.note = reminder.note
            //         item.time = reminder.time
            //     }
            // })
            return {...state, reminders: state.reminders.map((reminder) => 
                (reminder.reminder_id == newReminder.reminder_id) ? {...reminder, note: newReminder.note, time: newReminder.time} : reminder
                )}
        case reminderActionTypes.REMOVE_REMINDER: 
            action = <ActionReminderSuccess<reminderDetail>>action
            let id = action.payload.reminder.reminder_id
            // let index = state.reminders.findIndex(obj => obj.reminder_id == dReminder.reminder_id)
            // state.reminders.splice(index,1)
            // return state
            return {
                ...state,
                reminders: state.reminders.filter(reminder => reminder.reminder_id != id)
            }
        case reminderActionTypes.REMINDER_REMOVE_ALL:
            state.reminders.forEach( item => {
                deleteNotification(item.reminder_id)
            })
            return defaultState
        default:
            return state
    }
}

export default reducer