import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { environment } from "../../../../../environments/environment";
import { AdminGetInstructorsResponse, AdminManageStudentResponse } from "../../../models/admin_response.model";

const BASE_URL = environment.BASE_URL


@Injectable({
    providedIn: 'root'
})
export class AdminInstructorService {

    constructor(
        private http: HttpClient
    ) { }

    getInstructors(page: number, limit: number): Observable<AdminGetInstructorsResponse> {
        const params = new HttpParams()
        .set('page', page.toString())
        .set('limit', limit.toString());
        return this.http.get<AdminGetInstructorsResponse>(`${BASE_URL}/admin/getInstructors`, { params });
    }

    manageStudents(userid: string): Observable<AdminManageStudentResponse> {
        return this.http.put<AdminManageStudentResponse>(`${BASE_URL}/admin/manageStudent/${userid}`, {});
    }
}