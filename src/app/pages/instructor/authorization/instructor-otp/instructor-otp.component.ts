import { Component } from '@angular/core';
import { CustomToastService } from '../../../../core/services/customtoast.service';
import { AuthService } from '../../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-instructor-otp',
  templateUrl: './instructor-otp.component.html',
  styleUrl: './instructor-otp.component.css'
})
export class InstructorOtpComponent {
  value!: number
  remainingTime: number = 0;
  private timer: any;

  constructor(
    private service: AuthService,
    private router: Router,
    public customToastServices: CustomToastService,
  ) { }

  ngOnInit(): void {
    // Simulate sending an OTP and starting the timer
    const expiresInSeconds = 60; // OTP expires in 2 minutes
    this.startTimer(expiresInSeconds);
  }

  onSubmit() {
    if (this.value !== 0) {
      const instructorData: string | null = localStorage.getItem('instructorData');
      if (instructorData !== null) {
        this.service.verifyinstructortOtp(instructorData, this.value).subscribe({
          next: (successResponse: any) => {
            if (successResponse.message) {
              localStorage.removeItem('userData');
              this.customToastServices.setToast('success', successResponse.message, ['instructor-login']);
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
  }

  resendOtp() {
    const userData: string | null = localStorage.getItem('instructorData');
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
}
