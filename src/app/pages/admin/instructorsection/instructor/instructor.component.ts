import { Component } from '@angular/core';
import { AdminInstructorService } from '../../../../core/services/admin/instructor/admininstructor.service';
import { Instructor } from '../../../../core/models/student';
import { Router } from '@angular/router';

@Component({
  selector: 'app-instructor',
  templateUrl: './instructor.component.html',
  styleUrl: './instructor.component.css'
})
export class InstructorComponent {
  isDropdownOpen: { [key: string]: boolean } = {};
  lastOpenedDropdown: string = '';

  instructors: Instructor[] = []
  constructor(
    private router: Router,
    private service: AdminInstructorService
  ) { }
  
  ngOnInit(): void {
    // this.store.dispatch(getStudent())
    this.service.getInstructors().subscribe({
      next: (res) => {
        if (res) {
          this.instructors = res.instructors
        }
      }
    })
  }

  openProfile(instructorId: string) {
    this.router.navigate(['admin/instructor-profile'], { queryParams: { id: instructorId } });
  }

  toggleDropdown(instructorId: any, event: MouseEvent) {
    event.stopPropagation();

    if (this.lastOpenedDropdown && this.lastOpenedDropdown !== instructorId) {
      this.isDropdownOpen[this.lastOpenedDropdown] = false;
    }
    
    this.isDropdownOpen[instructorId] = !this.isDropdownOpen[instructorId];
    
    if (this.isDropdownOpen[instructorId]) {
      this.lastOpenedDropdown = instructorId;
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

  
  toggleBlockStatus(instructor: Instructor) {
    // this.service.manageStudents(user._id).subscribe({
    //   next: (res) => {
    //     if (res) {
    //       // this.users = res.updateStudent
    //       const index = this.users.findIndex(u => u._id === user._id);
    //       if (index !== -1) {
    //         this.users[index].isBlocked = res.updatedStudent.isBlocked;
    //       }
    //     }
    //   }
    // })
  }
}
