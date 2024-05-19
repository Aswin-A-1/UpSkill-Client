import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthTokenInterceptorService implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const studentToken = localStorage.getItem('token');
        const instructorToken = localStorage.getItem('instructor_token');
        const adminToken = localStorage.getItem('admin_token');

        if (studentToken || instructorToken || adminToken) {
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

            return next.handle(authReq);
        } else {
            return next.handle(req);
        }
    }
}
