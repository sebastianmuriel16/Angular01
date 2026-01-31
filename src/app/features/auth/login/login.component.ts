import { Component, signal, inject, computed, effect, ResourceStatus } from '@angular/core';
import { LoginFormComponent } from '../components/login-form/login-form.component';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AuthLogin } from '../Interfaces/auth-login.interface';
import { rxResource } from '@angular/core/rxjs-interop';
import { NEVER } from 'rxjs';
import { HEROES_PAGES } from '../../heroes/heroes.routes';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-login',
  imports: [LoginFormComponent],
  template: `
    <div class="flex flex-col items-center bg-[cadetblue]">
      <h3 class="text-2xl font-bold text-white">Login Page!</h3>
      <app-login-form (sendLogin)="login($event)" />
      <h3 class="text-white">{{errorMessage}}</h3>
    </div>
  `,

})
export class LoginComponent {
  readonly #authService = inject(AuthService);
  readonly #router = inject(Router);
  errorMessage = '';
  readonly loginSignal = signal<AuthLogin>({
    email: '',
    password: ''
  })

  readonly loginResource = rxResource({
    request: () => this.loginSignal(),
    loader: ({ request: login }) => this.#isLoginEmpty(login) ? NEVER : this.#authService.login(login)
  })

  isLoginResourceCompleted = computed(
    () => this.loginResource.status() === ResourceStatus.Resolved
  )

  errorLoginEffect = effect(() => {
    if (this.loginResource.error()) {
      this.errorMessage = 'Login failed: ' + (this.loginResource.error() as HttpErrorResponse).error.message;
    }
  });

  navigateEffect = effect(() => {
    if (this.isLoginResourceCompleted()) {
      this.#router.navigate([HEROES_PAGES.HERO, HEROES_PAGES.HOME]);
    }
  })

  #isLoginEmpty(login: AuthLogin): boolean {
    return login.email === '' || login.password === '';
  }


  login(login: AuthLogin) {
    this.loginSignal.set(login);
  }

}
