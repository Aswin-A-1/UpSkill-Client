import { Component } from '@angular/core';
import { SignUpCredentials } from '../../../../core/models/auth';
import { AuthService } from '../../../../core/services/auth.service';
import { catchError, of, exhaustMap, map, tap } from 'rxjs';
import { CustomToastService } from '../../../../core/services/customtoast.service';

@Component({
  selector: 'app-instructor-signup',
  templateUrl: './instructor-signup.component.html',
  styleUrl: './instructor-signup.component.css'
})
export class InstructorSignupComponent {
  constructor(
    private _service: AuthService,
    public _customToastService  : CustomToastService
  ) { }

  onSubmitClick(userData: SignUpCredentials) {
    this._service.instructorRegister(userData).subscribe({
      next: (successResponse: any) => {
        if (successResponse.message) {
          const userDataString = JSON.stringify(userData);
          localStorage.setItem('instructorData', userDataString);
          this._customToastService.setToast('success', successResponse.message, ['instructor-signup/verify-otp']);
        }
      },
      error: (error: any) => {
        this._customToastService.setToast('error', error.error.error);
      }
    });
  }
}
