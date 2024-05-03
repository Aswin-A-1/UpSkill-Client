import { Component } from '@angular/core';
import { SignUpCredentials } from '../../../../core/models/auth';
import { AuthService } from '../../../../core/services/auth_services';
import { catchError, of, exhaustMap, map, tap } from 'rxjs';
import { CustomToastService } from '../../../../core/services/customtoast.service';

@Component({
  selector: 'app-instructor-signup',
  templateUrl: './instructor-signup.component.html',
  styleUrl: './instructor-signup.component.css'
})
export class InstructorSignupComponent {
  constructor(
    private service: AuthService,
    public customToastService  : CustomToastService
  ) { }

  onSubmitClick(userData: SignUpCredentials) {
    this.service.instructorRegister(userData).subscribe({
      next: (successResponse: any) => {
        if (successResponse.message) {
          const userDataString = JSON.stringify(userData);
          localStorage.setItem('instructorData', userDataString);
          this.customToastService.setToast('success', successResponse.message, ['instructor-signup/verify-otp']);
        }
      },
      error: (error: any) => {
        this.customToastService.setToast('error', error.error.error);
      }
    });
  }
}
