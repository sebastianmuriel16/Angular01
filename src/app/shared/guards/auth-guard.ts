import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { TokenStorageService } from '../services/token-storage.service';
import { AUTH_PAGES } from '../../features/auth/auth.routes';

export const authGuard: CanActivateFn = () => {
    const router = inject(Router);
    const serviceToken = inject(TokenStorageService);

    return serviceToken.isLogin() ?? router.navigate([AUTH_PAGES.AUTH, AUTH_PAGES.LOGIN]);

}
