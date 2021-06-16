
export const noteActionTypes = {
    NOTE_FAILURE: 'NOTE_FAILURE',
    NOTE_FETCH_REQUEST: 'NOTE_FETCH_REQUEST',
    NOTE_FETCH_SUCCESS: 'NOTE_FETCH_SUCCESS',
    NOTE_ADD_REQUEST: 'NOTE_ADD_REQUEST',
    NOTE_ADD_SUCCESS: 'NOTE_ADD_SUCCESS',
    NOTE_EDIT_REQUEST: 'NOTE_EDIT_REQUEST',
    NOTE_EDIT_SUCCESS: 'NOTE_EDIT_SUCCESS',
    NOTE_REMOVE_REQUEST: 'NOTE_REMOVE_REQUEST',
    NOTE_REMOVE_SUCCESS: 'NOTE_REMOVE_SUCCESS'
}

export interface INote {
    note_id: string,
    title: string,
    content: string,
    account_id:string
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
        content: '',
        account_id:''
    },
    errorMessage: ''
}

const reducer = (state = defaultState, action:noteAction):notePayload => {
    switch(action.type){
        case noteActionTypes.NOTE_FETCH_SUCCESS: 
            action = <ActionSuccess<noteList>>action
            state = {...state,notes: action.payload.notes}
            return state
        default:
            return state
    }
}

export default reducer