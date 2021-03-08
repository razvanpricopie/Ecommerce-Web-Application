import { FormControl, ValidationErrors } from "@angular/forms";

export class RpaShopValidators {

    // whitespace validation
    // if validation check fails then return validation error(s)
    // if check passes then return null
    static notOnlyWhiteSpace(control: FormControl): ValidationErrors {
        
        // check if the string only contains whitespace
        // trim removes whitespaces
        if((control.value != null) && (control.value.trim().length === 0)){

            // invalid, return error object
            // 'notOnlyWhitespace' is the key which we use in html component
            // CONVENTION - it has the same name as the method
            return { 'notOnlyWhitespace': true}
        }
        else {
            // valid, return null
            // if it's ok then it does not affect anything
            return null;
        }

        
    }
}
