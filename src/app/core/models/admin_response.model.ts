import { Student as Admin, Category, Course, Instructor, Student } from "./student";

export interface AdminLoginSuccessResponse {
    message: string;
    token: string;
    admin: Admin;
}
export interface AdminGetCourseResponse {
    message: string;
    courses: Course[];
}
export interface AdminGetCategoryResponse {
    message: string;
    categorys: Category[];
}

export interface AdminGetInstructorsResponse {
    message: string;
    instructors: Instructor[];
}

export interface AdminGetStudentsResponse {
    message: string;
    students: Student;
}

export interface AdminManageStudentResponse {
    message: string;
    updatedStudent: Student;
}
export interface AdminAddCategoryResponse {
    message: string;
    newCategory: Category;
}

export interface CourseCompletion {
    courseName: string;
    completionRate: number;
}


export interface AdminDashboardDataResponse {
    message: string;
    totalRevenue: number;
    totalStudents: number;
    trendingCourse: string;
    monthlyEnrollments: { [key: string]: number };
    individualCourseMonthlyEnrollments: { [key: string]: { [key: string]: number } };
    revenuePerCourse: { [key: string]: number };
    courseCompletionRates: { [key: string]: number };
}
