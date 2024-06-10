import { Component } from '@angular/core';
import { AdminInstructorService } from '../../../../core/services/admin/instructor/admininstructor.service';
import { Instructor } from '../../../../core/models/student';
import { Router } from '@angular/router';
import { InstructorProfileService } from '../../../../core/services/instructor/profile/instructorprofile.service';
import { CustomToastService } from '../../../../core/services/customtoast.service';

@Component({
  selector: 'app-instructor',
  templateUrl: './instructor.component.html',
  styleUrl: './instructor.component.css'
})
export class InstructorComponent {
  blockModal = false;
  unBlockModal = false;
  instructorBlockId: string | null = null;
  instructorBlockIndex: number | null = null;
  isDropdownOpen: { [key: string]: boolean } = {};
  lastOpenedDropdown: string = '';

  instructors: Instructor[] = []
  constructor(
    private _router: Router,
    private _service: AdminInstructorService,
    private _profileService: InstructorProfileService,
    public _customToastService: CustomToastService
  ) { }
  
  ngOnInit(): void {
    // this.store.dispatch(getStudent())
    this._service.getInstructors().subscribe({
      next: (res) => {
        if (res) {
          this.instructors = res.instructors
        }
      }
    })
  }

  openProfile(instructorId: string) {
    this._router.navigate(['admin/instructor-profile'], { queryParams: { id: instructorId } });
  }

  blockInstuctor(instructorId: string, instructorIndex: number) {
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

  openBlockModal(instructorId: string, instructorIndex: number, event: MouseEvent) {
    const target = event.target as HTMLElement;
    const dropdowns = document.querySelectorAll('.dropdown-menu');
    dropdowns.forEach((dropdown) => {
      if (!dropdown.contains(target)) {
        this.isDropdownOpen[this.lastOpenedDropdown] = false;
        this.lastOpenedDropdown = '';
      }
    });
    this.instructorBlockId = instructorId
    this.instructorBlockIndex = instructorIndex
    this.blockModal = true
  }

  openUnblockModal(instructorId: string, instructorIndex: number, event: MouseEvent) {
    const target = event.target as HTMLElement;
    const dropdowns = document.querySelectorAll('.dropdown-menu');
    dropdowns.forEach((dropdown) => {
      if (!dropdown.contains(target)) {
        this.isDropdownOpen[this.lastOpenedDropdown] = false;
        this.lastOpenedDropdown = '';
      }
    });
    this.instructorBlockId = instructorId
    this.instructorBlockIndex = instructorIndex
    this.unBlockModal = true
  }

  closeBlockModal() {
    this.blockModal = false;
  }

  closeUnblockModal() {
    this.unBlockModal = false;
  }

  block() {
    if(this.instructorBlockId != null && this.instructorBlockIndex != null) {
      this._profileService.updateblock(this.instructorBlockId).subscribe({
        next: (res) => {
          if (res) {
            this.instructors[this.instructorBlockIndex as number].isBlocked = res.instructor.isBlocked
            this.blockModal = false;
            this._customToastService.setToast('success', res.message);
          }
        }
      })
    }
  }

  unBlock() {
    if(this.instructorBlockId != null && this.instructorBlockIndex != null) {
      this._profileService.updateblock(this.instructorBlockId).subscribe({
        next: (res) => {
          if (res) {
            this.instructors[this.instructorBlockIndex as number].isBlocked = res.instructor.isBlocked
            this.unBlockModal = false;
            this._customToastService.setToast('success', res.message);
          }
        }
      })
    }
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
