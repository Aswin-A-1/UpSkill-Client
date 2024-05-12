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

export interface lessons {
    title: string;
    description: string;
    vedio: string;
}

export interface Sections {
    title: string;
    description: string;
    lessons: [lessons]
}

export interface LessonDb {
    title: string;
    description: string;
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