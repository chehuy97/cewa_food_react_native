import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { ErrorAction } from '../reducers'
import { noteActionTypes, ActionSuccess, ActionError, notePayload, INote, noteAction, noteList } from '../reducers/noteReducer'
import { get_all_notes } from '../service/network'

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

const note_failure = (msg:string):ErrorAction => {
    return {
        type: noteActionTypes.NOTE_FAILURE,
        payload: {
            message: msg
        }
    }
}