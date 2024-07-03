import { Courses, SectionDb, Sections, lessons } from "./course";
import { Instructor } from "./instructor.model";
import { Instructor as InstructorModel } from "./student"
import { Category, Course, Student } from "./student";

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

export interface InsturcorGetProfileDetails {
    message: string;
    instructor: InstructorModel;
}

export interface InsturcorCoutsesResponse {
    message: string;
    courses: Courses[];
    totalcount: number;
}

export interface InsturcorCategoryResponse {
    message: string;
    categorys: Category[];
}

export interface InsturcorVerificationResponse {
    message: string;
    verification: boolean;
}

export interface InsturcorSaveSectionResponse {
    message: string;
    newSection: Sections;
}

export interface InsturcorEditSectionResponse {
    message: string;
    section: Sections;
}

export interface InsturcorGetSectionResponse {
    message: string;
    sections: SectionDb[];
}

export interface InsturcorGetStudentsResponse {
    message: string;
    students: Student[];
}

export interface InsturcorGetStudentsResponseList {
    message: string;
    students: Student[];
    totalcount: number;
}

export interface InstructorGetDashboardData {
    message: string;
    totalRevenue: number;
    totalStudents: number;
    trendingCourse: string;
    monthlyEnrollments: { [key: string]: number };
    individualCourseMonthlyEnrollments: { [key: string]: { [key: string]: number } };
} 

export interface InsturcorEditLessonResponse {
    message: string;
    newlesson: lessons;
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