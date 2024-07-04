import { Component } from '@angular/core';
import { CustomToastService } from '../../../../core/services/customtoast.service';
import { Router } from '@angular/router';
import { StudentHomeService } from '../../../../core/services/student/home/studenthome.service';
import { Courses } from '../../../../core/models/course';

@Component({
  selector: 'app-studenthome',
  templateUrl: './studenthome.component.html',
  styleUrl: './studenthome.component.css'
})
export class StudenthomeComponent {
  isloggedin: boolean = false
  courses: Courses[] = [];
  wishlistCourses: string[] = [];
  
  constructor(
    private _service: StudentHomeService,
    public customToastService: CustomToastService,
    private _router: Router,
  ) {}

  ngOnInit(): void {
    const studentId = JSON.parse(localStorage.getItem('user')!)._id
    this._service.getCourses().subscribe({
      next: (res) => {
        if (res) {
          this.courses = res.courses
        }
      }
    })

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

  explore() {
    this._router.navigate(['courseexplore']);
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
