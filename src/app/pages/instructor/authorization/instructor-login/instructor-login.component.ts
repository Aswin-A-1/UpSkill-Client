import { Component } from '@angular/core';
import { CustomToastService } from '../../../../core/services/customtoast.service';
import { loginCredentials } from '../../../../core/models/auth';
import { AuthService } from '../../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-instructor-login',
  templateUrl: './instructor-login.component.html',
  styleUrl: './instructor-login.component.css'
})
export class InstructorLoginComponent {
  constructor(
    private router: Router,
    public _customToastService: CustomToastService,
    private _service: AuthService
  ) { }


  onSubmitClick(userData: loginCredentials) {
    this._service.instructorLogin(userData).subscribe({
      next: (successResponse: any) => {
        if (successResponse.message) {
          sessionStorage.setItem('instructor_token', successResponse.token)
          localStorage.setItem('instructor_token', successResponse.token);
          localStorage.setItem('instructor', JSON.stringify(successResponse.instructor));
          // this._customToastService.setToast('success', successResponse.message, ['instructor/courses']);
          this.router.navigate(['instructor/courses']);
        }
      },
      error: (error: any) => {
        this._customToastService.setToast('error', error.error.message);
      }
    });
  }
}
