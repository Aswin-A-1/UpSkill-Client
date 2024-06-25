import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { environment } from "../../../../../environments/environment";
import { loginCredentials } from "../../../models/auth";
import { CustomToastService } from "../../customtoast.service";
import { AdminManageStudentResponse } from "../../../models/admin_response.model";

const BASE_URL = environment.BASE_URL


@Injectable({
    providedIn: 'root'
})
export class AdminStudentService {

    constructor(
        private http: HttpClient,
        private customToastServices: CustomToastService
    ) { }

    getStudents(): Observable<any> {
        return this.http.get(`${BASE_URL}/admin/getStudent`);
    }

    manageStudents(userid: string): Observable<AdminManageStudentResponse> {
        return this.http.put<AdminManageStudentResponse>(`${BASE_URL}/admin/manageStudent/${userid}`, {});
    }

    // userLogin(requestBody: loginCredentials): Observable<any> {
    //     return this.http.post(`${BASE_URL}/student/login`, requestBody)
    // }

    // veriftOtp(userData: string, otp: number): Observable<any> {
    //     const requestBody = { userData: userData, enteredOtp: otp };
    //     return this.http.post(`${BASE_URL}/student/signup/verify-otp`, requestBody)
    // }
}