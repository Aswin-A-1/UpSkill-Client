import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { InstructorCourseService } from '../../../../../core/services/instructor/course/instructorcourse.service';
import { Student } from '../../../../../core/models/student';

@Component({
  selector: 'app-instructorstudentlist',
  templateUrl: './instructorstudentlist.component.html',
  styleUrl: './instructorstudentlist.component.css'
})
export class InstructorstudentlistComponent {
  students: Student[] = [];

  constructor(
    private _router: Router,
    private courseService: InstructorCourseService,
  ) {}

  ngOnInit() {
    const instructorId = JSON.parse(localStorage.getItem('instructor')!)._id
    this.courseService.getStudents(instructorId).subscribe({
      next: (res) => {
        if (res) {
          this.students = res.students
        }
      }
    })

  }

  navigateToMessages() {
    this._router.navigate(['instructor/student/messages']);
  }
}
