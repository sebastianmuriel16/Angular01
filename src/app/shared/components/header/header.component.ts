import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { HEROES_PAGES } from '../../../features/heroes/heroes.routes';
import { AUTH_PAGES } from '../../../features/auth/auth.routes';
import { inject } from '@angular/core';
import { TokenStorageService } from '../../services/token-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styles: ``
})
export class HeaderComponent {
  navigation = {
    home: [HEROES_PAGES.HERO, HEROES_PAGES.HOME],
    heroNew: [HEROES_PAGES.HERO, HEROES_PAGES.NEW],
    login: [AUTH_PAGES.AUTH, AUTH_PAGES.LOGIN],
    register: [AUTH_PAGES.AUTH, AUTH_PAGES.REGISTER]
  }
  readonly #tokenStorageService = inject(TokenStorageService);
  readonly #router = inject(Router);
  isLogin = this.#tokenStorageService.isLogin;

  logout() {
    const isSure = window.confirm('Are you sure you want to logout?');
    if (isSure) {
      this.#tokenStorageService.logout();
      this.#router.navigate([AUTH_PAGES.AUTH, AUTH_PAGES.LOGIN]);
    }
  }

}
