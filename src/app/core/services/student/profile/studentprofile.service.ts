import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../../../environments/environment";
import { CustomToastService } from "../../customtoast.service";
import { CourseDetails, Sections } from "../../../models/course";

const BASE_URL = environment.BASE_URL


@Injectable({
    providedIn: 'root'
})
export class StudentProfileService {

    constructor(
        private http: HttpClient,
        private customToastServices: CustomToastService
    ) { }

    getStudent(studentId: string): Observable<any> {
        return this.http.get(`${BASE_URL}/student/getprofile/${studentId}`);
    }
}