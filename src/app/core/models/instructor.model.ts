export interface Instructor {
    googleId?: number;
    username: string;
    email: string;
    qualification: string;
    profilepic: string;
    certificates: string[];
    password: string;
    role: string;
    isBlocked: boolean;
    isVerified: boolean;
}