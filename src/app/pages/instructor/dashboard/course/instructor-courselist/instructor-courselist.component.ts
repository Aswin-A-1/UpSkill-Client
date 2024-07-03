import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CustomToastService } from '../../../../../core/services/customtoast.service';
import { InstructorCourseService } from '../../../../../core/services/instructor/course/instructorcourse.service';
import { Courses } from '../../../../../core/models/course';
import { InsturcorCoutsesResponse } from '../../../../../core/models/instructor_response.model';

@Component({
  selector: 'app-instructor-courselist',
  templateUrl: './instructor-courselist.component.html',
  styleUrl: './instructor-courselist.component.css'
})
export class InstructorCourselistComponent {
  courses: Courses[] = [];
  isDropdownOpen: { [key: string]: boolean } = {};
  lastOpenedDropdown: string = '';
  currentPage = 1;
  itemsPerPage = 2;
  totalPages = 0;
  index = 1;

  constructor(
    private _router: Router,
    private _service: InstructorCourseService,
    public customToastService: CustomToastService
  ) { }

  ngOnInit(): void {
    this.fetchCourses();
  }

  async fetchCourses() {
    const instructor = JSON.parse(localStorage.getItem('instructor')!)
    this._service.getCourses(instructor._id, this.currentPage, this.itemsPerPage).subscribe({
      next: (res: InsturcorCoutsesResponse) => {
        if (res) {
          this.courses = res.courses
          this.totalPages = Math.ceil(res.totalcount / this.itemsPerPage);
        }
      }
    })
  }

  edit(id: string) {
  }
  addSection(id: string) {
    this._router.navigate(['instructor/courses/addsection'], { queryParams: { id: id } });
  }
  deletecourse(id: string) {
  }

  toggleDropdown(courseId: any, event: MouseEvent) {
    event.stopPropagation();

    if (this.lastOpenedDropdown && this.lastOpenedDropdown !== courseId) {
      this.isDropdownOpen[this.lastOpenedDropdown] = false;
    }
    
    this.isDropdownOpen[courseId] = !this.isDropdownOpen[courseId];
    
    if (this.isDropdownOpen[courseId]) {
      this.lastOpenedDropdown = courseId;
    } else {
      this.lastOpenedDropdown = '';
    }
  }

  closeDropdownOutsideClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const dropdowns = document.querySelectorAll('.dropdown-menu');
    dropdowns.forEach((dropdown) => {
      if (!dropdown.contains(target)) {
        this.isDropdownOpen[this.lastOpenedDropdown] = false;
        this.lastOpenedDropdown = '';
      }
    });
  }

  navigateToAddCourse() {
    this._router.navigate(['instructor/courses/addcourse']);
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
