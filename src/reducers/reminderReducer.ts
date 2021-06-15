import { INote } from './index'

export const reminderActionTypes = {
    REMINDER_REQUEST:'REMINDER_REQUEST',
}

export interface reminderInfo {
    note: INote,
    time: Date
}

export type reminderPayload = {
    reminders:reminderInfo[]
}


export type reminderActionSuccess = {
    type:string,
    payload: reminderInfo
}

export const defaultState:reminderPayload = {
    reminders:[]
} 

const reducer = (state=defaultState, action:reminderActionSuccess):reminderPayload => {
    switch(action.type){
        case reminderActionTypes.REMINDER_REQUEST: 
            state.reminders.push(action.payload)
            return state
        default:
            return state
    }
}

export default reducer