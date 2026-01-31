
import { Component, inject, output } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthLogin } from '../../Interfaces/auth-login.interface';


@Component({
    selector: 'app-login-form',
    imports: [ReactiveFormsModule],
    templateUrl: './login-form.component.html',
})
export class LoginFormComponent {
    sendLogin = output<AuthLogin>();
    readonly #formBuilder = inject(FormBuilder);
    message = '';

    loginForm: FormGroup = this.#formBuilder.group({
        email: ['', Validators.required],
        password: ['', Validators.required],
    });

    login() {
        if (this.loginForm.invalid) {
            this.message = 'Please fill in all required fields.';
        }
        else {
            const login: AuthLogin = this.loginForm.value;
            this.sendLogin.emit(login);
        }
    }

}