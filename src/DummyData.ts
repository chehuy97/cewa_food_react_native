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