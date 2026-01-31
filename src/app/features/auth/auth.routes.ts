import { Routes } from "@angular/router";

export enum AUTH_PAGES {
    AUTH = '/auth',
    LOGIN = 'login',
    REGISTER = 'register'
}

export const AUTH_ROUTES: Routes = [

    {
        path: '',
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: AUTH_PAGES.LOGIN,
            },
            {
                path: AUTH_PAGES.LOGIN,
                loadComponent: () => import('./login/login.component').then(m => m.LoginComponent)
            },
            {
                path: AUTH_PAGES.REGISTER,
                loadComponent: () => import('./register/register.component').then(m => m.RegisterComponent)
            }
        ]
    },
    {
        path: '**',
        redirectTo: AUTH_PAGES.LOGIN
    }
]