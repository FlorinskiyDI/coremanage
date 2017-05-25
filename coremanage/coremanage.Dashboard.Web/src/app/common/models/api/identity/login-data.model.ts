export class LoginData {
    public tenant: string;
    public userName: string;
    public password: string;
    public isRemember: boolean;

    constructor() {
        this.tenant = '';
        this.userName = '';
        this.password = '';
        this.isRemember = false;
    }
}