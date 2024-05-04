import { Component } from '@angular/core';
import { CustomToastService } from '../../../../core/services/customtoast.service';
import { AuthService } from '../../../../core/services/auth_services';
import { loginCredentials } from '../../../../core/models/auth';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent {
  constructor(
    public customToastService: CustomToastService,
    private service: AuthService
  ) { }


  onSubmitClick(userData: loginCredentials) {
    this.service.adminLogin(userData).subscribe({
      next: (successResponse: any) => {
        if (successResponse.message) {
          sessionStorage.setItem('admin_token', successResponse.token)
          localStorage.setItem('admin_token', successResponse.token);
          localStorage.setItem('admin', JSON.stringify(successResponse.admin));
          this.customToastService.setToast('success', successResponse.message, ['admin/student']);
        }
      },
      error: (error: any) => {
        this.customToastService.setToast('error', error.error.message);
      }
    });
  }
}
