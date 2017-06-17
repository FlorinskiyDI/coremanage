import { FormControl, AbstractControl } from '@angular/forms';

export class EmailExistValidator{
    
    public static PasswordsMatch(keyValue: string, keyConfirm: string) { 
        return (control: AbstractControl): {[key: string]: boolean} => {
            const value = control.get(keyValue);
            const confirm = control.get(keyConfirm);
            if (!value || !confirm) {
                return null;
            }
            // https://stackoverflow.com/questions/41847285/angular2-email-already-exist-as-custom-validator
            // "emailexist" it is error KEY !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            return value.value === confirm.value ? null : { emailexist: true };
        };
    }
}