import { Component, ElementRef, ViewChild } from '@angular/core';
import { CustomToastService } from '../../../../core/services/customtoast.service';
import { Router } from '@angular/router';
import { StudentHomeService } from '../../../../core/services/student/home/studenthome.service';
import { Category, Courses, CoursesWithCompletion } from '../../../../core/models/course';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-courseexplore',
  templateUrl: './courseexplore.component.html',
  styleUrl: './courseexplore.component.css'
})
export class CourseexploreComponent {
  @ViewChild('certificate', { static: false }) certificateElement!: ElementRef;
  mycourses: CoursesWithCompletion[] = [];
  courses: Courses[] = [];
  selectedCategory: string = '';
  coursesByCategory: Courses[] = [];
  categories: Category[] = [];
  completedCourse: string | null = null;
  courseInstructor: string | null = null;
  wishlistCourses: string[] = [];
  
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

    this._service.getCategorys().subscribe({
      next: (res) => {
        if (res) {
          this.categories = res.categories;
          this.selectedCategory = this.categories[0].name;
          this.getCourseByCategory(this.selectedCategory)
        }
      }
    });

    const studentId = JSON.parse(localStorage.getItem('user')!)._id;

    if(studentId) {
      this._service.getWishlist(studentId).subscribe({
        next: (res) => {
          if (res) {
            this.wishlistCourses = res.courses
          }
        }
      })
    }
  }

  getCourseByCategory(category: string) {
    this.selectedCategory = category
    this._service.getCourseByCategory(this.selectedCategory).subscribe({
      next: (res) => {
        if (res) {
          this.coursesByCategory = res.courses;
        }
      }
    });
  }

  selectCategory(category: string) {
    this.selectedCategory = category
    this.getCourseByCategory(this.selectedCategory)
  }

  wishList(courseId: string) {
    const userId = JSON.parse(localStorage.getItem('user')!)._id
    this._service.wishlist(courseId, userId).subscribe({
      next: (res) => {
        if (res) {
          if (res.status) {
            this.wishlistCourses.push(courseId);
          } else {
            this.wishlistCourses = this.wishlistCourses.filter((id) => id !== courseId);
          }
        }
      }
    })
  }

  isInWishlist(courseId: string): boolean {
    return this.wishlistCourses.includes(courseId);
  }
  
  enroll(courseId: string) {
    this._router.navigate(['course'], { queryParams: { id: courseId } });
  }

}
