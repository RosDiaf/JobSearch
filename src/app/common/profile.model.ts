export class Profile {
    public name: string;
    public surname: string;
    public email: string;
    public address: string;
    public telephone: string;
    public gender: string;
    public day: number;
    public month: number;
    public year: number;
    public skills: any;
    public comments: string;
    public roleID: number;

    constructor(
        name: string,
        surname: string,
        email: string,
        address: string,
        telephone: string,
        gender: string,
        day: number,
        month: number,
        year: number,
        skills: any,
        comments: string,
        roleID: number) {

        this.name = name;
        this.surname = surname;
        this.email = email;
        this.address = address;
        this.telephone = telephone;
        this.gender = gender;
        this.day = day;
        this.month = month;
        this.year = year;
        this.skills = skills;
        this.comments = comments;
        this.roleID = roleID;
    }
}
