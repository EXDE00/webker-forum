export class Post {
    id?: number;
    name?: string;
    email?: string;
    subject?: string;
    ip?: string;
    date?: Date;
    pImage?: string;
    pImageName?: string;
    content?: string;
    password?: string;

    constructor(name?: string, email?: string, date?: Date,
                    content?: string, subject?: string, pImage?: string,
                    pImageName?: string, ip?: string,
                    password?: string, id?: number)
    {
        this.name = name;
        this.date = date;
        this.content = content;
        this.email = email;
        this.password = password;
        if (subject) this.subject = subject;
        else this.subject = undefined;
        if (ip) this.ip = ip;
        else this.ip = undefined;
        if (pImage) this.pImage = pImage;
        else this.pImage = undefined;
        if (pImageName) this.pImageName = pImageName;
        else this.pImageName = undefined;
        if (id) this.id = id;
        else this.id = undefined;

    }
}