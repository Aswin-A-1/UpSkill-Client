import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../../../environments/environment";
import { AdminAddCategoryResponse, AdminDashboardDataResponse, AdminGetCategoryResponse, AdminGetCourseResponse } from "../../../models/admin_response.model";
import { MessageResponse } from "../../../models/response.model";

const BASE_URL = environment.BASE_URL


@Injectable({
    providedIn: 'root'
})
export class AdminCourseService {

    constructor(
        private http: HttpClient
    ) { }

    getCourses(page: number, limit: number): Observable<AdminGetCourseResponse> {
        const params = new HttpParams()
        .set('page', page.toString())
        .set('limit', limit.toString());
        return this.http.get<AdminGetCourseResponse>(`${BASE_URL}/admin/getCourses`, { params });
    }

    getCategory(page: number, limit: number): Observable<AdminGetCategoryResponse> {
        const params = new HttpParams()
        .set('page', page.toString())
        .set('limit', limit.toString());
        return this.http.get<AdminGetCategoryResponse>(`${BASE_URL}/admin/getCategory`, { params });
    }

    addCategory(name: string): Observable<AdminAddCategoryResponse> {
        const requestBody = { name: name };
        return this.http.post<AdminAddCategoryResponse>(`${BASE_URL}/admin/addcategory`, requestBody);
    }

    deleteCategory(categoryId: string): Observable<MessageResponse> {
        const requestBody = { categoryId: categoryId };
        const options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            }),
            body: requestBody
        };
        return this.http.delete<MessageResponse>(`${BASE_URL}/admin/deletecategory`, options);
    }
    
    getDashboardData(): Observable<AdminDashboardDataResponse> {
        return this.http.get<AdminDashboardDataResponse>(`${BASE_URL}/admin/getdashboarddata`);
    }
}