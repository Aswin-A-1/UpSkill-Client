import { Courses } from "./course";
import { Instructor } from "./instructor.model";

export interface InstructorRegisterResponse {
    message: string;
    email: string;
}

export interface InsturcorLoginSuccessResponse {
    message: string;
    token: string;
    instructor: Instructor;
}

export interface InsturcorProfileDetails {
    message: string;
    instructor: Instructor;
}

export interface InsturcorCoutsesResponse {
    message: string;
    courses: Courses[];
    totalcount: number;
}

export interface InsturcorAddCourseResponse {
    message: string;
    courseId: string;
}

export interface ErrorResponse {
    error: {
        message: string;
    };
}