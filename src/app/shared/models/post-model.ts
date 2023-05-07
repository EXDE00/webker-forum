import { user } from "@angular/fire/auth";
import { Timestamp } from "@angular/fire/firestore";

export class Post {
    id: string | null;
    name: string | null;
    email: string | null;
    subject: string | null;
    date: Timestamp | null;
    content: string | null;
    password: string | null;
    threadRef: string | null;
    userRef: string | null;

    constructor(name?: string, email?: string, date?: Timestamp | Date,
                    content?: string, subject?: string,
                    password?: string, id?: string,
                    threadRef?: string, userRef?: string)
    {
        if (name)this.name = name;
        else this.name = null;
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
        if (threadRef) this.threadRef = threadRef;
        else this.threadRef = null;
        if (userRef) this.userRef = userRef;
        else this.userRef = null;
        if(date){
            if(date instanceof Date){
                this.date = Timestamp.fromDate(date);
            } else {
                this.date = date;
            }
        }
        else this.date = null;
    }
}