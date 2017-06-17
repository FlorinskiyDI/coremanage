import { FormControl, AbstractControl } from '@angular/forms';

export class PasswordMatcherValidator{
    
    public static PasswordsMatch(keyValue: string, keyConfirm: string) { 
        return (control: AbstractControl): {[key: string]: boolean} => {
            const value = control.get(keyValue);
            const confirm = control.get(keyConfirm);
            if (!value || !confirm) {
                return null;
            }
            // "nomatch" it is error KEY !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            return value.value === confirm.value ? null : { nomatch: true };
        };
    }
}