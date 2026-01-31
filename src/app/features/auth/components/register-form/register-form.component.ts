import { Component, inject, output } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthLogin } from '../../Interfaces/auth-login.interface';


@Component({
    selector: 'app-register-form',
    imports: [ReactiveFormsModule],
    templateUrl: './register-form.component.html',
})
export class RegisterFormComponent {
    sendRegister = output<AuthLogin>();
    readonly #formBuilder = inject(FormBuilder);
    public message = '';


    public registerForm: FormGroup = this.#formBuilder.group({
        email: ['', [Validators.required]],
        password: ['', [Validators.required]],
    });


    register() {

        this.message = 'Hola soy el mensaje desde el componente register-form';
        // if (this.registerForm.invalid) {
        //     this.message = "Please correct all errors and resubmit the form";
        //     console.log(this.message);
        // } else {
        //     const register: AuthLogin = {
        //         email: this.registerForm.value.email || '',
        //         password: this.registerForm.value.password || ''
        //     }

        //     this.sendRegister.emit(register);
        // }
    }

}