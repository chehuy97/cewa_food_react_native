import { INote } from "../reducers";
import { reminderActionSuccess, reminderActionTypes } from "../reducers/reminderReducer";


export const set_reminder = (note:INote, time:Date):reminderActionSuccess => {
    return {
        type: reminderActionTypes.REMINDER_REQUEST,
        payload: {
            note: note,
            time: time
        }
    }
}