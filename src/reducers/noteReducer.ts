
export const noteActionTypes = {
    NOTE_SUCCESS: 'NOTE_SUCCESS',
    NOTE_FAILURE: 'NOTE_FAILURE',
    NOTE_FETCH_REQUEST: 'NOTE_FETCH_REQUEST',
    NOTE_ADD_REQUEST: 'NOTE_ADD_REQUEST',
    NOTE_EDIT_REQUEST: 'NOTE_EDIT_REQUEST',
    NOTE_REMOVE_REQUEST: 'NOTE_REMOVE_REQUEST',
    NOTE_SAVE_REQUEST: 'NOTE_SAVE_REQUEST'
}

export interface INote {
    note_id: string,
    title: string,
    content: string
}

export type noteList = {
    notes:INote[]
}

export type noteDetail = {
    note:INote
}

export type notePayload = {
    notes: INote[],
    note:INote,
    errorMessage:string
}

export interface ActionSuccess<T> {
    type:string,
    payload:T
}

export interface ActionError {
    type: string,
    payload:{
        message:string
    }
}
export type  noteAction = ActionSuccess<notePayload> | ActionSuccess<noteList> | ActionSuccess<noteDetail> | ActionError

export const defaultState:notePayload = {
    notes: [],
    note: {
        note_id: '',
        title: '',
        content: ''
    },
    errorMessage: ''
}

const reducer = (state = defaultState, action:noteAction):notePayload => {
    switch(action.type){
        default:
            return state
    }
}

export default reducer