import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { ErrorAction } from '../reducers'
import { noteActionTypes, ActionSuccess, ActionError, notePayload, INote, noteAction, noteList, noteDetail, IReminder, reminderDetail } from '../reducers/noteReducer'
import { get_all_notes, add_new_note, edit_note, remove_note } from '../service/network'

export const fetch_all_notes = (account_id: string, token:string): ThunkAction<Promise<void>, {}, {}, noteAction> => {
    return (dispatch: ThunkDispatch<{}, {}, noteAction>) => {
        return get_all_notes(account_id, token).then(res => {
            let notes = res.data.data
            dispatch(fetch_notes_success(notes))
        }).catch(err => {
            console.log('fetch notes failue '+ err.response.data.errorMessage);
            dispatch(note_failure('cannot fetch notes'))
        })
    }
}

const fetch_notes_success = (notes:INote[]):ActionSuccess<noteList> => {
    return {
        type: noteActionTypes.NOTE_FETCH_SUCCESS,
        payload: {
            notes: notes
        }
    }
}

export const add_note = (note:INote, token:string): ThunkAction<Promise<void>, {}, {}, noteAction> => {
    return (dispatch: ThunkDispatch<{}, {}, noteAction>) => {
        return add_new_note(note, token).then(res => {
            console.log('add success');           
            dispatch(add_note_success(note))
        }).catch(err => {
            console.log("add failure");
            
            dispatch(note_failure('add note failure'))
        })
    }
}

const add_note_success = (note:INote):ActionSuccess<noteDetail> => {
    return {
        type: noteActionTypes.NOTE_ADD_SUCCESS,
        payload: {
            note:note
        }
    }
}

export const edit_one_note = (note:INote, token:string): ThunkAction<Promise<void>, {}, {}, noteAction> => {
    return (dispatch: ThunkDispatch<{}, {}, noteAction>) => {
        return edit_note(note, token).then(res => {
            console.log("edit success "+res);  
            dispatch(edit_note_success(note))
        }).catch(err => {
            console.log("edit fail");
            
            dispatch(note_failure('edit note failure'))
        })
    }
}

const edit_note_success = (note:INote):ActionSuccess<noteDetail> => {
    return {
        type: noteActionTypes.NOTE_EDIT_SUCCESS,
        payload: {
            note: note
        }
    }
}

export const remove_one_note = (note_id:string, token:string): ThunkAction<Promise<void>, {}, {}, noteAction> => {
    return (dispatch: ThunkDispatch<{}, {}, noteAction>) => {
        return remove_note(note_id, token).then(res => {
            console.log('remove success' + res);
            
            dispatch(remove_note_success('remove note successful'))
        }).catch(err => {
            console.log('remove fail')
            dispatch(note_failure('remove note failure'))
        })
    }
}

const remove_note_success = (msg:string):ActionSuccess<string> => {
    return {
        type: noteActionTypes.NOTE_REMOVE_SUCCESS,
        payload: msg
    }
}

const note_failure = (msg:string):ErrorAction => {
    return {
        type: noteActionTypes.NOTE_FAILURE,
        payload: {
            message: msg
        }
    }
}

export const add_reminder = (reminder:IReminder): ActionSuccess<reminderDetail> => {
    return {
        type: noteActionTypes.NOTE_ADD_REMINDER,
        payload: {
            reminder: reminder
        }
    }
}