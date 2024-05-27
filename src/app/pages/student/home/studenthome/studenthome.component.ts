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
  
  constructor(
    private service: StudentHomeService,
    public customToastService: CustomToastService,
    private router: Router,
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
