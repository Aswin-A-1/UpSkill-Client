import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth_services';
import { Router } from '@angular/router';
import { ToastService } from '../../../core/services/toast.service';
import { CustomToastService } from '../../../core/services/customtoast.service';

@Component({
  selector: 'app-otp-template',
  templateUrl: './otp-template.component.html',
  styleUrl: './otp-template.component.css'
})
export class OtpTemplateComponent {
  value!: number
  remainingTime: number = 0;
  private timer: any;
  
  constructor(
    private service: AuthService,
    private router: Router,
    private toastService: ToastService,
    public customToastServices  : CustomToastService
  ) { }

  ngOnInit(): void {
    // Simulate sending an OTP and starting the timer
    const expiresInSeconds = 60; // OTP expires in 2 minutes
    this.startTimer(expiresInSeconds);
  }

  onSubmit() {
    if (this.value !== 0) {
      const userData: string | null = localStorage.getItem('userData');
      if (userData !== null) {
        this.service.veriftOtp(userData, this.value).subscribe({
          next: (successResponse: any) => {
            if (successResponse.message) {
              localStorage.removeItem('userData');
              this.customToastServices.setToast('success', successResponse.message, ['login']);
              // this.toastService.set('success', successResponse.message);
            }
          },
          error: (error: any) => {
            // this.toastService.set('error', error.error.error || 'An error occurred');
            this.customToastServices.setToast('error', error.error.error);
          }
        });
      } else {
        console.error("Email not found in localStorage");
      }
    }
  }
  
  resendOtp() {
      const userData: string | null = localStorage.getItem('userData');
      if (userData !== null) {
        const parsedUserData = JSON.parse(userData);
        this.service.resendOtp(parsedUserData).subscribe({
          next: (successResponse: any) => {
            if (successResponse.message) {
              this.customToastServices.setToast('success', successResponse.message);
            }
          },
          error: (error: any) => {
            this.customToastServices.setToast('error', error.error.error);
          }
        });
      } else {
        console.error("Email not found in localStorage");
      }
  }

  startTimer(expiresInSeconds: number): void {
    this.remainingTime = expiresInSeconds;
    this.timer = setInterval(() => {
      if (this.remainingTime > 0) {
        this.remainingTime--;
      } else {
        this.stopTimer();
      }
    }, 1000);
  }

  stopTimer(): void {
    clearInterval(this.timer);
  }
  // value: number = 0

  // private expirationTime: number = 0;
  // expiration$ = new BehaviorSubject<number>(0);

  // ngOnInit(): void {
  //   this.startTimer(60);
  // }

  // startTimer(expiresInSeconds: number): void {
  //   this.expirationTime = Date.now() + expiresInSeconds * 1000;
  //   this.updateExpirationTime();
  // }

  // getExpirationTime(): Observable<number> {
  //   return this.expiration$.asObservable();
  // }

  // // Expose remainingTime as a public getter method
  // get remainingTime(): Observable<number> {
  //   return this.expiration$;
  // }

  // private updateExpirationTime(): void {
  //   const interval = setInterval(() => {
  //     const remainingTime = this.expirationTime - Date.now();
  //     if (remainingTime <= 0) {
  //       clearInterval(interval);
  //       this.expiration$.next(0);
  //     } else {
  //       this.expiration$.next(Math.ceil(remainingTime / 1000));
  //     }
  //   }, 1000);
  // }
}
