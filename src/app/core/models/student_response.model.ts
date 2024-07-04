import { Category, Courses, CoursesWithCompletion, SectionDb, Sections } from "./course";
import { Student } from "./student";

export interface StudentRegisterResponse {
    message: string;
    email: string;
}

export interface StudentProfileResponse {
    message: string;
    student: Student;
}

export interface StudentCoursesResponse {
    message: string;
    courses: Courses[];
}

export interface StudentCategoryResponse {
    message: string;
    categories: Category[];
}

export interface StudentCourseResponse {
    message: string;
    course: Courses;
    sections: SectionDb;
    instructor: string;
}

export interface StudentCourseWithCompletionResponse {
    message: string;
    coursesWithCompletion: CoursesWithCompletion[];
}

export interface StudentIsEnrolledResponse {
    message: string;
    isEnrolled: boolean;
}

export interface StudentIsCompletedResponse {
    message: string;
    isCompleted: boolean;
}

export interface StudentLoginSuccessResponse {
    message: string;
    token: string;
    refreshToken: string;
    student: Student;
}

export interface StudentRefreshTokenResponse {
    message: string;
    accessToken: string;
}

export interface StudentProfileDetails {
    message: string;
    instructor: Student;
}