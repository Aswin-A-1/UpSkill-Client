import { Component, ElementRef, ViewChild } from '@angular/core';
import { CustomToastService } from '../../../../core/services/customtoast.service';
import { Router } from '@angular/router';
import { StudentHomeService } from '../../../../core/services/student/home/studenthome.service';
import { Courses, CoursesWithCompletion } from '../../../../core/models/course';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent {
  @ViewChild('certificate', { static: false }) certificateElement!: ElementRef;
  wishlistCourses: Courses[] = [];
  wishlistCoursesId: string[] = [];
  courses: Courses[] = [];
  completedCourse: string | null = null;
  courseInstructor: string | null = null;
  student: string = JSON.parse(localStorage.getItem('user')!).username;
  
  constructor(
    private _router: Router,
    private _service: StudentHomeService,
    public customToastService: CustomToastService,
  ) { }

  ngOnInit() {
    this._service.getCourses().subscribe({
      next: (res) => {
        if (res) {
          this.courses = res.courses;
        }
      }
    });

    const studentId = JSON.parse(localStorage.getItem('user')!)._id;

    this._service.getWishlistCourses(studentId).subscribe({
      next: (res) => {
        if (res) {
          this.wishlistCourses = res.courses;
          this.wishlistCourses.map((course) => {
            this.wishlistCoursesId.push(course._id);
          })
        }
      }
    });
  }

  deleteFromWishList(courseId: string) {
    const userId = JSON.parse(localStorage.getItem('user')!)._id
    this._service.wishlist(courseId, userId).subscribe({
      next: (res) => {
        if (res) {
          if (!res.status) {
            this.wishlistCourses = this.wishlistCourses.filter((course) => course._id !== courseId);
          }
        }
      }
    })
  }

  isInWishlist(courseId: string): boolean {
    return this.wishlistCoursesId.includes(courseId);
  }
  
  enroll(courseId: string) {
    this._router.navigate(['course'], { queryParams: { id: courseId } });
  }

}
