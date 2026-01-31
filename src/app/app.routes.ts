import { Routes } from '@angular/router';
import { authGuard } from './shared/guards/auth-guard';



export enum FEATURES_PAGES {
    HERO = 'hero',
    AUTH = 'auth',
}

export const routes: Routes = [

    {
        path: '',
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: FEATURES_PAGES.AUTH
            },
            {
                path: FEATURES_PAGES.AUTH,
                loadChildren: () => import('./features/auth/auth.routes').then(m => m.AUTH_ROUTES),

            }
            ,
            {
                path: FEATURES_PAGES.HERO,
                loadChildren: () => import('./features/heroes/heroes.routes').then(m => m.HEROES_ROUTES),
                canActivate: [authGuard]
            }

        ]
    },
    { path: '**', redirectTo: FEATURES_PAGES.AUTH }


    // {
    //     path: 'auth',
    //     children: [
    //         {
    //             path: 'login',
    //             loadComponent: () => import('./pages/auth/login/login.component').then(m => m.LoginComponent)
    //         },
    //         {
    //             path: 'register',
    //             loadComponent: () => import('./pages/auth/register/register.component').then(m => m.RegisterComponent)
    //         }
    //     ]
    // },
    // {
    //     path: '**',
    //     redirectTo: '/home'
    // }

];
