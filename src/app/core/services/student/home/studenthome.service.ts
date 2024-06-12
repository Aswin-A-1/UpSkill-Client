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

    search(query: string): Observable<any> {
        return this.http.post(`${BASE_URL}/student/search`, { query } );
    }

    isEnrolled(courseId: string, studentId: string): Observable<any> {
        return this.http.post(`${BASE_URL}/student/isenrolled`, { courseId, studentId });
    }

    getCourses(): Observable<any> {
        return this.http.get(`${BASE_URL}/student/getcourses`);
    }

    getCoursesOutside(): Observable<any> {
        return this.http.get(`${BASE_URL}/student/getcoursesoutside`);
    }

    getCourse(courseId: string): Observable<any> {
        return this.http.post(`${BASE_URL}/student/getcourse`, { courseId });
    }

    getMyCourse(userId: string): Observable<any> {
        return this.http.post(`${BASE_URL}/student/getmycourse`, { userId });
    }
}