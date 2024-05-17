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
export class InstructorCourseService {

    constructor(
        private http: HttpClient,
        private customToastServices: CustomToastService
    ) { }

    addCourseDetails(courseDetails: CourseDetails, file: File, instructor_id: string): Observable<any> {
        const formData = new FormData();
        formData.append('courseName', courseDetails.courseName);
        formData.append('courseDescription', courseDetails.courseDescription);
        formData.append('courseCategory', courseDetails.courseCategory);
        formData.append('coursePrice', courseDetails.coursePrice.toString());
        formData.append('courseImage', file);
        formData.append('instructorId', instructor_id)
        return this.http.post(`${BASE_URL}/instructor/coursedetails`, formData);
    }

    getCourses(instructorid: string): Observable<any> {
        return this.http.get(`${BASE_URL}/instructor/getcourse/${instructorid}`);
    }

    // saveSection(section: Sections, videofile: File[][], courseId: string): Observable<any> {
    //     const requestBody = { section: section, videoFile: videofile, courseId: courseId };
    //     console.log('requestbody in service: ', requestBody)
    //     const formData = new FormData();
    //     formData.append('section', JSON.stringify(section));
    //     formData.append('videoFile', videofile);
    //     formData.append('courseId', courseId);
    //     console.log('requestbody in service: ', formData);
    //     return this.http.post(`${BASE_URL}/instructor/savesection`, formData);
    // }

    saveSection(section: Sections, videofiles: { [key: number]: File }, courseId: string): Observable<any> {
        const requestBody = { section: section, videoFile: videofiles, courseId: courseId };
        console.log('requestbody in service: ', requestBody)
        const formData = new FormData();
        formData.append('section', JSON.stringify(section));
        for (const key in videofiles) {
            if (Object.prototype.hasOwnProperty.call(videofiles, key)) {
                formData.append(`videoFile_${key}`, videofiles[key]);
            }
        }
        formData.append('courseId', courseId);
        console.log('requestbody in service: ', formData);
        return this.http.post(`${BASE_URL}/instructor/savesection`, formData);
    }

    editLesson(title: string, description: string, sectionId: string, lessonIndex: number): Observable<any> {
        const requestBody = { title: title, description: description, sectionId: sectionId, lessonIndex: lessonIndex };
        return this.http.post(`${BASE_URL}/instructor/editlesson`, requestBody);
    }

    editLessonWithVideo(title: string, description: string, videofile: File, sectionId: string, lessonIndex: number): Observable<any> {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('videofile', videofile);
        formData.append('sectionId', sectionId);
        formData.append('lessonIndex', lessonIndex.toString());
        return this.http.post(`${BASE_URL}/instructor/editlessonwithvideo`, formData);
    }

    editSection(title: string, description: string, sectionId: string): Observable<any> {
        const requestBody = { title: title, description: description, sectionId: sectionId };
        return this.http.post(`${BASE_URL}/instructor/editsection`, requestBody);
    }

    getSection(courseId: string): Observable<any> {
        return this.http.get(`${BASE_URL}/instructor/getsection/${courseId}`);
    }
}