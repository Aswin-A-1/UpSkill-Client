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
export class InstructorProfileService {

    constructor(
        private http: HttpClient,
        private customToastServices: CustomToastService
    ) { }

    updateProfile(qualification: string, profilepic: File, certificates: File[], instructorId: string): Observable<any> {
        const formData = new FormData();
        formData.append('qualification', qualification);
        formData.append('profileImageFile', profilepic);
        for (const key in certificates) {
            if (Object.prototype.hasOwnProperty.call(certificates, key)) {
                formData.append(`certificate_${key}`, certificates[key]);
            }
        }
        formData.append('instructorId', instructorId);
        return this.http.post(`${BASE_URL}/instructor/updateprofile`, formData);
    }

    getInstructor(instructorid: string): Observable<any> {
        return this.http.get(`${BASE_URL}/instructor/getprofile/${instructorid}`);
    }

    updateVerfication(instructorid: string): Observable<any> {
        return this.http.post(`${BASE_URL}/instructor/updateverification`, { instructorid });
    }

    updateblock(instructorid: string): Observable<any> {
        return this.http.post(`${BASE_URL}/instructor/updateBlock`, { instructorid });
    }
}