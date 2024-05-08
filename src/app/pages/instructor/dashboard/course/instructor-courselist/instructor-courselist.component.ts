import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-instructor-courselist',
  templateUrl: './instructor-courselist.component.html',
  styleUrl: './instructor-courselist.component.css'
})
export class InstructorCourselistComponent {
  constructor(private router: Router) { }
  navigateToAddCourse() {
    this.router.navigate(['instructor/courses/addcourse']);
  }
}
