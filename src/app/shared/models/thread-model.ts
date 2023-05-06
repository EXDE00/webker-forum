import { Timestamp } from "@angular/fire/firestore";

export class Thread {
    id: string | null;
    name: string | null; //name of the user
    email: string | null; //email of the user
    subject: string | null; //subject of the post
    date: Timestamp | null; //date posted on
    content: string | null; //body of the actual thread
    password: string | null; //idk
    boardRef: string | null; //ref to which board it belongs to
    userRef: string | null; //ref to userID who posted

    constructor(name?: string, email?: string, date?: Timestamp, content?: string,
         subject?: string, password?: string, id?: string, boardRef?: string, userRef?: string)
    {
        if (name)this.name = name;
        else this.name = null;
        if (date) this.date = date;
        else this.date = null;
        if (content) this.content = content;
        else this.content = null;
        if (email) this.email = email;
        else this.email = null;
        if (subject) this.subject = subject;
        else this.subject = null;
        if (password) this.password = password;
        else this.password = null;
        if (id) this.id = id;
        else this.id = null;
        if(boardRef) this.boardRef = boardRef;
        else this.boardRef = null;
        if(userRef) this.userRef = userRef;
        else this.userRef = null;
    }
}