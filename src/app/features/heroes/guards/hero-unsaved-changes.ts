import { CanDeactivateFn } from "@angular/router";
import { HeroUpdateComponent } from "../../heroes/pages/hero-update/hero-update.component";


export const heroUnsavedChangesGuard: CanDeactivateFn<HeroUpdateComponent> = (component) => component.canDeactivate(); 