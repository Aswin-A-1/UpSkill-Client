import { Component } from '@angular/core';
import { CustomToastService } from '../../../../core/services/customtoast.service';
import { AuthService } from '../../../../core/services/auth.service';
import { loginCredentials } from '../../../../core/models/auth';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent {
  constructor(
    public _customToastService: CustomToastService,
    private _service: AuthService
  ) { }


  onSubmitClick(userData: loginCredentials) {
    this._service.adminLogin(userData).subscribe({
      next: (successResponse: any) => {
        if (successResponse.message) {
          sessionStorage.setItem('admin_token', successResponse.token)
          localStorage.setItem('admin_token', successResponse.token);
          localStorage.setItem('admin', JSON.stringify(successResponse.admin));
          this._customToastService.setToast('success', successResponse.message, ['admin/student']);
        }
      },
      error: (error: any) => {
        this._customToastService.setToast('error', error.error.message);
      }
    });
  }
}
