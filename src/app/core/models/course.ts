export interface CourseDetails {
    courseName: string,
    courseDescription: string,
    courseCategory: string,
    coursePrice: number,
    courseImage: File,
}

export interface Courses {
    coursename: string;
    description: string;
    category: string,
    price: number;
    thumbnailimage: string;
    sections: string[];
    instructorid: string,
    isBlocked: boolean;
    isActive: boolean;
    __v: number;
    _id: string;
}