import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { environment } from "../../../../../environments/environment";
import { StudentCategoryResponse, StudentCourseWithCompletionResponse, StudentCoursesResponse, StudentIsCompletedResponse, StudentIsEnrolledResponse, StudentWishlistCoursesResponse, StudentWishlistResponse } from "../../../models/student_response.model";

const BASE_URL = environment.BASE_URL


@Injectable({
    providedIn: 'root'
})

export class StudentHomeService {

    constructor(
        private http: HttpClient,
    ) { }

    search(query: string): Observable<StudentCoursesResponse> {
        return this.http.post<StudentCoursesResponse>(`${BASE_URL}/student/search`, { query } );
    }

    isEnrolled(courseId: string, studentId: string): Observable<StudentIsEnrolledResponse> {
        return this.http.post<StudentIsEnrolledResponse>(`${BASE_URL}/student/isenrolled`, { courseId, studentId });
    }

    isCompleted(courseId: string, studentId: string, lessonId: string): Observable<StudentIsCompletedResponse> {
        return this.http.post<StudentIsCompletedResponse>(`${BASE_URL}/student/iscompleted`, { courseId, studentId, lessonId });
    }

    wishlist(courseId: string, studentId: string): Observable<StudentWishlistResponse> {
        return this.http.post<StudentWishlistResponse>(`${BASE_URL}/student/wishlist`, { courseId, studentId });
    }

    getWishlist(studentId: string): Observable<StudentWishlistCoursesResponse> {
        return this.http.get<StudentWishlistCoursesResponse>(`${BASE_URL}/student/wishlist/${studentId}`);
    }

    getWishlistCourses(studentId: string): Observable<StudentCoursesResponse> {
        return this.http.get<StudentCoursesResponse>(`${BASE_URL}/student/wishlistcourses/${studentId}`);
    }

    changeCompletionStatus(courseId: string, studentId: string, lessonId: string): Observable<StudentIsCompletedResponse> {
        return this.http.post<StudentIsCompletedResponse>(`${BASE_URL}/student/changecompletion`, { courseId, studentId, lessonId });
    }

    getCourses(): Observable<StudentCoursesResponse> {
        return this.http.get<StudentCoursesResponse>(`${BASE_URL}/student/getcourses`);
    }

    getCategorys(): Observable<StudentCategoryResponse> {
        return this.http.get<StudentCategoryResponse>(`${BASE_URL}/student/getcategories`);
    }

    getCourseByCategory(category: string): Observable<StudentCoursesResponse> {
        return this.http.post<StudentCoursesResponse>(`${BASE_URL}/student/getcoursebycategory`, { category });
    }

    getCoursesOutside(): Observable<StudentCoursesResponse> {
        return this.http.get<StudentCoursesResponse>(`${BASE_URL}/student/getcoursesoutside`);
    }

    getCourse(courseId: string): Observable<any> {
        return this.http.post(`${BASE_URL}/student/getcourse`, { courseId });
    }

    getMyCourse(userId: string): Observable<StudentCourseWithCompletionResponse> {
        return this.http.post<StudentCourseWithCompletionResponse>(`${BASE_URL}/student/getmycourse`, { userId });
    }
}