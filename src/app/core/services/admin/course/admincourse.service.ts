import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../../../environments/environment";

const BASE_URL = environment.BASE_URL


@Injectable({
    providedIn: 'root'
})
export class AdminCourseService {

    constructor(
        private http: HttpClient
    ) { }

    getCourses(): Observable<any> {
        return this.http.get(`${BASE_URL}/admin/getCourses`);
    }
}