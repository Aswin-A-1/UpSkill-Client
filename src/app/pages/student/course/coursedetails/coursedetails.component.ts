import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomToastService } from '../../../../core/services/customtoast.service';
import { StudentHomeService } from '../../../../core/services/student/home/studenthome.service';
import { Course } from '../../../../core/models/student';
import { SectionDb } from '../../../../core/models/course';

@Component({
  selector: 'app-coursedetails',
  templateUrl: './coursedetails.component.html',
  styleUrl: './coursedetails.component.css'
})
export class CoursedetailsComponent {
  courseId!: string;
  course!: Course;
  sections: SectionDb[] = []
  isEnrolled: boolean = false
  isLoggedIn: boolean = false
  
  activeIndex: number | null = null;

  toggleAccordion(index: number) {
    this.activeIndex = this.activeIndex === index ? null : index;
  }

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _service: StudentHomeService,
    public customToastService: CustomToastService,
  ) {}

  playVideo(sectionId: string, lessonIndex: number) {
    this._router.navigate(['coursepreview'], { queryParams: { courseId: this.courseId, sectionId: sectionId, lessonIndex: lessonIndex } });
  }

  learn() {
    this._router.navigate(['coursepreview'], { queryParams: { courseId: this.courseId, sectionId: this.course.sections[0], lessonIndex: 0 } });
  }

  enroll() {
    this._router.navigate(['enroll'], { queryParams: { courseId: this.courseId } });
  }
  
  ngOnInit() {

    if(localStorage.getItem('refresh_token') != null) this.isLoggedIn = true

    this._route.queryParams.subscribe(params => {
      this.courseId = params['id'];
      if (this.courseId) {
        this.checkEnrollment();
      }
    });

    this._service.getCourse(this.courseId).subscribe({
      next: (res) => {
        this.course = res.course
        this.sections = res.sections
      }
    })
  }

  checkEnrollment() {
    const studentData = localStorage.getItem('user')
    if(studentData != null) {
      const studentId = JSON.parse(studentData)._id
      this._service.isEnrolled(this.courseId, studentId).subscribe({
        next: (res) => {
          this.isEnrolled = res.isEnrolled
          console.log('enrollement sataus: ', this.isEnrolled)
        }
      })
    }
  }

}
