export class LoginData {
    public userName: string;
    public password: string;
    public isRemember: boolean;

    constructor() {
        this.userName = '';
        this.password = '';
        this.isRemember = false;
    }
}