import { Routes } from "@angular/router"
import { heroResolver } from "../heroes/guards/hero.resolver";
import { heroIdMatcher } from "../heroes/matchers/hero-id-matcher";
import { heroUnsavedChangesGuard } from "./guards/hero-unsaved-changes";

export enum HEROES_PAGES {
    HERO = '/hero',
    HOME = 'home',
    NEW = 'new',
    UPDATE = 'update',
    DETAILS = 'details'
}

export const HEROES_ROUTES: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: HEROES_PAGES.HOME
            },
            {
                path: HEROES_PAGES.HOME,
                loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
            },

            {
                path: HEROES_PAGES.NEW,
                loadComponent: () => import('./pages/hero-new/hero-new.component').then(m => m.HeroNewComponent)
            },
            {
                path: `${HEROES_PAGES.UPDATE}/:id`,
                loadComponent: () => import('./pages/hero-update/hero-update.component').then(m => m.HeroUpdateComponent),
                resolve: { hero: heroResolver },
                canDeactivate: [heroUnsavedChangesGuard]
            },
            {
                // path: 'details/:id',
                loadComponent: () => import('./pages/hero-detail/hero-detail.component').then(m => m.HeroDetailComponent),
                matcher: heroIdMatcher
            }

        ]
    },
    { path: "**", redirectTo: HEROES_PAGES.HOME },


]