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
    private router: Router,
    private routes: ActivatedRoute,
    private service: InstructorProfileService,
    public customToastService: CustomToastService
  ) { }
  
  ngOnInit(): void {
    this.routes.queryParams.subscribe(params => {
      this.instructorId = params['id'];
    });
    this.service.getInstructor(this.instructorId).subscribe({
      next: (res) => {
        if (res) {
          this.instructor = res.instructor
        }
      }
    })
  }

  verify() {
    this.service.updateVerfication(this.instructorId).subscribe({
      next: (res) => {
        if (res) {
          this.instructor.isVerified = res.instructor.isVerified
          this.verificationModal = false;
          this.customToastService.setToast('success', res.message);
        }
      }
    })
  }

  navigateToInstructors() {
    this.router.navigate(['admin/instructor']);
  }

  openVerificationModal() {
    this.verificationModal = true
  }

  closeVerificationModal() {
    this.verificationModal = false;
  }

  unVerify() {
    this.service.updateVerfication(this.instructorId).subscribe({
      next: (res) => {
        if (res) {
          this.instructor.isVerified = res.instructor.isVerified
          this.unVerificationModal = false;
          this.customToastService.setToast('success', res.message);
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
