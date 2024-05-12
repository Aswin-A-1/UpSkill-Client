import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CustomToastService } from '../../../../../core/services/customtoast.service';
import { InstructorCourseService } from '../../../../../core/services/instructor/course/instructorcourse.service';
import { Courses } from '../../../../../core/models/course';

@Component({
  selector: 'app-instructor-courselist',
  templateUrl: './instructor-courselist.component.html',
  styleUrl: './instructor-courselist.component.css'
})
export class InstructorCourselistComponent {
  courses: Courses[] = [];
  isDropdownOpen: { [key: string]: boolean } = {};
  lastOpenedDropdown: string = '';

  constructor(
    private router: Router,
    private service: InstructorCourseService,
    public customToastService: CustomToastService
  ) { }

  ngOnInit(): void {
    const instructor = JSON.parse(localStorage.getItem('instructor')!)
    this.service.getCourses(instructor._id).subscribe({
      next: (res) => {
        if (res) {
          this.courses = res.courses
        }
      }
    })
  }

  edit(id: string) {
    console.log('id to edit: ', id)
  }
  addSection(id: string) {
    this.router.navigate(['instructor/courses/addsection'], { queryParams: { id: id } });
  }
  deletecourse(id: string) {
    console.log('id to delete: ', id)
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
    this.router.navigate(['instructor/courses/addcourse']);
  }
}
