// import { Injectable } from '@angular/core';
// import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable({
//     providedIn: 'root'
// })
// export class AuthTokenInterceptorService implements HttpInterceptor {

//     intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//         const studentToken = localStorage.getItem('token');
//         const instructorToken = localStorage.getItem('instructor_token');
//         const adminToken = localStorage.getItem('admin_token');

//         if (studentToken || instructorToken || adminToken) {
//             let authReq = req;

//             if (studentToken) {
//                 authReq = authReq.clone({
//                     headers: authReq.headers.set('Authorization-Student', `Bearer ${studentToken}`)
//                 });
//             }

//             if (instructorToken) {
//                 authReq = authReq.clone({
//                     headers: authReq.headers.set('Authorization-Instructor', `Bearer ${instructorToken}`)
//                 });
//             }

//             if (adminToken) {
//                 authReq = authReq.clone({
//                     headers: authReq.headers.set('Authorization-Admin', `Bearer ${adminToken}`)
//                 });
//             }

//             return next.handle(authReq);
//         } else {
//             return next.handle(req);
//         }
//     }
// }

import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, switchMap, filter, take } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { CustomToastService } from '../services/customtoast.service';

@Injectable({
    providedIn: 'root'
})
export class AuthTokenInterceptorService implements HttpInterceptor {

    private isRefreshing = false;
    private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    constructor(
        private authService: AuthService,
        public customToastService: CustomToastService,
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const studentToken = localStorage.getItem('token');
        const instructorToken = localStorage.getItem('instructor_token');
        const adminToken = localStorage.getItem('admin_token');

        let authReq = req;
        if (studentToken) {
            authReq = authReq.clone({
                headers: authReq.headers.set('Authorization-Student', `Bearer ${studentToken}`)
            });
        }
        if (instructorToken) {
            authReq = authReq.clone({
                headers: authReq.headers.set('Authorization-Instructor', `Bearer ${instructorToken}`)
            });
        }
        if (adminToken) {
            authReq = authReq.clone({
                headers: authReq.headers.set('Authorization-Admin', `Bearer ${adminToken}`)
            });
        }

        return next.handle(authReq).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401) {

                    // Handle 401 errors
                    return this.handle401Error(authReq, next);
                } else {
                    return throwError(() => error);
                }
            })
        );
    }

    private handle401Error(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!this.isRefreshing) {
            this.isRefreshing = true;
            this.refreshTokenSubject.next(null);

            const refreshToken = localStorage.getItem('refresh_token');
            return this.authService.refreshToken(refreshToken as string).pipe(
                switchMap((token: any) => {
                    this.customToastService.setToast('success', 'token refreshed');
                    localStorage.setItem('token', token.accessToken);
                    this.isRefreshing = false;
                    this.refreshTokenSubject.next(token.accessToken);
                    return next.handle(this.addTokenHeader(request, token.accessToken));
                }),
                catchError((err) => {
                    this.isRefreshing = false;
                    return throwError(() => new Error(err.message));
                })
            );
        } else {
            return this.refreshTokenSubject.pipe(
                filter(token => token !== null),
                take(1),
                switchMap(token => {
                    return next.handle(this.addTokenHeader(request, token));
                })
            );
        }
    }

    private addTokenHeader(request: HttpRequest<any>, token: string): HttpRequest<any> {
        return request.clone({
            headers: request.headers.set('Authorization-Student', `Bearer ${token}`)
        });
    }
}
