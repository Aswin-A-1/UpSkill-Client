import { Component, ElementRef, ViewChild } from '@angular/core';
import { CustomToastService } from '../../../../core/services/customtoast.service';
import { Router } from '@angular/router';
import { StudentHomeService } from '../../../../core/services/student/home/studenthome.service';
import { Courses, CoursesWithCompletion } from '../../../../core/models/course';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-mylearnings',
  templateUrl: './mylearnings.component.html',
  styleUrls: ['./mylearnings.component.css']
})
export class MylearningsComponent {
  @ViewChild('certificate', { static: false }) certificateElement!: ElementRef;
  mycourses: CoursesWithCompletion[] = [];
  courses: Courses[] = [];
  completedCourse: string | null = null;
  courseInstructor: string | null = null;
  student: string = JSON.parse(localStorage.getItem('user')!).username;
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

    const studentId = JSON.parse(localStorage.getItem('user')!)._id;

    this._service.getMyCourse(studentId).subscribe({
      next: (res) => {
        if (res) {
          this.mycourses = res.coursesWithCompletion;
        }
      }
    });

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

  generatePDF(courseId: string) {
    this._service.getCourse(courseId).subscribe({
      next: (res) => {
        if (res) {
          console.log('get response')
          this.completedCourse = res.course.coursename;
          this.courseInstructor = res.instructor;

          // Generate the PDF
          setTimeout(() => {
            const certificate = this.certificateElement.nativeElement;
            html2canvas(certificate).then(canvas => {
              const imgData = canvas.toDataURL('image/png');
              const pdf = new jsPDF({
                orientation: 'landscape',
                unit: 'px',
                format: [canvas.width, canvas.height]
              });
              pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
              pdf.save('certificate.pdf');

              // Reset the values
              this.completedCourse = null;
              this.courseInstructor = null;
            });
          }, 0);
        }
      }
    });
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

  learn(courseId: string, courseIndex: number) {
    this._router.navigate(['coursepreview'], { queryParams: { courseId: courseId, sectionId: this.mycourses[courseIndex].sections[0], lessonIndex: 0 } });
  }
  
  enroll(courseId: string) {
    this._router.navigate(['course'], { queryParams: { id: courseId } });
  }
}
