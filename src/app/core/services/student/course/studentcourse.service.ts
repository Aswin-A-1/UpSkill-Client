import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { environment } from "../../../../../environments/environment";
import { MessageResponse } from "../../../models/response.model";

const BASE_URL = environment.BASE_URL


@Injectable({
    providedIn: 'root'
})

export class StudentCourseService {

    constructor(
        private http: HttpClient,
    ) { }

    courseEnroll(paymentId: string, courseId: string, userId: string, amount: number): Observable<MessageResponse> {
        const requestBody = { paymentId: paymentId, courseId: courseId, userId: userId, amount: amount };
        return this.http.post<MessageResponse>(`${BASE_URL}/student/courseenroll`, requestBody);
    }
}