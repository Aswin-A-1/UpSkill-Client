import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { environment } from "../../../../../environments/environment";

const BASE_URL = environment.BASE_URL


@Injectable({
    providedIn: 'root'
})
export class AdminInstructorService {

    constructor(
        private http: HttpClient
    ) { }

    getInstructors(): Observable<any> {
        return this.http.get(`${BASE_URL}/admin/getInstructors`);
    }

    manageStudents(userid: string): Observable<any> {
        return this.http.put(`${BASE_URL}/admin/manageStudent/${userid}`, {});
    }
}