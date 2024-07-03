import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { getStudent } from '../../../core/state/admin/actions';
import { AdminStudentService } from '../../../core/services/admin/student/adminstudent.service';
import { User } from '../../../core/models/student';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrl: './students.component.css'
})

export class StudentsComponent {
  users: User[] = []
  currentPage = 1;
  itemsPerPage = 2;
  totalPages = 0;
  index = 1;

  constructor(
    private _service: AdminStudentService
  ) { }

  ngOnInit(): void {
    // this.store.dispatch(getStudent())
    this.fetchStudents()
  }

  async fetchStudents() {
    this._service.getStudentsForAdmin(this.currentPage, this.itemsPerPage).subscribe({
      next: (res) => {
        if (res) {
          this.users = res.students
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

  toggleBlockStatus(user: any) {
    this._service.manageStudents(user._id).subscribe({
      next: (res) => {
        if (res) {
          // this.users = res.updateStudent
          const index = this.users.findIndex(u => u._id === user._id);
          if (index !== -1) {
            this.users[index].isBlocked = res.updatedStudent.isBlocked;
          }
        }
      }
    })
  }

}
