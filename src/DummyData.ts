export const notes:INote[] = [
    {
        note_id:"1",
        title: "Tottenham",
        content: "Harry Kane \n Son Heung Min \n Gareth Bale \n"
    },
    {
        note_id:"2",
        title: "Atletico Madrid",
        content: "Luis Suarez \n Saul Niguez \n Koke \n"
    },
    {
        note_id:"3",
        title: "Borussia Dortmund",
        content: 'Earling Hallaad \n Jordan Sancho \n Manuel Akanji \n'
    }
]

export interface INote{
    note_id:string,
    title:string,
    content:string
}

export interface IReminder {
    reminder_id:string,
    note: INote,
    time: Date
}

export const reminders:IReminder[] = [
    {
        reminder_id:'1',
        note: notes[0],
        time: new Date()
    }
]