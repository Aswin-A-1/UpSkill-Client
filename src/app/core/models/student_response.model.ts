import { Student } from "./student";

export interface StudentRegisterResponse {
    message: string;
    email: string;
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