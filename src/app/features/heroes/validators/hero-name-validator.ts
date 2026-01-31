import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';

const INVALID_NAMES = ['lovelce', 'hopper', 'ritchie', 'hamilton','knuth'];
export const heroNameValidator: AsyncValidatorFn = async (
    control: AbstractControl
): Promise<ValidationErrors | null> => {

    const forbidden = INVALID_NAMES.includes(control.value?.toLowerCase());

    return forbidden ? { heroNameValid: { value: control.value } } : null;

}