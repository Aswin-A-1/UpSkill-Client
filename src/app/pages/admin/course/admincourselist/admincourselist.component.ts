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
  currentPage = 1;
  itemsPerPage = 2;
  totalPages = 0;
  index = 1;

  constructor(
    private _router: Router,
    private _service: AdminCourseService,
  ) {}

  navigateToCategory() {
    this._router.navigate(['admin/category']);
  }
  
  ngOnInit(): void {
    this.fetchCourses()
  }

  async fetchCourses() {
    this._service.getCourses(this.currentPage, this.itemsPerPage).subscribe({
      next: (res) => {
        if (res) {
          this.courses = res.courses
          this.totalPages = Math.ceil(res.totalcount / this.itemsPerPage);
        }
      }
    })
  }
  
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.fetchCourses();
      this.index += this.itemsPerPage;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.fetchCourses();
      this.index -= this.itemsPerPage;
    }
  }
}
