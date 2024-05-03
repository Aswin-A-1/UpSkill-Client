import { Component } from '@angular/core';
import { CustomToastService } from '../../../../core/services/customtoast.service';
import { loginCredentials } from '../../../../core/models/auth';
import { AuthService } from '../../../../core/services/auth_services';

@Component({
  selector: 'app-instructor-login',
  templateUrl: './instructor-login.component.html',
  styleUrl: './instructor-login.component.css'
})
export class InstructorLoginComponent {
  constructor(
    public customToastService: CustomToastService,
    private service: AuthService
  ) { }


  onSubmitClick(userData: loginCredentials) {
    this.service.instructorLogin(userData).subscribe({
      next: (successResponse: any) => {
        if (successResponse.message) {
          sessionStorage.setItem('auth_token', successResponse.token)
          localStorage.setItem('token', successResponse.token);
          localStorage.setItem('instructor', JSON.stringify(successResponse.instructor));
          this.customToastService.setToast('success', successResponse.message);
        }
      },
      error: (error: any) => {
        this.customToastService.setToast('error', error.error.message);
      }
    });
  }
}
