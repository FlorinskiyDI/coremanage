export class RegisterData {
    public email: string;
    public username: string;
    public password: string;
    public confirmedPassword: string;
    public redirectUrl: string;

    constructor() {
        this.redirectUrl= null;
        this.email = null;
        this.username = null;
        this.password = null;
        this.confirmedPassword = null;
    }
}