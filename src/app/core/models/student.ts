export interface User {
    email: string;
    googleId: number;
    isBlocked: boolean;
    role: string;
    username: string;
    __v: number;
    _id: string;
}

export interface Instructor {
    email: string;
    googleId: number;
    isBlocked: boolean;
    isVerified: boolean;
    qualification: string;
    profilepic: string;
    certificates: string[];
    role: string;
    username: string;
    __v: number;
    _id: string;
}