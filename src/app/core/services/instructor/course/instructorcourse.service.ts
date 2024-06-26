import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../../../environments/environment";
import { CustomToastService } from "../../customtoast.service";
import { CourseDetails, Sections } from "../../../models/course";
import { InstructorGetDashboardData, InsturcorAddCourseResponse, InsturcorCategoryResponse, InsturcorCoutsesResponse, InsturcorEditLessonResponse, InsturcorEditSectionResponse, InsturcorGetSectionResponse, InsturcorGetStudentsResponse, InsturcorSaveSectionResponse, InsturcorVerificationResponse } from "../../../models/instructor_response.model";
import { MessageResponse } from "../../../models/response.model";

const BASE_URL = environment.BASE_URL


@Injectable({
    providedIn: 'root'
})
export class InstructorCourseService {

    constructor(
        private http: HttpClient,
        private customToastServices: CustomToastService
    ) { }

    addCourseDetails(courseDetails: CourseDetails, file: File, instructor_id: string): Observable<InsturcorAddCourseResponse> {
        const formData = new FormData();
        formData.append('courseName', courseDetails.courseName);
        formData.append('courseDescription', courseDetails.courseDescription);
        formData.append('courseCategory', courseDetails.courseCategory);
        formData.append('coursePrice', courseDetails.coursePrice.toString());
        formData.append('courseImage', file);
        formData.append('instructorId', instructor_id)
        return this.http.post<InsturcorAddCourseResponse>(`${BASE_URL}/instructor/coursedetails`, formData);
    }

    getCourses(instructorid: string, page: number, limit: number): Observable<InsturcorCoutsesResponse> {
        const params = new HttpParams()
        .set('page', page.toString())
        .set('limit', limit.toString());
        return this.http.get<InsturcorCoutsesResponse>(`${BASE_URL}/instructor/getcourse/${instructorid}`, { params });
    }

    getCategory(): Observable<InsturcorCategoryResponse> {
        return this.http.get<InsturcorCategoryResponse>(`${BASE_URL}/instructor/getcategory`);
    }

    getVerification(instructorid: string): Observable<InsturcorVerificationResponse> {
        return this.http.get<InsturcorVerificationResponse>(`${BASE_URL}/instructor/getverification/${instructorid}`);
    }

    saveSection(section: Sections, videofiles: { [key: number]: File }, courseId: string): Observable<InsturcorSaveSectionResponse> {
        const requestBody = { section: section, videoFile: videofiles, courseId: courseId };
        const formData = new FormData();
        formData.append('section', JSON.stringify(section));
        for (const key in videofiles) {
            if (Object.prototype.hasOwnProperty.call(videofiles, key)) {
                formData.append(`videoFile_${key}`, videofiles[key]);
            }
        }
        formData.append('courseId', courseId);
        return this.http.post<InsturcorSaveSectionResponse>(`${BASE_URL}/instructor/savesection`, formData);
    }

    editLesson(title: string, description: string, free: boolean, sectionId: string, lessonIndex: number): Observable<InsturcorEditLessonResponse> {
        const requestBody = { title: title, description: description,  free: free, sectionId: sectionId, lessonIndex: lessonIndex };
        return this.http.put<InsturcorEditLessonResponse>(`${BASE_URL}/instructor/editlesson`, requestBody);
    }

    editLessonWithVideo(title: string, description: string, free: string, videofile: File, sectionId: string, lessonIndex: number): Observable<InsturcorEditLessonResponse> {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('isFree', free);
        formData.append('videofile', videofile);
        formData.append('sectionId', sectionId);
        formData.append('lessonIndex', lessonIndex.toString());
        return this.http.post<InsturcorEditLessonResponse>(`${BASE_URL}/instructor/editlessonwithvideo`, formData);
    }

    addLessonWithVideo(title: string, description: string, free: string, videofile: File, sectionId: string): Observable<InsturcorEditLessonResponse> {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('isFree', free);
        formData.append('videofile', videofile);
        formData.append('sectionId', sectionId);
        return this.http.post<InsturcorEditLessonResponse>(`${BASE_URL}/instructor/addlesson`, formData);
    }

    editSection(title: string, description: string, sectionId: string): Observable<InsturcorEditSectionResponse> {
        const requestBody = { title: title, description: description, sectionId: sectionId };
        return this.http.put<InsturcorEditSectionResponse>(`${BASE_URL}/instructor/editsection`, requestBody);
    }

    deleteSection(sectionId: string, courseId: string): Observable<MessageResponse> {
        const requestBody = { sectionId: sectionId, courseId: courseId };
        const options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            }),
            body: requestBody
        };
        return this.http.delete<MessageResponse>(`${BASE_URL}/instructor/deletesection`, options);
    }

    deleteLesson(sectionId: string, lessonIndex: number): Observable<MessageResponse> {
        const requestBody = { sectionId: sectionId, lessonIndex: lessonIndex };
        const options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            }),
            body: requestBody
        };
        return this.http.delete<MessageResponse>(`${BASE_URL}/instructor/deletelesson`, options);
    }

    getSection(courseId: string): Observable<InsturcorGetSectionResponse> {
        return this.http.get<InsturcorGetSectionResponse>(`${BASE_URL}/instructor/getsection/${courseId}`);
    }

    getStudents(instructorId: string): Observable<InsturcorGetStudentsResponse> {
        return this.http.get<InsturcorGetStudentsResponse>(`${BASE_URL}/instructor/getstudents/${instructorId}`);
    }
    
    getDashboardData(instructorId: string): Observable<InstructorGetDashboardData> {
        return this.http.get<InstructorGetDashboardData>(`${BASE_URL}/instructor/getdashboarddata/${instructorId}`);
    }
}