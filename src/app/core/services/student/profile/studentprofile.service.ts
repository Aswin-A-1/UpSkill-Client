import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../../../environments/environment";
import { CustomToastService } from "../../customtoast.service";
import { CourseDetails, Sections } from "../../../models/course";
import { StudentProfileResponse } from "../../../models/student_response.model";

const BASE_URL = environment.BASE_URL


@Injectable({
    providedIn: 'root'
})
export class StudentProfileService {

    constructor(
        private http: HttpClient,
        private customToastServices: CustomToastService
    ) { }

    getStudent(studentId: string): Observable<StudentProfileResponse> {
        return this.http.get<StudentProfileResponse>(`${BASE_URL}/student/getprofile/${studentId}`);
    }
}