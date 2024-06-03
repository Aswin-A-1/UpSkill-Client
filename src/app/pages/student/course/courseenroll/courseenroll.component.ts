import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentHomeService } from '../../../../core/services/student/home/studenthome.service';
import { CustomToastService } from '../../../../core/services/customtoast.service';
import { Course } from '../../../../core/models/student';
import { Courses } from '../../../../core/models/course';

@Component({
  selector: 'app-courseenroll',
  templateUrl: './courseenroll.component.html',
  styleUrl: './courseenroll.component.css'
})
export class CourseenrollComponent {
  instructor!: string;
  courseId!: string;
  course!: Courses;
  courses: Courses[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: StudentHomeService,
    public customToastService: CustomToastService,
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.courseId = params['courseId'];
    });

    this.service.getCourse(this.courseId).subscribe({
      next: (res) => {
        this.course = res.course
        this.instructor = res.instructor
      }
    })

    this.service.getCourses().subscribe({
      next: (res) => {
        if (res) {
          this.courses = res.courses
        }
      }
    })
  }

  checkout() {
    console.log('checking out')
  }

  enroll(courseId: string) {
    this.router.navigate(['course'], { queryParams: { id: courseId } });
  }
}
