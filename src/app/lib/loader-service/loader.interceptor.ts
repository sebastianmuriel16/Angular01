import { HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoaderService } from '../loader-service/loader-service';
import { debounce, debounceTime, finalize } from 'rxjs/operators';
import { Subject, switchMap, tap } from 'rxjs';

export function LoaderInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
    const loaderService = inject(LoaderService);
    /*
    option 1
    */
    loaderService.show();
    return next(req).pipe(
        finalize(() => loaderService.hide())
    )

    /*
    option 2
    */
    // const loaderSubject = new Subject<Boolean>();
    // return next(req).pipe(
    //     switchMap(() => next(req)),
    //     debounceTime(500),
    //     tap(() => loaderService.show()),
    //     finalize(() => {
    //         loaderService.hide();
    //         loaderSubject.complete();
    //     })
    // )


}