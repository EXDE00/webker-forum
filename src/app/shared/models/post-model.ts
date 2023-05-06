export class Post {
    id: string | null;
    name: string | null;
    email: string | null;
    subject: string | null;
    date: Date | null;
    pImage: string | null;
    pImageName: string | null;
    content: string | null;
    password: string | null;

    constructor(name?: string, email?: string, date?: Date,
                    content?: string, subject?: string, pImage?: string,
                    pImageName?: string, ip?: string, password?: string, id?: string)
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
        //if (ip) this.ip = ip;
        //else this.ip = null;
        if (password) this.password = password;
        else this.password = null;
        if (pImage) this.pImage = pImage;
        else this.pImage = null;
        if (pImageName) this.pImageName = pImageName;
        else this.pImageName = null;
        if (id) this.id = id;
        else this.id = null;
    }
}