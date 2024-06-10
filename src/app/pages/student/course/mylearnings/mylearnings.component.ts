import { Component } from '@angular/core';
import { CustomToastService } from '../../../../core/services/customtoast.service';
import { Router } from '@angular/router';
import { StudentHomeService } from '../../../../core/services/student/home/studenthome.service';
import { Courses } from '../../../../core/models/course';

@Component({
  selector: 'app-mylearnings',
  templateUrl: './mylearnings.component.html',
  styleUrl: './mylearnings.component.css'
})
export class MylearningsComponent {
  mycourses: Courses[] = [];
  courses: Courses[] = [];
  
  constructor(
    private _router: Router,
    private _service: StudentHomeService,
    public customToastService: CustomToastService,
  ) { }

  ngOnInit() {

    this._service.getCourses().subscribe({
      next: (res) => {
        if (res) {
          this.courses = res.courses
        }
      }
    })

    const studentId = JSON.parse(localStorage.getItem('user')!)._id

    this._service.getMyCourse(studentId).subscribe({
      next: (res) => {
        if (res) {
          this.mycourses = res.courses
        }
      }
    })

  }

  learn(courseId: string, courseIndex: number) {
    this._router.navigate(['coursepreview'], { queryParams: { courseId: courseId, sectionId: this.mycourses[courseIndex].sections[0], lessonIndex: 0 } });
  }
  
  enroll(courseId: string) {
    this._router.navigate(['course'], { queryParams: { id: courseId } });
  }
}
