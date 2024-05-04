import { Component } from '@angular/core';
import { AdminInstructorService } from '../../../core/services/admin/instructor/admininstructor.service';
import { Instructor } from '../../../core/models/student';

@Component({
  selector: 'app-instructor',
  templateUrl: './instructor.component.html',
  styleUrl: './instructor.component.css'
})
export class InstructorComponent {

  instructors: Instructor[] = []
  constructor(
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
