import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SignUpCredentials, loginCredentials } from "../models/auth";
import { Observable, of } from "rxjs";
import { environment } from "../../../environments/environment";
import { CustomToastService } from "./customtoast.service";

const BASE_URL = environment.BASE_URL
const GOOGLE_URL = environment.GOOGLE_URL


@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private GOOGLE_URL = 'https://accounts.google.com/o/oauth2/v2/auth?';

    constructor(
        private http: HttpClient,
        private customToastServices: CustomToastService
    ) { }

    userRegister(requestBody: SignUpCredentials): Observable<any> {
        return this.http.post(`${BASE_URL}/student/signup`, requestBody)
    }

    instructorRegister(requestBody: SignUpCredentials): Observable<any> {
        return this.http.post(`${BASE_URL}/instructor/signup`, requestBody)
    }

    // googleAuth(): Observable<any>{
    //     return this.http.get(`${GOOGLE_URL}auth/google`)
    // }

    googleAuth(): Observable<any> {

        // Redirect the user to the Google OAuth2 authentication page
        // window.location.href = `${GOOGLE_URL}auth/google`;

        // // Return an Observable for consistency with the rest of your service
        // return of(null);
        return this.http.get(`${GOOGLE_URL}auth/google`);
    }

    getUserInfo(): Observable<any> {
        return this.http.get(`${GOOGLE_URL}auth/google`);
    }

    userLogin(requestBody: loginCredentials): Observable<any> {
        return this.http.post(`${BASE_URL}/student/login`, requestBody)
    }

    instructorLogin(requestBody: loginCredentials): Observable<any> {
        return this.http.post(`${BASE_URL}/instructor/login`, requestBody)
    }

    veriftOtp(userData: string, otp: number): Observable<any> {
        const requestBody = { userData: userData, enteredOtp: otp };
        return this.http.post(`${BASE_URL}/student/signup/verify-otp`, requestBody)
    }

    verifyinstructortOtp(userData: string, otp: number): Observable<any> {
        const requestBody = { userData: userData, enteredOtp: otp };
        return this.http.post(`${BASE_URL}/instructor/signup/verify-otp`, requestBody)
    }

    resendOtp(requestBody: SignUpCredentials): Observable<any> {
        return this.http.post(`${BASE_URL}/student/signup/resend-otp`, requestBody)
    }

    test(requestBody: any): Observable<any> {
        return this.http.post(`${BASE_URL}/student/test`, requestBody)
    }
}