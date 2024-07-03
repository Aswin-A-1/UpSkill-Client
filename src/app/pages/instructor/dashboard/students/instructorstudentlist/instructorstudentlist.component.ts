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
  currentPage = 1;
  itemsPerPage = 2;
  totalPages = 0;
  index = 1;

  constructor(
    private _router: Router,
    private courseService: InstructorCourseService,
  ) {}

  ngOnInit() {
    this.fetchStudents();
  }

  async fetchStudents() {
    const instructorId = JSON.parse(localStorage.getItem('instructor')!)._id
    this.courseService.getStudentsList(instructorId, this.currentPage, this.itemsPerPage).subscribe({
      next: (res) => {
        if (res) {
          this.students = res.students
          this.totalPages = Math.ceil(res.totalcount / this.itemsPerPage);
        }
      }
    })
  }
  
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.fetchStudents();
      this.index += this.itemsPerPage;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.fetchStudents();
      this.index -= this.itemsPerPage;
    }
  }

  navigateToMessages() {
    this._router.navigate(['instructor/student/messages']);
  }
}
