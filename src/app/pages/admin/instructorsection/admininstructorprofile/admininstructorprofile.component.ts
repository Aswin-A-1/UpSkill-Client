import { Component } from '@angular/core';
import { Instructor } from '../../../../core/models/student';
import { InstructorProfileService } from '../../../../core/services/instructor/profile/instructorprofile.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomToastService } from '../../../../core/services/customtoast.service';

@Component({
  selector: 'app-admininstructorprofile',
  templateUrl: './admininstructorprofile.component.html',
  styleUrl: './admininstructorprofile.component.css'
})
export class AdmininstructorprofileComponent {
  instructorId!: string
  instructor!: Instructor
  verificationModal = false;
  unVerificationModal = false;
  constructor(
    private _router: Router,
    private _routes: ActivatedRoute,
    private _service: InstructorProfileService,
    public _customToastService: CustomToastService
  ) { }
  
  ngOnInit(): void {
    this._routes.queryParams.subscribe(params => {
      this.instructorId = params['id'];
    });
    this._service.getInstructor(this.instructorId).subscribe({
      next: (res) => {
        if (res) {
          this.instructor = res.instructor
        }
      }
    })
  }

  verify() {
    this._service.updateVerfication(this.instructorId).subscribe({
      next: (res) => {
        if (res) {
          this.instructor.isVerified = res.instructor.isVerified
          this.verificationModal = false;
          this._customToastService.setToast('success', res.message);
        }
      }
    })
  }

  navigateToInstructors() {
    this._router.navigate(['admin/instructor']);
  }

  openVerificationModal() {
    this.verificationModal = true
  }

  closeVerificationModal() {
    this.verificationModal = false;
  }

  unVerify() {
    this._service.updateVerfication(this.instructorId).subscribe({
      next: (res) => {
        if (res) {
          this.instructor.isVerified = res.instructor.isVerified
          this.unVerificationModal = false;
          this._customToastService.setToast('success', res.message);
        }
      }
    })
  }

  openUnVerificationModal() {
    this.unVerificationModal = true
  }

  closeUnVerificationModal() {
    this.unVerificationModal = false;
  }

}
