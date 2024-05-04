import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { catchError, of, exhaustMap, map, tap } from 'rxjs';
import * as AuthActions from "./actions";
import { AuthService } from "../../services/auth_services";
import { ToastService } from "../../services/toast.service";
import { Router } from '@angular/router';
import { CustomToastService } from "../../services/customtoast.service";


@Injectable()
export class AuthEffects {
    constructor(
        private actions$: Actions,
        private service: AuthService,
        private router: Router,
        private toastService: ToastService,
        private customToastService: CustomToastService
    ) { }

    signupRequest$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.studentSignup),
            exhaustMap((action) =>
                this.service.userRegister(action.userData).pipe(
                    map((successResponse) => {
                        if (successResponse.message) {
                            const userDataString = JSON.stringify(action.userData);
                            localStorage.setItem('userData', userDataString);
                            console.log('singup effect working')
                            this.customToastService.setToast('success', successResponse.message, ['signup/verify-otp']);
                        }
                        return AuthActions.submitSuccess({ successResponse })
                    }),
                    catchError((error) => {
                        // this.toastService.set('error', error.error.error)
                        this.customToastService.setToast('error', error.error.error);
                        return of(AuthActions.submitFail({ error: error.error.error || 'An error occurred' }));
                    })
                )
            )
        )
    )

    loginRequest$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.studentLogin),
            exhaustMap((action) =>
                this.service.userLogin(action.userData).pipe(
                    map((successResponse) => {
                        if (successResponse.message) {
                            sessionStorage.setItem('token', successResponse.token)
                            localStorage.setItem('token', successResponse.token);
                            const user = successResponse.student
                            localStorage.setItem('user', JSON.stringify(successResponse.student));
                            this.customToastService.setToastAndNavigate('success', successResponse.message, ['home']);
                            // this.router.navigate(['home']);
                            // this.toastService.set('success', 'Login successful');
                        }
                        return AuthActions.submitSuccess({ successResponse })
                    }),
                    catchError((error) => {
                        this.customToastService.setToast('error', error.error.message)
                        return of(AuthActions.submitFail({ error: error.error.message || 'An error occurred' }));
                    })
                )
            )
        )
    )

    registrationFailure$ = this.actions$.pipe(
        ofType(AuthActions.submitFail),
        tap((action) => {
            alert('sumbission failed')

            console.log('submission failed')
            console.log(action)
        })
    );
}