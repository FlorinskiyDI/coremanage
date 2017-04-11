export class ReLoginData {
    public refreshToken: string;
    public tenant: string;

    constructor() {
        this.refreshToken = '';
        this.tenant = '';
    }        
}