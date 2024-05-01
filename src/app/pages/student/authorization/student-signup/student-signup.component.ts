import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { SignUpCredentials } from '../../../../core/models/auth';
import { studentSignup } from '../../../../core/state/auth/actions';

interface signinFormData {
  username: string,
  password: string,
  cpassword: string
}

@Component({
  selector: 'app-student-signup',
  templateUrl: './student-signup.component.html',
  styleUrl: './student-signup.component.css'
})

export class StudentSignupComponent {
  constructor(private store : Store){}
  onSubmitClick(userData: SignUpCredentials) {
    this.store.dispatch(studentSignup({ userData }))
  }
}
