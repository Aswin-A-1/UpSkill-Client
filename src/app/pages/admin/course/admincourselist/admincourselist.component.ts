import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminCourseService } from '../../../../core/services/admin/course/admincourse.service';
import { Course } from '../../../../core/models/student';

@Component({
  selector: 'app-admincourselist',
  templateUrl: './admincourselist.component.html',
  styleUrl: './admincourselist.component.css'
})
export class AdmincourselistComponent {
  courses!: Course[]
  constructor(
    private router: Router,
    private service: AdminCourseService,
  ) {}
  
  ngOnInit(): void {
    this.service.getCourses().subscribe({
      next: (res) => {
        if (res) {
          this.courses = res.courses
        }
      }
    })
  }
}
