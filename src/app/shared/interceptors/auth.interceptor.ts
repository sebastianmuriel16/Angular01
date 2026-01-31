import { HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { TokenStorageService } from "../services/token-storage.service";

export function tokenInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {

    const tokenStorageService = inject(TokenStorageService);

    if (tokenStorageService.token) {
        req = req.clone({
            headers: req.headers.set(
                'Authorization',
                `Bearer ${tokenStorageService.token}`
            )
        })
    }
    return next(req);
}

