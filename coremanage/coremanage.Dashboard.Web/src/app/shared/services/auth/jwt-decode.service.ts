// external import
import { Injectable } from "@angular/core";

@Injectable()
export class JwtDecodeService {
    // get token string
    public decode(token: string) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(window.atob(base64));    
    };
}

