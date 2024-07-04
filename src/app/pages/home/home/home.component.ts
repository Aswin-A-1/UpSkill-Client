import { Component } from '@angular/core';
import { CustomToastService } from '../../../core/services/customtoast.service';
import { Router } from '@angular/router';
import { StudentHomeService } from '../../../core/services/student/home/studenthome.service';
import { Courses } from '../../../core/models/course';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  isloggedin: boolean = false
  courses: Courses[] = [];
  
  constructor(
    private _service: StudentHomeService,
    public customToastService: CustomToastService,
    private _router: Router,
  ) {}

  ngOnInit(): void {
    this._service.getCoursesOutside().subscribe({
      next: (res) => {
        if (res) {
          this.courses = res.courses
        }
      }
    })
    
  }

  explore() {
    this._router.navigate(['/courseexplore']);
  }

  enroll(courseId: string) {
    this._router.navigate(['course'], { queryParams: { id: courseId } });
  }

}
