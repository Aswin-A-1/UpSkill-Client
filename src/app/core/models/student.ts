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

export interface Course {
    _id: {
      $oid: string;
    };
    coursename: string;
    description: string;
    category: string;
    price: number;
    thumbnailimage: string;
    sections: string[];
    instructorid: {
      $oid: string;
    };
    isBlocked: boolean;
    isActive: boolean;
    __v: number;
  }