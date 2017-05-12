// external import
import { Injectable } from'@angular/core';

// @Injectable()
export class JwtDecodeService {
    // get token string
    public decode(token: string) {
        let base64Url = token.split('.')[1];
        let base64 = base64Url.replace('-', '+').replace('_', '/');
        let decode = JSON.parse(window.atob(base64));
        console.log(decode);
        return decode;
    };
}

