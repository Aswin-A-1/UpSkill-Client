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
    lessoncount: number,
    isBlocked: boolean;
    isActive: boolean;
    __v: number;
    _id: string;
}

export interface Category {
    name: string;
    isBlocked: boolean;
    __v: number;
    _id: string;
}

export interface CoursesWithCompletion {
    coursename: string;
    description: string;
    category: string,
    price: number;
    thumbnailimage: string;
    sections: string[];
    instructorid: string,
    lessoncount: number,
    isBlocked: boolean;
    isActive: boolean;
    completionPercentage: number;
    __v: number;
    _id: string;
}

export interface lessons {
    title: string;
    description: string;
    free: boolean;
    vedio: string | null;
}

export interface Sections {
    title: string;
    description: string;
    lessons: [lessons]
}

export interface LessonDb {
    title: string;
    description: string;
    free: boolean;
    video: string;
    _id: string;
}

export interface SectionDb {
    sectionname: string;
    description: string;
    lessons: LessonDb[];
    courseid: any;
    isFree: boolean;
    _id: string;
    __v: number;
}