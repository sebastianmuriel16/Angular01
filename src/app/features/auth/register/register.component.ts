import { Component, inject, effect, ResourceStatus, signal, computed } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';
import { AuthLogin } from '../Interfaces/auth-login.interface';
import { rxResource, takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NEVER, of, takeUntil } from 'rxjs';
import { HEROES_PAGES } from '../../heroes/heroes.routes';
import { HttpErrorResponse } from '@angular/common/http';
import { RegisterFormComponent } from '../components/register-form/register-form.component';
import { AUTH_PAGES } from '../auth.routes';
import { DestroyRef } from '@angular/core';


@Component({
  selector: 'app-register',
  imports: [RegisterFormComponent],
  template: `
    <div class="flex flex-col items-center bg-[#b91d47]">
      <h3 class="text-2xl font-bold text-white">Register Page!</h3>
      <app-register-form (sendRegister)="register($event)" />
      <h3 class="text-white">{{errorMessage}}</h3>
    </div>
  `,
})
export class RegisterComponent {


  readonly #authService = inject(AuthService);
  readonly #router = inject(Router);
  readonly #destroyRef = inject(DestroyRef);


  errorMessage = '';

  register(register: AuthLogin) {
    if (!register.email || !register.password) {
      this.errorMessage = 'Email and Password are required';
      return;
    }


    this.errorMessage = '';

    this.#authService.register(register).pipe(
      takeUntilDestroyed(this.#destroyRef),
    )
      .subscribe({
        next: () => {
          this.#router.navigate([AUTH_PAGES.AUTH, AUTH_PAGES.LOGIN]);
        }
        ,
        error: (error: HttpErrorResponse) => {
          console.error('Registration failed', error);
          this.errorMessage = `Registration failed: ${error.message}`;
        }
      })
  }



}
