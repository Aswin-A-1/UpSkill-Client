import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { getStudent } from '../../../core/state/admin/actions';
import { AdminStudentService } from '../../../core/services/admin/student/adminstudent.services';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrl: './students.component.css'
})

export class StudentsComponent {
  users: any[] = []
  constructor(
    private store : Store,
    private service: AdminStudentService
  ) {}

  ngOnInit(): void {
    // this.store.dispatch(getStudent())
    this.service.getStudents().subscribe({
      next: (res) => {
        if(res) {
          this.users = res.students
        }
      }
    })
  }

  toggleBlockStatus(user: any) {
    this.service.manageStudents(user._id).subscribe({
      next: (res) => {
        if(res) {
          this.users = res.students
        }
      }
    })
  }

}
