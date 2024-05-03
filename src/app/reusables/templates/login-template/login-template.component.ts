import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomToastService } from '../../../core/services/customtoast.service';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../../core/services/auth_services';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login-template',
  templateUrl: './login-template.component.html',
  styleUrl: './login-template.component.css'
})
export class LoginTemplateComponent {
  @Input() headding: string = ''
  @Input() tag: string = ''
  @Input() type: string = ''
  @Output() submitEvent = new EventEmitter()
  signinForm!: FormGroup;
  apiUri = environment.GOOGLE_URL
  eventSource!: EventSource;
  constructor(
    public customToastService: CustomToastService,
    private cookieService: CookieService,
    private service: AuthService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.signinForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        this.emailValidator.bind(this)
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.maxLength(20),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
      ])
    });
  }

  // ngOnInit() {
  //   this.route.queryParams.subscribe(params => {
  //     if (params['message'] && params['user']) {
  //       console.log('Message: ', params['message']);
  //       console.log('User: ', params['user']);
  //       // Handle the response here, e.g., by setting it in a service or displaying it in the UI
  //     }
  //   });
  // }


  ngOnInit() {
    // Replace with your server's URL for the SSE endpoint
    // this.eventSource = new EventSource('http://localhost:3000/auth/google/response');

    // this.eventSource.onmessage = (event) => {
    //   console.log('Received data from server:', event.data);
    //   // Handle the data here, e.g., update the component's state or display it in the UI
    // };
    
    const authResponseCookie = this.cookieService.get('authResponse');
    if (authResponseCookie) {
      const authResponse = JSON.parse(authResponseCookie);
      if(authResponse.user) {
        this.cookieService.delete('authResponse');
        sessionStorage.setItem('auth_token', authResponse.token)
        localStorage.setItem('token', authResponse.token);
        localStorage.setItem('user', JSON.stringify(authResponse.user));
        this.customToastService.setToast('success', authResponse.message, ['home']);
      }
    }
  }


  emailValidator(control: FormControl): { [s: string]: boolean } | null {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (control.value && !emailPattern.test(control.value)) {
      return { 'emailInvalid': true };
    }
    return null;
  }

  googleSignin() {
    window.location.href = `${this.apiUri}auth/google`
    // console.log('googel clicked')
    // this.service.getUserInfo().subscribe({
    //   next: (successResponse: any) => {
    //     if (successResponse.message) {
    //       console.log('Message: ', successResponse.message)
    //       console.log('User: ', successResponse.user)
    //       // this.toastService.set('success', successResponse.message);
    //     }
    //   },
    //   error: (error: any) => {
    //     // this.toastService.set('error', error.error.error || 'An error occurred');
    //   }
    // });
    // window.location.href = `${this.apiUri}auth/google`
  }

  onSubmitClick() {
    if (this.signinForm.valid) {
      this.submitEvent.emit(this.signinForm.value);
    }
  }
}
