import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { environment } from "../../../../../environments/environment";

const BASE_URL = environment.BASE_URL


@Injectable({
    providedIn: 'root'
})

export class StudentHomeService {

    constructor(
        private http: HttpClient,
    ) { }

    getCourses(): Observable<any> {
        return this.http.get(`${BASE_URL}/student/getcourses`);
    }
}